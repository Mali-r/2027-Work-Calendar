// Same reference data as the frontend (client/index.html SEED_HOLIDAYS / DEFAULT_*),
// used to seed the database on first boot only. Safe to edit later via the app's
// Settings screen — this file is only read when the relevant collection is empty.

const DEFAULT_RESPONSIBLE = [
  "คุณครีม", "คุณแนตตี้", "คุณโบ", "คุณโอ็ค", "คุณอาร์ม",
  "คุณนาทาน", "คุณช้าง", "คุณก้อง", "นักศึกษาฝึกงาน", "ทีมทั้งหมด",
];

const DEFAULT_CATEGORIES = [
  { name: "งานด่วน", emoji: "📌" }, { name: "งานประจำ", emoji: "📋" }, { name: "ประชุม", emoji: "👥" },
  { name: "Follow-up", emoji: "📞" }, { name: "Report", emoji: "📊" }, { name: "Transport", emoji: "🚚" },
  { name: "Project", emoji: "💼" }, { name: "Document", emoji: "📝" }, { name: "Deadline", emoji: "📅" },
  { name: "Idea", emoji: "💡" }, { name: "Important", emoji: "⭐" }, { name: "Reminder", emoji: "🔔" },
];

// Thai official holidays 2027 per Bank of Thailand Notification No.37/2569,
// gazetted 17 Aug 2026 (confirmed, not tentative) + fixed observance days +
// a curated set of International/UN days useful for work planning.
const SEED_HOLIDAYS = [
  { date: "2027-01-01", name: "วันขึ้นปีใหม่", nameEn: "New Year's Day", type: "public", tentative: false },
  { date: "2027-01-09", name: "วันเด็กแห่งชาติ", nameEn: "National Children's Day", type: "important", tentative: false },
  { date: "2027-01-16", name: "วันครู", nameEn: "Teachers' Day", type: "important", tentative: false },
  { date: "2027-02-21", name: "วันมาฆบูชา", nameEn: "Makha Bucha Day", type: "buddhist", tentative: false },
  { date: "2027-02-22", name: "ชดเชยวันมาฆบูชา", nameEn: "Substitution for Makha Bucha Day", type: "public", tentative: false },
  { date: "2027-04-06", name: "วันจักรี", nameEn: "Chakri Memorial Day", type: "public", tentative: false },
  { date: "2027-04-13", name: "วันสงกรานต์", nameEn: "Songkran Festival", type: "public", tentative: false },
  { date: "2027-04-14", name: "วันสงกรานต์", nameEn: "Songkran Festival", type: "public", tentative: false },
  { date: "2027-04-15", name: "วันสงกรานต์", nameEn: "Songkran Festival", type: "public", tentative: false },
  { date: "2027-05-01", name: "วันแรงงานแห่งชาติ", nameEn: "National Labour Day", type: "important", tentative: false },
  { date: "2027-05-03", name: "ชดเชยวันแรงงานแห่งชาติ", nameEn: "Substitution for Labour Day", type: "public", tentative: false },
  { date: "2027-05-04", name: "วันฉัตรมงคล", nameEn: "Coronation Day", type: "royal", tentative: false },
  { date: "2027-05-20", name: "วันวิสาขบูชา", nameEn: "Visakha Bucha Day", type: "buddhist", tentative: false },
  { date: "2027-06-03", name: "วันเฉลิมพระชนมพรรษา สมเด็จพระนางเจ้าฯ พระบรมราชินี", nameEn: "H.M. Queen Suthida's Birthday", type: "royal", tentative: false },
  { date: "2027-07-18", name: "วันอาสาฬหบูชา", nameEn: "Asarnha Bucha Day", type: "buddhist", tentative: false },
  { date: "2027-07-19", name: "ชดเชยวันอาสาฬหบูชา", nameEn: "Substitution for Asarnha Bucha Day", type: "public", tentative: false },
  { date: "2027-07-28", name: "วันเฉลิมพระชนมพรรษา ร.10", nameEn: "H.M. King Vajiralongkorn's Birthday", type: "royal", tentative: false },
  { date: "2027-08-12", name: "วันแม่แห่งชาติ", nameEn: "Queen Mother's Birthday / National Mother's Day", type: "family", tentative: false },
  { date: "2027-10-13", name: "วันนวมินทรมหาราช", nameEn: "King Bhumibol Memorial Day", type: "royal", tentative: false },
  { date: "2027-10-23", name: "วันปิยมหาราช", nameEn: "Chulalongkorn Memorial Day", type: "royal", tentative: false },
  { date: "2027-10-25", name: "ชดเชยวันปิยมหาราช", nameEn: "Substitution for Chulalongkorn Memorial Day", type: "public", tentative: false },
  { date: "2027-12-05", name: "วันพ่อแห่งชาติ", nameEn: "National Day / Father's Day", type: "royal", tentative: false },
  { date: "2027-12-06", name: "ชดเชยวันพ่อแห่งชาติ", nameEn: "Substitution", type: "public", tentative: false },
  { date: "2027-12-10", name: "วันรัฐธรรมนูญ", nameEn: "Constitution Day", type: "public", tentative: false },
  { date: "2027-12-31", name: "วันสิ้นปี", nameEn: "New Year's Eve", type: "public", tentative: false },
  { date: "2027-01-04", name: "วันอักษรเบรลล์โลก", nameEn: "World Braille Day", type: "international", tentative: false },
  { date: "2027-01-24", name: "วันการศึกษาสากล", nameEn: "International Day of Education", type: "international", tentative: false },
  { date: "2027-02-02", name: "วันพื้นที่ชุ่มน้ำโลก", nameEn: "World Wetlands Day", type: "international", tentative: false },
  { date: "2027-02-11", name: "วันสตรีและเด็กหญิงในวิทยาศาสตร์สากล", nameEn: "Intl Day of Women & Girls in Science", type: "international", tentative: false },
  { date: "2027-03-08", name: "วันสตรีสากล", nameEn: "International Women's Day", type: "international", tentative: false },
  { date: "2027-03-20", name: "วันความสุขสากล", nameEn: "International Day of Happiness", type: "international", tentative: false },
  { date: "2027-04-07", name: "วันอนามัยโลก", nameEn: "World Health Day", type: "international", tentative: false },
  { date: "2027-04-22", name: "วันคุ้มครองโลก", nameEn: "Earth Day", type: "international", tentative: false },
  { date: "2027-05-15", name: "วันครอบครัวสากล", nameEn: "International Day of Families", type: "international", tentative: false },
  { date: "2027-05-17", name: "วันโทรคมนาคมโลก", nameEn: "World Telecommunication Day", type: "international", tentative: false },
  { date: "2027-06-05", name: "วันสิ่งแวดล้อมโลก", nameEn: "World Environment Day", type: "international", tentative: false },
  { date: "2027-06-08", name: "วันทะเลโลก", nameEn: "World Oceans Day", type: "international", tentative: false },
  { date: "2027-07-11", name: "วันประชากรโลก", nameEn: "World Population Day", type: "international", tentative: false },
  { date: "2027-07-30", name: "วันมิตรภาพสากล", nameEn: "International Day of Friendship", type: "international", tentative: false },
  { date: "2027-08-12", name: "วันเยาวชนสากล", nameEn: "International Youth Day", type: "international", tentative: false },
  { date: "2027-09-15", name: "วันประชาธิปไตยสากล", nameEn: "International Day of Democracy", type: "international", tentative: false },
  { date: "2027-09-21", name: "วันสันติภาพสากล", nameEn: "International Day of Peace", type: "international", tentative: false },
  { date: "2027-10-01", name: "วันผู้สูงอายุสากล", nameEn: "International Day of Older Persons", type: "international", tentative: false },
  { date: "2027-10-10", name: "วันสุขภาพจิตโลก", nameEn: "World Mental Health Day", type: "international", tentative: false },
  { date: "2027-10-16", name: "วันอาหารโลก", nameEn: "World Food Day", type: "international", tentative: false },
  { date: "2027-10-24", name: "วันสหประชาชาติ", nameEn: "United Nations Day", type: "international", tentative: false },
  { date: "2027-11-19", name: "วันส้วมโลก", nameEn: "World Toilet Day", type: "international", tentative: false },
  { date: "2027-11-25", name: "วันยุติความรุนแรงต่อสตรีสากล", nameEn: "Intl Day for Elim. of Violence against Women", type: "international", tentative: false },
  { date: "2027-12-03", name: "วันคนพิการสากล", nameEn: "Intl Day of Persons with Disabilities", type: "international", tentative: false },
  { date: "2027-12-10", name: "วันสิทธิมนุษยชน", nameEn: "Human Rights Day", type: "international", tentative: false },
];

module.exports = { DEFAULT_RESPONSIBLE, DEFAULT_CATEGORIES, SEED_HOLIDAYS };
