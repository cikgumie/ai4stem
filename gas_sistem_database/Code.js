/**
 * Konfigurasi Terikat (Container-bound)
 * Menguruskan paparan antaramuka dan operasi pangkalan data.
 */

function doGet(e) {
  if (e && e.parameter && e.parameter.action === 'getData') {
    const data = dapatkanDataPenghantaran();
    return ContentService.createTextOutput(JSON.stringify({ status: 'success', data: data }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Borang Penghantaran Pautan')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Menguruskan Hantaran API HTTP POST dari Laman Web Luar (AI4STEM Web App).
 */
function doPost(e) {
  try {
    let payload = {};
    if (e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      payload = e.parameter;
    }
    
    if (payload.action === 'getData') {
      const data = dapatkanDataPenghantaran();
      return ContentService.createTextOutput(JSON.stringify({ status: 'success', data: data }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const res = simpanBorang(payload);
    
    return ContentService.createTextOutput(JSON.stringify(res))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Menjana struktur pangkalan data secara automatik.
 * Laksanakan fungsi ini sekali sahaja sebelum sistem digunakan.
 */
function createDatabase() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Penjanaan Jadual Utama
  let sheetPenghantaran = ss.getSheetByName('Penghantaran');
  if (!sheetPenghantaran) {
    sheetPenghantaran = ss.insertSheet('Penghantaran');
    sheetPenghantaran.appendRow(['ID', 'NAMA_SEKOLAH', 'KOD_SEKOLAH', 'LINK_SITE', 'TIMESTAMP', 'SESSION_TOKEN']);
    sheetPenghantaran.setFrozenRows(1);
    
    // Melindungi baris pengepala daripada disunting secara tidak sengaja
    const protection = sheetPenghantaran.getRange('1:1').protect();
    protection.setDescription('Pengepala Jadual Utama');
  }
  
  // Penjanaan Jadual Modul Pentadbir (Global Settings)
  let sheetTetapan = ss.getSheetByName('Tetapan');
  if (!sheetTetapan) {
    sheetTetapan = ss.insertSheet('Tetapan');
    sheetTetapan.appendRow(['KUNCI', 'NILAI']);
    sheetTetapan.appendRow(['NAMA_SISTEM', 'Sistem Penghantaran Pautan']);
    sheetTetapan.appendRow(['KOD_SISTEM', 'SPL-2026']);
    sheetTetapan.setFrozenRows(1);
  }
  
  return "Pangkalan data berjaya dijana.";
}

/**
 * Pertahanan XSS & Sanitasi HTML Kustom.
 */
function sanitizeInput(input) {
  if (input === null || input === undefined) return "";
  return String(input).trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * Menjana Token Sesi Sementara (UUID).
 */
function generateSessionToken() {
  return Utilities.getUuid();
}

/**
 * Menguruskan penulisan data melalui LockService untuk kawalan serentak.
 */
function simpanBorang(payload) {
  const lock = LockService.getScriptLock();
  
  try {
    // Menetapkan ambang 10 saat untuk pelepasan kunci
    lock.waitLock(10000);
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName('Penghantaran');
    if (!sheet) {
      sheet = ss.getSheets()[0];
    }
    
    if (!sheet) throw new Error("Ralat Pangkalan Data: Helaian Google Sheet tidak wujud.");
    
    // Pelaksanaan sanitasi dan normalisasi teks
    const id = sanitizeInput(payload.id).toUpperCase();
    const namaSekolah = sanitizeInput(payload.namaSekolah).toUpperCase();
    const kodSekolah = sanitizeInput(payload.kodSekolah).toUpperCase();
    const linkSite = sanitizeInput(payload.linkSite);
    const timestamp = new Date();
    const sessionToken = generateSessionToken();
    
    sheet.appendRow([id, namaSekolah, kodSekolah, linkSite, timestamp, sessionToken]);
    
    // Padam cache supaya data baharu dipaparkan serta-merta pada laman web
    try {
      CacheService.getScriptCache().remove('DATA_PENGHANTARAN');
    } catch (e) {}

    return { status: 'success', message: 'Maklumat pautan berjaya direkodkan.', token: sessionToken };
    
  } catch (error) {
    return { status: 'error', message: error.message };
  } finally {
    // Wajib melepaskan kunci
    lock.releaseLock();
  }
}

/**
 * Contoh operasi berkelompok menggunakan getValues() dan CacheService.
 * Data dipetakan kepada Array of Objects untuk carian klien yang pantas.
 */
function dapatkanDataPenghantaran() {
  const cache = CacheService.getScriptCache();
  const cacheKey = 'DATA_PENGHANTARAN';
  const cachedData = cache.get(cacheKey);
  
  if (cachedData) {
    try {
      const parsed = JSON.parse(cachedData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch (e) {}
  }
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Penghantaran');
  if (!sheet) {
    sheet = ss.getSheets()[0];
  }

  if (!sheet) return [];

  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return []; // Hanya header atau kosong
  
  const headers = data.shift();
  const objekData = data.map(row => {
    let obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
    });
    return obj;
  });
  
  // Simpan dalam cache selama 2 minit (120 saat sahaja)
  try {
    cache.put(cacheKey, JSON.stringify(objekData), 120);
  } catch (e) {}
  
  return objekData;
}