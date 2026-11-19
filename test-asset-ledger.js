const assert = require("node:assert/strict");
const {
  getAssetBalance,
  projectAssetBalance,
  sumCashAmounts,
  sumAssetFlow,
  normalizeAssetLink,
  isNegativeMoney,
  listAssetRecords
} = require("./asset-ledger");

const bakery = { id: "bakery", name: "面包店会员卡", balance: 0 };
const topup = {
  id: "topup-200",
  type: "expense",
  amount: 200,
  major: "居家",
  minor: "会员费",
  assetId: "bakery",
  assetFlow: "topup",
  deletedAt: ""
};
const cake = {
  id: "cake-180",
  type: "expense",
  amount: 180,
  major: "餐饮",
  minor: "水果零食",
  note: "蛋糕",
  assetId: "bakery",
  assetFlow: "spend",
  deletedAt: ""
};
const records = [topup, cake];

assert.equal(getAssetBalance(bakery, records), 20);
assert.equal(sumCashAmounts(records, "expense"), 200);
assert.equal(sumAssetFlow(records, "spend", "bakery"), 180);
assert.equal(sumAssetFlow(records, "topup", "bakery"), 200);

const cashLunch = { id: "lunch", type: "expense", amount: 32, assetId: "", assetFlow: "", deletedAt: "" };
assert.equal(sumCashAmounts([...records, cashLunch], "expense"), 232);
assert.equal(getAssetBalance(bakery, [...records, cashLunch]), 20);

assert.equal(
  projectAssetBalance(bakery, records, {
    excludeRecordId: "cake-180",
    assetId: "bakery",
    assetFlow: "spend",
    amount: 150
  }),
  50
);
assert.equal(
  isNegativeMoney(projectAssetBalance(bakery, records, {
    excludeRecordId: "cake-180",
    assetId: "bakery",
    assetFlow: "spend",
    amount: 220
  })),
  true
);

assert.equal(
  getAssetBalance(bakery, records, { excludeRecordId: "cake-180" }),
  200
);
assert.equal(
  isNegativeMoney(projectAssetBalance(bakery, records, {
    excludeRecordId: "topup-200",
    assetId: "",
    assetFlow: "",
    amount: 200
  })),
  true
);

const softDeletedCake = { ...cake, deletedAt: "2026-11-19T00:00:00.000Z" };
assert.equal(getAssetBalance(bakery, [topup, softDeletedCake]), 200);
assert.equal(sumCashAmounts([topup, softDeletedCake], "expense"), 200);
assert.equal(listAssetRecords("bakery", [topup, softDeletedCake]).length, 1);

const registered = { id: "bus", balance: 50 };
assert.equal(getAssetBalance(registered, []), 50);
assert.equal(getAssetBalance(registered, [{ ...topup, assetId: "bus" }, { ...cake, assetId: "bus" }]), 70);
assert.equal(sumCashAmounts([{ ...topup, assetId: "bus" }, { ...cake, assetId: "bus" }], "expense"), 200);

assert.deepEqual(normalizeAssetLink({ type: "income", assetId: "bakery", assetFlow: "spend" }), {
  assetId: "",
  assetFlow: ""
});
assert.deepEqual(normalizeAssetLink(cake), { assetId: "bakery", assetFlow: "spend" });

const otherCard = { id: "transit", balance: 30 };
assert.equal(
  projectAssetBalance(bakery, records, {
    excludeRecordId: "cake-180",
    assetId: "transit",
    assetFlow: "spend",
    amount: 180
  }),
  200
);
assert.equal(
  projectAssetBalance(otherCard, records, {
    excludeRecordId: "cake-180",
    assetId: "transit",
    assetFlow: "spend",
    amount: 180
  }),
  -150
);

console.log("asset ledger checks passed");
