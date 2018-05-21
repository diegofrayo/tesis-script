const Excel = require('./../excel');
const Constantes = require('./../data/constantes');

module.exports = {

  ejecutar: () => {

    console.log('Creando archivo con el listado de proveedores...', new Date());

    const archivoExcelProveedores = Excel.crearArchivo(`${Constantes.CARPETA_SALIDA}/Proveedores.xls`);
    const hojaDeExcelProveedores = Excel.agregarHoja(archivoExcelProveedores, 'Proveedores');

    Object
      .values(Constantes.COLUMNAS_PROVEEDORES)
      .forEach((value, indice) => Excel.escribirCelda(hojaDeExcelProveedores, 0, indice, value));

    Constantes
      .PROVEEDORES
      .forEach((proveedor, proveedorIndice) => {
        Object
          .values(proveedor)
          .forEach((value, indice) => {
            if (indice > 3) return;
            Excel.escribirCelda(hojaDeExcelProveedores, proveedorIndice + 1, indice, value)
          });
      });

    Excel
      .guardarArchivo(archivoExcelProveedores)
      .then(() => console.log('Archivo creado correctamente', new Date()))
      .catch(console.log);

  },

};
