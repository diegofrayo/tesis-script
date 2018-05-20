const xl = require('xlgen');

module.exports = {

  crearArchivo: nombreArchivo => {
    return xl.createXLGen(nombreArchivo);
  },

  agregarHoja: (archivoExcel, nombreHoja) => {
    return archivoExcel.addSheet(nombreHoja);
  },

  escribirCelda: (hoja, fila, columna, valor) => {
    hoja.cell(fila, columna, valor);
  },

  guardarArchivo: archivoExcel => {
    return new Promise((resolve, reject) => {
      archivoExcel.end(err => {
        if (err) return reject(err);
        return resolve('Success');
      });
    });
  },

};
