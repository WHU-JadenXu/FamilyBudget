const people = ["李逍宇", "徐佳丹"];

const personLabels = {
  李逍宇: "👦 李逍宇",
  徐佳丹: "👧 徐佳丹"
};

const categoryMap = {
  expense: {
    餐饮: ["早餐", "午餐", "晚餐", "买菜", "水果零食", "咖啡奶茶"],
    交通: ["地铁公交", "打车", "加油充电", "停车", "高铁机票"],
    居家: ["房租房贷", "水电燃气", "网费", "话费", "会员费", "物业", "家政", "维修"],
    购物: ["日用品", "服饰", "数码", "护肤美妆", "礼物"],
    医疗: ["挂号", "药品", "体检", "保险"],
    娱乐: ["电影演出", "旅行", "游戏会员", "聚会", "运动"],
    人情: ["红包", "请客", "父母家人", "朋友往来"],
    其他: ["未分类"]
  },
  income: {
    工资: ["工资", "奖金", "补贴"],
    理财: ["利息", "基金股票", "分红"],
    报销: ["交通报销", "餐费报销", "其他报销"],
    其他: ["转账", "退款", "未分类"]
  }
};

const categoryLabels = {
  餐饮: "🍜 餐饮",
  交通: "🚇 交通",
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
  转账: "↔️ 转账",
  退款: "↩️ 退款"
};

const benefitLabels = {
  李逍宇用: "👦 李逍宇用",
  徐佳丹用: "👧 徐佳丹用",
  两个人共用: "👫 两个人共用"
};

const storageKey = "family-ledger-web-v1";
const config = window.LEDGER_CONFIG || {};
const familyId = config.FAMILY_ID || "li-xu-family";
const configuredSiteUrl = (config.SITE_URL || "").trim();
const accountPersonHashes = {
  ee45a0526b47945f5f90fe628309aa0dd33d00838588e961a8e93cacc981a518: "徐佳丹",
  bc4d99bb615536adf2339e5d10d749dd13e16350993b48a485370d2a6437840a: "李逍宇",
  ...(config.ACCOUNT_PERSON_HASHES || {})
};
const hasSupabaseConfig = Boolean(config.SUPABASE_URL && config.SUPABASE_ANON_KEY);
const supabaseClient =
  hasSupabaseConfig && window.supabase
    ? window.supabase.createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY)
    : null;

let activeType = "expense";
let records = loadRecords();
let currentUser = null;
let isCloudReady = false;
let editingRecordId = "";
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
const recentRecordsList = document.querySelector("#recentRecordsList");
const allRecordsList = document.querySelector("#allRecordsList");
const filterPerson = document.querySelector("#filterPerson");
const searchInput = document.querySelector("#searchInput");
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

document.querySelectorAll(".segment").forEach((button) => {
  button.addEventListener("click", () => {
    activeType = button.dataset.type;
    document.querySelectorAll(".segment").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    syncBenefitField();
    fillMajorCategories();
  });
});

majorSelect.addEventListener("change", fillMinorCategories);
personSelect.addEventListener("change", syncBenefitWithPerson);
filterPerson.addEventListener("change", render);
searchInput.addEventListener("input", render);
recentRecordsList.addEventListener("click", handleRecordAction);
allRecordsList.addEventListener("click", handleRecordAction);
syncBtn.addEventListener("click", syncCloudRecords);
logoutBtn.addEventListener("click", signOut);
cancelEditBtn.addEventListener("click", cancelEdit);
dateRangeBtn.addEventListener("click", toggleCalendarPanel);
calendarPrevBtn.addEventListener("click", () => shiftCalendarMonth(-1));
calendarNextBtn.addEventListener("click", () => shiftCalendarMonth(1));
calendarGrid.addEventListener("click", handleCalendarClick);
document.addEventListener("click", closeCalendarOnOutsideClick);
bottomTabs.forEach((button) => {
  button.addEventListener("click", () => switchPage(button.dataset.targetPage));
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

  if (editingRecordId) {
    const existingRecord = records.find((item) => item.id === editingRecordId);
    if (!existingRecord) {
      cancelEdit();
      return;
    }

    const updatedRecord = {
      ...existingRecord,
      type: activeType,
      person: personSelect.value,
      amount: Math.round(amount * 100) / 100,
      benefit: activeType === "expense" ? benefitSelect.value : "",
      major: majorSelect.value,
      minor: minorSelect.value,
      note: noteInput.value.trim(),
      date: entryDateInput.value
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
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    type: activeType,
    person: personSelect.value,
    amount: Math.round(amount * 100) / 100,
    benefit: activeType === "expense" ? benefitSelect.value : "",
    major: majorSelect.value,
    minor: minorSelect.value,
    note: noteInput.value.trim(),
    date: entryDateInput.value,
    createdAt: new Date().toISOString(),
    createdBy: currentUser?.id || ""
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
  const blob = new Blob([JSON.stringify(records, null, 2)], { type: "application/json" });
  downloadBlob(blob, `家庭记账-${getShanghaiDay()}.json`);
});

document.querySelector("#exportExcelBtn").addEventListener("click", exportExcelRecords);

document.querySelector("#importFile").addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  try {
    const imported = JSON.parse(await file.text());
    if (!Array.isArray(imported)) throw new Error("Invalid data");
    records = migrateRecords(imported.filter(isRecord));
    saveRecords();
    render();
    if (isCloudReady) {
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
  if (!records.length && !isCloudReady) return;
  const storageSize = getLocalStorageSize();
  const sizeLabel = storageSize ? `\n当前本地数据约 ${formatBytes(storageSize)}。` : "";
  const countLabel = records.length ? `全部 ${records.length} 条` : "全部";
  const captcha = createCaptchaCode();
  const answer = prompt(`确定清空当前账本的${countLabel}记账记录吗？${sizeLabel}\n\n这个操作会清空本地记录；如果已登录同步，也会清空云端数据库记录。\n\n请输入验证码 ${captcha} 后继续：`);
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
  }

  records = [];
  saveRecords();
  render();
  updateAuthUi();
});

function toggleCalendarPanel(event) {
  event.stopPropagation();
  calendarPanel.hidden = !calendarPanel.hidden;
  if (!calendarPanel.hidden) renderCalendar();
}

function closeCalendarOnOutsideClick(event) {
  if (calendarPanel.hidden) return;
  if (calendarPanel.contains(event.target) || dateRangeBtn.contains(event.target)) return;
  calendarPanel.hidden = true;
}

function shiftCalendarMonth(offset) {
  calendarViewMonth = addMonths(calendarViewMonth, offset);
  renderCalendar();
}

function handleCalendarClick(event) {
  const dayButton = event.target.closest("[data-calendar-day]");
  if (!dayButton) return;
  const selectedDay = dayButton.dataset.calendarDay;
  const startDate = exportStartDateInput.value;
  const endDate = exportEndDateInput.value;

  if (!startDate || (startDate && endDate)) {
    exportStartDateInput.value = selectedDay;
    exportEndDateInput.value = "";
  } else if (selectedDay < startDate) {
    exportStartDateInput.value = selectedDay;
    exportEndDateInput.value = startDate;
    calendarPanel.hidden = true;
  } else {
    exportEndDateInput.value = selectedDay;
    calendarPanel.hidden = true;
  }

  updateDateRangeText();
  renderCalendar();
}

function renderCalendar() {
  const [year, month] = calendarViewMonth.split("-").map(Number);
  const firstDay = new Date(year, month - 1, 1);
  const daysInMonth = new Date(year, month, 0).getDate();
  const leadingDays = (firstDay.getDay() + 6) % 7;
  const startDate = exportStartDateInput.value;
  const endDate = exportEndDateInput.value;

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
      .select("id,type,person,amount,benefit,major,minor,note,spent_on,created_at,created_by")
      .eq("family_id", familyId)
      .gte("spent_on", startDate)
      .lte("spent_on", endDate)
      .order("spent_on", { ascending: true });

    if (!error) {
      return data.map(fromCloudRecord).filter(isRecord);
    }

    setCloudState("导出读取云端失败", "已改用本机记录导出。");
  }

  return records.filter((record) => {
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
}

function fillMinorCategories() {
  const minors = categoryMap[activeType][majorSelect.value] || [];
  minorSelect.innerHTML = minors
    .map((name) => `<option value="${name}">${displayMinor(name)}</option>`)
    .join("");
}

function render() {
  const today = getShanghaiDay();
  const monthKey = today.slice(0, 7);
  const monthRecords = records.filter((record) => getRecordDay(record).slice(0, 7) === monthKey);
  const query = searchInput.value.trim().toLowerCase();
  const visibleRecords = records.filter((record) => {
    const personMatched = filterPerson.value === "all" || record.person === filterPerson.value;
    if (!personMatched) return false;
    if (!query) return true;
    return getRecordSearchText(record).includes(query);
  });

  document.querySelector("#monthLabel").textContent = `今天 ${formatDay(today)}`;
  document.querySelector("#monthExpense").textContent = money(sum(monthRecords, "expense"));
  document.querySelector("#monthIncome").textContent = money(sum(monthRecords, "income"));
  document.querySelector("#liTotal").textContent = money(sum(monthRecords.filter((record) => record.person === "李逍宇"), "expense"));
  document.querySelector("#xuTotal").textContent = money(sum(monthRecords.filter((record) => record.person === "徐佳丹"), "expense"));

  renderRecordList(recentRecordsList, records.slice(0, 5), {
    emptyText: "还没有记录，先记一笔。",
    limit: 5
  });
  renderRecordList(allRecordsList, visibleRecords, {
    emptyText: records.length ? "没有找到匹配记录。" : "还没有记录，先记一笔。",
    limit: 80
  });
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

  editingRecordId = recordId;
  setActiveType(record.type);
  personSelect.value = record.person;
  amountInput.value = record.amount;
  entryDateInput.value = getRecordDay(record);
  benefitSelect.value = normalizeBenefit(record);
  majorSelect.value = record.major;
  fillMinorCategories();
  minorSelect.value = record.minor;
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
    setCloudState("云同步已开启", `${currentUser.email} · ${records.length} 条记录`);
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
    setCloudState("云同步已开启", `${currentUser.email} · ${records.length} 条记录`);
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
  await uploadMissingLocalRecords();

  const { data, error } = await supabaseClient
    .from("records")
    .select("id,type,person,amount,benefit,major,minor,note,spent_on,created_at,created_by")
    .eq("family_id", familyId)
    .order("created_at", { ascending: false });

  if (error) {
    setCloudState("同步失败", error.message);
    return;
  }

  const shouldRepairCloudBenefits = data.some((row) => row.benefit === "自己用");
  const syncedRecords = data.map(fromCloudRecord).filter(isRecord);
  const migratedRecords = migrateRecords(syncedRecords);
  records = migratedRecords;
  saveRecords();
  render();
  if (shouldRepairCloudBenefits || hasBenefitMigration(syncedRecords, migratedRecords)) {
    await uploadMissingLocalRecords();
  }
  setCloudState("云同步已开启", `${currentUser.email} · ${records.length} 条记录`);
}

async function uploadMissingLocalRecords() {
  if (!isCloudReady || !records.length) return;

  const rows = records.map(toCloudRecord);
  const { error } = await supabaseClient.from("records").upsert(rows, { onConflict: "id" });
  if (error) {
    setCloudState("上传失败", error.message);
  }
}

async function saveCloudRecord(record) {
  setCloudState("正在保存", "正在写入云端账本。");
  const { error } = await supabaseClient.from("records").upsert(toCloudRecord(record), { onConflict: "id" });

  if (error) {
    setCloudState("保存到云端失败", "已保存在本机，稍后可以点“同步”重试。");
    return;
  }

  setCloudState("云同步已开启", `${currentUser.email} · ${records.length} 条记录`);
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
    created_by: currentUser.id
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
    createdBy: row.created_by || ""
  });
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

function getLocalStorageSize() {
  return new Blob([localStorage.getItem(storageKey) || ""]).size;
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
    (typeof record.createdBy === "string" || typeof record.createdBy === "undefined")
  );
}

entryDateInput.value = getShanghaiDay();
exportStartDateInput.value = getMonthStartDay();
exportEndDateInput.value = getShanghaiDay();
calendarViewMonth = exportStartDateInput.value.slice(0, 7);
updateDateRangeText();
renderCalendar();
syncBenefitField();
fillMajorCategories();
render();
initCloud();
