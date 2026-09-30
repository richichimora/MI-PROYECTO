function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(30000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Encabezados si está vacía
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Fecha y Hora", "Nombre", "Edad"]);
    }

    var nombre = (e && e.parameter && e.parameter.nombre) ? e.parameter.nombre : "";
    var edad = (e && e.parameter && e.parameter.edad) ? e.parameter.edad : "";

    sheet.appendRow([new Date(), nombre, edad]);

    return ContentService
      .createTextOutput("OK")
      .setMimeType(ContentService.MimeType.TEXT);

  } catch (error) {
    return ContentService
      .createTextOutput("Error: " + error.toString())
      .setMimeType(ContentService.MimeType.TEXT);

  } finally {
    lock.releaseLock();
  }
}