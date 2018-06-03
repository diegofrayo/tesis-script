const fs = require('fs');

const Excel = require('./../excel');
const Constantes = require('./../data/constantes');
const Utils = require('./../utils');

module.exports = {

  ejecutar: configuracionScript => {

    let configuracion;

    if (configuracionScript === 'domicilios') {
      configuracion = {
        rangoNumerosDeOrdenNormal: [10, 15],
        rangoNumerosDeOrdenFinDeSemana: [15, 20],
        esDomicilios: true,
        directorioArchivos: 'Ventas A Domicilio',
        columnas: Constantes.COLUMNAS_VENTAS_DOMICILIOS,
      };
    } else {
      configuracion = {
        rangoNumerosDeOrdenNormal: [20, 40],
        rangoNumerosDeOrdenFinDeSemana: [100, 120],
        esDomicilios: false,
        directorioArchivos: 'Ventas En Restaurante',
        columnas: Constantes.COLUMNAS_VENTAS_RESTAURANTE,
      };
    }

    const dir = `${Constantes.CARPETA_SALIDA}/${configuracion.directorioArchivos}`;
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    console.log(`Creando archivos [${configuracion.directorioArchivos}]...`, new Date());

    let ordenId = 1000;
    let numeroTotalPlatos = 0;

    let archivoExcel;
    let hojaDeExcel;
    let numeroArchivosExcel = 0;
    let hojaDeExcelActualFila = 1;

    const configurarArchivoExcel = () => {

      numeroArchivosExcel += 1;
      hojaDeExcelActualFila = 1;

      archivoExcel = Excel.crearArchivo(`${Constantes.CARPETA_SALIDA}/${configuracion.directorioArchivos}/${configuracion.directorioArchivos} ${numeroArchivosExcel}.xls`);
      hojaDeExcel = Excel.agregarHoja(archivoExcel, 'Ventas');

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
          .crearArreglo(year === new Date().getFullYear() ? 120 : 365)
          .map(indice => ({ fecha: Utils.crearFecha(year, indice), year }));
      })
      .reduce((acum, curr) => {
        return acum.concat(curr);
      }, []);

    configurarArchivoExcel();

    const generarDatos = (fechasArreglo, fechaIndice) => {

      return ({ fecha, year }) => {

        let numeroOrdenes = 0;

        if (Utils.esFinDeSemana(fecha)) {
          numeroOrdenes = Utils.crearNumeroAleatorio(...configuracion.rangoNumerosDeOrdenFinDeSemana);
        } else {
          numeroOrdenes = Utils.crearNumeroAleatorio(...configuracion.rangoNumerosDeOrdenNormal);
        }

        const rangosHorarios = Utils.calcularRangosHorarios(numeroOrdenes, configuracion.esDomicilios);
        const rangosTipoCliente = Utils.calcularRangosTipoCliente(numeroOrdenes, configuracion.esDomicilios);

        const ordenes = Utils
          .crearArreglo(numeroOrdenes)
          .map(ordenIndice => {

            const rangoHorario = Utils.obtenerRangoHorario(rangosHorarios, ordenIndice);
            const horaTomaOrden = Utils.crearHora(rangoHorario.horas, Constantes.MINUTOS);
            const tipoCliente = Utils.obtenerTipoCliente(rangosTipoCliente, ordenIndice);

            const numeroPersonas = Utils.obtenerNumeroPersonas(tipoCliente, rangoHorario.franja);
            let platos = Utils.obtenerListadoDePlatos(numeroPersonas, year, rangoHorario.franja, Constantes.PLATOS, configuracion.esDomicilios);
            const valorTotal = platos.reduce((acum, curr) => {
              return acum + (curr.precio * curr.unidades);
            }, 0);

            let orden;
            let persona;

            if (!configuracion.esDomicilios) {

              persona = Utils.obtenerItemAleatoriamente(Constantes.MESEROS);
              orden = {
                fecha: Utils.formatearFecha(fecha),
                hora_toma_orden: horaTomaOrden,
                hora_factura: Utils.crearHoraFacturacion(horaTomaOrden),
                numero_mesa: Utils.obtenerItemAleatoriamente(Constantes.MESAS),
              };

            } else {

              if (Utils.crearNumeroAleatorio(0, 100) <= 90) {
                persona = Constantes.CLIENTES[0];
              } else {
                persona = Utils.obtenerItemAleatoriamente(Constantes.CLIENTES);
              }

              orden = {
                fecha: Utils.formatearFecha(fecha),
                hora_toma_orden: horaTomaOrden,
              };

            }

            platos = platos.map(plato => {

              const fila = {
                ...orden,
                codigo_plato: plato.id,
                plato: plato.nombre,
                precio: plato.precio,
                unidades: plato.unidades,
                valor_total: valorTotal,
              };

              if (configuracion.esDomicilios) {
                fila.identificador_cliente = persona.id;
                fila.nombre_cliente = persona.nombre;
              } else {
                fila.identificador_mesero = persona.id;
                fila.nombre_mesero = persona.nombre;
              }

              return fila;
            });

            numeroTotalPlatos += platos.length;

            return {
              hora_toma_orden: horaTomaOrden,
              platos,
            };
          });

          ordenes.sort(Utils.ordenar('hora_toma_orden', 'asc'));

          ordenes.forEach((orden, ordenIndice) => {
            orden.platos.forEach((plato) => {
              Excel.escribirCelda(hojaDeExcel, hojaDeExcelActualFila, 0, ordenId + ordenIndice + 1);
              Object
                .values(plato)
                .forEach((value, indice) => {
                  Excel.escribirCelda(hojaDeExcel, hojaDeExcelActualFila, indice + 1, value);
                });
              hojaDeExcelActualFila += 1;
            });
          });

          ordenId += numeroOrdenes;

          if (hojaDeExcelActualFila >= 35000 || fechasArreglo.length - 1 === fechaIndice) {
            return guardarArchivo();
          }

          return Promise.resolve();
      };
    };

    Utils
      .batchPromises(1, fechas, true, generarDatos)
      .then(() => console.log(`Numero total de ordenes: ${ordenId - 1000} | Numero total de platos: ${numeroTotalPlatos}`))
      .catch(console.log);

  },

};
