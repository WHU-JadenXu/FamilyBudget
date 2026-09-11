const people = ["李逍宇", "徐佳丹"];

const personLabels = {
  李逍宇: "👦 李逍宇",
  徐佳丹: "👧 徐佳丹"
};

const categoryMap = {
  expense: {
    餐饮: ["早餐", "午餐", "晚餐", "买菜", "水果零食", "咖啡奶茶"],
    交通: ["地铁公交", "打车", "加油充电", "停车", "高铁机票"],
    出差: ["出差吃饭", "出差住宿", "出差交通", "出差其他"],
    居家: ["房租房贷", "水电燃气", "网费", "话费", "会员费", "物业", "家政", "维修"],
    购物: ["日用品", "服饰", "数码", "护肤美妆", "礼物"],
    医疗: ["挂号", "药品", "体检", "保险"],
    娱乐: ["电影演出", "旅行", "游戏会员", "聚会", "运动"],
    人情: ["红包", "请客", "父母家人", "朋友往来"],
    其他: ["未分类", "快递", "出差未报销"]
  },
  income: {
    工资: ["工资", "奖金", "补贴"],
    理财: ["利息", "基金股票", "分红"],
    出差: ["报销", "其他"],
    报销: ["交通报销", "餐费报销", "其他报销", "出差结余"],
    其他: ["转账", "退款", "未分类"]
  }
};

const categoryLabels = {
  餐饮: "🍜 餐饮",
  交通: "🚇 交通",
  出差: "🧳 出差",
  居家: "🏠 居家",
  购物: "🛍️ 购物",
  医疗: "💊 医疗",
  娱乐: "🎬 娱乐",
  人情: "🧧 人情",
  其他: "📌 其他",
  工资: "💰 工资",
  理财: "📈 理财",
  报销: "🧾 报销"
};

const minorLabels = {
  早餐: "🥣 早餐",
  午餐: "🍱 午餐",
  晚餐: "🍲 晚餐",
  买菜: "🥬 买菜",
  水果零食: "🍎 水果零食",
  咖啡奶茶: "☕ 咖啡奶茶",
  地铁公交: "🚇 地铁公交",
  打车: "🚕 打车",
  加油充电: "⛽ 加油充电",
  停车: "🅿️ 停车",
  高铁机票: "🚄 高铁机票",
  出差吃饭: "🍱 出差吃饭",
  出差住宿: "🏨 出差住宿",
  出差交通: "🎫 出差交通",
  出差其他: "📎 出差其他",
  房租房贷: "🏡 房租房贷",
  水电燃气: "💡 水电燃气",
  网费: "🌐 网费",
  话费: "📱 话费",
  会员费: "⭐ 会员费",
  物业: "🔑 物业",
  家政: "🧹 家政",
  维修: "🔧 维修",
  日用品: "🧴 日用品",
  服饰: "👕 服饰",
  数码: "💻 数码",
  护肤美妆: "💄 护肤美妆",
  礼物: "🎁 礼物",
  挂号: "🏥 挂号",
  药品: "💊 药品",
  体检: "🩺 体检",
  保险: "🛡️ 保险",
  电影演出: "🎬 电影演出",
  旅行: "🧳 旅行",
  游戏会员: "🎮 游戏会员",
  聚会: "🍻 聚会",
  运动: "🏃 运动",
  红包: "🧧 红包",
  请客: "🍽️ 请客",
  父母家人: "👨‍👩‍👧 父母家人",
  朋友往来: "🤝 朋友往来",
  未分类: "📌 未分类",
  快递: "📦 快递",
  工资: "💰 工资",
  奖金: "🎉 奖金",
  补贴: "🧧 补贴",
  利息: "🏦 利息",
  基金股票: "📈 基金股票",
  分红: "💵 分红",
  交通报销: "🚇 交通报销",
  餐费报销: "🍱 餐费报销",
  其他报销: "🧾 其他报销",
  报销: "🧾 报销",
  其他: "📎 其他",
  出差结余: "💼 出差结余",
  出差未报销: "📉 出差未报销",
  转账: "↔️ 转账",
  退款: "↩️ 退款"
};

const assetTypeLabels = {
  membership: "🎫 会员卡",
  stored_value: "💳 储值卡",
  digital: "💎 数字资产"
};

const storageKey = "family-ledger-web-v1";
const tripStorageKey = "family-ledger-trips-v1";
const assetStorageKey = "family-ledger-stored-assets-v1";
const config = window.LEDGER_CONFIG || {};
const familyId = config.FAMILY_ID || "li-xu-family";
const configuredSiteUrl = (config.SITE_URL || "").trim();
const accountPersonHashes = {
  ee45a0526b47945f5f90fe628309aa0dd33d00838588e961a8e93cacc981a518: "徐佳丹",
  bc4d99bb615536adf2339e5d10d749dd13e16350993b48a485370d2a6437840a: "李逍宇",
  ...(config.ACCOUNT_PERSON_HASHES || {})
};
const tripNumberPrefixes = {
  李逍宇: "LXY",
  徐佳丹: "XJD"
};
const tripStatusLabels = {
  ongoing: "进行中",
  pending: "已结束待报销",
  reimbursed: "已报销"
};
const tripExpenseGroups = [
  { minor: "出差交通", label: "车票及交通" },
  { minor: "出差住宿", label: "住宿" },
  { minor: "出差吃饭", label: "吃饭" },
  { minor: "出差其他", label: "其他" }
];
const cloudRecordFields =
  "id,type,person,amount,benefit,major,minor,note,spent_on,created_at,updated_at,deleted_at,created_by,trip_id,trip_role,trip_linked_at,trip_original_major,trip_original_minor";
const cloudTripFields =
  "id,trip_no,traveler,subject,destination,start_on,end_on,daily_allowance,status,reimbursement_amount,reimbursed_on,expense_total_at_archive,allowance_total_at_archive,surplus_at_archive,settlement_record_id,archived_at,deleted_at,created_at,updated_at,created_by";
const cloudAssetFields =
  "id,name,asset_type,owner,balance,note,balance_updated_on,deleted_at,created_at,updated_at,created_by";
const hasSupabaseConfig = Boolean(config.SUPABASE_URL && config.SUPABASE_ANON_KEY);
const supabaseClient =
  hasSupabaseConfig && window.supabase
    ? window.supabase.createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY)
    : null;

let activeType = "expense";
let records = loadRecords();
let trips = loadTrips();
let assets = loadAssets();
let currentUser = null;
let isCloudReady = false;
let editingRecordId = "";
let editingTripId = "";
let editingAssetId = "";
let editingRecordBaseUpdatedAt = "";
let editingTripBaseUpdatedAt = "";
let editingAssetBaseUpdatedAt = "";
let lastCloudRecordError = null;
let activeTripId = "";
let lastCloudTripError = null;
let lastCloudAssetError = null;
let cloudSyncPromise = null;
let lastSuccessfulSyncAt = 0;
let preferredPerson = localStorage.getItem(`${storageKey}-preferred-person`) || "";
let detailAmountSortDirection = "";

const form = document.querySelector("#entryForm");
const amountInput = document.querySelector("#amount");
const entryDateInput = document.querySelector("#entryDate");
const personSelect = document.querySelector("#person");
const majorSelect = document.querySelector("#majorCategory");
const minorSelect = document.querySelector("#minorCategory");
const noteInput = document.querySelector("#note");
const tripProjectField = document.querySelector("#tripProjectField");
const tripProjectSelect = document.querySelector("#tripProjectSelect");
const recentRecordsList = document.querySelector("#recentRecordsList");
const allRecordsList = document.querySelector("#allRecordsList");
const recordLimitSelect = document.querySelector("#recordLimit");
const filterPerson = document.querySelector("#filterPerson");
const filterType = document.querySelector("#filterType");
const filterCategory = document.querySelector("#filterCategory");
const detailMinAmountInput = document.querySelector("#detailMinAmount");
const detailMaxAmountInput = document.querySelector("#detailMaxAmount");
const amountSortBtn = document.querySelector("#amountSortBtn");
const detailDateRangeBtn = document.querySelector("#detailDateRangeBtn");
const detailDateRangeText = document.querySelector("#detailDateRangeText");
const detailStartDateInput = document.querySelector("#detailStartDate");
const detailEndDateInput = document.querySelector("#detailEndDate");
const clearDetailFiltersBtn = document.querySelector("#clearDetailFiltersBtn");
const detailResultHint = document.querySelector("#detailResultHint");
const searchInput = document.querySelector("#searchInput");
const monthlySummary = document.querySelector("#monthlySummary");
const cloudStatus = document.querySelector("#cloudStatus");
const cloudHint = document.querySelector("#cloudHint");
const loginForm = document.querySelector("#loginForm");
const emailInput = document.querySelector("#emailInput");
const passwordInput = document.querySelector("#passwordInput");
const loginBtn = document.querySelector("#loginBtn");
const syncBtn = document.querySelector("#syncBtn");
const logoutBtn = document.querySelector("#logoutBtn");
const submitEntryBtn = document.querySelector("#submitEntryBtn");
const cancelEditBtn = document.querySelector("#cancelEditBtn");
const newTripBtn = document.querySelector("#newTripBtn");
const tripFormPanel = document.querySelector("#tripFormPanel");
const tripForm = document.querySelector("#tripForm");
const tripFormTitle = document.querySelector("#tripFormTitle");
const tripTravelerSelect = document.querySelector("#tripTraveler");
const tripNumberInput = document.querySelector("#tripNumber");
const tripSubjectInput = document.querySelector("#tripSubject");
const tripDestinationInput = document.querySelector("#tripDestination");
const tripStartDateInput = document.querySelector("#tripStartDate");
const tripEndDateInput = document.querySelector("#tripEndDate");
const tripDailyAllowanceInput = document.querySelector("#tripDailyAllowance");
const tripStatusSelect = document.querySelector("#tripStatus");
const cancelTripEditBtn = document.querySelector("#cancelTripEditBtn");
const tripStatusFilter = document.querySelector("#tripStatusFilter");
const tripProjectList = document.querySelector("#tripProjectList");
const tripDetailPanel = document.querySelector("#tripDetailPanel");
const tripDetailContent = document.querySelector("#tripDetailContent");
const tripExpenseList = document.querySelector("#tripExpenseList");
const tripAssignPanel = document.querySelector("#tripAssignPanel");
const tripUnassignedList = document.querySelector("#tripUnassignedList");
const confirmTripAssignBtn = document.querySelector("#confirmTripAssignBtn");
const cancelTripAssignBtn = document.querySelector("#cancelTripAssignBtn");
const tripSettlementPanel = document.querySelector("#tripSettlementPanel");
const tripSettlementForm = document.querySelector("#tripSettlementForm");
const tripReimbursementAmountInput = document.querySelector("#tripReimbursementAmount");
const tripReimbursedOnInput = document.querySelector("#tripReimbursedOn");
const tripSettlementExpense = document.querySelector("#tripSettlementExpense");
const tripSettlementAllowance = document.querySelector("#tripSettlementAllowance");
const tripSettlementIncome = document.querySelector("#tripSettlementIncome");
const tripSettlementResult = document.querySelector("#tripSettlementResult");
const cancelTripSettlementBtn = document.querySelector("#cancelTripSettlementBtn");
const tripOngoingCount = document.querySelector("#tripOngoingCount");
const tripPendingCount = document.querySelector("#tripPendingCount");
const tripReimbursedCount = document.querySelector("#tripReimbursedCount");
const tripArchivedCount = document.querySelector("#tripArchivedCount");
const newAssetBtn = document.querySelector("#newAssetBtn");
const assetFormPanel = document.querySelector("#assetFormPanel");
const assetForm = document.querySelector("#assetForm");
const assetFormTitle = document.querySelector("#assetFormTitle");
const assetNameInput = document.querySelector("#assetName");
const assetTypeSelect = document.querySelector("#assetType");
const assetOwnerSelect = document.querySelector("#assetOwner");
const assetBalanceInput = document.querySelector("#assetBalance");
const assetUpdatedOnInput = document.querySelector("#assetUpdatedOn");
const assetNoteInput = document.querySelector("#assetNote");
const saveAssetBtn = document.querySelector("#saveAssetBtn");
const cancelAssetEditBtn = document.querySelector("#cancelAssetEditBtn");
const assetCount = document.querySelector("#assetCount");
const assetBalanceTotal = document.querySelector("#assetBalanceTotal");
const assetList = document.querySelector("#assetList");
const exportStartDateInput = document.querySelector("#exportStartDate");
const exportEndDateInput = document.querySelector("#exportEndDate");
const exportExcelBtn = document.querySelector("#exportExcelBtn");
const exportAllExcelBtn = document.querySelector("#exportAllExcelBtn");
const clearRangeBtn = document.querySelector("#clearRangeBtn");
const clearBtn = document.querySelector("#clearBtn");
const dateRangeBtn = document.querySelector("#dateRangeBtn");
const dateRangeText = document.querySelector("#dateRangeText");
const calendarPanel = document.querySelector("#calendarPanel");
const calendarPrevBtn = document.querySelector("#calendarPrevBtn");
const calendarNextBtn = document.querySelector("#calendarNextBtn");
const calendarMonthLabel = document.querySelector("#calendarMonthLabel");
const calendarGrid = document.querySelector("#calendarGrid");
const pageNodes = document.querySelectorAll(".app-page");
const bottomTabs = document.querySelectorAll(".bottom-tab");
let calendarViewMonth = "";
let activeCalendarTarget = "export";

document.querySelectorAll(".segment").forEach((button) => {
  button.addEventListener("click", () => {
    activeType = button.dataset.type;
    document.querySelectorAll(".segment").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    fillMajorCategories();
  });
});

majorSelect.addEventListener("change", () => {
  fillMinorCategories();
  syncTripProjectField();
});
recordLimitSelect.addEventListener("change", render);
filterPerson.addEventListener("change", render);
filterType.addEventListener("change", render);
filterCategory.addEventListener("change", render);
detailMinAmountInput.addEventListener("input", render);
detailMaxAmountInput.addEventListener("input", render);
amountSortBtn.addEventListener("click", toggleDetailAmountSort);
clearDetailFiltersBtn.addEventListener("click", clearDetailFilters);
searchInput.addEventListener("input", render);
recentRecordsList.addEventListener("click", handleRecordAction);
allRecordsList.addEventListener("click", handleRecordAction);
syncBtn.addEventListener("click", syncCloudRecords);
logoutBtn.addEventListener("click", signOut);
cancelEditBtn.addEventListener("click", cancelEdit);
newTripBtn.addEventListener("click", startNewTrip);
tripForm.addEventListener("submit", saveTripFromForm);
cancelTripEditBtn.addEventListener("click", closeTripForm);
tripTravelerSelect.addEventListener("change", updateGeneratedTripNumber);
tripStartDateInput.addEventListener("change", updateGeneratedTripNumber);
tripStatusFilter.addEventListener("change", renderTrips);
tripProjectList.addEventListener("click", handleTripProjectAction);
tripDetailPanel.addEventListener("click", handleTripDetailAction);
tripExpenseList.addEventListener("click", handleRecordAction);
confirmTripAssignBtn.addEventListener("click", assignSelectedRecordsToTrip);
cancelTripAssignBtn.addEventListener("click", closeTripAssignPanel);
tripReimbursementAmountInput.addEventListener("input", updateTripSettlementPreview);
tripSettlementForm.addEventListener("submit", archiveActiveTrip);
cancelTripSettlementBtn.addEventListener("click", closeTripSettlementPanel);
newAssetBtn.addEventListener("click", startNewAsset);
assetForm.addEventListener("submit", saveAssetFromForm);
cancelAssetEditBtn.addEventListener("click", closeAssetForm);
assetList.addEventListener("click", handleAssetAction);
dateRangeBtn.addEventListener("click", (event) => toggleCalendarPanel(event, "export"));
detailDateRangeBtn.addEventListener("click", (event) => toggleCalendarPanel(event, "detail"));
calendarPrevBtn.addEventListener("click", () => shiftCalendarMonth(-1));
calendarNextBtn.addEventListener("click", () => shiftCalendarMonth(1));
calendarGrid.addEventListener("click", handleCalendarClick);
document.addEventListener("click", closeCalendarOnOutsideClick);
bottomTabs.forEach((button) => {
  button.addEventListener("click", () => switchPage(button.dataset.targetPage));
});
window.addEventListener("focus", refreshCloudWhenForeground);
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") refreshCloudWhenForeground();
});

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  if (!email || !password) return;
  await signIn(email, password);
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!canMutateLedger()) return;
  const amount = Number.parseFloat(amountInput.value.replace(",", "."));

  if (!Number.isFinite(amount) || amount <= 0) {
    amountInput.focus();
    return;
  }

  const existingRecord = editingRecordId ? records.find((item) => item.id === editingRecordId) : null;
  if (editingRecordId && !existingRecord) {
    cancelEdit();
    return;
  }

  const tripAssociation = getEntryTripAssociation(existingRecord);
  if (!tripAssociation) return;

  if (editingRecordId) {
    let updatedRecord = {
      ...existingRecord,
      type: activeType,
      person: personSelect.value,
      amount: Math.round(amount * 100) / 100,
      benefit: "",
      major: majorSelect.value,
      minor: minorSelect.value,
      note: noteInput.value.trim(),
      date: entryDateInput.value,
      updatedAt: new Date().toISOString(),
      ...tripAssociation
    };

    if (isCloudReady) {
      const savedRecord = await saveCloudRecord(updatedRecord, {
        baseUpdatedAt: editingRecordBaseUpdatedAt || existingRecord.updatedAt
      });
      if (!savedRecord) return;
      updatedRecord = savedRecord;
    }

    records = records.map((item) => (item.id === editingRecordId ? updatedRecord : item));
    saveRecords();
    cancelEdit();
    render();
    return;
  }

  let record = {
    id: createUuid(),
    type: activeType,
    person: personSelect.value,
    amount: Math.round(amount * 100) / 100,
    benefit: "",
    major: majorSelect.value,
    minor: minorSelect.value,
    note: noteInput.value.trim(),
    date: entryDateInput.value,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: currentUser?.id || "",
    ...tripAssociation
  };

  if (isCloudReady) {
    const savedRecord = await saveCloudRecord(record, { isNew: true });
    if (!savedRecord) return;
    record = savedRecord;
  }

  records.unshift(record);
  saveRecords();
  resetForm();
  render();
});

document.querySelector("#exportBtn").addEventListener("click", () => {
  const backup = {
    version: 3,
    exportedAt: new Date().toISOString(),
    records,
    trips,
    assets
  };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
  downloadBlob(blob, `家庭记账-${getShanghaiDay()}.json`);
});

exportExcelBtn.addEventListener("click", () => exportExcelRecords());
exportAllExcelBtn.addEventListener("click", () => exportExcelRecords({ allRecords: true }));

document.querySelector("#importFile").addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  try {
    const imported = JSON.parse(await file.text());
    let importedRecords = [];
    let importedTrips = null;
    let importedAssets = null;
    if (Array.isArray(imported)) {
      importedRecords = migrateRecords(imported.filter(isRecord));
    } else if (imported && Array.isArray(imported.records) && Array.isArray(imported.trips)) {
      importedRecords = migrateRecords(imported.records.filter(isRecord));
      importedTrips = imported.trips.filter(isTrip).map(normalizeTrip);
      importedAssets = Array.isArray(imported.assets) ? imported.assets.filter(isAsset).map(normalizeAsset) : null;
    } else {
      throw new Error("Invalid data");
    }

    if (!canMutateLedger()) return;
    if (isCloudReady) {
      const tripLabel = importedTrips ? `、${importedTrips.length} 个出差项目` : "";
      const assetLabel = importedAssets ? `、${importedAssets.length} 个储值资产` : "";
      if (!confirm(`确定恢复这份备份吗？\n\n将把 ${importedRecords.length} 条账目${tripLabel}${assetLabel}写入当前家庭云端账本；相同 ID 的云端数据会以这份备份为准。`)) return;
      if (!(await restoreBackupToCloud(importedRecords, importedTrips, importedAssets))) return;
      await syncCloudRecords();
    } else {
      records = importedRecords;
      if (importedTrips) trips = importedTrips;
      if (importedAssets) assets = importedAssets;
      saveRecords();
      saveTrips();
      saveAssets();
      render();
    }
  } catch {
    alert("导入失败，请选择之前导出的家庭记账 JSON 文件。");
  } finally {
    event.target.value = "";
  }
});

clearRangeBtn.addEventListener("click", clearSelectedRangeRecords);

clearBtn.addEventListener("click", async () => {
  if (!records.length && !trips.length && !assets.length && !isCloudReady) return;
  const storageSize = getLedgerStorageSize();
  const sizeLabel = storageSize ? `\n当前本地数据约 ${formatBytes(storageSize)}。` : "";
  const linkedTripRecordCount = records.filter(isTripProjectRecord).length;
  const dailyRecordCount = records.filter(isDailyRecord).length;
  const visibleTripCount = trips.filter((trip) => !trip.deletedAt).length;
  const deletedTripCount = trips.length - visibleTripCount;
  const visibleAssetCount = assets.filter((asset) => !asset.deletedAt).length;
  const countLabel = `日常记录 ${dailyRecordCount} 条、出差项目收支 ${linkedTripRecordCount} 条、出差项目 ${visibleTripCount} 个${deletedTripCount ? `、已删除编号留档 ${deletedTripCount} 个` : ""}、储值资产 ${visibleAssetCount} 个`;
  const captcha = createCaptchaCode();
  const answer = prompt(`确定清空当前账本的全部数据吗？\n${countLabel}${sizeLabel}\n\n这个操作会清空本地的日常账目、出差项目收支和出差项目；如果已登录同步，也会清空云端对应数据。\n\n请输入验证码 ${captcha} 后继续：`);
  if (answer === null) return;
  if (answer.trim().toLowerCase() !== captcha.toLowerCase()) {
    alert("验证码不一致，已取消清空。");
    return;
  }

  if (isCloudReady) {
    const { error } = await supabaseClient.from("records").delete().eq("family_id", familyId);
    if (error) {
      setCloudState("同步失败", error.message);
      return;
    }
    const { error: tripError } = await supabaseClient.from("business_trips").delete().eq("family_id", familyId);
    if (tripError) {
      setCloudState("出差项目清空失败", formatCloudSchemaError(tripError));
      await syncCloudRecords({ quiet: true });
      alert("账目已从云端删除，但出差项目删除失败；页面已重新读取云端当前状态，请重试清空。\n\n系统不会再把本机旧缓存自动写回云端。");
      return;
    }
    const { error: assetError } = await supabaseClient.from("stored_assets").delete().eq("family_id", familyId);
    if (assetError) {
      setCloudState("储值资产清空失败", formatCloudSchemaError(assetError));
      await syncCloudRecords({ quiet: true });
      alert("账目和出差项目已从云端删除，但储值资产删除失败；页面已重新读取云端当前状态，请重试清空。");
      return;
    }
  }

  records = [];
  trips = [];
  assets = [];
  activeTripId = "";
  saveRecords();
  saveTrips();
  saveAssets();
  render();
  updateAuthUi();
});

function toggleCalendarPanel(event, target) {
  event.stopPropagation();
  const isSameOpenTarget = !calendarPanel.hidden && activeCalendarTarget === target;
  activeCalendarTarget = target;
  getCalendarContainer(target).appendChild(calendarPanel);
  calendarPanel.hidden = isSameOpenTarget;
  if (!calendarPanel.hidden) {
    const startInput = getCalendarStartInput();
    calendarViewMonth = (startInput.value || getShanghaiDay()).slice(0, 7);
    renderCalendar();
  }
}

function closeCalendarOnOutsideClick(event) {
  if (calendarPanel.hidden) return;
  if (calendarPanel.contains(event.target) || dateRangeBtn.contains(event.target) || detailDateRangeBtn.contains(event.target)) return;
  calendarPanel.hidden = true;
}

function shiftCalendarMonth(offset) {
  calendarViewMonth = addMonths(calendarViewMonth, offset);
  renderCalendar();
}

function handleCalendarClick(event) {
  const dayButton = event.target.closest("[data-calendar-day]");
  if (!dayButton) return;
  event.stopPropagation();
  const selectedDay = dayButton.dataset.calendarDay;
  const startInput = getCalendarStartInput();
  const endInput = getCalendarEndInput();
  const startDate = startInput.value;
  const endDate = endInput.value;

  if (!startDate || (startDate && endDate)) {
    startInput.value = selectedDay;
    endInput.value = "";
    updateActiveDateRangeText();
    renderCalendar();
    if (activeCalendarTarget === "detail") render();
    return;
  } else if (selectedDay < startDate) {
    startInput.value = selectedDay;
    endInput.value = startDate;
    calendarPanel.hidden = true;
  } else {
    endInput.value = selectedDay;
    calendarPanel.hidden = true;
  }

  updateActiveDateRangeText();
  renderCalendar();
  if (activeCalendarTarget === "detail") render();
}

function renderCalendar() {
  const [year, month] = calendarViewMonth.split("-").map(Number);
  const firstDay = new Date(year, month - 1, 1);
  const daysInMonth = new Date(year, month, 0).getDate();
  const leadingDays = (firstDay.getDay() + 6) % 7;
  const startDate = getCalendarStartInput().value;
  const endDate = getCalendarEndInput().value;

  calendarMonthLabel.textContent = `${year}年${month}月`;
  calendarGrid.innerHTML = "";

  for (let index = 0; index < leadingDays; index += 1) {
    calendarGrid.appendChild(document.createElement("span"));
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const dayValue = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.calendarDay = dayValue;
    button.textContent = String(day);
    button.classList.toggle("selected", dayValue === startDate || dayValue === endDate);
    button.classList.toggle("in-range", Boolean(startDate && endDate && dayValue > startDate && dayValue < endDate));
    calendarGrid.appendChild(button);
  }
}

function updateDateRangeText() {
  const startDate = exportStartDateInput.value;
  const endDate = exportEndDateInput.value;
  dateRangeText.textContent = endDate ? `${formatInputDate(startDate)} - ${formatInputDate(endDate)}` : `${formatInputDate(startDate)} - 请选择结束日期`;
}

function updateDetailDateRangeText() {
  const startDate = detailStartDateInput.value;
  const endDate = detailEndDateInput.value;
  if (!startDate && !endDate) {
    detailDateRangeText.textContent = "不限时间";
    return;
  }
  detailDateRangeText.textContent = endDate ? `${formatInputDate(startDate)} - ${formatInputDate(endDate)}` : `${formatInputDate(startDate)} - 请选择结束日期`;
}

function updateActiveDateRangeText() {
  if (activeCalendarTarget === "detail") {
    updateDetailDateRangeText();
    return;
  }
  updateDateRangeText();
}

function getCalendarStartInput() {
  return activeCalendarTarget === "detail" ? detailStartDateInput : exportStartDateInput;
}

function getCalendarEndInput() {
  return activeCalendarTarget === "detail" ? detailEndDateInput : exportEndDateInput;
}

function getCalendarContainer(target) {
  return target === "detail" ? detailDateRangeBtn.parentElement : dateRangeBtn.parentElement;
}

async function exportExcelRecords({ allRecords = false } = {}) {
  const startDate = allRecords ? "" : exportStartDateInput.value;
  const endDate = allRecords ? "" : exportEndDateInput.value;

  if (!allRecords && (!startDate || !endDate)) {
    alert("请选择导出 Excel 的开始日期和结束日期。");
    return;
  }

  if (!allRecords && startDate > endDate) {
    alert("开始日期不能晚于结束日期。");
    return;
  }

  const scopedRecords = await getRecordsForExport(startDate, endDate);
  if (!scopedRecords.length) {
    alert(allRecords ? "还没有可导出的日常记录。" : "这个时间段内没有可导出的记录。");
    return;
  }

  const rows = scopedRecords
    .slice()
    .sort((first, second) => getRecordDay(first).localeCompare(getRecordDay(second)) || (first.createdAt || "").localeCompare(second.createdAt || ""))
    .map((record) => [
      getRecordDay(record),
      record.type === "income" ? "收入" : "支出",
      displayPerson(record.person),
      record.amount,
      displayCategory(record.major),
      displayMinor(record.minor),
      record.note || "",
      record.createdAt ? formatDateTime(record.createdAt) : ""
    ]);

  const totals = scopedRecords.reduce(
    (result, record) => {
      result[record.type] += record.amount;
      return result;
    },
    { expense: 0, income: 0 }
  );

  const sheetHtml = buildExcelSheet({
    title: allRecords ? "家庭记账 全部记录" : `家庭记账 ${startDate} 至 ${endDate}`,
    headers: ["日期", "类型", "记账人", "金额", "大类", "小类", "备注", "创建时间"],
    rows,
    summaryRows: [
      ["", "支出合计", "", totals.expense, "", "", "", ""],
      ["", "收入合计", "", totals.income, "", "", "", ""]
    ]
  });

  downloadBlob(
    new Blob([`\ufeff${sheetHtml}`], { type: "application/vnd.ms-excel;charset=utf-8" }),
    allRecords ? `家庭记账-全部记录-${getShanghaiDay()}.xls` : `家庭记账-${startDate}-至-${endDate}.xls`
  );
}

async function getRecordsForExport(startDate = "", endDate = "") {
  if (isCloudReady) {
    let query = supabaseClient
      .from("records")
      .select(cloudRecordFields)
      .eq("family_id", familyId)
      .is("deleted_at", null);
    if (startDate) query = query.gte("spent_on", startDate);
    if (endDate) query = query.lte("spent_on", endDate);
    const { data, error } = await query.order("spent_on", { ascending: true });

    if (!error) {
      return data.map(fromCloudRecord).filter(isRecord).filter(isDailyRecord);
    }

    setCloudState("导出读取云端失败", `${formatCloudSchemaError(error)}；已改用本机记录导出。`);
  }

  return records.filter(isDailyRecord).filter((record) => {
    const day = getRecordDay(record);
    return (!startDate || day >= startDate) && (!endDate || day <= endDate);
  });
}

async function clearSelectedRangeRecords() {
  const startDate = exportStartDateInput.value;
  const endDate = exportEndDateInput.value;
  if (!startDate || !endDate) {
    alert("请先选择要清空的开始日期和结束日期。");
    return;
  }
  if (startDate > endDate) {
    alert("开始日期不能晚于结束日期。");
    return;
  }

  const localScopedRecords = getClearableRangeRecords(records, startDate, endDate);
  let cloudScopedRecords = [];
  if (isCloudReady) {
    const { data, error } = await supabaseClient
      .from("records")
      .select(cloudRecordFields)
      .eq("family_id", familyId)
      .is("deleted_at", null)
      .is("trip_id", null)
      .is("trip_role", null)
      .gte("spent_on", startDate)
      .lte("spent_on", endDate);
    if (error) {
      setCloudState("清空范围读取失败", formatCloudSchemaError(error));
      alert("无法确认云端选定时间段的数据，已取消清空。");
      return;
    }
    cloudScopedRecords = data.map(fromCloudRecord).filter(isRecord);
  }

  const scopedRecordIds = new Set([...localScopedRecords, ...cloudScopedRecords].map((record) => record.id));
  if (!scopedRecordIds.size) {
    alert("选定时间段内没有可清空的日常记录。出差项目收支、项目差值和出差项目不会被此功能删除。");
    return;
  }

  const captcha = createCaptchaCode();
  const syncLabel = isCloudReady
    ? "本机及当前家庭云端账本中的同范围日常记录都会删除。"
    : "当前仅删除本机中的同范围日常记录。";
  const answer = prompt(
    `确定清空 ${startDate} 至 ${endDate} 的数据吗？\n\n将删除 ${scopedRecordIds.size} 条日常记录。${syncLabel}\n出差项目收支、项目差值和出差项目不受影响。\n\n请输入验证码 ${captcha} 后继续：`
  );
  if (answer === null) return;
  if (answer.trim().toLowerCase() !== captcha.toLowerCase()) {
    alert("验证码不一致，已取消清空。");
    return;
  }

  if (isCloudReady) {
    const { error } = await supabaseClient
      .from("records")
      .delete()
      .eq("family_id", familyId)
      .is("trip_id", null)
      .is("trip_role", null)
      .gte("spent_on", startDate)
      .lte("spent_on", endDate);
    if (error) {
      setCloudState("选定时间段清空失败", formatCloudSchemaError(error));
      alert("云端数据清空失败，本机数据没有改动。");
      return;
    }
  }

  const localRecordIds = new Set(localScopedRecords.map((record) => record.id));
  records = records.filter((record) => !localRecordIds.has(record.id));
  saveRecords();
  render();
  updateAuthUi();
  alert(`已清空 ${startDate} 至 ${endDate} 的 ${scopedRecordIds.size} 条日常记录。`);
}

function getClearableRangeRecords(recordItems, startDate, endDate) {
  return recordItems.filter((record) => {
    if (record.tripId || record.tripRole) return false;
    const day = getRecordDay(record);
    return day >= startDate && day <= endDate;
  });
}

function resetForm() {
  form.reset();
  personSelect.value = getDefaultPerson();
  entryDateInput.value = getShanghaiDay();
  fillMajorCategories();
  syncTripProjectField();
}

function switchPage(pageName) {
  pageNodes.forEach((page) => {
    page.classList.toggle("active", page.dataset.page === pageName);
  });
  bottomTabs.forEach((button) => {
    button.classList.toggle("active", button.dataset.targetPage === pageName);
  });
  monthlySummary.hidden = ["trips", "assets"].includes(pageName);
}

function setActiveType(type) {
  activeType = type;
  document.querySelectorAll(".segment").forEach((button) => {
    button.classList.toggle("active", button.dataset.type === type);
  });
  fillMajorCategories();
}

function fillMajorCategories() {
  majorSelect.innerHTML = Object.keys(categoryMap[activeType])
    .map((name) => `<option value="${name}">${displayCategory(name)}</option>`)
    .join("");
  fillMinorCategories();
  syncTripProjectField();
}

function fillMinorCategories() {
  const minors = categoryMap[activeType][majorSelect.value] || [];
  minorSelect.innerHTML = minors
    .map((name) => `<option value="${name}">${displayMinor(name)}</option>`)
    .join("");
}

function fillTripProjectOptions(preferredTripId = "") {
  const availableTrips = trips
    .filter((trip) => !trip.archivedAt && !trip.deletedAt)
    .sort((left, right) => (right.startDate || "").localeCompare(left.startDate || ""));
  tripProjectSelect.innerHTML = [
    `<option value="">${availableTrips.length ? "暂不归入项目" : "暂无可关联项目"}</option>`,
    ...availableTrips.map(
      (trip) => `<option value="${escapeHtml(trip.id)}">${escapeHtml(`${trip.tripNo} · ${trip.subject}`)}</option>`
    )
  ].join("");
  if (preferredTripId && availableTrips.some((trip) => trip.id === preferredTripId)) {
    tripProjectSelect.value = preferredTripId;
  }
}

function syncTripProjectField(preferredTripId = "") {
  const isTripRecord = majorSelect.value === "出差";
  tripProjectField.hidden = !isTripRecord;
  tripProjectSelect.disabled = !isTripRecord;
  if (!isTripRecord) {
    tripProjectSelect.value = "";
    return;
  }
  const currentValue = preferredTripId || tripProjectSelect.value;
  fillTripProjectOptions(currentValue);
}

function getEntryTripAssociation(existingRecord) {
  const shouldLinkTrip = majorSelect.value === "出差";
  if (!shouldLinkTrip || !tripProjectSelect.value) {
    return {
      tripId: "",
      tripRole: "",
      tripLinkedAt: "",
      tripOriginalMajor: "",
      tripOriginalMinor: ""
    };
  }

  const trip = trips.find((item) => item.id === tripProjectSelect.value && !item.deletedAt);
  if (!trip || trip.archivedAt) {
    alert("选择的出差项目已不可用，请重新选择或暂不归入项目。");
    tripProjectSelect.focus();
    return null;
  }

  const wasLinked = Boolean(existingRecord?.tripId);
  const originalMajor = wasLinked
    ? existingRecord.tripOriginalMajor || ""
    : existingRecord && existingRecord.major !== "出差"
      ? existingRecord.major
      : "";
  const originalMinor = wasLinked
    ? existingRecord.tripOriginalMinor || ""
    : existingRecord && existingRecord.major !== "出差"
      ? existingRecord.minor
      : "";

  return {
    tripId: trip.id,
    tripRole: activeType === "income" ? "reimbursement" : "expense",
    tripLinkedAt: existingRecord?.tripLinkedAt || new Date().toISOString(),
    tripOriginalMajor: originalMajor,
    tripOriginalMinor: originalMinor
  };
}

function fillDetailCategories() {
  const categories = [
    ...Object.keys(categoryMap.expense),
    ...Object.keys(categoryMap.income).filter((name) => !Object.prototype.hasOwnProperty.call(categoryMap.expense, name))
  ];
  filterCategory.innerHTML = [
    `<option value="all">全部类别</option>`,
    ...categories.map((name) => `<option value="${name}">${displayCategory(name)}</option>`)
  ].join("");
}

function clearDetailFilters() {
  recordLimitSelect.value = "10";
  filterPerson.value = "all";
  filterType.value = "all";
  filterCategory.value = "all";
  detailMinAmountInput.value = "";
  detailMaxAmountInput.value = "";
  detailAmountSortDirection = "";
  detailStartDateInput.value = "";
  detailEndDateInput.value = "";
  searchInput.value = "";
  updateDetailAmountSortButton();
  updateDetailDateRangeText();
  render();
}

function toggleDetailAmountSort() {
  detailAmountSortDirection = detailAmountSortDirection === "desc" ? "asc" : "desc";
  updateDetailAmountSortButton();
  render();
}

function updateDetailAmountSortButton() {
  const isAmountSorted = Boolean(detailAmountSortDirection);
  amountSortBtn.dataset.direction = detailAmountSortDirection;
  amountSortBtn.setAttribute("aria-pressed", String(isAmountSorted));
  if (detailAmountSortDirection === "desc") {
    amountSortBtn.textContent = "从大到小 ↓";
    amountSortBtn.setAttribute("aria-label", "当前金额从大到小，点击改为从小到大");
  } else if (detailAmountSortDirection === "asc") {
    amountSortBtn.textContent = "从小到大 ↑";
    amountSortBtn.setAttribute("aria-label", "当前金额从小到大，点击改为从大到小");
  } else {
    amountSortBtn.textContent = "按金额排序";
    amountSortBtn.setAttribute("aria-label", "点击按金额从大到小排序");
  }
}

function render() {
  const today = getShanghaiDay();
  const monthKey = today.slice(0, 7);
  const dailyRecords = records.filter(isDailyRecord);
  const monthRecords = dailyRecords.filter((record) => getRecordDay(record).slice(0, 7) === monthKey);
  const visibleRecords = getVisibleDetailRecords();

  document.querySelector("#monthLabel").textContent = `今天 ${formatDay(today)}`;
  document.querySelector("#monthExpense").textContent = money(sum(monthRecords, "expense"));
  document.querySelector("#monthIncome").textContent = money(sum(monthRecords, "income"));
  document.querySelector("#liTotal").textContent = money(sum(monthRecords.filter((record) => record.person === "李逍宇"), "expense"));
  document.querySelector("#xuTotal").textContent = money(sum(monthRecords.filter((record) => record.person === "徐佳丹"), "expense"));

  const dateSortedRecords = sortRecordsBySpentDate(dailyRecords);
  renderRecordList(recentRecordsList, dateSortedRecords.slice(0, 5), {
    emptyText: "还没有记录，先记一笔。",
    limit: 5
  });
  renderRecordList(allRecordsList, visibleRecords, {
    emptyText: dailyRecords.length ? "没有找到匹配记录。" : "还没有日常记录，先记一笔。",
    limit: visibleRecords.length
  });
  detailResultHint.textContent = getDetailResultHint(visibleRecords.length);
  renderTrips();
  renderAssets();
}

function getVisibleDetailRecords() {
  const query = searchInput.value.trim().toLowerCase();
  const startDate = detailStartDateInput.value;
  const endDate = detailEndDateInput.value;
  const amountRange = getDetailAmountRange();
  const hasDateWindow = Boolean(startDate || endDate);
  const limitValue = recordLimitSelect.value;

  if ((startDate && endDate && startDate > endDate) || amountRange.error) return [];

  const filteredRecords = records.filter(isDailyRecord).filter((record) => {
    const day = getRecordDay(record);
    const amount = Number(record.amount);
    const personMatched = filterPerson.value === "all" || record.person === filterPerson.value;
    const typeMatched = filterType.value === "all" || record.type === filterType.value;
    const categoryMatched = filterCategory.value === "all" || record.major === filterCategory.value;
    const minAmountMatched = amountRange.minAmount === null || amount >= amountRange.minAmount;
    const maxAmountMatched = amountRange.maxAmount === null || amount <= amountRange.maxAmount;
    const startMatched = !startDate || day >= startDate;
    const endMatched = !endDate || day <= endDate;
    const queryMatched = !query || getRecordSearchText(record).includes(query);
    return personMatched && typeMatched && categoryMatched && minAmountMatched && maxAmountMatched && startMatched && endMatched && queryMatched;
  });
  const dateSortedRecords = sortRecordsBySpentDate(filteredRecords);
  const selectedRecords = hasDateWindow || limitValue === "all" ? dateSortedRecords : dateSortedRecords.slice(0, Number(limitValue));
  return sortDetailRecords(selectedRecords);
}

function getDetailAmountRange() {
  const minRaw = detailMinAmountInput.value.trim();
  const maxRaw = detailMaxAmountInput.value.trim();
  const minAmount = minRaw === "" ? null : Number(minRaw);
  const maxAmount = maxRaw === "" ? null : Number(maxRaw);

  if (minAmount !== null && (!Number.isFinite(minAmount) || minAmount < 0)) {
    return { minAmount, maxAmount, error: "最低金额必须是大于或等于 0 的数字" };
  }
  if (maxAmount !== null && (!Number.isFinite(maxAmount) || maxAmount < 0)) {
    return { minAmount, maxAmount, error: "最高金额必须是大于或等于 0 的数字" };
  }
  if (minAmount !== null && maxAmount !== null && minAmount > maxAmount) {
    return { minAmount, maxAmount, error: "最低金额不能高于最高金额" };
  }
  return { minAmount, maxAmount, error: "" };
}

function getDetailResultHint(count) {
  if (detailStartDateInput.value && detailEndDateInput.value && detailStartDateInput.value > detailEndDateInput.value) {
    return "开始日期不能晚于结束日期";
  }
  const amountRange = getDetailAmountRange();
  if (amountRange.error) return amountRange.error;
  const parts = [`显示 ${count} 条`];
  if (detailStartDateInput.value || detailEndDateInput.value) {
    parts.push(`${detailStartDateInput.value || "最早"} 至 ${detailEndDateInput.value || "今天"}`);
  } else if (recordLimitSelect.value !== "all") {
    parts.push(recordLimitSelect.options[recordLimitSelect.selectedIndex].textContent);
  }
  if (filterCategory.value !== "all") parts.push(displayCategory(filterCategory.value));
  if (filterType.value !== "all") parts.push(filterType.value === "income" ? "收入" : "支出");
  if (filterPerson.value !== "all") parts.push(displayPerson(filterPerson.value));
  if (amountRange.minAmount !== null && amountRange.maxAmount !== null) {
    parts.push(`金额 ${money(amountRange.minAmount)}–${money(amountRange.maxAmount)}`);
  } else if (amountRange.minAmount !== null) {
    parts.push(`金额 ≥ ${money(amountRange.minAmount)}`);
  } else if (amountRange.maxAmount !== null) {
    parts.push(`金额 ≤ ${money(amountRange.maxAmount)}`);
  }
  if (detailAmountSortDirection) parts.push(detailAmountSortDirection === "desc" ? "金额从大到小" : "金额从小到大");
  return parts.join(" · ");
}

function sortDetailRecords(items) {
  if (!detailAmountSortDirection) return sortRecordsBySpentDate(items);
  return [...items].sort((left, right) => {
    const leftAmount = Number(left.amount) || 0;
    const rightAmount = Number(right.amount) || 0;
    const amountDifference = detailAmountSortDirection === "asc" ? leftAmount - rightAmount : rightAmount - leftAmount;
    if (amountDifference) return amountDifference;
    return compareRecordsBySpentDate(left, right);
  });
}

function sortRecordsBySpentDate(items) {
  return [...items].sort(compareRecordsBySpentDate);
}

function compareRecordsBySpentDate(left, right) {
  const dateDifference = getRecordDay(right).localeCompare(getRecordDay(left));
  if (dateDifference) return dateDifference;
  const leftCreatedAt = Date.parse(left.createdAt || "") || 0;
  const rightCreatedAt = Date.parse(right.createdAt || "") || 0;
  return rightCreatedAt - leftCreatedAt;
}

function startNewTrip() {
  editingTripId = "";
  editingTripBaseUpdatedAt = "";
  tripForm.reset();
  tripFormTitle.textContent = "新建出差";
  tripTravelerSelect.disabled = false;
  tripTravelerSelect.value = getDefaultPerson();
  tripStartDateInput.value = getShanghaiDay();
  tripEndDateInput.value = "";
  tripDailyAllowanceInput.value = "0";
  tripStatusSelect.value = "ongoing";
  updateGeneratedTripNumber();
  tripFormPanel.hidden = false;
  tripSubjectInput.focus();
  tripFormPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function startEditTrip(tripId) {
  const trip = trips.find((item) => item.id === tripId && !item.deletedAt);
  if (!trip) return;
  if (trip.archivedAt) {
    alert("已归档项目为只读。如需修改，请先撤销归档。");
    return;
  }

  editingTripId = trip.id;
  editingTripBaseUpdatedAt = trip.updatedAt || "";
  tripFormTitle.textContent = "编辑出差项目";
  tripTravelerSelect.disabled = true;
  tripTravelerSelect.value = trip.traveler;
  tripNumberInput.value = trip.tripNo;
  tripSubjectInput.value = trip.subject;
  tripDestinationInput.value = trip.destination;
  tripStartDateInput.value = trip.startDate;
  tripEndDateInput.value = trip.endDate || "";
  tripDailyAllowanceInput.value = trip.dailyAllowance;
  tripStatusSelect.value = trip.status;
  tripFormPanel.hidden = false;
  tripFormPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeTripForm() {
  editingTripId = "";
  editingTripBaseUpdatedAt = "";
  tripTravelerSelect.disabled = false;
  tripForm.reset();
  tripFormPanel.hidden = true;
}

function updateGeneratedTripNumber() {
  if (editingTripId) return;
  tripNumberInput.value = generateTripNumber(tripTravelerSelect.value, tripStartDateInput.value);
}

function generateTripNumber(traveler, startDate) {
  const prefix = tripNumberPrefixes[traveler];
  const monthKey = String(startDate || "").slice(0, 7);
  if (!prefix || !/^\d{4}-\d{2}$/.test(monthKey)) return "";
  const tripNumberPrefix = `${prefix}-${monthKey}-`;
  const maxSequence = trips.reduce((currentMax, trip) => {
    if (!trip.tripNo.startsWith(tripNumberPrefix)) return currentMax;
    const sequence = Number.parseInt(trip.tripNo.slice(tripNumberPrefix.length), 10);
    return Number.isFinite(sequence) ? Math.max(currentMax, sequence) : currentMax;
  }, 0);
  return `${tripNumberPrefix}${String(maxSequence + 1).padStart(3, "0")}`;
}

async function saveTripFromForm(event) {
  event.preventDefault();
  if (!canMutateLedger()) return;
  const dailyAllowance = Number.parseFloat(String(tripDailyAllowanceInput.value || "0").replace(",", "."));
  const status = tripStatusSelect.value;
  const startDate = tripStartDateInput.value;
  const endDate = tripEndDateInput.value;

  if (!tripSubjectInput.value.trim() || !tripDestinationInput.value.trim() || !startDate) {
    alert("请填写出差事项、目的地和出发日期。");
    return;
  }
  if (!Number.isFinite(dailyAllowance) || dailyAllowance < 0) {
    alert("每日补贴不能小于 0。");
    tripDailyAllowanceInput.focus();
    return;
  }
  if (endDate && endDate < startDate) {
    alert("结束日期不能早于出发日期。");
    return;
  }
  if (status !== "ongoing" && !endDate) {
    alert("项目结束后必须填写结束日期。");
    tripEndDateInput.focus();
    return;
  }

  const existingTrip = editingTripId ? trips.find((item) => item.id === editingTripId && !item.deletedAt) : null;
  if (editingTripId && (!existingTrip || existingTrip.archivedAt)) {
    closeTripForm();
    return;
  }
  if (existingTrip && startDate.slice(0, 7) !== existingTrip.startDate.slice(0, 7)) {
    alert("出差编号生成后月份不再变化；如需改到其他月份，请删除项目后重新新建。");
    return;
  }
  const tripNo = existingTrip?.tripNo || generateTripNumber(tripTravelerSelect.value, startDate);
  if (!tripNo || trips.some((trip) => trip.tripNo === tripNo && trip.id !== existingTrip?.id)) {
    alert("出差编号生成冲突，请先同步后再试。");
    return;
  }

  const now = new Date().toISOString();
  let trip = normalizeTrip({
    ...existingTrip,
    id: existingTrip?.id || createUuid(),
    tripNo,
    traveler: tripTravelerSelect.value,
    subject: tripSubjectInput.value.trim(),
    destination: tripDestinationInput.value.trim(),
    startDate,
    endDate,
    dailyAllowance: roundMoney(dailyAllowance),
    status,
    createdAt: existingTrip?.createdAt || now,
    updatedAt: now,
    createdBy: existingTrip?.createdBy || currentUser?.id || ""
  });

  if (isCloudReady) {
    let saved = await saveCloudTrip(trip, {
      isNew: !existingTrip,
      baseUpdatedAt: editingTripBaseUpdatedAt || existingTrip?.updatedAt || ""
    });
    let retryCount = 0;
    while (!saved && !existingTrip && lastCloudTripError?.code === "23505" && retryCount < 5) {
      retryCount += 1;
      trip = normalizeTrip({ ...trip, tripNo: incrementTripNumber(trip.tripNo), updatedAt: new Date().toISOString() });
      tripNumberInput.value = trip.tripNo;
      saved = await saveCloudTrip(trip, { isNew: true });
    }
    if (!saved && lastCloudTripError?.code === "23505") {
      alert("云端同时创建了多个同月项目，编号仍有冲突。请先同步后再新建。");
    }
    if (!saved) return;
    trip = saved;
  }

  if (existingTrip) {
    trips = trips.map((item) => (item.id === trip.id ? trip : item));
  } else {
    trips = [trip, ...trips];
  }
  activeTripId = trip.id;
  saveTrips();
  closeTripForm();
  render();
}

function incrementTripNumber(tripNo) {
  const match = String(tripNo).match(/^(.*-)(\d{3})$/);
  if (!match) return tripNo;
  return `${match[1]}${String(Number(match[2]) + 1).padStart(3, "0")}`;
}

function renderTrips() {
  const counts = {
    ongoing: trips.filter((trip) => !trip.deletedAt && !trip.archivedAt && trip.status === "ongoing").length,
    pending: trips.filter((trip) => !trip.deletedAt && !trip.archivedAt && trip.status === "pending").length,
    reimbursed: trips.filter((trip) => !trip.deletedAt && !trip.archivedAt && trip.status === "reimbursed").length,
    archived: trips.filter((trip) => !trip.deletedAt && Boolean(trip.archivedAt)).length
  };
  tripOngoingCount.textContent = counts.ongoing;
  tripPendingCount.textContent = counts.pending;
  tripReimbursedCount.textContent = counts.reimbursed;
  tripArchivedCount.textContent = counts.archived;

  const filterValue = tripStatusFilter.value || "active";
  const visibleTrips = trips
    .filter((trip) => {
      if (trip.deletedAt) return false;
      if (filterValue === "active") return !trip.archivedAt && ["ongoing", "pending"].includes(trip.status);
      if (filterValue === "all") return true;
      if (filterValue === "archived") return Boolean(trip.archivedAt);
      return !trip.archivedAt && trip.status === filterValue;
    })
    .sort((left, right) => {
      if (Boolean(left.archivedAt) !== Boolean(right.archivedAt)) return left.archivedAt ? 1 : -1;
      return (right.startDate || "").localeCompare(left.startDate || "") || (right.createdAt || "").localeCompare(left.createdAt || "");
    });

  tripProjectList.innerHTML = visibleTrips.length
    ? visibleTrips
        .map((trip) => {
          const totals = getTripTotals(trip);
          const statusText = trip.archivedAt ? "已归档" : tripStatusLabels[trip.status];
          return `
            <article class="trip-card ${trip.id === activeTripId ? "active" : ""}">
              <button class="trip-card-main" type="button" data-trip-action="open" data-trip-id="${escapeHtml(trip.id)}">
                <span class="trip-card-top"><strong>${escapeHtml(trip.tripNo)}</strong><em class="trip-status status-${escapeHtml(trip.archivedAt ? "archived" : trip.status)}">${escapeHtml(statusText)}</em></span>
                <span class="trip-card-title">${escapeHtml(trip.subject)}</span>
                <span class="trip-card-meta">${escapeHtml(trip.destination)} · ${escapeHtml(formatTripDateRange(trip))}</span>
                <span class="trip-card-total">费用 ${money(totals.expenseTotal)}</span>
              </button>
            </article>`;
        })
        .join("")
    : `<div class="empty-state">${trips.some((trip) => !trip.deletedAt) ? "没有符合筛选条件的出差项目。" : "还没有出差项目，可以先新建一次出差。"}</div>`;

  if (activeTripId && !trips.some((trip) => trip.id === activeTripId && !trip.deletedAt)) activeTripId = "";
  renderActiveTripDetail();
  fillTripProjectOptions(tripProjectSelect.value);
}

function renderActiveTripDetail() {
  const trip = trips.find((item) => item.id === activeTripId && !item.deletedAt);
  if (!trip) {
    tripDetailPanel.hidden = true;
    closeTripAssignPanel();
    closeTripSettlementPanel();
    return;
  }

  const totals = getTripTotals(trip);
  const statusText = trip.archivedAt ? "已归档" : tripStatusLabels[trip.status];
  const settlementDescription = trip.archivedAt
    ? `<div><span>单位实际打款</span><strong>${money(trip.reimbursementAmount)}</strong></div><div><span>${trip.surplusAtArchive >= 0 ? "出差盈余" : "出差未报销"}</span><strong>${money(Math.abs(trip.surplusAtArchive))}</strong></div>`
    : "";
  tripDetailContent.innerHTML = `
    <div class="trip-detail-heading">
      <div>
        <span class="trip-number">${escapeHtml(trip.tripNo)}</span>
        <h2>${escapeHtml(trip.subject)}</h2>
        <p>${escapeHtml(trip.destination)} · ${escapeHtml(formatTripDateRange(trip))} · ${escapeHtml(trip.traveler)}</p>
      </div>
      <span class="trip-status status-${escapeHtml(trip.archivedAt ? "archived" : trip.status)}">${escapeHtml(statusText)}</span>
    </div>
    <div class="trip-detail-summary">
      <div><span>费用合计</span><strong>${money(totals.expenseTotal)}</strong></div>
      <div><span>已关联出差收入</span><strong>${money(totals.incomeTotal)}</strong></div>
      <div><span>出差天数</span><strong>${totals.days ? `${totals.days} 天` : "待结束"}</strong></div>
      <div><span>预计补贴</span><strong>${money(totals.allowanceTotal)}</strong></div>
      ${settlementDescription}
    </div>
    <div class="trip-detail-actions">
      ${trip.archivedAt ? "" : `<button type="button" data-trip-action="add-expense">记一笔出差费用</button><button type="button" data-trip-action="assign">归入已有费用</button><button type="button" data-trip-action="edit">编辑项目与状态</button>`}
      <button type="button" data-trip-action="export">导出报销汇总</button>
      ${!trip.archivedAt && ["pending", "reimbursed"].includes(trip.status) ? `<button class="primary-action" type="button" data-trip-action="archive">项目归档</button>` : ""}
      ${trip.archivedAt ? `<button type="button" data-trip-action="undo-archive">撤销归档</button>` : `<button class="danger-action" type="button" data-trip-action="delete">删除项目</button>`}
    </div>`;

  const projectRecords = sortRecordsBySpentDate(getTripProjectRecords(trip.id));
  renderRecordList(tripExpenseList, projectRecords, {
    emptyText: "这个项目还没有收支记录。",
    limit: projectRecords.length,
    tripMode: true,
    readOnly: Boolean(trip.archivedAt)
  });
  tripDetailPanel.hidden = false;
}

function handleTripProjectAction(event) {
  const button = event.target.closest("[data-trip-action]");
  if (!button || button.dataset.tripAction !== "open") return;
  activeTripId = button.dataset.tripId;
  closeTripAssignPanel();
  closeTripSettlementPanel();
  renderTrips();
  tripDetailPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function handleTripDetailAction(event) {
  const button = event.target.closest("[data-trip-action]");
  if (!button) return;
  const trip = trips.find((item) => item.id === activeTripId && !item.deletedAt);
  if (!trip) return;

  const action = button.dataset.tripAction;
  if (action === "add-expense") startTripExpenseEntry(trip);
  if (action === "assign") openTripAssignPanel(trip);
  if (action === "edit") startEditTrip(trip.id);
  if (action === "export") exportTripReimbursement(trip);
  if (action === "archive") openTripSettlementPanel(trip);
  if (action === "undo-archive") undoTripArchive(trip);
  if (action === "delete") deleteTrip(trip);
}

function startTripExpenseEntry(trip) {
  if (!trip || trip.archivedAt) return;
  setActiveType("expense");
  majorSelect.value = "出差";
  fillMinorCategories();
  syncTripProjectField(trip.id);
  tripProjectSelect.value = trip.id;
  switchPage("entry");
  form.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openTripAssignPanel(trip) {
  if (!trip || trip.archivedAt) return;
  const eligibleRecords = sortRecordsBySpentDate(getAssignableTripExpenses(records));
  tripUnassignedList.innerHTML = eligibleRecords.length
    ? eligibleRecords
        .map(
          (record) => `
            <label class="trip-assign-record">
              <input type="checkbox" value="${escapeHtml(record.id)}" />
              <span><strong>${escapeHtml(`${displayCategory(record.major)} / ${displayMinor(record.minor)}`)}</strong><small>${escapeHtml(`${formatDay(getRecordDay(record))} · ${record.note || "无备注"}`)}</small></span>
              <b>${money(record.amount)}</b>
            </label>`
        )
        .join("")
    : `<div class="empty-state">没有尚未归入项目的“出差”支出。</div>`;
  tripAssignPanel.hidden = false;
  closeTripSettlementPanel();
  tripAssignPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function closeTripAssignPanel() {
  tripAssignPanel.hidden = true;
  tripUnassignedList.innerHTML = "";
}

async function assignSelectedRecordsToTrip() {
  if (!canMutateLedger()) return;
  const trip = trips.find((item) => item.id === activeTripId && !item.deletedAt);
  if (!trip || trip.archivedAt) return;
  const selectedIds = new Set(
    Array.from(tripUnassignedList.querySelectorAll('input[type="checkbox"]:checked')).map((input) => input.value)
  );
  if (!selectedIds.size) {
    alert("请至少选择一笔费用。");
    return;
  }

  const linkedAt = new Date().toISOString();
  const recordChanges = [];
  let nextRecords = records.map((record) => {
    if (!selectedIds.has(record.id) || record.tripId || record.tripRole || record.type !== "expense" || record.major !== "出差") return record;
    const updatedRecord = {
      ...record,
      tripId: trip.id,
      tripRole: "expense",
      tripLinkedAt: linkedAt,
      tripOriginalMajor: record.major,
      tripOriginalMinor: record.minor,
      updatedAt: linkedAt
    };
    recordChanges.push({ record: updatedRecord, baseUpdatedAt: record.updatedAt || "" });
    return updatedRecord;
  });

  if (isCloudReady && recordChanges.length) {
    const savedRecords = await saveCloudRecords(recordChanges);
    if (!savedRecords) return;
    const savedById = new Map(savedRecords.map((record) => [record.id, record]));
    nextRecords = nextRecords.map((record) => savedById.get(record.id) || record);
  }
  records = nextRecords;
  saveRecords();
  closeTripAssignPanel();
  render();
}

async function unlinkRecordFromTrip(recordId) {
  if (!canMutateLedger()) return;
  const record = records.find((item) => item.id === recordId);
  const trip = trips.find((item) => item.id === record?.tripId);
  if (!record || !["expense", "reimbursement"].includes(record.tripRole) || trip?.archivedAt) return;
  if (!confirm(`确定将这笔${record.type === "income" ? "收入" : "费用"}移回日常账本吗？`)) return;

  let updatedRecord = {
    ...record,
    major: record.tripOriginalMajor || record.major,
    minor: record.tripOriginalMinor || record.minor,
    tripId: "",
    tripRole: "",
    tripLinkedAt: "",
    tripOriginalMajor: "",
    tripOriginalMinor: "",
    updatedAt: new Date().toISOString()
  };
  if (isCloudReady) {
    const savedRecord = await saveCloudRecord(updatedRecord, { baseUpdatedAt: record.updatedAt || "" });
    if (!savedRecord) return;
    updatedRecord = savedRecord;
  }
  records = records.map((item) => (item.id === recordId ? updatedRecord : item));
  saveRecords();
  render();
}

async function deleteTrip(trip) {
  if (!canMutateLedger()) return;
  if (!trip || trip.archivedAt) return;
  const projectRecords = getTripProjectRecords(trip.id);
  const message = projectRecords.length
    ? `确定删除 ${trip.tripNo} 吗？\n\n项目中的 ${projectRecords.length} 笔收支不会删除，会解除关联并回到日常账本。`
    : `确定删除 ${trip.tripNo} 吗？`;
  if (!confirm(message)) return;

  const changedRecords = [];
  let nextRecords = records.map((record) => {
    if (record.tripId !== trip.id || !["expense", "reimbursement"].includes(record.tripRole)) return record;
    const updatedRecord = {
      ...record,
      major: record.tripOriginalMajor || record.major,
      minor: record.tripOriginalMinor || record.minor,
      tripId: "",
      tripRole: "",
      tripLinkedAt: "",
      tripOriginalMajor: "",
      tripOriginalMinor: "",
      updatedAt: new Date().toISOString()
    };
    changedRecords.push({ record: updatedRecord, baseUpdatedAt: record.updatedAt || "" });
    return updatedRecord;
  });

  const deletedTrip = normalizeTrip({ ...trip, deletedAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
  let savedTrip = deletedTrip;
  if (isCloudReady) {
    if (changedRecords.length) {
      const savedRecords = await saveCloudRecords(changedRecords);
      if (!savedRecords) return;
      const savedById = new Map(savedRecords.map((record) => [record.id, record]));
      nextRecords = nextRecords.map((record) => savedById.get(record.id) || record);
    }
    savedTrip = await saveCloudTrip(deletedTrip, { baseUpdatedAt: trip.updatedAt || "" });
    if (!savedTrip) {
      await syncCloudRecords({ quiet: true });
      return;
    }
  }
  records = nextRecords;
  trips = trips.map((item) => (item.id === trip.id ? savedTrip : item));
  activeTripId = "";
  saveRecords();
  saveTrips();
  render();
}

function getTripExpenses(tripId) {
  return records.filter((record) => record.tripId === tripId && record.tripRole === "expense");
}

function getTripIncomes(tripId) {
  return records.filter((record) => record.tripId === tripId && record.tripRole === "reimbursement");
}

function getTripProjectRecords(tripId) {
  return records.filter((record) => record.tripId === tripId && ["expense", "reimbursement"].includes(record.tripRole));
}

function getAssignableTripExpenses(recordItems) {
  return recordItems.filter(
    (record) => record.type === "expense" && record.major === "出差" && !record.tripId && !record.tripRole && isDailyRecord(record)
  );
}

function getTripSettlementRecord(tripId) {
  return records.find((record) => record.tripId === tripId && record.tripRole === "settlement") || null;
}

function getTripDays(trip) {
  if (!trip?.startDate || !trip?.endDate || trip.endDate < trip.startDate) return 0;
  const start = Date.parse(`${trip.startDate}T00:00:00Z`);
  const end = Date.parse(`${trip.endDate}T00:00:00Z`);
  if (!Number.isFinite(start) || !Number.isFinite(end)) return 0;
  return Math.floor((end - start) / 86400000) + 1;
}

function getTripTotals(trip) {
  const expenseTotal = roundMoney(getTripExpenses(trip.id).reduce((total, record) => total + record.amount, 0));
  const incomeTotal = roundMoney(getTripIncomes(trip.id).reduce((total, record) => total + record.amount, 0));
  const days = getTripDays(trip);
  const allowanceTotal = roundMoney(days * Number(trip.dailyAllowance || 0));
  return { expenseTotal, incomeTotal, days, allowanceTotal };
}

function formatTripDateRange(trip) {
  return `${formatDay(trip.startDate)} 至 ${trip.endDate ? formatDay(trip.endDate) : "待定"}`;
}

function exportTripReimbursement(trip) {
  if (trip.status === "ongoing" && !trip.archivedAt) {
    alert("项目结束后再导出报销汇总。请先把状态改为“已结束待报销”。");
    return;
  }
  const expenses = getTripExpenses(trip.id);
  if (!expenses.length) {
    alert("这个项目还没有费用，暂时不能导出报销汇总。");
    return;
  }
  const workbookHtml = buildTripExpenseWorkbook(trip, expenses);
  downloadBlob(
    new Blob([`\ufeff${workbookHtml}`], { type: "application/vnd.ms-excel;charset=utf-8" }),
    `出差报销-${safeFileName(trip.tripNo)}-${safeFileName(trip.subject)}.xls`
  );
}

function buildTripExpenseWorkbook(trip, expenses) {
  const totals = getTripTotals(trip);
  const infoRows = [
    ["出差编号", trip.tripNo, "出差人", trip.traveler],
    ["出差事项", trip.subject, "目的地", trip.destination],
    ["出发日期", trip.startDate, "结束日期", trip.endDate || "待定"],
    ["出差天数", totals.days ? `${totals.days} 天` : "待结束", "每日补贴", trip.dailyAllowance],
    ["预计补贴", totals.allowanceTotal, "费用合计", totals.expenseTotal],
    ["已关联出差收入", totals.incomeTotal, "归档口径", "以人工填写的单位实际打款为准"],
    ["项目状态", trip.archivedAt ? "已归档" : tripStatusLabels[trip.status], "导出时间", formatDateTime(new Date().toISOString())]
  ];
  if (trip.archivedAt) {
    infoRows.push(["实际到账", trip.reimbursementAmount, "到账日期", trip.reimbursedOn]);
    infoRows.push([trip.surplusAtArchive >= 0 ? "出差盈余" : "出差未报销", Math.abs(trip.surplusAtArchive), "归档时间", formatDateTime(trip.archivedAt)]);
  }

  const summaryRows = tripExpenseGroups.map((group) => {
    const groupRecords = expenses.filter((record) => record.minor === group.minor);
    return [group.label, String(groupRecords.length), roundMoney(groupRecords.reduce((total, record) => total + record.amount, 0))];
  });
  summaryRows.push(["合计", String(expenses.length), totals.expenseTotal]);

  const detailsHtml = tripExpenseGroups
    .map((group) => {
      const groupRecords = expenses
        .filter((record) => record.minor === group.minor)
        .sort((left, right) => getRecordDay(left).localeCompare(getRecordDay(right)) || (left.createdAt || "").localeCompare(right.createdAt || ""));
      const groupTotal = roundMoney(groupRecords.reduce((total, record) => total + record.amount, 0));
      const rows = groupRecords.length
        ? groupRecords
            .map(
              (record, index) => `<tr><td>${index + 1}</td><td>${formatExcelValue(getRecordDay(record))}</td><td>${formatExcelValue(group.label)}</td><td class="number">${formatExcelValue(record.amount)}</td><td>${formatExcelValue(displayPerson(record.person))}</td><td>${formatExcelValue(record.note || "")}</td></tr>`
            )
            .join("")
        : `<tr><td colspan="6">无记录</td></tr>`;
      return `<h2>${formatExcelValue(group.label)}</h2><table><thead><tr><th>序号</th><th>消费日期</th><th>费用类别</th><th>金额</th><th>记账人</th><th>备注</th></tr></thead><tbody>${rows}<tr class="subtotal"><td colspan="3">${formatExcelValue(group.label)}小计</td><td class="number">${formatExcelValue(groupTotal)}</td><td colspan="2"></td></tr></tbody></table>`;
    })
    .join("");

  return `<!doctype html><html><head><meta charset="utf-8"><style>body{font-family:"Microsoft YaHei",Arial,sans-serif;color:#222}h1{font-size:22px}h2{margin-top:24px;font-size:17px}table{border-collapse:collapse;width:100%;margin:10px 0 18px}th,td{border:1px solid #8b9893;padding:7px;text-align:left}th{background:#e8f2ed}.number{text-align:right;mso-number-format:"0.00"}.subtotal td,.grand-total td{font-weight:700;background:#f4f7f5}.project-info td:nth-child(odd){font-weight:700;background:#f4f7f5}</style></head><body><h1>出差费用报销汇总</h1><table class="project-info"><tbody>${infoRows.map((row) => `<tr>${row.map((cell) => `<td>${formatExcelValue(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table><h2>费用分类汇总</h2><table><thead><tr><th>类别</th><th>笔数</th><th>金额</th></tr></thead><tbody>${summaryRows.map((row, index) => `<tr class="${index === summaryRows.length - 1 ? "grand-total" : ""}">${row.map((cell, cellIndex) => `<td class="${cellIndex === 2 ? "number" : ""}">${formatExcelValue(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table>${detailsHtml}</body></html>`;
}

function openTripSettlementPanel(trip) {
  if (!trip || trip.archivedAt || !["pending", "reimbursed"].includes(trip.status)) return;
  if (!trip.endDate) {
    alert("归档前必须填写结束日期。");
    return;
  }
  tripReimbursementAmountInput.value = trip.reimbursementAmount || "";
  tripReimbursedOnInput.value = trip.reimbursedOn || getShanghaiDay();
  tripSettlementPanel.hidden = false;
  closeTripAssignPanel();
  updateTripSettlementPreview();
  tripSettlementPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function closeTripSettlementPanel() {
  tripSettlementPanel.hidden = true;
  tripSettlementForm.reset();
}

function updateTripSettlementPreview() {
  const trip = trips.find((item) => item.id === activeTripId && !item.deletedAt);
  if (!trip) return;
  const totals = getTripTotals(trip);
  const reimbursement = Number.parseFloat(String(tripReimbursementAmountInput.value || "0").replace(",", "."));
  const result = roundMoney((Number.isFinite(reimbursement) ? reimbursement : 0) - totals.expenseTotal);
  tripSettlementExpense.textContent = money(totals.expenseTotal);
  tripSettlementAllowance.textContent = money(totals.allowanceTotal);
  tripSettlementIncome.textContent = money(totals.incomeTotal);
  tripSettlementResult.textContent = `${result >= 0 ? "出差盈余" : "出差未报销"} ${money(Math.abs(result))}`;
  tripSettlementResult.classList.toggle("negative", result < 0);
}

async function archiveActiveTrip(event) {
  event.preventDefault();
  if (!canMutateLedger()) return;
  const trip = trips.find((item) => item.id === activeTripId && !item.deletedAt);
  if (!trip || trip.archivedAt || !["pending", "reimbursed"].includes(trip.status)) return;
  const reimbursementAmount = Number.parseFloat(String(tripReimbursementAmountInput.value).replace(",", "."));
  const reimbursedOn = tripReimbursedOnInput.value;
  if (!Number.isFinite(reimbursementAmount) || reimbursementAmount < 0 || !reimbursedOn) {
    alert("请填写单位实际打款金额和到账日期。");
    return;
  }

  const totals = getTripTotals(trip);
  const surplus = roundMoney(reimbursementAmount - totals.expenseTotal);
  const settlementLabel = surplus > 0
    ? `归入日常收入：工资 / 补贴 ${money(surplus)}`
    : surplus < 0
      ? `归入日常支出：其他 / 出差未报销 ${money(Math.abs(surplus))}`
      : "差值为零，不生成日常收支记录";
  const linkedIncomeLabel = totals.incomeTotal
    ? `\n已关联出差收入：${money(totals.incomeTotal)}（仅供核对）`
    : "";
  if (!confirm(`请确认 ${trip.tripNo} 的归档结算：\n\n项目实际费用：${money(totals.expenseTotal)}\n单位实际打款：${money(reimbursementAmount)}${linkedIncomeLabel}\n${settlementLabel}\n\n归档后项目将只读。`)) return;

  const now = new Date().toISOString();
  const existingSettlement = getTripSettlementRecord(trip.id);
  let settlementRecord = null;
  if (surplus !== 0) {
    settlementRecord = {
      ...(existingSettlement || {}),
      id: existingSettlement?.id || createUuid(),
      type: surplus > 0 ? "income" : "expense",
      person: trip.traveler,
      amount: Math.abs(surplus),
      benefit: "",
      major: surplus > 0 ? "工资" : "其他",
      minor: surplus > 0 ? "补贴" : "出差未报销",
      note: `${trip.tripNo} ${trip.subject} ${surplus > 0 ? "出差盈余" : "出差未报销"}`,
      date: reimbursedOn,
      createdAt: existingSettlement?.createdAt || now,
      updatedAt: now,
      createdBy: existingSettlement?.createdBy || currentUser?.id || "",
      tripId: trip.id,
      tripRole: "settlement",
      tripLinkedAt: existingSettlement?.tripLinkedAt || now,
      tripOriginalMajor: "",
      tripOriginalMinor: ""
    };
  }

  let archivedTrip = normalizeTrip({
    ...trip,
    status: "reimbursed",
    reimbursementAmount: roundMoney(reimbursementAmount),
    reimbursedOn,
    expenseTotalAtArchive: totals.expenseTotal,
    allowanceTotalAtArchive: totals.allowanceTotal,
    surplusAtArchive: surplus,
    settlementRecordId: settlementRecord?.id || "",
    archivedAt: now,
    updatedAt: now
  });

  if (isCloudReady) {
    if (existingSettlement && !settlementRecord) {
      if (!(await deleteCloudRecord(existingSettlement))) return;
    } else if (settlementRecord) {
      const savedSettlement = await saveCloudRecord(settlementRecord, {
        isNew: !existingSettlement,
        baseUpdatedAt: existingSettlement?.updatedAt || ""
      });
      if (!savedSettlement) return;
      settlementRecord = savedSettlement;
    }
    const savedTrip = await saveCloudTrip(archivedTrip, { baseUpdatedAt: trip.updatedAt || "" });
    if (!savedTrip) {
      await syncCloudRecords({ quiet: true });
      return;
    }
    archivedTrip = savedTrip;
  }

  if (existingSettlement && !settlementRecord) {
    records = records.filter((record) => record.id !== existingSettlement.id);
  } else if (existingSettlement && settlementRecord) {
    records = records.map((record) => (record.id === existingSettlement.id ? settlementRecord : record));
  } else if (settlementRecord) {
    records = [settlementRecord, ...records];
  }
  trips = trips.map((item) => (item.id === trip.id ? archivedTrip : item));
  saveRecords();
  saveTrips();
  closeTripSettlementPanel();
  render();
}

async function undoTripArchive(trip) {
  if (!canMutateLedger()) return;
  if (!trip?.archivedAt) return;
  if (!confirm(`确定撤销 ${trip.tripNo} 的归档吗？\n系统会删除已生成的差值记录，项目恢复为“已结束待报销”，之后可以重新核对并归档。`)) return;
  const settlementRecord = getTripSettlementRecord(trip.id);
  const reopenedTrip = normalizeTrip({
    ...trip,
    status: "pending",
    reimbursementAmount: 0,
    reimbursedOn: "",
    expenseTotalAtArchive: 0,
    allowanceTotalAtArchive: 0,
    surplusAtArchive: 0,
    settlementRecordId: "",
    archivedAt: "",
    updatedAt: new Date().toISOString()
  });

  if (isCloudReady) {
    if (settlementRecord && !(await deleteCloudRecord(settlementRecord))) return;
    const savedTrip = await saveCloudTrip(reopenedTrip, { baseUpdatedAt: trip.updatedAt || "" });
    if (!savedTrip) {
      await syncCloudRecords({ quiet: true });
      return;
    }
    Object.assign(reopenedTrip, savedTrip);
  }

  if (settlementRecord) records = records.filter((record) => record.id !== settlementRecord.id);
  trips = trips.map((item) => (item.id === trip.id ? reopenedTrip : item));
  saveRecords();
  saveTrips();
  render();
}

function safeFileName(value) {
  return String(value || "出差").replace(/[\\/:*?"<>|]/g, "-").slice(0, 60);
}

function roundMoney(value) {
  return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
}

function createUuid() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (token) => {
    const random = Math.floor(Math.random() * 16);
    const value = token === "x" ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
}

function startNewAsset() {
  editingAssetId = "";
  editingAssetBaseUpdatedAt = "";
  assetForm.reset();
  assetFormTitle.textContent = "新增储值资产";
  saveAssetBtn.textContent = "保存资产";
  assetOwnerSelect.value = getDefaultPerson();
  assetUpdatedOnInput.value = getShanghaiDay();
  assetFormPanel.hidden = false;
  assetNameInput.focus();
  assetFormPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function startEditAsset(assetId) {
  const asset = assets.find((item) => item.id === assetId && !item.deletedAt);
  if (!asset) return;
  editingAssetId = asset.id;
  editingAssetBaseUpdatedAt = asset.updatedAt || "";
  assetFormTitle.textContent = "编辑储值资产";
  saveAssetBtn.textContent = "保存修改";
  assetNameInput.value = asset.name;
  assetTypeSelect.value = asset.assetType;
  assetOwnerSelect.value = asset.owner;
  assetBalanceInput.value = asset.balance;
  assetUpdatedOnInput.value = asset.balanceUpdatedOn;
  assetNoteInput.value = asset.note || "";
  assetFormPanel.hidden = false;
  assetFormPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeAssetForm() {
  editingAssetId = "";
  editingAssetBaseUpdatedAt = "";
  assetForm.reset();
  assetFormPanel.hidden = true;
  assetFormTitle.textContent = "新增储值资产";
  saveAssetBtn.textContent = "保存资产";
}

async function saveAssetFromForm(event) {
  event.preventDefault();
  if (!canMutateLedger()) return;
  const name = assetNameInput.value.trim();
  const balance = Number.parseFloat(String(assetBalanceInput.value || "").replace(",", "."));
  if (!name) {
    assetNameInput.focus();
    return;
  }
  if (!Number.isFinite(balance) || balance < 0) {
    alert("当前余额必须是大于或等于 0 的数字。");
    assetBalanceInput.focus();
    return;
  }
  if (!assetUpdatedOnInput.value) {
    assetUpdatedOnInput.focus();
    return;
  }

  const existingAsset = editingAssetId ? assets.find((item) => item.id === editingAssetId && !item.deletedAt) : null;
  if (editingAssetId && !existingAsset) {
    closeAssetForm();
    return;
  }
  const now = new Date().toISOString();
  let asset = normalizeAsset({
    ...existingAsset,
    id: existingAsset?.id || createUuid(),
    name,
    assetType: assetTypeSelect.value,
    owner: assetOwnerSelect.value,
    balance: roundMoney(balance),
    balanceUpdatedOn: assetUpdatedOnInput.value,
    note: assetNoteInput.value.trim(),
    createdAt: existingAsset?.createdAt || now,
    updatedAt: now,
    createdBy: existingAsset?.createdBy || currentUser?.id || ""
  });

  if (isCloudReady) {
    const savedAsset = await saveCloudAsset(asset, {
      isNew: !existingAsset,
      baseUpdatedAt: editingAssetBaseUpdatedAt || existingAsset?.updatedAt || ""
    });
    if (!savedAsset) return;
    asset = savedAsset;
  }

  assets = existingAsset ? assets.map((item) => (item.id === asset.id ? asset : item)) : [asset, ...assets];
  saveAssets();
  closeAssetForm();
  render();
}

function renderAssets() {
  const visibleAssets = assets
    .filter((asset) => !asset.deletedAt)
    .sort(
      (left, right) =>
        (right.balanceUpdatedOn || "").localeCompare(left.balanceUpdatedOn || "") ||
        (right.updatedAt || "").localeCompare(left.updatedAt || "")
    );
  assetCount.textContent = String(visibleAssets.length);
  assetBalanceTotal.textContent = money(visibleAssets.reduce((total, asset) => total + asset.balance, 0));
  if (!visibleAssets.length) {
    assetList.innerHTML = '<div class="empty-state">还没有储值资产，先新增一个。</div>';
    return;
  }

  assetList.innerHTML = visibleAssets
    .map(
      (asset) => `
        <article class="asset-card" data-asset-id="${escapeHtml(asset.id)}">
          <div class="asset-card-icon">${escapeHtml(assetTypeLabels[asset.assetType]?.slice(0, 2).trim() || "💳")}</div>
          <div class="asset-card-copy">
            <strong>${escapeHtml(asset.name)}</strong>
            <span>${escapeHtml(assetTypeLabels[asset.assetType] || asset.assetType)} · ${escapeHtml(displayAssetOwner(asset.owner))} · ${escapeHtml(formatDay(asset.balanceUpdatedOn))}</span>
            ${asset.note ? `<small>${escapeHtml(asset.note)}</small>` : ""}
          </div>
          <div class="asset-card-balance">${escapeHtml(money(asset.balance))}</div>
          <div class="asset-card-actions">
            <button class="asset-edit" type="button">编辑</button>
            <button class="asset-delete" type="button">删除</button>
          </div>
        </article>
      `
    )
    .join("");
}

async function handleAssetAction(event) {
  const button = event.target.closest("button");
  const card = event.target.closest(".asset-card");
  if (!button || !card) return;
  const asset = assets.find((item) => item.id === card.dataset.assetId && !item.deletedAt);
  if (!asset) return;
  if (button.classList.contains("asset-edit")) {
    startEditAsset(asset.id);
    return;
  }
  if (!button.classList.contains("asset-delete") || !canMutateLedger()) return;
  if (!confirm(`确定删除“${asset.name}”吗？`)) return;
  if (isCloudReady && !(await deleteCloudAsset(asset))) return;
  assets = assets.filter((item) => item.id !== asset.id);
  if (editingAssetId === asset.id) closeAssetForm();
  saveAssets();
  render();
}

function renderRecordList(listNode, items, options = {}) {
  listNode.innerHTML = "";
  if (!items.length) {
    listNode.innerHTML = `<div class="empty-state">${options.emptyText || "没有记录。"}</div>`;
    return;
  }

  const template = document.querySelector("#recordTemplate");
  items.slice(0, options.limit || 80).forEach((record) => {
    const node = template.content.cloneNode(true);
    const itemNode = node.querySelector(".record-item");
    itemNode.dataset.recordId = record.id;
    itemNode.classList.toggle("editing", record.id === editingRecordId);
    node.querySelector(".record-icon").textContent = displayCategory(record.major).slice(0, 2).trim();
    node.querySelector(".record-title").textContent = `${displayCategory(record.major)} / ${displayMinor(record.minor)}`;
    node.querySelector(".record-meta").textContent = [
      displayPersonEmoji(record.person),
      formatDay(getRecordDay(record)),
      record.note
    ]
      .filter(Boolean)
      .join(" · ");
    const moneyNode = node.querySelector(".record-money");
    moneyNode.textContent = `${record.type === "income" ? "+" : "-"}${money(record.amount)}`;
    moneyNode.classList.toggle("income", record.type === "income");
    const actionsNode = node.querySelector(".record-actions");
    if (options.readOnly) {
      actionsNode.innerHTML = `<span class="record-lock">已归档</span>`;
    } else if (record.tripRole === "settlement") {
      actionsNode.innerHTML = `<span class="record-lock">项目差值</span>`;
    } else if (options.tripMode) {
      const unlinkButton = document.createElement("button");
      unlinkButton.type = "button";
      unlinkButton.className = "record-trip-unlink";
      unlinkButton.textContent = "移回日常";
      actionsNode.appendChild(unlinkButton);
    }
    listNode.appendChild(node);
  });
}

function getRecordSearchText(record) {
  return [
    record.type === "income" ? "收入" : "支出",
    record.person,
    record.amount,
    record.major,
    record.minor,
    record.note,
    getRecordDay(record),
    formatDay(getRecordDay(record))
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

async function applyPreferredPersonForCurrentUser() {
  const matchedPerson = await getMatchedPersonForEmail(currentUser?.email || "");
  if (matchedPerson) {
    preferredPerson = matchedPerson;
    localStorage.setItem(`${storageKey}-preferred-person`, preferredPerson);
  }
  if (!editingRecordId) personSelect.value = getDefaultPerson();
}

async function getMatchedPersonForEmail(email) {
  if (!email || !window.crypto?.subtle) return "";
  const hash = await sha256Hex(email.trim().toLowerCase());
  return people.includes(accountPersonHashes[hash]) ? accountPersonHashes[hash] : "";
}

async function sha256Hex(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await window.crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function getDefaultPerson() {
  return people.includes(preferredPerson) ? preferredPerson : people[0];
}

async function handleRecordAction(event) {
  const actionButton = event.target.closest("button");
  const itemNode = event.target.closest(".record-item");
  if (!actionButton || !itemNode) return;

  const recordId = itemNode.dataset.recordId;
  if (actionButton.classList.contains("record-trip-unlink")) {
    await unlinkRecordFromTrip(recordId);
    return;
  }
  if (actionButton.classList.contains("record-edit")) {
    startEdit(recordId);
    return;
  }

  if (actionButton.classList.contains("record-delete")) {
    await deleteRecord(recordId);
  }
}

function startEdit(recordId) {
  const record = records.find((item) => item.id === recordId);
  if (!record) return;
  if (record.tripRole === "settlement") {
    alert("这是出差项目自动生成的差值记录，请到对应项目撤销归档后重新归档。");
    return;
  }
  const linkedTrip = trips.find((trip) => trip.id === record.tripId);
  if (linkedTrip?.archivedAt) {
    alert("已归档项目的收支记录不能编辑。如需修改，请先撤销归档。");
    return;
  }

  editingRecordId = recordId;
  editingRecordBaseUpdatedAt = record.updatedAt || "";
  setActiveType(record.type);
  personSelect.value = record.person;
  amountInput.value = record.amount;
  entryDateInput.value = getRecordDay(record);
  majorSelect.value = record.major;
  fillMinorCategories();
  minorSelect.value = record.minor;
  syncTripProjectField(record.tripId || "");
  if (record.tripId) tripProjectSelect.value = record.tripId;
  noteInput.value = record.note || "";
  submitEntryBtn.textContent = "保存修改";
  cancelEditBtn.hidden = false;
  switchPage("entry");
  form.scrollIntoView({ behavior: "smooth", block: "start" });
  render();
}

function cancelEdit() {
  editingRecordId = "";
  editingRecordBaseUpdatedAt = "";
  resetForm();
  submitEntryBtn.textContent = "记一笔";
  cancelEditBtn.hidden = true;
}

async function deleteRecord(recordId) {
  if (!canMutateLedger()) return;
  const record = records.find((item) => item.id === recordId);
  if (!record) return;
  if (record.tripRole === "settlement") {
    alert("项目差值记录不能直接删除，请到出差项目撤销归档。");
    return;
  }
  const linkedTrip = trips.find((trip) => trip.id === record.tripId);
  if (linkedTrip?.archivedAt) {
    alert("已归档项目的收支记录不能删除。如需修改，请先撤销归档。");
    return;
  }
  if (!confirm(`确定删除这条记录吗？\n${displayCategory(record.major)} / ${displayMinor(record.minor)} ${money(record.amount)}`)) return;

  if (isCloudReady && !(await deleteCloudRecord(record))) return;
  records = records.filter((item) => item.id !== recordId);
  if (editingRecordId === recordId) cancelEdit();
  saveRecords();
  render();

  if (isCloudReady) setCloudReadyState();
}

async function initCloud() {
  if (!supabaseClient) {
    setCloudState("本地模式", "填好 Supabase 配置并登录后，会直接读取云端账本。");
    syncBtn.disabled = true;
    return;
  }

  const { data } = await supabaseClient.auth.getUser();
  currentUser = data.user;
  isCloudReady = Boolean(currentUser);
  await applyPreferredPersonForCurrentUser();

  supabaseClient.auth.onAuthStateChange(async (_event, session) => {
    currentUser = session?.user || null;
    isCloudReady = Boolean(currentUser);
    await applyPreferredPersonForCurrentUser();
    updateAuthUi();
    if (isCloudReady) syncCloudRecords();
  });

  updateAuthUi();
  if (isCloudReady) {
    await syncCloudRecords();
  }
}

function updateAuthUi() {
  loginForm.hidden = isCloudReady;
  logoutBtn.hidden = !isCloudReady;
  syncBtn.disabled = !supabaseClient;

  if (isCloudReady) {
    setCloudReadyState();
  } else if (supabaseClient) {
    setCloudState("待登录", "输入 Supabase 用户邮箱和密码后即可同步。");
  } else {
    setCloudState("本地模式", "填好 Supabase 配置并登录后，会直接读取云端账本。");
  }
}

function setCloudState(title, hint) {
  cloudStatus.textContent = title;
  cloudHint.textContent = hint;
}

function setCloudReadyState(activity = "") {
  if (!isCloudReady) return;
  const lastReadLabel = lastSuccessfulSyncAt
    ? `上次读取 ${new Intl.DateTimeFormat("zh-CN", {
        timeZone: "Asia/Shanghai",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }).format(new Date(lastSuccessfulSyncAt))}`
    : "等待首次读取";
  setCloudState("云同步已开启", `${currentUser.email} · ${getLedgerCountLabel()} · ${activity || lastReadLabel}`);
}

function canMutateLedger() {
  if (!supabaseClient || isCloudReady) return true;
  setCloudState("请先登录", "这个网页已配置云端账本；登录后才能修改，避免产生无法同步的本机副本。");
  alert("请先登录云端账本后再新增、编辑、删除或导入。\n\n这样可以避免本机数据与手机数据再次分叉。");
  return false;
}

function refreshCloudWhenForeground() {
  if (!isCloudReady || cloudSyncPromise || editingRecordId || editingTripId || editingAssetId) return;
  if (Date.now() - lastSuccessfulSyncAt < 15000) return;
  syncCloudRecords({ quiet: true });
}

async function signIn(email, password) {
  if (!supabaseClient) {
    setCloudState("还没配置 Supabase", "先在 config.js 里填入 SUPABASE_URL 和 SUPABASE_ANON_KEY。");
    return;
  }

  setCloudState("正在登录", "正在连接云端账本。");
  loginBtn.disabled = true;
  const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
  loginBtn.disabled = false;

  if (error) {
    setCloudState("登录失败", formatAuthError(error));
    return;
  }

  passwordInput.value = "";
  const { data } = await supabaseClient.auth.getUser();
  currentUser = data.user;
  isCloudReady = Boolean(currentUser);
  await applyPreferredPersonForCurrentUser();
  setCloudState("登录成功", "正在同步云端账本。");
  await syncCloudRecords();
}

function formatAuthError(error) {
  const message = String(error?.message || "");
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.includes("invalid login credentials")) {
    return "邮箱或密码不对。请确认用的是 Supabase 后台创建用户时设置的密码。";
  }
  if (lowerMessage.includes("email not confirmed")) {
    return "这个用户还没有确认邮箱。请在 Supabase 后台把用户设为 confirmed，或重新创建时开启 Auto Confirm。";
  }
  if (lowerMessage.includes("rate limit")) {
    return "登录尝试太频繁了，先等一会儿再试。";
  }
  return message || "请稍后再试。";
}

function getLoginRedirectUrl() {
  if (configuredSiteUrl) return configuredSiteUrl;
  if (window.location.protocol === "http:" || window.location.protocol === "https:") {
    return window.location.href.split("#")[0];
  }
  return "";
}

async function signOut() {
  if (!supabaseClient) return;
  await supabaseClient.auth.signOut();
  currentUser = null;
  isCloudReady = false;
  await applyPreferredPersonForCurrentUser();
  updateAuthUi();
}

async function syncCloudRecords(options = {}) {
  if (!isCloudReady) {
    updateAuthUi();
    return false;
  }
  if (cloudSyncPromise) return cloudSyncPromise;

  cloudSyncPromise = pullCloudRecords(options).finally(() => {
    cloudSyncPromise = null;
  });
  return cloudSyncPromise;
}

async function pullCloudRecords(options = {}) {
  if (!options.quiet) setCloudState("正在同步", "正在直接读取云端账本，本机缓存不会上传。");

  const { data: assetRows, error: assetError } = await supabaseClient
    .from("stored_assets")
    .select(cloudAssetFields)
    .eq("family_id", familyId)
    .order("balance_updated_on", { ascending: false });
  if (assetError) {
    setCloudState("储值资产同步失败", formatCloudSchemaError(assetError));
    return false;
  }

  const { data: tripRows, error: tripError } = await supabaseClient
    .from("business_trips")
    .select(cloudTripFields)
    .eq("family_id", familyId)
    .order("start_on", { ascending: false });
  if (tripError) {
    setCloudState("出差项目同步失败", formatCloudSchemaError(tripError));
    return false;
  }

  const { data: recordRows, error: recordError } = await supabaseClient
    .from("records")
    .select(cloudRecordFields)
    .eq("family_id", familyId)
    .order("created_at", { ascending: false });

  if (recordError) {
    setCloudState("账目同步失败", formatCloudSchemaError(recordError));
    return false;
  }

  trips = (tripRows || []).map(fromCloudTrip).filter(isTrip).map(normalizeTrip);
  assets = (assetRows || []).map(fromCloudAsset).filter(isAsset).map(normalizeAsset).filter((asset) => !asset.deletedAt);
  records = migrateRecords((recordRows || []).map(fromCloudRecord).filter(isRecord).filter((record) => !record.deletedAt));
  if (activeTripId && !trips.some((trip) => trip.id === activeTripId && !trip.deletedAt)) activeTripId = "";
  saveTrips();
  saveAssets();
  saveRecords();
  render();
  lastSuccessfulSyncAt = Date.now();
  setCloudReadyState();
  return true;
}

async function saveCloudRecord(record, options = {}) {
  if (!isCloudReady) return record;
  lastCloudRecordError = null;
  if (!options.quiet) setCloudState("正在保存", "正在写入云端账本。");

  let response;
  if (options.isNew) {
    response = await supabaseClient.from("records").insert(toCloudRecord(record)).select(cloudRecordFields);
  } else {
    const baseUpdatedAt = options.baseUpdatedAt || record.updatedAt || "";
    if (!baseUpdatedAt) {
      lastCloudRecordError = { code: "MISSING_VERSION", message: "账目缺少云端版本" };
      setCloudState("无法安全保存", "这条账目缺少云端版本，请先点“同步”读取最新数据后再试。");
      return null;
    }
    response = await supabaseClient
      .from("records")
      .update(toCloudRecord(record))
      .eq("family_id", familyId)
      .eq("id", record.id)
      .eq("updated_at", baseUpdatedAt)
      .select(cloudRecordFields);
  }

  if (response.error) {
    lastCloudRecordError = response.error;
    setCloudState("保存到云端失败", `${formatCloudSchemaError(response.error)}；本机界面没有写入这次修改。`);
    return null;
  }
  if (!response.data?.length) {
    lastCloudRecordError = { code: "VERSION_CONFLICT", message: "云端账目已更新" };
    await handleCloudVersionConflict("这条账目已被另一台设备修改或删除", { recordId: record.id });
    return null;
  }

  const savedRecord = fromCloudRecord(response.data[0]);
  if (!options.quiet) setCloudReadyState("刚刚保存");
  return savedRecord;
}

async function insertCloudRecords(recordItems) {
  if (!isCloudReady) return recordItems;
  if (!recordItems.length) return [];
  setCloudState("正在保存", `正在把 ${recordItems.length} 条账目写入云端。`);
  const { data, error } = await supabaseClient
    .from("records")
    .insert(recordItems.map(toCloudRecord))
    .select(cloudRecordFields);
  if (error) {
    lastCloudRecordError = error;
    setCloudState("保存到云端失败", `${formatCloudSchemaError(error)}；本机账本没有加入这些记录。`);
    return null;
  }
  setCloudReadyState("刚刚保存");
  return (data || []).map(fromCloudRecord).filter(isRecord);
}

async function saveCloudRecords(recordChanges) {
  if (!isCloudReady) return recordChanges.map((change) => change.record || change);
  if (!recordChanges.length) return [];
  setCloudState("正在保存", `正在安全写入 ${recordChanges.length} 条账目。`);
  const savedRecords = [];
  for (const change of recordChanges) {
    const record = change.record || change;
    const savedRecord = await saveCloudRecord(record, {
      isNew: Boolean(change.isNew),
      baseUpdatedAt: change.baseUpdatedAt || "",
      quiet: true
    });
    if (!savedRecord) {
      if (savedRecords.length) await syncCloudRecords({ quiet: true });
      return null;
    }
    savedRecords.push(savedRecord);
  }
  setCloudReadyState("刚刚保存");
  return savedRecords;
}

async function saveCloudTrip(trip, options = {}) {
  if (!isCloudReady) return trip;
  lastCloudTripError = null;
  if (!options.quiet) setCloudState("正在保存", "正在写入出差项目。");

  let response;
  if (options.isNew) {
    response = await supabaseClient.from("business_trips").insert(toCloudTrip(trip)).select(cloudTripFields);
  } else {
    const baseUpdatedAt = options.baseUpdatedAt || trip.updatedAt || "";
    if (!baseUpdatedAt) {
      lastCloudTripError = { code: "MISSING_VERSION", message: "出差项目缺少云端版本" };
      setCloudState("无法安全保存", "这个出差项目缺少云端版本，请先点“同步”后再试。");
      return null;
    }
    response = await supabaseClient
      .from("business_trips")
      .update(toCloudTrip(trip))
      .eq("family_id", familyId)
      .eq("id", trip.id)
      .eq("updated_at", baseUpdatedAt)
      .select(cloudTripFields);
  }

  if (response.error) {
    lastCloudTripError = response.error;
    setCloudState("出差项目保存失败", `${formatCloudSchemaError(response.error)}；本机界面没有写入这次修改。`);
    return null;
  }
  if (!response.data?.length) {
    lastCloudTripError = { code: "VERSION_CONFLICT", message: "云端出差项目已更新" };
    await handleCloudVersionConflict("这个出差项目已被另一台设备修改或删除", { tripId: trip.id });
    return null;
  }

  const savedTrip = fromCloudTrip(response.data[0]);
  if (!options.quiet) setCloudReadyState("刚刚保存");
  return savedTrip;
}

async function saveCloudAsset(asset, options = {}) {
  if (!isCloudReady) return asset;
  lastCloudAssetError = null;
  if (!options.quiet) setCloudState("正在保存", "正在写入储值资产。");

  let response;
  if (options.isNew) {
    response = await supabaseClient.from("stored_assets").insert(toCloudAsset(asset)).select(cloudAssetFields);
  } else {
    const baseUpdatedAt = options.baseUpdatedAt || asset.updatedAt || "";
    if (!baseUpdatedAt) {
      lastCloudAssetError = { code: "MISSING_VERSION", message: "储值资产缺少云端版本" };
      setCloudState("无法安全保存", "这个储值资产缺少云端版本，请先点“同步”后再试。");
      return null;
    }
    response = await supabaseClient
      .from("stored_assets")
      .update(toCloudAsset(asset))
      .eq("family_id", familyId)
      .eq("id", asset.id)
      .eq("updated_at", baseUpdatedAt)
      .select(cloudAssetFields);
  }

  if (response.error) {
    lastCloudAssetError = response.error;
    setCloudState("储值资产保存失败", `${formatCloudSchemaError(response.error)}；本机界面没有写入这次修改。`);
    return null;
  }
  if (!response.data?.length) {
    lastCloudAssetError = { code: "VERSION_CONFLICT", message: "云端储值资产已更新" };
    await handleCloudVersionConflict("这个储值资产已被另一台设备修改或删除", { assetId: asset.id });
    return null;
  }

  const savedAsset = fromCloudAsset(response.data[0]);
  if (!options.quiet) setCloudReadyState("刚刚保存");
  return savedAsset;
}

async function deleteCloudRecord(record) {
  if (!isCloudReady) return true;
  if (!record?.updatedAt) {
    setCloudState("无法安全删除", "这条账目缺少云端版本，请先点“同步”后再试。");
    return false;
  }
  setCloudState("正在删除", "正在从云端账本删除这条记录。");
  const deletedAt = new Date().toISOString();
  const { data, error } = await supabaseClient
    .from("records")
    .update({ deleted_at: deletedAt, updated_at: deletedAt })
    .eq("family_id", familyId)
    .eq("id", record.id)
    .eq("updated_at", record.updatedAt)
    .select("id");
  if (error) {
    setCloudState("删除云端记录失败", formatCloudSchemaError(error));
    return false;
  }
  if (!data?.length) {
    await handleCloudVersionConflict("这条账目已被另一台设备修改或删除", { recordId: record.id });
    return false;
  }
  setCloudReadyState("刚刚删除");
  return true;
}

async function deleteCloudAsset(asset) {
  if (!isCloudReady) return true;
  if (!asset?.updatedAt) {
    setCloudState("无法安全删除", "这个储值资产缺少云端版本，请先点“同步”后再试。");
    return false;
  }
  setCloudState("正在删除", "正在从云端删除这个储值资产。");
  const deletedAt = new Date().toISOString();
  const { data, error } = await supabaseClient
    .from("stored_assets")
    .update({ deleted_at: deletedAt, updated_at: deletedAt })
    .eq("family_id", familyId)
    .eq("id", asset.id)
    .eq("updated_at", asset.updatedAt)
    .select("id");
  if (error) {
    setCloudState("删除储值资产失败", formatCloudSchemaError(error));
    return false;
  }
  if (!data?.length) {
    await handleCloudVersionConflict("这个储值资产已被另一台设备修改或删除", { assetId: asset.id });
    return false;
  }
  setCloudReadyState("刚刚删除");
  return true;
}

async function restoreBackupToCloud(recordItems, tripItems, assetItems) {
  if (!isCloudReady) return false;
  setCloudState("正在恢复备份", "正在把选定 JSON 明确写入云端；这不是普通同步。");
  const baseTime = Date.now();

  if (tripItems?.length) {
    const restoredTrips = tripItems.map((trip, index) =>
      normalizeTrip({
        ...trip,
        updatedAt: new Date(baseTime + index).toISOString(),
        createdBy: currentUser.id
      })
    );
    const { error } = await supabaseClient.from("business_trips").upsert(restoredTrips.map(toCloudTrip), { onConflict: "id" });
    if (error) {
      setCloudState("出差项目恢复失败", formatCloudSchemaError(error));
      return false;
    }
  }

  if (assetItems?.length) {
    const restoredAssets = assetItems.map((asset, index) =>
      normalizeAsset({
        ...asset,
        updatedAt: new Date(baseTime + (tripItems?.length || 0) + index).toISOString(),
        createdBy: currentUser.id
      })
    );
    const { error } = await supabaseClient.from("stored_assets").upsert(restoredAssets.map(toCloudAsset), { onConflict: "id" });
    if (error) {
      setCloudState("储值资产恢复失败", formatCloudSchemaError(error));
      return false;
    }
  }

  if (recordItems.length) {
    const restoredRecords = recordItems.map((record, index) => ({
      ...record,
      updatedAt: new Date(baseTime + (tripItems?.length || 0) + (assetItems?.length || 0) + index).toISOString(),
      createdBy: currentUser.id
    }));
    const { error } = await supabaseClient.from("records").upsert(restoredRecords.map(toCloudRecord), { onConflict: "id" });
    if (error) {
      setCloudState("账目恢复失败", formatCloudSchemaError(error));
      return false;
    }
  }

  setCloudState("备份已写入云端", "正在重新读取云端账本进行核对。");
  return true;
}

async function handleCloudVersionConflict(message, target = {}) {
  setCloudState("检测到多设备冲突", `${message}；正在读取云端最新版本。`);
  await syncCloudRecords({ quiet: true });
  let closedEditor = false;
  if (target.recordId && editingRecordId === target.recordId) {
    cancelEdit();
    closedEditor = true;
  }
  if (target.tripId && editingTripId === target.tripId) {
    closeTripForm();
    closedEditor = true;
  }
  if (target.assetId && editingAssetId === target.assetId) {
    closeAssetForm();
    closedEditor = true;
  }
  if (closedEditor) render();
  alert(`${message}。\n\n为了避免覆盖另一台设备的数据，本次操作已取消，并已重新读取云端最新内容。请核对后再试。`);
}

function toCloudRecord(record) {
  return {
    id: record.id,
    family_id: familyId,
    type: record.type,
    person: record.person,
    amount: record.amount,
    benefit: record.benefit || "",
    major: record.major,
    minor: record.minor,
    note: record.note || "",
    spent_on: getRecordDay(record),
    created_at: record.createdAt || new Date().toISOString(),
    updated_at: record.updatedAt || record.createdAt || new Date().toISOString(),
    deleted_at: record.deletedAt || null,
    created_by: record.createdBy || currentUser.id,
    trip_id: record.tripId || null,
    trip_role: record.tripRole || null,
    trip_linked_at: record.tripLinkedAt || null,
    trip_original_major: record.tripOriginalMajor || null,
    trip_original_minor: record.tripOriginalMinor || null
  };
}

function fromCloudRecord(row) {
  return normalizeRecordBenefit({
    id: row.id,
    type: row.type,
    person: row.person,
    amount: Number(row.amount),
    benefit: row.benefit || "",
    major: row.major,
    minor: row.minor,
    note: row.note || "",
    date: row.spent_on,
    createdAt: row.created_at,
    updatedAt: row.updated_at || row.created_at || "",
    deletedAt: row.deleted_at || "",
    createdBy: row.created_by || "",
    tripId: row.trip_id || "",
    tripRole: row.trip_role || "",
    tripLinkedAt: row.trip_linked_at || "",
    tripOriginalMajor: row.trip_original_major || "",
    tripOriginalMinor: row.trip_original_minor || ""
  });
}

function toCloudTrip(trip) {
  return {
    id: trip.id,
    family_id: familyId,
    trip_no: trip.tripNo,
    traveler: trip.traveler,
    subject: trip.subject,
    destination: trip.destination,
    start_on: trip.startDate,
    end_on: trip.endDate || null,
    daily_allowance: trip.dailyAllowance,
    status: trip.status,
    reimbursement_amount: trip.reimbursementAmount || 0,
    reimbursed_on: trip.reimbursedOn || null,
    expense_total_at_archive: trip.expenseTotalAtArchive || 0,
    allowance_total_at_archive: trip.allowanceTotalAtArchive || 0,
    surplus_at_archive: trip.surplusAtArchive || 0,
    settlement_record_id: trip.settlementRecordId || null,
    archived_at: trip.archivedAt || null,
    deleted_at: trip.deletedAt || null,
    created_at: trip.createdAt || new Date().toISOString(),
    updated_at: trip.updatedAt || new Date().toISOString(),
    created_by: trip.createdBy || currentUser.id
  };
}

function fromCloudTrip(row) {
  return normalizeTrip({
    id: row.id,
    tripNo: row.trip_no,
    traveler: row.traveler,
    subject: row.subject,
    destination: row.destination,
    startDate: row.start_on,
    endDate: row.end_on || "",
    dailyAllowance: Number(row.daily_allowance || 0),
    status: row.status,
    reimbursementAmount: Number(row.reimbursement_amount || 0),
    reimbursedOn: row.reimbursed_on || "",
    expenseTotalAtArchive: Number(row.expense_total_at_archive || 0),
    allowanceTotalAtArchive: Number(row.allowance_total_at_archive || 0),
    surplusAtArchive: Number(row.surplus_at_archive || 0),
    settlementRecordId: row.settlement_record_id || "",
    archivedAt: row.archived_at || "",
    deletedAt: row.deleted_at || "",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    createdBy: row.created_by || ""
  });
}

function toCloudAsset(asset) {
  return {
    id: asset.id,
    family_id: familyId,
    name: asset.name,
    asset_type: asset.assetType,
    owner: asset.owner,
    balance: asset.balance,
    note: asset.note || "",
    balance_updated_on: asset.balanceUpdatedOn,
    deleted_at: asset.deletedAt || null,
    created_at: asset.createdAt || new Date().toISOString(),
    updated_at: asset.updatedAt || asset.createdAt || new Date().toISOString(),
    created_by: asset.createdBy || currentUser.id
  };
}

function fromCloudAsset(row) {
  return normalizeAsset({
    id: row.id,
    name: row.name,
    assetType: row.asset_type,
    owner: row.owner,
    balance: Number(row.balance || 0),
    note: row.note || "",
    balanceUpdatedOn: row.balance_updated_on,
    deletedAt: row.deleted_at || "",
    createdAt: row.created_at,
    updatedAt: row.updated_at || row.created_at || "",
    createdBy: row.created_by || ""
  });
}

function formatCloudSchemaError(error) {
  const message = String(error?.message || "云端操作失败");
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.includes("stored_assets") || lowerMessage.includes("asset_type") || lowerMessage.includes("balance_updated_on")) {
    return "云端还没有储值资产模块的数据表，请先在 Supabase SQL Editor 重新运行新版 supabase-schema.sql";
  }
  if (lowerMessage.includes("updated_at") || lowerMessage.includes("deleted_at")) {
    return "云端缺少多设备同步所需的版本字段，请先在 Supabase SQL Editor 重新运行新版 supabase-schema.sql";
  }
  if (lowerMessage.includes("business_trips") || lowerMessage.includes("trip_id") || lowerMessage.includes("trip_role") || lowerMessage.includes("schema cache")) {
    return "云端还没有出差模块的数据表，请先在 Supabase SQL Editor 重新运行新版 supabase-schema.sql";
  }
  return message;
}

function getLedgerCountLabel() {
  return `${records.length} 条账目 · ${trips.filter((trip) => !trip.deletedAt).length} 个出差项目 · ${assets.filter((asset) => !asset.deletedAt).length} 个储值资产`;
}

function sum(items, type) {
  return items
    .filter((record) => record.type === type)
    .reduce((total, record) => total + record.amount, 0);
}

function money(value) {
  return `¥${value.toLocaleString("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function getShanghaiDay(date = new Date()) {
  const parts = new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date);
  const dateParts = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${dateParts.year}-${dateParts.month}-${dateParts.day}`;
}

function getRecordDay(record) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(record.date)) return record.date;
  const parsedDate = new Date(record.date);
  if (Number.isNaN(parsedDate.getTime())) return getShanghaiDay();
  return getShanghaiDay(parsedDate);
}

function formatDay(value) {
  const [, month, day] = value.split("-");
  return `${Number(month)}月${Number(day)}日`;
}

function formatDateTime(value) {
  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) return value;
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(parsedDate);
}

function getMonthStartDay() {
  return `${getShanghaiDay().slice(0, 7)}-01`;
}

function addMonths(monthValue, offset) {
  const [year, month] = monthValue.split("-").map(Number);
  const nextMonth = new Date(year, month - 1 + offset, 1);
  return `${nextMonth.getFullYear()}-${String(nextMonth.getMonth() + 1).padStart(2, "0")}`;
}

function formatInputDate(value) {
  return value ? value.replaceAll("-", "/") : "";
}

function createCaptchaCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
  let code = "";
  for (let index = 0; index < 4; index += 1) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

function buildExcelSheet({ title, headers, rows, summaryRows }) {
  const tableRows = [
    `<tr>${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr>`,
    ...rows.map((row) => `<tr>${row.map(formatExcelCell).join("")}</tr>`),
    ...summaryRows.map((row) => `<tr>${row.map(formatExcelCell).join("")}</tr>`)
  ].join("");

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      body { font-family: "Microsoft YaHei", Arial, sans-serif; }
      table { border-collapse: collapse; }
      th, td { border: 1px solid #999; padding: 6px 10px; }
      th { background: #dbeee4; font-weight: 700; }
      caption { padding: 10px; font-size: 16px; font-weight: 700; text-align: left; }
    </style>
  </head>
  <body>
    <table>
      <caption>${escapeHtml(title)}</caption>
      ${tableRows}
    </table>
  </body>
</html>`;
}

function formatExcelCell(value) {
  if (typeof value === "number") {
    return `<td style="mso-number-format:'0.00';">${value.toFixed(2)}</td>`;
  }
  return `<td style="mso-number-format:'\\@';">${escapeHtml(value)}</td>`;
}

function formatExcelValue(value) {
  return typeof value === "number" ? value.toFixed(2) : escapeHtml(value);
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function getLedgerStorageSize() {
  return new Blob([
    localStorage.getItem(storageKey) || "",
    localStorage.getItem(tripStorageKey) || "",
    localStorage.getItem(assetStorageKey) || ""
  ]).size;
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function displayPerson(person) {
  return personLabels[person] || person;
}

function displayPersonEmoji(person) {
  return person === "徐佳丹" ? "👧" : person === "李逍宇" ? "👦" : "";
}

function displayCategory(category) {
  return categoryLabels[category] || category;
}

function displayMinor(minor) {
  return minorLabels[minor] || minor;
}

function displayAssetOwner(owner) {
  return owner === "共同" ? "👫 共同" : displayPerson(owner);
}

function loadRecords() {
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey) || "[]");
    if (!Array.isArray(parsed)) return [];
    const validRecords = parsed.filter(isRecord);
    const migratedRecords = migrateRecords(validRecords);
    if (hasBenefitMigration(validRecords, migratedRecords)) {
      localStorage.setItem(storageKey, JSON.stringify(migratedRecords));
    }
    return migratedRecords;
  } catch {
    return [];
  }
}

function saveRecords() {
  localStorage.setItem(storageKey, JSON.stringify(records));
}

function loadTrips() {
  try {
    const parsed = JSON.parse(localStorage.getItem(tripStorageKey) || "[]");
    return Array.isArray(parsed) ? parsed.filter(isTrip).map(normalizeTrip) : [];
  } catch {
    return [];
  }
}

function saveTrips() {
  localStorage.setItem(tripStorageKey, JSON.stringify(trips));
}

function loadAssets() {
  try {
    const parsed = JSON.parse(localStorage.getItem(assetStorageKey) || "[]");
    return Array.isArray(parsed) ? parsed.filter(isAsset).map(normalizeAsset) : [];
  } catch {
    return [];
  }
}

function saveAssets() {
  localStorage.setItem(assetStorageKey, JSON.stringify(assets));
}

function normalizeAsset(asset) {
  return {
    ...asset,
    balance: roundMoney(Number(asset.balance || 0)),
    note: asset.note || "",
    deletedAt: asset.deletedAt || "",
    updatedAt: asset.updatedAt || asset.createdAt || "",
    createdBy: asset.createdBy || ""
  };
}

function isAsset(asset) {
  return (
    asset &&
    typeof asset.id === "string" &&
    typeof asset.name === "string" &&
    ["membership", "stored_value", "digital"].includes(asset.assetType) &&
    [...people, "共同"].includes(asset.owner) &&
    Number.isFinite(Number(asset.balance)) &&
    Number(asset.balance) >= 0 &&
    /^\d{4}-\d{2}-\d{2}$/.test(asset.balanceUpdatedOn) &&
    (typeof asset.note === "string" || typeof asset.note === "undefined") &&
    (typeof asset.deletedAt === "string" || typeof asset.deletedAt === "undefined") &&
    (typeof asset.createdAt === "string" || typeof asset.createdAt === "undefined") &&
    (typeof asset.updatedAt === "string" || typeof asset.updatedAt === "undefined") &&
    (typeof asset.createdBy === "string" || typeof asset.createdBy === "undefined")
  );
}

function normalizeTrip(trip) {
  return {
    ...trip,
    endDate: trip.endDate || "",
    dailyAllowance: roundMoney(Number(trip.dailyAllowance || 0)),
    reimbursementAmount: roundMoney(Number(trip.reimbursementAmount || 0)),
    reimbursedOn: trip.reimbursedOn || "",
    expenseTotalAtArchive: roundMoney(Number(trip.expenseTotalAtArchive || 0)),
    allowanceTotalAtArchive: roundMoney(Number(trip.allowanceTotalAtArchive || 0)),
    surplusAtArchive: roundMoney(Number(trip.surplusAtArchive || 0)),
    settlementRecordId: trip.settlementRecordId || "",
    archivedAt: trip.archivedAt || "",
    deletedAt: trip.deletedAt || "",
    updatedAt: trip.updatedAt || trip.createdAt || "",
    createdBy: trip.createdBy || ""
  };
}

function isTrip(trip) {
  return (
    trip &&
    typeof trip.id === "string" &&
    typeof trip.tripNo === "string" &&
    people.includes(trip.traveler) &&
    typeof trip.subject === "string" &&
    typeof trip.destination === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(trip.startDate) &&
    (trip.endDate === "" || typeof trip.endDate === "undefined" || /^\d{4}-\d{2}-\d{2}$/.test(trip.endDate)) &&
    Number.isFinite(Number(trip.dailyAllowance)) &&
    ["ongoing", "pending", "reimbursed"].includes(trip.status) &&
    (typeof trip.deletedAt === "string" || typeof trip.deletedAt === "undefined")
  );
}

function isTripExpenseRecord(record) {
  return Boolean(record?.tripId) && record.tripRole === "expense";
}

function isTripReimbursementRecord(record) {
  return Boolean(record?.tripId) && record.tripRole === "reimbursement";
}

function isTripProjectRecord(record) {
  return isTripExpenseRecord(record) || isTripReimbursementRecord(record);
}

function isDailyRecord(record) {
  return !isTripProjectRecord(record);
}

function migrateRecords(items) {
  return items.map((record) => normalizeRecordBenefit(normalizeRecord(record)));
}

function normalizeRecord(record) {
  return {
    ...record,
    updatedAt: record.updatedAt || record.createdAt || "",
    deletedAt: record.deletedAt || "",
    createdBy: record.createdBy || "",
    tripId: record.tripId || "",
    tripRole: record.tripRole || "",
    tripLinkedAt: record.tripLinkedAt || "",
    tripOriginalMajor: record.tripOriginalMajor || "",
    tripOriginalMinor: record.tripOriginalMinor || ""
  };
}

function normalizeRecordBenefit(record) {
  return record.benefit ? { ...record, benefit: "" } : record;
}

function hasBenefitMigration(beforeItems, afterItems) {
  return beforeItems.some((record, index) => (record.benefit || "") !== (afterItems[index]?.benefit || ""));
}

function isRecord(record) {
  return (
    record &&
    ["expense", "income"].includes(record.type) &&
    people.includes(record.person) &&
    Number.isFinite(record.amount) &&
    (typeof record.benefit === "string" || typeof record.benefit === "undefined") &&
    typeof record.major === "string" &&
    typeof record.minor === "string" &&
    typeof record.date === "string" &&
    (typeof record.note === "string" || typeof record.note === "undefined") &&
    (typeof record.createdAt === "string" || typeof record.createdAt === "undefined") &&
    (typeof record.updatedAt === "string" || typeof record.updatedAt === "undefined") &&
    (typeof record.deletedAt === "string" || typeof record.deletedAt === "undefined") &&
    (typeof record.createdBy === "string" || typeof record.createdBy === "undefined") &&
    (typeof record.tripId === "string" || typeof record.tripId === "undefined") &&
    (typeof record.tripRole === "string" || typeof record.tripRole === "undefined") &&
    (typeof record.tripLinkedAt === "string" || typeof record.tripLinkedAt === "undefined") &&
    (typeof record.tripOriginalMajor === "string" || typeof record.tripOriginalMajor === "undefined") &&
    (typeof record.tripOriginalMinor === "string" || typeof record.tripOriginalMinor === "undefined")
  );
}

entryDateInput.value = getShanghaiDay();
exportStartDateInput.value = getMonthStartDay();
exportEndDateInput.value = getShanghaiDay();
tripStatusFilter.value = "active";
calendarViewMonth = exportStartDateInput.value.slice(0, 7);
updateDateRangeText();
updateDetailDateRangeText();
updateDetailAmountSortButton();
renderCalendar();
fillMajorCategories();
fillDetailCategories();
fillTripProjectOptions();
render();
initCloud();
