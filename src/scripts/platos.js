const Excel = require('./../excel');
const Constantes = require('./../data/constantes');

module.exports = {

  ejecutar: () => {

    console.log('Creando archivo con el listado de platos...', new Date());

    const archivoExcelPlatos = Excel.crearArchivo(`${Constantes.CARPETA_SALIDA}/Platos.xls`);
    const hojaDeExcelPlatos = Excel.agregarHoja(archivoExcelPlatos, 'Platos');

    Object
      .values(Constantes.COLUMNAS_PLATOS)
      .forEach((value, indice) => Excel.escribirCelda(hojaDeExcelPlatos, 0, indice, value));

    Constantes
      .PLATOS
      .forEach((plato, platoIndice) => {
        Object
          .values(plato)
          .forEach((value, indice) => {
            if (typeof value === 'object') return;
            Excel.escribirCelda(hojaDeExcelPlatos, platoIndice + 1, indice, value)
          });
      });

    Excel
      .guardarArchivo(archivoExcelPlatos)
      .then(() => console.log('Archivo creado correctamente', new Date()))
      .catch(console.log);

  },

};
