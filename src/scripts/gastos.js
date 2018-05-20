const Excel = require('./../excel');
const Constantes = require('./../data/constantes');
const Utils = require('./../utils');

module.exports = {

  ejecutar: () => {

    const configuracion = {
      directorioArchivos: 'Gastos',
      columnas: Constantes.COLUMNAS_GASTOS,
    };

    console.log(`Creando archivos [${configuracion.directorioArchivos}]...`, new Date());

    let numeroTotalGastos = 0;

    let archivoExcel;
    let hojaDeExcel;
    let numeroArchivosExcel = 0;
    let hojaDeExcelActualFila = 1;

    const configurarArchivoExcel = () => {

      numeroArchivosExcel += 1;
      hojaDeExcelActualFila = 1;

      archivoExcel = Excel.crearArchivo(`${Constantes.CARPETA_SALIDA}/${configuracion.directorioArchivos}.xls`);
      hojaDeExcel = Excel.agregarHoja(archivoExcel, 'Gastos');

      Object
        .values(configuracion.columnas)
        .forEach((value, indice) => Excel.escribirCelda(hojaDeExcel, 0, indice, value));
    };

    const guardarArchivo = () => {
      return Excel
        .guardarArchivo(archivoExcel)
        .then(() => {
          console.log(`Archivo ${numeroArchivosExcel} creado correctamente. Numero de filas (${hojaDeExcelActualFila - 1}) | ${new Date()}`);
          configurarArchivoExcel();
          return true;
        });
    };

    const fechas = Constantes
      .YEARS
      .map(year => {
        return Utils
          .crearArreglo(year === new Date().getFullYear() ? 119 : 365)
          .map(indice => Utils.crearFecha(year, indice));
      })
      .reduce((acum, curr) => {
        return acum.concat(curr);
      }, []);

    configurarArchivoExcel();

    const generarDatos = (fechasArreglo, fechaIndice) => {

      return fecha => {

        let gastos = [];

        const gastosPescado = Utils
          .obtenerComprasPescado(Constantes.GASTOS, fecha.getDay())
          .map((gasto) => {
            const unidades = Utils.obtenerItemAleatoriamente(gasto.rango_unidades);
            const montoTotal = Utils.obtenerItemAleatoriamente(gasto.rango_precio) * unidades;
            const proveedor = Utils.obtenerProveedor(Constantes.PROVEEDORES, gasto.categoria, fecha);
            return {
              fecha: Utils.formatearFecha(fecha),
              codigo_gasto: gasto.id,
              nombre_gasto: gasto.nombre,
              categoria_gasto: gasto.categoria,
              numero_unidades: unidades,
              tipo_unidad: gasto.tipo_unidad,
              monto_total: montoTotal,
              codigo_proveedor: proveedor.id,
              nombre_proveedor: proveedor.nombre,
            };
          });

        const gastosInsumos = Utils
          .obtenerComprasInsumos(Constantes.GASTOS, fecha.getDay())
          .map((gasto) => {
            const unidades = Utils.obtenerItemAleatoriamente(gasto.rango_unidades);
            const montoTotal = Utils.obtenerItemAleatoriamente(gasto.rango_precio);
            const proveedor = Utils.obtenerProveedor(Constantes.PROVEEDORES, gasto.categoria, fecha);
            return {
              fecha: Utils.formatearFecha(fecha),
              codigo_gasto: gasto.id,
              nombre_gasto: gasto.nombre,
              categoria_gasto: gasto.categoria,
              numero_unidades: unidades,
              tipo_unidad: gasto.tipo_unidad,
              monto_total: montoTotal,
              codigo_proveedor: proveedor.id,
              nombre_proveedor: proveedor.nombre,
            };
          });

        const gastosNomina = Utils
          .obtenerGastosNomina(Constantes.GASTOS, fecha)
          .map((gasto) => {
            const unidades = Utils.obtenerItemAleatoriamente(gasto.rango_unidades);
            const montoTotal = Utils.obtenerItemAleatoriamente(gasto.rango_precio);
            const proveedor = Utils.obtenerProveedor(Constantes.PROVEEDORES, gasto.categoria, fecha);
            return {
              fecha: Utils.formatearFecha(fecha),
              codigo_gasto: gasto.id,
              nombre_gasto: gasto.nombre,
              categoria_gasto: gasto.categoria,
              numero_unidades: unidades,
              tipo_unidad: gasto.tipo_unidad,
              monto_total: montoTotal,
              codigo_proveedor: proveedor.id,
              nombre_proveedor: proveedor.nombre,
            };
          });

        const gastosInfraestructura = Utils
          .obtenerGastosInfraestructura(Constantes.GASTOS, fecha)
          .map((gasto) => {
            const unidades = Utils.obtenerItemAleatoriamente(gasto.rango_unidades);
            const montoTotal = Utils.crearNumeroAleatorio(...gasto.rango_precio);
            const proveedor = Utils.obtenerProveedor(Constantes.PROVEEDORES, gasto.categoria, fecha);
            return {
              fecha: Utils.formatearFecha(fecha),
              codigo_gasto: gasto.id,
              nombre_gasto: gasto.nombre,
              categoria_gasto: gasto.categoria,
              numero_unidades: unidades,
              tipo_unidad: gasto.tipo_unidad,
              monto_total: montoTotal,
              codigo_proveedor: proveedor.id,
              nombre_proveedor: proveedor.nombre,
            };
          });

        const gastosBebidas = Utils
          .obtenerComprasBebidas(Constantes.GASTOS, fecha)
          .map((gasto) => {
            const unidades = Utils.obtenerItemAleatoriamente(gasto.rango_unidades);
            const montoTotal = Utils.obtenerItemAleatoriamente(gasto.rango_precio);
            const proveedor = Utils.obtenerProveedor(Constantes.PROVEEDORES, gasto.categoria, fecha);
            return {
              fecha: Utils.formatearFecha(fecha),
              codigo_gasto: gasto.id,
              nombre_gasto: gasto.nombre,
              categoria_gasto: gasto.categoria,
              numero_unidades: unidades,
              tipo_unidad: gasto.tipo_unidad,
              monto_total: montoTotal,
              codigo_proveedor: proveedor.id,
              nombre_proveedor: proveedor.nombre,
            };
          });

        const gastosPublicidad = Utils
          .obtenerGastosPublicidad(Constantes.GASTOS, fecha)
          .map((gasto) => {
            const unidades = Utils.obtenerItemAleatoriamente(gasto.rango_unidades);
            const montoTotal = Utils.obtenerItemAleatoriamente(gasto.rango_precio);
            const proveedor = Utils.obtenerProveedor(Constantes.PROVEEDORES, gasto.categoria, fecha);
            return {
              fecha: Utils.formatearFecha(fecha),
              codigo_gasto: gasto.id,
              nombre_gasto: gasto.nombre,
              categoria_gasto: gasto.categoria,
              numero_unidades: unidades,
              tipo_unidad: gasto.tipo_unidad,
              monto_total: montoTotal,
              codigo_proveedor: proveedor.id,
              nombre_proveedor: proveedor.nombre,
            };
          });

          gastos = gastos
            .concat(gastosPescado)
            .concat(gastosInsumos)
            .concat(gastosNomina)
            .concat(gastosInfraestructura)
            .concat(gastosBebidas)
            .concat(gastosPublicidad);

          numeroTotalGastos += gastos.length;

          gastos.forEach(gasto => {
            Object
              .values(gasto)
              .forEach((value, indice) => {
                Excel.escribirCelda(hojaDeExcel, hojaDeExcelActualFila, indice, value);
              });
            hojaDeExcelActualFila += 1;
          });

          if (hojaDeExcelActualFila >= 35000 || fechasArreglo.length - 1 === fechaIndice) {
            return guardarArchivo();
          }

          return Promise.resolve();
      };
    };

    Utils
      .batchPromises(1, fechas, true, generarDatos)
      .then(() => console.log(`Numero total de gastos: ${numeroTotalGastos}`))
      .catch(console.log);

  },

};
