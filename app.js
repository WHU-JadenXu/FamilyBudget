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
    其他: ["未分类", "出差未报销"]
  },
  income: {
    工资: ["工资", "奖金", "补贴"],
    理财: ["利息", "基金股票", "分红"],
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
  工资: "💰 工资",
  奖金: "🎉 奖金",
  补贴: "🧧 补贴",
  利息: "🏦 利息",
  基金股票: "📈 基金股票",
  分红: "💵 分红",
  交通报销: "🚇 交通报销",
  餐费报销: "🍱 餐费报销",
  其他报销: "🧾 其他报销",
  出差结余: "💼 出差结余",
  出差未报销: "📉 出差未报销",
  转账: "↔️ 转账",
  退款: "↩️ 退款"
};

const benefitLabels = {
  李逍宇用: "👦 李逍宇用",
  徐佳丹用: "👧 徐佳丹用",
  两个人共用: "👫 两个人共用"
};

const storageKey = "family-ledger-web-v1";
const tripStorageKey = "family-ledger-trips-v1";
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
  "id,type,person,amount,benefit,major,minor,note,spent_on,created_at,created_by,trip_id,trip_role,trip_linked_at,trip_original_major,trip_original_minor";
const cloudTripFields =
  "id,trip_no,traveler,subject,destination,start_on,end_on,daily_allowance,status,reimbursement_amount,reimbursed_on,expense_total_at_archive,allowance_total_at_archive,surplus_at_archive,settlement_record_id,archived_at,deleted_at,created_at,updated_at,created_by";
const hasSupabaseConfig = Boolean(config.SUPABASE_URL && config.SUPABASE_ANON_KEY);
const supabaseClient =
  hasSupabaseConfig && window.supabase
    ? window.supabase.createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY)
    : null;

let activeType = "expense";
let records = loadRecords();
let trips = loadTrips();
let currentUser = null;
let isCloudReady = false;
let editingRecordId = "";
let editingTripId = "";
let activeTripId = "";
let lastCloudTripError = null;
let preferredPerson = localStorage.getItem(`${storageKey}-preferred-person`) || "";

const form = document.querySelector("#entryForm");
const amountInput = document.querySelector("#amount");
const entryDateInput = document.querySelector("#entryDate");
const personSelect = document.querySelector("#person");
const benefitField = document.querySelector("#benefitField");
const benefitSelect = document.querySelector("#benefit");
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
const detailDateRangeBtn = document.querySelector("#detailDateRangeBtn");
const detailDateRangeText = document.querySelector("#detailDateRangeText");
const detailStartDateInput = document.querySelector("#detailStartDate");
const detailEndDateInput = document.querySelector("#detailEndDate");
const clearDetailFiltersBtn = document.querySelector("#clearDetailFiltersBtn");
const detailResultHint = document.querySelector("#detailResultHint");
const searchInput = document.querySelector("#searchInput");
const receiptImageInput = document.querySelector("#receiptImageInput");
const receiptUploadText = document.querySelector("#receiptUploadText");
const receiptScanStatus = document.querySelector("#receiptScanStatus");
const receiptBatchPanel = document.querySelector("#receiptBatchPanel");
const receiptBatchTitle = document.querySelector("#receiptBatchTitle");
const receiptBatchList = document.querySelector("#receiptBatchList");
const receiptBatchAddBtn = document.querySelector("#receiptBatchAddBtn");
const receiptBatchCancelBtn = document.querySelector("#receiptBatchCancelBtn");
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
const tripAssignMinor = document.querySelector("#tripAssignMinor");
const tripUnassignedList = document.querySelector("#tripUnassignedList");
const confirmTripAssignBtn = document.querySelector("#confirmTripAssignBtn");
const cancelTripAssignBtn = document.querySelector("#cancelTripAssignBtn");
const tripSettlementPanel = document.querySelector("#tripSettlementPanel");
const tripSettlementForm = document.querySelector("#tripSettlementForm");
const tripReimbursementAmountInput = document.querySelector("#tripReimbursementAmount");
const tripReimbursedOnInput = document.querySelector("#tripReimbursedOn");
const tripSettlementExpense = document.querySelector("#tripSettlementExpense");
const tripSettlementAllowance = document.querySelector("#tripSettlementAllowance");
const tripSettlementResult = document.querySelector("#tripSettlementResult");
const cancelTripSettlementBtn = document.querySelector("#cancelTripSettlementBtn");
const tripOngoingCount = document.querySelector("#tripOngoingCount");
const tripPendingCount = document.querySelector("#tripPendingCount");
const tripReimbursedCount = document.querySelector("#tripReimbursedCount");
const tripArchivedCount = document.querySelector("#tripArchivedCount");
const exportStartDateInput = document.querySelector("#exportStartDate");
const exportEndDateInput = document.querySelector("#exportEndDate");
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
let receiptOcrWorker = null;
let receiptOcrWorkerPromise = null;
let receiptOcrWorkerAttempt = 0;
let receiptOcrIdleTimer = null;
let pendingReceiptRecords = [];

document.querySelectorAll(".segment").forEach((button) => {
  button.addEventListener("click", () => {
    activeType = button.dataset.type;
    document.querySelectorAll(".segment").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    syncBenefitField();
    fillMajorCategories();
  });
});

majorSelect.addEventListener("change", () => {
  fillMinorCategories();
  syncTripProjectField();
});
personSelect.addEventListener("change", syncBenefitWithPerson);
recordLimitSelect.addEventListener("change", render);
filterPerson.addEventListener("change", render);
filterType.addEventListener("change", render);
filterCategory.addEventListener("change", render);
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
dateRangeBtn.addEventListener("click", (event) => toggleCalendarPanel(event, "export"));
detailDateRangeBtn.addEventListener("click", (event) => toggleCalendarPanel(event, "detail"));
calendarPrevBtn.addEventListener("click", () => shiftCalendarMonth(-1));
calendarNextBtn.addEventListener("click", () => shiftCalendarMonth(1));
calendarGrid.addEventListener("click", handleCalendarClick);
document.addEventListener("click", closeCalendarOnOutsideClick);
bottomTabs.forEach((button) => {
  button.addEventListener("click", () => switchPage(button.dataset.targetPage));
});
receiptImageInput.addEventListener("change", handleReceiptImage);
receiptBatchList.addEventListener("change", updateReceiptBatchButton);
receiptBatchAddBtn.addEventListener("click", importSelectedReceiptRecords);
receiptBatchCancelBtn.addEventListener("click", clearReceiptBatch);
window.addEventListener("pagehide", () => {
  if (receiptOcrWorker) receiptOcrWorker.terminate().catch(() => {});
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
    const updatedRecord = {
      ...existingRecord,
      type: activeType,
      person: personSelect.value,
      amount: Math.round(amount * 100) / 100,
      benefit: activeType === "expense" ? benefitSelect.value : "",
      major: majorSelect.value,
      minor: minorSelect.value,
      note: noteInput.value.trim(),
      date: entryDateInput.value,
      ...tripAssociation
    };

    records = records.map((item) => (item.id === editingRecordId ? updatedRecord : item));
    saveRecords();
    cancelEdit();
    render();

    if (isCloudReady) {
      await saveCloudRecord(updatedRecord);
    }
    return;
  }

  const record = {
    id: createUuid(),
    type: activeType,
    person: personSelect.value,
    amount: Math.round(amount * 100) / 100,
    benefit: activeType === "expense" ? benefitSelect.value : "",
    major: majorSelect.value,
    minor: minorSelect.value,
    note: noteInput.value.trim(),
    date: entryDateInput.value,
    createdAt: new Date().toISOString(),
    createdBy: currentUser?.id || "",
    ...tripAssociation
  };

  records.unshift(record);
  saveRecords();
  resetForm();
  render();

  if (isCloudReady) {
    await saveCloudRecord(record);
  }
});

document.querySelector("#exportBtn").addEventListener("click", () => {
  const backup = {
    version: 2,
    exportedAt: new Date().toISOString(),
    records,
    trips
  };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
  downloadBlob(blob, `家庭记账-${getShanghaiDay()}.json`);
});

document.querySelector("#exportExcelBtn").addEventListener("click", exportExcelRecords);

document.querySelector("#importFile").addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  try {
    const imported = JSON.parse(await file.text());
    if (Array.isArray(imported)) {
      records = migrateRecords(imported.filter(isRecord));
    } else if (imported && Array.isArray(imported.records) && Array.isArray(imported.trips)) {
      records = migrateRecords(imported.records.filter(isRecord));
      trips = imported.trips.filter(isTrip).map(normalizeTrip);
      saveTrips();
    } else {
      throw new Error("Invalid data");
    }
    saveRecords();
    render();
    if (isCloudReady) {
      await uploadMissingLocalTrips();
      await uploadMissingLocalRecords();
      await syncCloudRecords();
    }
  } catch {
    alert("导入失败，请选择之前导出的家庭记账 JSON 文件。");
  } finally {
    event.target.value = "";
  }
});

document.querySelector("#clearBtn").addEventListener("click", async () => {
  if (!records.length && !trips.length && !isCloudReady) return;
  const storageSize = getLedgerStorageSize();
  const sizeLabel = storageSize ? `\n当前本地数据约 ${formatBytes(storageSize)}。` : "";
  const linkedExpenseCount = records.filter(isTripExpenseRecord).length;
  const dailyRecordCount = records.length - linkedExpenseCount;
  const visibleTripCount = trips.filter((trip) => !trip.deletedAt).length;
  const deletedTripCount = trips.length - visibleTripCount;
  const countLabel = `日常记录 ${dailyRecordCount} 条、出差费用 ${linkedExpenseCount} 条、出差项目 ${visibleTripCount} 个${deletedTripCount ? `、已删除编号留档 ${deletedTripCount} 个` : ""}`;
  const captcha = createCaptchaCode();
  const answer = prompt(`确定清空当前账本的全部数据吗？\n${countLabel}${sizeLabel}\n\n这个操作会清空本地的日常账目、出差费用和出差项目；如果已登录同步，也会清空云端对应数据。\n\n请输入验证码 ${captcha} 后继续：`);
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
      await uploadMissingLocalRecords();
      setCloudState("出差项目清空失败", formatCloudSchemaError(tripError));
      return;
    }
  }

  records = [];
  trips = [];
  activeTripId = "";
  saveRecords();
  saveTrips();
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

async function exportExcelRecords() {
  const startDate = exportStartDateInput.value;
  const endDate = exportEndDateInput.value;

  if (!startDate || !endDate) {
    alert("请选择导出 Excel 的开始日期和结束日期。");
    return;
  }

  if (startDate > endDate) {
    alert("开始日期不能晚于结束日期。");
    return;
  }

  const scopedRecords = await getRecordsForExport(startDate, endDate);
  if (!scopedRecords.length) {
    alert("这个时间段内没有可导出的记录。");
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
      displayBenefit(record.benefit),
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
    title: `家庭记账 ${startDate} 至 ${endDate}`,
    headers: ["日期", "类型", "记账人", "金额", "花给谁", "大类", "小类", "备注", "创建时间"],
    rows,
    summaryRows: [
      ["", "支出合计", "", totals.expense, "", "", "", "", ""],
      ["", "收入合计", "", totals.income, "", "", "", "", ""]
    ]
  });

  downloadBlob(
    new Blob([`\ufeff${sheetHtml}`], { type: "application/vnd.ms-excel;charset=utf-8" }),
    `家庭记账-${startDate}-至-${endDate}.xls`
  );
}

async function getRecordsForExport(startDate, endDate) {
  if (isCloudReady) {
    const { data, error } = await supabaseClient
      .from("records")
      .select(cloudRecordFields)
      .eq("family_id", familyId)
      .gte("spent_on", startDate)
      .lte("spent_on", endDate)
      .order("spent_on", { ascending: true });

    if (!error) {
      return data.map(fromCloudRecord).filter(isRecord).filter(isDailyRecord);
    }

    setCloudState("导出读取云端失败", `${formatCloudSchemaError(error)}；已改用本机记录导出。`);
  }

  return records.filter(isDailyRecord).filter((record) => {
    const day = getRecordDay(record);
    return day >= startDate && day <= endDate;
  });
}

function resetForm() {
  form.reset();
  personSelect.value = getDefaultPerson();
  entryDateInput.value = getShanghaiDay();
  benefitSelect.value = getDefaultBenefit();
  syncBenefitField();
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
}

function setActiveType(type) {
  activeType = type;
  document.querySelectorAll(".segment").forEach((button) => {
    button.classList.toggle("active", button.dataset.type === type);
  });
  syncBenefitField();
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
    `<option value="">${availableTrips.length ? "请选择出差项目" : "请先新建出差项目"}</option>`,
    ...availableTrips.map(
      (trip) => `<option value="${escapeHtml(trip.id)}">${escapeHtml(`${trip.tripNo} · ${trip.subject}`)}</option>`
    )
  ].join("");
  if (preferredTripId && availableTrips.some((trip) => trip.id === preferredTripId)) {
    tripProjectSelect.value = preferredTripId;
  }
}

function syncTripProjectField(preferredTripId = "") {
  const isTripExpense = activeType === "expense" && majorSelect.value === "出差";
  tripProjectField.hidden = !isTripExpense;
  tripProjectSelect.disabled = !isTripExpense;
  if (!isTripExpense) {
    tripProjectSelect.value = "";
    return;
  }
  const currentValue = preferredTripId || tripProjectSelect.value;
  fillTripProjectOptions(currentValue);
}

function getEntryTripAssociation(existingRecord) {
  const shouldLinkTrip = activeType === "expense" && majorSelect.value === "出差";
  if (!shouldLinkTrip) {
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
    alert(trips.some((item) => !item.archivedAt && !item.deletedAt) ? "请选择一个未归档的出差项目。" : "请先到“出差”页面新建出差项目。");
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
    tripRole: "expense",
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
  detailStartDateInput.value = "";
  detailEndDateInput.value = "";
  searchInput.value = "";
  updateDetailDateRangeText();
  render();
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
}

function getVisibleDetailRecords() {
  const query = searchInput.value.trim().toLowerCase();
  const startDate = detailStartDateInput.value;
  const endDate = detailEndDateInput.value;
  const hasDateWindow = Boolean(startDate || endDate);
  const limitValue = recordLimitSelect.value;

  if (startDate && endDate && startDate > endDate) return [];

  const filteredRecords = records.filter(isDailyRecord).filter((record) => {
    const day = getRecordDay(record);
    const personMatched = filterPerson.value === "all" || record.person === filterPerson.value;
    const typeMatched = filterType.value === "all" || record.type === filterType.value;
    const categoryMatched = filterCategory.value === "all" || record.major === filterCategory.value;
    const startMatched = !startDate || day >= startDate;
    const endMatched = !endDate || day <= endDate;
    const queryMatched = !query || getRecordSearchText(record).includes(query);
    return personMatched && typeMatched && categoryMatched && startMatched && endMatched && queryMatched;
  });
  const sortedRecords = sortRecordsBySpentDate(filteredRecords);

  if (hasDateWindow || limitValue === "all") return sortedRecords;
  return sortedRecords.slice(0, Number(limitValue));
}

function getDetailResultHint(count) {
  if (detailStartDateInput.value && detailEndDateInput.value && detailStartDateInput.value > detailEndDateInput.value) {
    return "开始日期不能晚于结束日期";
  }
  const parts = [`显示 ${count} 条`];
  if (detailStartDateInput.value || detailEndDateInput.value) {
    parts.push(`${detailStartDateInput.value || "最早"} 至 ${detailEndDateInput.value || "今天"}`);
  } else if (recordLimitSelect.value !== "all") {
    parts.push(recordLimitSelect.options[recordLimitSelect.selectedIndex].textContent);
  }
  if (filterCategory.value !== "all") parts.push(displayCategory(filterCategory.value));
  if (filterType.value !== "all") parts.push(filterType.value === "income" ? "收入" : "支出");
  if (filterPerson.value !== "all") parts.push(displayPerson(filterPerson.value));
  return parts.join(" · ");
}

function sortRecordsBySpentDate(items) {
  return [...items].sort((left, right) => {
    const dateDifference = getRecordDay(right).localeCompare(getRecordDay(left));
    if (dateDifference) return dateDifference;
    const leftCreatedAt = Date.parse(left.createdAt || "") || 0;
    const rightCreatedAt = Date.parse(right.createdAt || "") || 0;
    return rightCreatedAt - leftCreatedAt;
  });
}

function startNewTrip() {
  editingTripId = "";
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

  if (existingTrip) {
    trips = trips.map((item) => (item.id === trip.id ? trip : item));
  } else {
    trips = [trip, ...trips];
  }
  activeTripId = trip.id;
  saveTrips();
  closeTripForm();
  render();
  if (isCloudReady) {
    let saved = await saveCloudTrip(trip);
    let retryCount = 0;
    while (!saved && !existingTrip && lastCloudTripError?.code === "23505" && retryCount < 5) {
      retryCount += 1;
      trip = normalizeTrip({ ...trip, tripNo: incrementTripNumber(trip.tripNo), updatedAt: new Date().toISOString() });
      trips = trips.map((item) => (item.id === trip.id ? trip : item));
      saveTrips();
      render();
      saved = await saveCloudTrip(trip);
    }
    if (!saved && lastCloudTripError?.code === "23505") {
      alert("云端同时创建了多个同月项目，编号仍有冲突。请先同步后再新建。");
    }
  }
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

  const filterValue = tripStatusFilter.value || "all";
  const visibleTrips = trips
    .filter((trip) => {
      if (trip.deletedAt) return false;
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
    ? `<div><span>实际到账</span><strong>${money(trip.reimbursementAmount)}</strong></div><div><span>${trip.surplusAtArchive >= 0 ? "结余收入" : "未报销支出"}</span><strong>${money(Math.abs(trip.surplusAtArchive))}</strong></div>`
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
      <div><span>出差天数</span><strong>${totals.days ? `${totals.days} 天` : "待结束"}</strong></div>
      <div><span>预计补贴</span><strong>${money(totals.allowanceTotal)}</strong></div>
      ${settlementDescription}
    </div>
    <div class="trip-detail-actions">
      ${trip.archivedAt ? "" : `<button type="button" data-trip-action="add-expense">记一笔出差费用</button><button type="button" data-trip-action="assign">归入已有费用</button><button type="button" data-trip-action="edit">编辑项目与状态</button>`}
      <button type="button" data-trip-action="export">导出报销汇总</button>
      ${!trip.archivedAt && trip.status === "reimbursed" ? `<button class="primary-action" type="button" data-trip-action="archive">结算并归档</button>` : ""}
      ${trip.archivedAt ? `<button type="button" data-trip-action="undo-archive">撤销归档</button>` : `<button class="danger-action" type="button" data-trip-action="delete">删除项目</button>`}
    </div>`;

  const expenses = sortRecordsBySpentDate(getTripExpenses(trip.id));
  renderRecordList(tripExpenseList, expenses, {
    emptyText: "这个项目还没有费用记录。",
    limit: expenses.length,
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
  const eligibleRecords = sortRecordsBySpentDate(
    records.filter((record) => record.type === "expense" && !record.tripId && isDailyRecord(record))
  );
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
    : `<div class="empty-state">没有可以归入的日常支出。</div>`;
  tripAssignMinor.value = "出差交通";
  tripAssignPanel.hidden = false;
  closeTripSettlementPanel();
  tripAssignPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function closeTripAssignPanel() {
  tripAssignPanel.hidden = true;
  tripUnassignedList.innerHTML = "";
}

async function assignSelectedRecordsToTrip() {
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
  const changedRecords = [];
  records = records.map((record) => {
    if (!selectedIds.has(record.id) || record.tripId || record.type !== "expense") return record;
    const updatedRecord = {
      ...record,
      tripId: trip.id,
      tripRole: "expense",
      tripLinkedAt: linkedAt,
      tripOriginalMajor: record.major,
      tripOriginalMinor: record.minor,
      major: "出差",
      minor: tripAssignMinor.value
    };
    changedRecords.push(updatedRecord);
    return updatedRecord;
  });
  saveRecords();
  closeTripAssignPanel();
  render();
  if (isCloudReady && changedRecords.length) await saveCloudRecords(changedRecords);
}

async function unlinkRecordFromTrip(recordId) {
  const record = records.find((item) => item.id === recordId);
  const trip = trips.find((item) => item.id === record?.tripId);
  if (!record || record.tripRole !== "expense" || trip?.archivedAt) return;
  if (!confirm("确定将这笔费用移回日常账本吗？")) return;

  const updatedRecord = {
    ...record,
    major: record.tripOriginalMajor || record.major,
    minor: record.tripOriginalMinor || record.minor,
    tripId: "",
    tripRole: "",
    tripLinkedAt: "",
    tripOriginalMajor: "",
    tripOriginalMinor: ""
  };
  records = records.map((item) => (item.id === recordId ? updatedRecord : item));
  saveRecords();
  render();
  if (isCloudReady) await saveCloudRecord(updatedRecord);
}

async function deleteTrip(trip) {
  if (!trip || trip.archivedAt) return;
  const expenses = getTripExpenses(trip.id);
  const message = expenses.length
    ? `确定删除 ${trip.tripNo} 吗？\n\n项目中的 ${expenses.length} 笔费用不会删除，会解除关联并回到日常账本。`
    : `确定删除 ${trip.tripNo} 吗？`;
  if (!confirm(message)) return;

  const changedRecords = [];
  records = records.map((record) => {
    if (record.tripId !== trip.id || record.tripRole !== "expense") return record;
    const updatedRecord = {
      ...record,
      major: record.tripOriginalMajor || record.major,
      minor: record.tripOriginalMinor || record.minor,
      tripId: "",
      tripRole: "",
      tripLinkedAt: "",
      tripOriginalMajor: "",
      tripOriginalMinor: ""
    };
    changedRecords.push(updatedRecord);
    return updatedRecord;
  });

  const deletedTrip = normalizeTrip({ ...trip, deletedAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
  if (isCloudReady && changedRecords.length && !(await saveCloudRecords(changedRecords))) return;
  if (isCloudReady && !(await saveCloudTrip(deletedTrip))) return;
  trips = trips.map((item) => (item.id === trip.id ? deletedTrip : item));
  activeTripId = "";
  saveRecords();
  saveTrips();
  render();
}

function getTripExpenses(tripId) {
  return records.filter((record) => record.tripId === tripId && record.tripRole === "expense");
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
  const days = getTripDays(trip);
  const allowanceTotal = roundMoney(days * Number(trip.dailyAllowance || 0));
  return { expenseTotal, days, allowanceTotal };
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
    ["项目状态", trip.archivedAt ? "已归档" : tripStatusLabels[trip.status], "导出时间", formatDateTime(new Date().toISOString())]
  ];
  if (trip.archivedAt) {
    infoRows.push(["实际到账", trip.reimbursementAmount, "到账日期", trip.reimbursedOn]);
    infoRows.push([trip.surplusAtArchive >= 0 ? "结余收入" : "未报销支出", Math.abs(trip.surplusAtArchive), "归档时间", formatDateTime(trip.archivedAt)]);
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
  if (!trip || trip.archivedAt || trip.status !== "reimbursed") return;
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
  tripSettlementResult.textContent = `${result >= 0 ? "结余收入" : "未报销支出"} ${money(Math.abs(result))}`;
  tripSettlementResult.classList.toggle("negative", result < 0);
}

async function archiveActiveTrip(event) {
  event.preventDefault();
  const trip = trips.find((item) => item.id === activeTripId && !item.deletedAt);
  if (!trip || trip.archivedAt || trip.status !== "reimbursed") return;
  const reimbursementAmount = Number.parseFloat(String(tripReimbursementAmountInput.value).replace(",", "."));
  const reimbursedOn = tripReimbursedOnInput.value;
  if (!Number.isFinite(reimbursementAmount) || reimbursementAmount < 0 || !reimbursedOn) {
    alert("请填写实际到账总额和到账日期。");
    return;
  }

  const totals = getTripTotals(trip);
  const surplus = roundMoney(reimbursementAmount - totals.expenseTotal);
  const settlementLabel = surplus > 0 ? `生成日常收入 ${money(surplus)}` : surplus < 0 ? `生成日常支出 ${money(Math.abs(surplus))}` : "不生成日常收支记录";
  if (!confirm(`请确认 ${trip.tripNo} 的结算：\n\n费用合计：${money(totals.expenseTotal)}\n实际到账：${money(reimbursementAmount)}\n${settlementLabel}\n\n归档后项目将只读。`)) return;

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
      benefit: surplus > 0 ? "" : `${trip.traveler}用`,
      major: surplus > 0 ? "报销" : "其他",
      minor: surplus > 0 ? "出差结余" : "出差未报销",
      note: `${trip.tripNo} ${trip.subject} ${surplus > 0 ? "出差结余" : "出差未报销"}`,
      date: reimbursedOn,
      createdAt: existingSettlement?.createdAt || now,
      createdBy: existingSettlement?.createdBy || currentUser?.id || "",
      tripId: trip.id,
      tripRole: "settlement",
      tripLinkedAt: existingSettlement?.tripLinkedAt || now,
      tripOriginalMajor: "",
      tripOriginalMinor: ""
    };
  }

  if (existingSettlement && !settlementRecord) {
    records = records.filter((record) => record.id !== existingSettlement.id);
  } else if (existingSettlement && settlementRecord) {
    records = records.map((record) => (record.id === existingSettlement.id ? settlementRecord : record));
  } else if (settlementRecord) {
    records = [settlementRecord, ...records];
  }

  const archivedTrip = normalizeTrip({
    ...trip,
    reimbursementAmount: roundMoney(reimbursementAmount),
    reimbursedOn,
    expenseTotalAtArchive: totals.expenseTotal,
    allowanceTotalAtArchive: totals.allowanceTotal,
    surplusAtArchive: surplus,
    settlementRecordId: settlementRecord?.id || "",
    archivedAt: now,
    updatedAt: now
  });
  trips = trips.map((item) => (item.id === trip.id ? archivedTrip : item));
  saveRecords();
  saveTrips();
  closeTripSettlementPanel();
  render();

  if (isCloudReady) {
    let settlementSaved = true;
    if (existingSettlement && !settlementRecord) {
      settlementSaved = await deleteCloudRecord(existingSettlement.id);
    } else if (settlementRecord) {
      settlementSaved = await saveCloudRecord(settlementRecord);
    }
    if (settlementSaved) await saveCloudTrip(archivedTrip);
  }
}

async function undoTripArchive(trip) {
  if (!trip?.archivedAt) return;
  if (!confirm(`确定撤销 ${trip.tripNo} 的归档吗？\n系统会删除已生成的结余记录，项目恢复为“已报销”，之后可以重新核对并归档。`)) return;
  const settlementRecord = getTripSettlementRecord(trip.id);
  const reopenedTrip = normalizeTrip({
    ...trip,
    status: "reimbursed",
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
    if (settlementRecord && !(await deleteCloudRecord(settlementRecord.id))) return;
    if (!(await saveCloudTrip(reopenedTrip))) {
      if (settlementRecord) await saveCloudRecord(settlementRecord);
      return;
    }
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

function setReceiptScanStatus(message, state = "") {
  receiptScanStatus.textContent = message;
  receiptScanStatus.classList.toggle("success", state === "success");
  receiptScanStatus.classList.toggle("error", state === "error");
}

async function handleReceiptImage(event) {
  const sourceFiles = [...(event.target.files || [])];
  if (!sourceFiles.length) return;
  clearReceiptBatch();

  if (sourceFiles.length > 10) {
    setReceiptScanStatus("为避免手机内存不足，每次最多选择 10 张单笔支付截图。", "error");
    event.target.value = "";
    return;
  }

  if (!window.Tesseract) {
    setReceiptScanStatus("识别组件加载失败，请联网刷新页面后重试。", "error");
    event.target.value = "";
    return;
  }

  const files = sourceFiles.filter((file) => file.type.startsWith("image/") && file.size <= 25 * 1024 * 1024);
  const invalidFileCount = sourceFiles.length - files.length;
  if (!files.length) {
    setReceiptScanStatus("没有可处理的图片。每张单笔支付截图需小于 25 MB。", "error");
    event.target.value = "";
    return;
  }

  const uploadLabel = receiptImageInput.closest(".receipt-upload");
  uploadLabel.classList.add("is-busy");
  receiptImageInput.disabled = true;
  receiptUploadText.textContent = "正在识别…";
  setReceiptScanStatus(`准备按顺序处理 ${files.length} 张单笔支付截图…`);

  try {
    const recognizedRecords = [];
    let unreadableCount = invalidFileCount;
    let listScreenshotCount = 0;

    for (let index = 0; index < files.length; index += 1) {
      let preparedImage = null;
      try {
        setReceiptScanStatus(`正在处理第 ${index + 1}/${files.length} 张：压缩图片…`);
        preparedImage = await withReceiptTimeout(prepareReceiptImage(files[index]), 15000, "IMAGE_TIMEOUT");
        setReceiptScanStatus(`正在处理第 ${index + 1}/${files.length} 张：识别文字…`);
        const worker = await withReceiptTimeout(getReceiptOcrWorker(), 90000, "MODEL_TIMEOUT");
        let result = await withReceiptTimeout(
          worker.recognize(preparedImage.blob, {}, { text: true }),
          45000,
          "OCR_TIMEOUT"
        );
        const recognizedText = result.data.text || "";
        result = null;
        if (isReceiptListScreenshot(recognizedText)) {
          listScreenshotCount += 1;
          continue;
        }
        const parsed = parseReceiptText(recognizedText);
        if (parsed.amount) recognizedRecords.push(parsed);
        else unreadableCount += 1;
      } catch (error) {
        console.error(`Receipt OCR failed for image ${index + 1}`, error);
        if (error?.code === "MODEL_TIMEOUT") throw error;
        if (error?.code === "OCR_TIMEOUT") await resetReceiptOcrWorker();
        unreadableCount += 1;
      } finally {
        preparedImage = null;
      }
    }

    if (!recognizedRecords.length) {
      const listHint = listScreenshotCount
        ? `检测到 ${listScreenshotCount} 张流水列表截图，当前仅支持每张图片包含一笔支付详情。`
        : "";
      setReceiptScanStatus(
        listHint || "这些截图中没有识别到可用金额，请换更清晰的单笔支付详情截图后重试。",
        "error"
      );
    } else if (files.length === 1 && recognizedRecords.length === 1 && !unreadableCount && !listScreenshotCount) {
      applyReceiptResult(recognizedRecords[0]);
    } else {
      applyReceiptBatchResult({ records: recognizedRecords, unreadableCount, listScreenshotCount });
    }
    scheduleReceiptWorkerRelease();
  } catch (error) {
    console.error("Receipt OCR failed", error);
    if (["MODEL_TIMEOUT", "OCR_TIMEOUT"].includes(error?.code)) {
      await resetReceiptOcrWorker();
    }
    setReceiptScanStatus(getReceiptErrorMessage(error), "error");
  } finally {
    uploadLabel.classList.remove("is-busy");
    receiptImageInput.disabled = false;
    receiptUploadText.textContent = "选择截图";
    event.target.value = "";
  }
}

async function prepareReceiptImage(file) {
  const image = await decodeReceiptImage(file);
  const sourceWidth = image.width || image.naturalWidth;
  const sourceHeight = image.height || image.naturalHeight;
  const maxEdge = 2200;
  const maxPixels = 3000000;
  const edgeScale = Math.min(1, maxEdge / Math.max(sourceWidth, sourceHeight));
  const pixelScale = Math.min(1, Math.sqrt(maxPixels / (sourceWidth * sourceHeight)));
  const scale = Math.min(edgeScale, pixelScale);
  const width = Math.max(1, Math.round(sourceWidth * scale));
  const height = Math.max(1, Math.round(sourceHeight * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { alpha: false });
  if (!context) throw new Error("CANVAS_UNAVAILABLE");
  context.fillStyle = "#fff";
  context.fillRect(0, 0, width, height);
  context.filter = "grayscale(1) contrast(1.15)";
  context.drawImage(image, 0, 0, width, height);
  if (typeof image.close === "function") image.close();

  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (result) => (result ? resolve(result) : reject(new Error("IMAGE_COMPRESS_FAILED"))),
      "image/jpeg",
      0.9
    );
  });
  canvas.width = 1;
  canvas.height = 1;
  return { blob, width, height, wasResized: scale < 0.99 };
}

async function decodeReceiptImage(file) {
  if (window.createImageBitmap) {
    try {
      return await window.createImageBitmap(file, { imageOrientation: "from-image" });
    } catch {
      // Older mobile browsers may not accept imageOrientation; use the Image fallback.
    }
  }
  return new Promise((resolve, reject) => {
    const image = new Image();
    const url = URL.createObjectURL(file);
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("IMAGE_DECODE_FAILED"));
    };
    image.src = url;
  });
}

async function getReceiptOcrWorker() {
  if (receiptOcrWorker) return receiptOcrWorker;
  if (receiptOcrWorkerPromise) return receiptOcrWorkerPromise;

  const attempt = ++receiptOcrWorkerAttempt;
  const lstmOnlyMode = window.Tesseract.OEM?.LSTM_ONLY ?? 1;
  receiptOcrWorkerPromise = window.Tesseract.createWorker("chi_sim", lstmOnlyMode, {
    langPath: "https://tessdata.projectnaptha.com/4.0.0_fast",
    logger: updateReceiptOcrProgress,
    errorHandler(error) {
      console.error("Receipt OCR worker error", error);
    }
  });

  try {
    const worker = await receiptOcrWorkerPromise;
    if (attempt !== receiptOcrWorkerAttempt) {
      await worker.terminate();
      throw new Error("OCR_CANCELLED");
    }
    const autoPageSegmentation = String(window.Tesseract.PSM?.AUTO ?? 3);
    await worker.setParameters({
      preserve_interword_spaces: "1",
      user_defined_dpi: "150",
      tessedit_pageseg_mode: autoPageSegmentation
    });
    receiptOcrWorker = worker;
    return worker;
  } finally {
    if (attempt === receiptOcrWorkerAttempt) receiptOcrWorkerPromise = null;
  }
}

function updateReceiptOcrProgress(message) {
  const progress = Math.max(0, Math.round((message.progress || 0) * 100));
  const statusLabels = {
    "loading tesseract core": "正在启动手机识别引擎",
    "initializing tesseract": "正在初始化识别引擎",
    "loading language traineddata": "首次使用，正在下载精简中文模型",
    "initializing api": "正在准备中文识别",
    "recognizing text": "正在识别截图文字"
  };
  const label = statusLabels[message.status];
  if (!label) return;
  setReceiptScanStatus(progress ? `${label} ${progress}%` : `${label}…`);
}

function withReceiptTimeout(promise, timeoutMs, code) {
  let timeoutId;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = window.setTimeout(() => {
      const error = new Error(code);
      error.code = code;
      reject(error);
    }, timeoutMs);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => window.clearTimeout(timeoutId));
}

function scheduleReceiptWorkerRelease() {
  window.clearTimeout(receiptOcrIdleTimer);
  receiptOcrIdleTimer = window.setTimeout(() => {
    resetReceiptOcrWorker();
  }, 120000);
}

async function resetReceiptOcrWorker() {
  window.clearTimeout(receiptOcrIdleTimer);
  receiptOcrIdleTimer = null;
  receiptOcrWorkerAttempt += 1;
  const worker = receiptOcrWorker;
  receiptOcrWorker = null;
  receiptOcrWorkerPromise = null;
  if (worker) {
    await worker.terminate().catch(() => {});
  }
}

function getReceiptErrorMessage(error) {
  if (error?.code === "MODEL_TIMEOUT") {
    return "中文模型加载超过 90 秒，请切换网络或刷新页面后重试。识别任务已自动停止。";
  }
  if (error?.code === "OCR_TIMEOUT") {
    return "手机识别超过 45 秒，任务已自动停止。请裁剪掉截图中无关区域后重试。";
  }
  if (error?.code === "IMAGE_TIMEOUT") {
    return "手机处理图片超时，请在相册中裁剪截图或降低图片大小后重试。";
  }
  if (["IMAGE_DECODE_FAILED", "IMAGE_COMPRESS_FAILED", "CANVAS_UNAVAILABLE"].includes(error?.message)) {
    return "这张图片无法在当前浏览器中处理，请换用 JPG 或 PNG 截图。";
  }
  return "没有成功识别这张截图，请检查网络，或换一张更清晰、包含金额和时间的截图。";
}

function parseReceiptText(rawText) {
  const text = String(rawText || "")
    .replace(/[，]/g, ",")
    .replace(/[：]/g, ":")
    .replace(/[￥]/g, "¥");
  const compactText = text.replace(/\s+/g, " ");
  const type = inferReceiptType(compactText);
  const amount = inferReceiptAmount(text);
  const date = inferReceiptDate(compactText);
  const category = inferReceiptCategory(compactText, type);
  const note = inferReceiptNote(text, category);
  return { type, amount, date, ...category, note };
}

function isReceiptListScreenshot(rawText) {
  const lines = String(rawText || "")
    .replace(/[，]/g, ",")
    .replace(/[：]/g, ":")
    .split(/\r?\n/)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const datedLines = lines.filter((line) =>
    /(?:20\d{2}[-/.年]\d{1,2}[-/.月]\d{1,2}|\d{1,2}[-/]\d{1,2})\D{0,8}\d{1,2}:\d{2}/.test(line)
  );
  const amountLines = lines.filter(
    (line) =>
      !/\d{1,2}[-/]\d{1,2}\D{0,8}\d{1,2}:\d{2}/.test(line) &&
      /(?:^|\s)[+＋\-−–—]?\s*[¥￥]?\s*\d[\d,]*\.\d{1,2}(?:\s|$)/.test(line)
  );
  return datedLines.length >= 2 && amountLines.length >= 2;
}

function inferReceiptType(text) {
  const compactText = String(text || "").replace(/\s+/g, "").replace(/[·•丨|]/g, "");
  const incomeKeywords = [
    "收款成功",
    "已收款",
    "收入",
    "到账",
    "转入",
    "退款成功",
    "退款到账",
    "对方向你转账",
    "余额宝收益",
    "收益发放",
    "收益到账",
    "利息收入"
  ];
  return incomeKeywords.some((keyword) => compactText.includes(keyword)) ? "income" : "expense";
}

function inferReceiptAmount(text) {
  const priorityPatterns = [
    /(?:实付|支付金额|付款金额|订单金额|交易金额|合计|金额|收款)[^\d¥￥]{0,10}[¥￥]?\s*([0-9][0-9,]*(?:\.[0-9]{1,2})?)/gi,
    /[¥￥]\s*([0-9][0-9,]*(?:\.[0-9]{1,2})?)/g,
    /[-−–—﹣－]\s*[¥￥]?\s*([0-9][0-9,]*(?:\.[0-9]{1,2})?)/g
  ];
  for (const pattern of priorityPatterns) {
    const matches = [...text.matchAll(pattern)]
      .map((match) => parseOcrAmountToken(match[1]))
      .filter((value) => Number.isFinite(value) && value > 0 && value < 10000000);
    if (matches.length) return Math.max(...matches);
  }
  return null;
}

function parseOcrAmountToken(value) {
  const token = String(value || "").replace(/\s+/g, "");
  if (/^\d+,\d{1,2}$/.test(token)) return Number.parseFloat(token.replace(",", "."));
  return Number.parseFloat(token.replaceAll(",", ""));
}

function inferReceiptDate(text) {
  const fullDateMatch = text.match(/(20\d{2})\s*[年./-]\s*(\d{1,2})\s*[月./-]\s*(\d{1,2})\s*日?/);
  if (fullDateMatch) return toValidDate(fullDateMatch[1], fullDateMatch[2], fullDateMatch[3]);

  const currentYear = Number(getShanghaiDay().slice(0, 4));
  const shortDateMatches = text.matchAll(
    /(?:交易时间|支付时间|创建时间|付款时间|日期)?[^\d]{0,6}(\d{1,2})\s*[月./-]\s*(\d{1,2})\s*日?/g
  );
  for (const shortDateMatch of shortDateMatches) {
    let candidate = toValidDate(currentYear, shortDateMatch[1], shortDateMatch[2]);
    if (!candidate) continue;
    if (candidate > getShanghaiDay()) {
      candidate = toValidDate(currentYear - 1, shortDateMatch[1], shortDateMatch[2]);
    }
    if (candidate) return candidate;
  }
  return "";
}

function toValidDate(year, month, day) {
  const value = `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  const parsed = new Date(`${value}T12:00:00+08:00`);
  return Number.isNaN(parsed.getTime()) || getShanghaiDay(parsed) !== value ? "" : value;
}

function inferReceiptCategory(text, type) {
  const rules =
    type === "income"
      ? [
          { words: ["工资", "薪资", "薪酬"], major: "工资", minor: "工资" },
          { words: ["奖金", "年终奖"], major: "工资", minor: "奖金" },
          { words: ["补贴", "津贴"], major: "工资", minor: "补贴" },
          { words: ["利息", "余额宝", "收益"], major: "理财", minor: "利息" },
          { words: ["基金", "股票", "证券"], major: "理财", minor: "基金股票" },
          { words: ["分红"], major: "理财", minor: "分红" },
          { words: ["报销", "交通费"], major: "报销", minor: "其他报销" },
          { words: ["退款", "退回"], major: "其他", minor: "退款" },
          { words: ["转账", "收款"], major: "其他", minor: "转账" }
        ]
      : [
          { words: ["地铁", "公交", "轨道交通"], major: "交通", minor: "地铁公交" },
          { words: ["滴滴", "打车", "出租车", "网约车"], major: "交通", minor: "打车" },
          { words: ["加油", "充电站", "充电桩"], major: "交通", minor: "加油充电" },
          { words: ["停车"], major: "交通", minor: "停车" },
          { words: ["铁路", "高铁", "机票", "航空"], major: "交通", minor: "高铁机票" },
          {
            words: ["咖啡", "奶茶", "茶饮", "瑞幸", "星巴克", "茶百道", "霸王茶姬", "喜茶", "盒补补", "原浆饮"],
            major: "餐饮",
            minor: "咖啡奶茶"
          },
          { words: ["早餐", "包子", "豆浆"], major: "餐饮", minor: "早餐" },
          { words: ["午餐", "午饭"], major: "餐饮", minor: "午餐" },
          { words: ["晚餐", "晚饭", "夜宵"], major: "餐饮", minor: "晚餐" },
          { words: ["超市", "买菜", "生鲜", "菜场", "盒马"], major: "餐饮", minor: "买菜" },
          { words: ["水果", "零食"], major: "餐饮", minor: "水果零食" },
          { words: ["餐饮", "美团外卖", "饿了么", "饭店", "餐厅", "小吃"], major: "餐饮", minor: "午餐" },
          { words: ["房租", "房贷"], major: "居家", minor: "房租房贷" },
          { words: ["水费", "电费", "燃气"], major: "居家", minor: "水电燃气" },
          { words: ["话费", "中国移动", "中国联通", "中国电信"], major: "居家", minor: "话费" },
          { words: ["医院", "诊所", "挂号"], major: "医疗", minor: "挂号" },
          { words: ["药房", "药店", "医药"], major: "医疗", minor: "药品" },
          { words: ["电影", "影院", "演出"], major: "娱乐", minor: "电影演出" },
          { words: ["酒店", "旅行", "景区"], major: "娱乐", minor: "旅行" },
          { words: ["淘宝", "天猫", "京东", "拼多多", "购物", "无印良品", "MUJI", "日用百货"], major: "购物", minor: "日用品" },
          { words: ["红包"], major: "人情", minor: "红包" }
        ];
  const matchedRule = rules.find((rule) => rule.words.some((word) => text.includes(word)));
  return matchedRule || { major: "其他", minor: type === "income" ? "未分类" : "未分类" };
}

function inferReceiptNote(text, category) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const labeledLine = lines.find((line) => /(?:收款方|商户|交易对方|付款给|商品说明|订单名称|商品)/.test(line));
  if (labeledLine) {
    const note = labeledLine.replace(/^.*?(?:收款方|商户|交易对方|付款给|商品说明|订单名称|商品)\s*[:：]?\s*/, "").trim();
    if (note) return note.slice(0, 60);
  }
  const ignored = /(?:支付成功|交易成功|付款成功|账单详情|订单详情|支付金额|付款金额|交易金额|实付|¥|￥|\d{1,4}[年./-]\d{1,2})/;
  const candidate = lines.find((line) => line.length >= 2 && line.length <= 40 && !ignored.test(line));
  return (candidate || `${category.major}/${category.minor}（截图识别）`).slice(0, 60);
}

function applyReceiptResult(result) {
  clearReceiptBatch();
  setActiveType(result.type);
  if (result.amount) amountInput.value = result.amount.toFixed(2);
  if (result.date) entryDateInput.value = result.date;
  if (categoryMap[result.type]?.[result.major]) {
    majorSelect.value = result.major;
    fillMinorCategories();
    if (categoryMap[result.type][result.major].includes(result.minor)) {
      minorSelect.value = result.minor;
    }
  }
  syncTripProjectField();
  if (result.note) noteInput.value = result.note;

  const filled = [
    result.amount ? `金额 ${money(result.amount)}` : "",
    result.date ? formatDay(result.date) : "",
    result.type === "income" ? "收入" : "支出",
    `${displayCategory(result.major)} / ${displayMinor(result.minor)}`
  ].filter(Boolean);
  const missingAmountHint = result.amount ? "" : "；未找到金额，请手动填写";
  setReceiptScanStatus(`已填入：${filled.join(" · ")}${missingAmountHint}。请核对后再保存。`, result.amount ? "success" : "error");
  amountInput.focus();
}

function applyReceiptBatchResult(result) {
  pendingReceiptRecords = result.records;
  receiptBatchPanel.hidden = false;
  receiptBatchTitle.textContent = `已从 ${pendingReceiptRecords.length} 张截图识别出记录`;
  receiptBatchList.innerHTML = pendingReceiptRecords
    .map(
      (record, index) => `
        <label class="receipt-batch-item">
          <input type="checkbox" data-batch-index="${index}" checked />
          <span class="receipt-batch-copy">
            <strong>${escapeHtml(record.note)}</strong>
            <span>${escapeHtml(formatDay(record.date))} · ${record.type === "income" ? "收入" : "支出"} · ${escapeHtml(
              `${displayCategory(record.major)} / ${displayMinor(record.minor)}`
            )}</span>
          </span>
          <strong class="receipt-batch-money ${record.type === "income" ? "income" : ""}">
            ${record.type === "income" ? "+" : "-"}${escapeHtml(money(record.amount))}
          </strong>
        </label>
      `
    )
    .join("");
  updateReceiptBatchButton();
  const unreadableHint = result.unreadableCount ? `，${result.unreadableCount} 张未识别或格式不符合要求` : "";
  const listHint = result.listScreenshotCount ? `，${result.listScreenshotCount} 张流水列表截图已跳过` : "";
  setReceiptScanStatus(
    `已识别 ${pendingReceiptRecords.length} 张单笔截图${unreadableHint}${listHint}。请核对后加入账本。`,
    "success"
  );
}

function updateReceiptBatchButton() {
  const selectedCount = receiptBatchList.querySelectorAll("[data-batch-index]:checked").length;
  receiptBatchAddBtn.disabled = selectedCount === 0;
  receiptBatchAddBtn.textContent = selectedCount ? `加入选中的 ${selectedCount} 条` : "请至少选择一条";
}

function clearReceiptBatch() {
  pendingReceiptRecords = [];
  receiptBatchList.innerHTML = "";
  receiptBatchPanel.hidden = true;
  receiptBatchAddBtn.disabled = false;
  receiptBatchAddBtn.textContent = "加入选中记录";
}

async function importSelectedReceiptRecords() {
  const selectedIndexes = [...receiptBatchList.querySelectorAll("[data-batch-index]:checked")].map((input) =>
    Number(input.dataset.batchIndex)
  );
  const selectedItems = selectedIndexes.map((index) => pendingReceiptRecords[index]).filter(Boolean);
  if (!selectedItems.length) {
    setReceiptScanStatus("请至少勾选一条流水。", "error");
    return;
  }

  receiptBatchAddBtn.disabled = true;
  const baseTime = Date.now();
  const importedRecords = selectedItems.map((item, index) => ({
    id: createUuid(),
    type: item.type,
    person: personSelect.value,
    amount: Math.round(item.amount * 100) / 100,
    benefit: item.type === "expense" ? benefitSelect.value || `${personSelect.value}用` : "",
    major: item.major,
    minor: item.minor,
    note: item.note,
    date: item.date || getShanghaiDay(),
    createdAt: new Date(baseTime + index).toISOString(),
    createdBy: currentUser?.id || ""
  }));

  records = [...importedRecords, ...records];
  saveRecords();
  render();
  clearReceiptBatch();
  setReceiptScanStatus(`已将 ${importedRecords.length} 条流水加入账本。`, "success");
  if (isCloudReady) await uploadMissingLocalRecords();
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
      `${displayPerson(record.person)}记账`,
      displayBenefit(record.benefit),
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
      actionsNode.innerHTML = `<span class="record-lock">项目结算</span>`;
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
    record.benefit,
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
  if (!editingRecordId) {
    personSelect.value = getDefaultPerson();
    benefitSelect.value = getDefaultBenefit();
  }
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

function getDefaultBenefit() {
  return `${getDefaultPerson()}用`;
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
    alert("这是出差项目自动生成的结算记录，请到对应项目撤销归档后重新结算。");
    return;
  }
  const linkedTrip = trips.find((trip) => trip.id === record.tripId);
  if (linkedTrip?.archivedAt) {
    alert("已归档项目的费用不能编辑。如需修改，请先撤销归档。");
    return;
  }

  editingRecordId = recordId;
  setActiveType(record.type);
  personSelect.value = record.person;
  amountInput.value = record.amount;
  entryDateInput.value = getRecordDay(record);
  benefitSelect.value = normalizeBenefit(record);
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
  resetForm();
  submitEntryBtn.textContent = "记一笔";
  cancelEditBtn.hidden = true;
}

async function deleteRecord(recordId) {
  const record = records.find((item) => item.id === recordId);
  if (!record) return;
  if (record.tripRole === "settlement") {
    alert("项目结算记录不能直接删除，请到出差项目撤销归档。");
    return;
  }
  const linkedTrip = trips.find((trip) => trip.id === record.tripId);
  if (linkedTrip?.archivedAt) {
    alert("已归档项目的费用不能删除。如需修改，请先撤销归档。");
    return;
  }
  if (!confirm(`确定删除这条记录吗？\n${displayCategory(record.major)} / ${displayMinor(record.minor)} ${money(record.amount)}`)) return;

  records = records.filter((item) => item.id !== recordId);
  if (editingRecordId === recordId) cancelEdit();
  saveRecords();
  render();

  if (isCloudReady) {
    const { error } = await supabaseClient.from("records").delete().eq("family_id", familyId).eq("id", recordId);
    if (error) {
      setCloudState("删除云端记录失败", "本机已删除，稍后点“同步”会重新拉取云端记录。");
      return;
    }
    setCloudState("云同步已开启", `${currentUser.email} · ${getLedgerCountLabel()}`);
  }
}

async function initCloud() {
  if (!supabaseClient) {
    setCloudState("本地模式", "填好 Supabase 配置并登录后，会自动同步到云端。");
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
    setCloudState("云同步已开启", `${currentUser.email} · ${getLedgerCountLabel()}`);
  } else if (supabaseClient) {
    setCloudState("待登录", "输入 Supabase 用户邮箱和密码后即可同步。");
  } else {
    setCloudState("本地模式", "填好 Supabase 配置并登录后，会自动同步到云端。");
  }
}

function setCloudState(title, hint) {
  cloudStatus.textContent = title;
  cloudHint.textContent = hint;
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

async function syncCloudRecords() {
  if (!isCloudReady) {
    updateAuthUi();
    return;
  }

  setCloudState("正在同步", "正在读取云端账本。");
  if (!(await uploadMissingLocalTrips())) return;
  if (!(await uploadMissingLocalRecords())) return;

  const { data: tripRows, error: tripError } = await supabaseClient
    .from("business_trips")
    .select(cloudTripFields)
    .eq("family_id", familyId)
    .order("start_on", { ascending: false });
  if (tripError) {
    setCloudState("出差项目同步失败", formatCloudSchemaError(tripError));
    return;
  }

  const { data: recordRows, error: recordError } = await supabaseClient
    .from("records")
    .select(cloudRecordFields)
    .eq("family_id", familyId)
    .order("created_at", { ascending: false });

  if (recordError) {
    setCloudState("账目同步失败", formatCloudSchemaError(recordError));
    return;
  }

  const shouldRepairCloudBenefits = recordRows.some((row) => row.benefit === "自己用");
  const syncedRecords = recordRows.map(fromCloudRecord).filter(isRecord);
  const migratedRecords = migrateRecords(syncedRecords);
  trips = tripRows.map(fromCloudTrip).filter(isTrip).map(normalizeTrip);
  records = migratedRecords;
  if (activeTripId && !trips.some((trip) => trip.id === activeTripId && !trip.deletedAt)) activeTripId = "";
  saveTrips();
  saveRecords();
  render();
  if (shouldRepairCloudBenefits || hasBenefitMigration(syncedRecords, migratedRecords)) {
    await uploadMissingLocalRecords();
  }
  setCloudState("云同步已开启", `${currentUser.email} · ${getLedgerCountLabel()}`);
}

async function uploadMissingLocalRecords() {
  if (!isCloudReady || !records.length) return true;

  const rows = records.map(toCloudRecord);
  const { error } = await supabaseClient.from("records").upsert(rows, { onConflict: "id" });
  if (error) {
    setCloudState("账目上传失败", formatCloudSchemaError(error));
    return false;
  }
  return true;
}

async function saveCloudRecord(record) {
  return saveCloudRecords([record]);
}

async function saveCloudRecords(recordItems) {
  if (!isCloudReady || !recordItems.length) return true;
  setCloudState("正在保存", "正在写入云端账本。");
  const { error } = await supabaseClient.from("records").upsert(recordItems.map(toCloudRecord), { onConflict: "id" });

  if (error) {
    setCloudState("保存到云端失败", `${formatCloudSchemaError(error)}；已保存在本机，可稍后重试同步。`);
    return false;
  }

  setCloudState("云同步已开启", `${currentUser.email} · ${getLedgerCountLabel()}`);
  return true;
}

async function uploadMissingLocalTrips() {
  if (!isCloudReady || !trips.length) return true;
  const { error } = await supabaseClient.from("business_trips").upsert(trips.map(toCloudTrip), { onConflict: "id" });
  if (error) {
    setCloudState("出差项目上传失败", formatCloudSchemaError(error));
    return false;
  }
  return true;
}

async function saveCloudTrip(trip) {
  if (!isCloudReady) return true;
  lastCloudTripError = null;
  setCloudState("正在保存", "正在写入出差项目。");
  const { error } = await supabaseClient.from("business_trips").upsert(toCloudTrip(trip), { onConflict: "id" });
  if (error) {
    lastCloudTripError = error;
    setCloudState("出差项目保存失败", `${formatCloudSchemaError(error)}；已保存在本机，可稍后重试同步。`);
    return false;
  }
  setCloudState("云同步已开启", `${currentUser.email} · ${getLedgerCountLabel()}`);
  return true;
}

async function deleteCloudRecord(recordId) {
  if (!isCloudReady) return true;
  const { error } = await supabaseClient.from("records").delete().eq("family_id", familyId).eq("id", recordId);
  if (error) {
    setCloudState("删除云端记录失败", formatCloudSchemaError(error));
    return false;
  }
  return true;
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
    created_by: currentUser.id,
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
    created_by: currentUser.id
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

function formatCloudSchemaError(error) {
  const message = String(error?.message || "云端操作失败");
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.includes("business_trips") || lowerMessage.includes("trip_id") || lowerMessage.includes("trip_role") || lowerMessage.includes("schema cache")) {
    return "云端还没有出差模块的数据表，请先在 Supabase SQL Editor 重新运行新版 supabase-schema.sql";
  }
  return message;
}

function getLedgerCountLabel() {
  return `${records.length} 条账目 · ${trips.filter((trip) => !trip.deletedAt).length} 个出差项目`;
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
    localStorage.getItem(tripStorageKey) || ""
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

function displayCategory(category) {
  return categoryLabels[category] || category;
}

function displayMinor(minor) {
  return minorLabels[minor] || minor;
}

function displayBenefit(benefit) {
  return benefitLabels[benefit] || benefit;
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

function isDailyRecord(record) {
  return !isTripExpenseRecord(record);
}

function syncBenefitField() {
  const isExpense = activeType === "expense";
  benefitField.hidden = !isExpense;
  benefitSelect.disabled = !isExpense;
  if (isExpense && !benefitSelect.value) {
    benefitSelect.value = getDefaultBenefit();
  }
}

function syncBenefitWithPerson() {
  if (activeType !== "expense") return;
  const individualBenefits = people.map((person) => `${person}用`);
  if (!benefitSelect.value || individualBenefits.includes(benefitSelect.value)) {
    benefitSelect.value = `${personSelect.value}用`;
  }
}

function migrateRecords(items) {
  return items.map(normalizeRecordBenefit);
}

function normalizeRecordBenefit(record) {
  const nextBenefit = normalizeBenefit(record);
  if (nextBenefit === (record.benefit || "")) return record;
  return { ...record, benefit: nextBenefit };
}

function normalizeBenefit(record) {
  if (record.type !== "expense") return "";
  if (record.benefit && record.benefit !== "自己用") return record.benefit;
  return people.includes(record.person) ? `${record.person}用` : getDefaultBenefit();
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
calendarViewMonth = exportStartDateInput.value.slice(0, 7);
updateDateRangeText();
updateDetailDateRangeText();
renderCalendar();
syncBenefitField();
fillMajorCategories();
fillDetailCategories();
fillTripProjectOptions();
render();
initCloud();
