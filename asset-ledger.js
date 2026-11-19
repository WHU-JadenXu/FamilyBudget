(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  } else {
    root.AssetLedger = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  function toCents(value) {
    const amount = Number(value);
    if (!Number.isFinite(amount)) return 0;
    return Math.round((amount + Number.EPSILON) * 100);
  }

  function fromCents(cents) {
    return cents / 100;
  }

  function isNegativeMoney(value) {
    return toCents(value) < 0;
  }

  function normalizeAssetLink(record) {
    const flow = record?.type === "expense" && (record.assetFlow === "topup" || record.assetFlow === "spend")
      ? record.assetFlow
      : "";
    const assetId = flow && typeof record?.assetId === "string" ? record.assetId : "";
    return { assetId, assetFlow: flow };
  }

  function excludedIdSet(options = {}) {
    if (Array.isArray(options.excludeIds)) return new Set(options.excludeIds);
    if (options.excludeRecordId) return new Set([options.excludeRecordId]);
    return new Set();
  }

  function affectsAsset(record, assetId, excluded) {
    if (!record || excluded.has(record.id) || record.deletedAt) return false;
    if (record.assetId !== assetId) return false;
    return record.assetFlow === "topup" || record.assetFlow === "spend";
  }

  function getAssetBalance(asset, records, options) {
    if (!asset) return 0;
    const excluded = excludedIdSet(options);
    let cents = toCents(asset.balance);
    for (const record of records || []) {
      if (!affectsAsset(record, asset.id, excluded)) continue;
      const amount = toCents(record.amount);
      cents += record.assetFlow === "topup" ? amount : -amount;
    }
    return fromCents(cents);
  }

  function projectAssetBalance(asset, records, change = {}) {
    const base = getAssetBalance(asset, records, { excludeRecordId: change.excludeRecordId || "" });
    if (!asset || !change.assetId || change.assetId !== asset.id) return base;
    const next = toCents(base);
    const amount = toCents(change.amount);
    if (change.assetFlow === "topup") return fromCents(next + amount);
    if (change.assetFlow === "spend") return fromCents(next - amount);
    return base;
  }

  function listAssetRecords(assetId, records) {
    const excluded = new Set();
    return (records || []).filter((record) => affectsAsset(record, assetId, excluded));
  }

  function sumCashAmounts(records, type) {
    return fromCents((records || []).reduce((total, record) => {
      if (!record || record.deletedAt || record.type !== type) return total;
      if (type === "expense" && record.assetFlow === "spend") return total;
      return total + toCents(record.amount);
    }, 0));
  }

  function sumAssetFlow(records, flow, assetId = "") {
    return fromCents((records || []).reduce((total, record) => {
      if (!record || record.deletedAt || record.assetFlow !== flow) return total;
      if (assetId && record.assetId !== assetId) return total;
      return total + toCents(record.amount);
    }, 0));
  }

  return {
    toCents,
    fromCents,
    isNegativeMoney,
    normalizeAssetLink,
    getAssetBalance,
    projectAssetBalance,
    listAssetRecords,
    sumCashAmounts,
    sumAssetFlow
  };
});
