const xl = require('excel4node'); // docs: https://www.npmjs.com/package/excel4node

const Constantes = require('./../data/constantes');
const Utils = require('./../utils');

module.exports = {

  ejecutar: configuracionScript => {

    let configuracion;

    if (configuracionScript === 'domicilios') {
      configuracion = {
        rangoNumerosDeOrdenNormal: [15, 20],
        rangoNumerosDeOrdenFinDeSemana: [40, 50],
        esDomicilios: true,
        directorioArchivos: 'Ventas A Domicilio',
        columnas: Constantes.COLUMNAS_VENTAS_DOMICILIOS,
      };
    } else {
      configuracion = {
        rangoNumerosDeOrdenNormal: [50, 70],
        rangoNumerosDeOrdenFinDeSemana: [200, 250],
        esDomicilios: false,
        directorioArchivos: 'Ventas En Restaurante',
        columnas: Constantes.COLUMNAS_VENTAS_RESTAURANTE,
      };
    }

    console.log(`Creando archivos [${configuracion.directorioArchivos}]...`, new Date());

    let ordenId = 1000;
    let numeroTotalPlatos = 0;

    let archivoExcel;
    let hojaDeExcel;
    let numeroArchivosExcel = 0;
    let hojaDeExcelActualFila = 2;

    const configurarArchivoExcel = columnas => {
      numeroArchivosExcel += 1;
      archivoExcel = new xl.Workbook();
      hojaDeExcel = archivoExcel.addWorksheet('Ventas');
      Object
        .values(columnas)
        .forEach((value, indice) => {
          hojaDeExcel.cell(1, indice + 1).string(value);
        });
    };

    const guardarArchivo = (nombreArchivo, columnas) => {
      return new Promise(resolve => {
        archivoExcel.write(nombreArchivo, err => {
          if (err) {
            console.error(err);
            resolve(err);
          } else {
            console.log(`Archivo creado correctamente: ${nombreArchivo} | ${new Date()}`);
            resolve(`Archivo creado correctamente: ${nombreArchivo} | ${new Date()}`);
          }
          configurarArchivoExcel(columnas);
        });
      });
    };

    const fechas = Constantes
      .YEARS
      .map(year => {
        return Utils
          .crearArreglo(year === new Date().getFullYear() ? 119 : 365)
          .map(indice => ({ fecha: Utils.crearFecha(year, indice), year }));
      })
      .reduce((acum, curr) => {
        return acum.concat(curr);
      }, []);

    configurarArchivoExcel(configuracion.columnas);

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
            const horaFactura = Utils.crearHoraFacturacion(horaTomaOrden);
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
                hora_factura: horaFactura,
                numero_mesa: Utils.obtenerItemAleatoriamente(Constantes.MESAS),
              };
            } else {
              persona = Utils.obtenerItemAleatoriamente(Constantes.CLIENTES);
              orden = {
                fecha: Utils.formatearFecha(fecha),
                hora_toma_orden: horaTomaOrden,
                hora_factura: horaFactura,
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
              hojaDeExcel.cell(hojaDeExcelActualFila, 1).number(ordenId + ordenIndice + 1);
              Object
                .values(plato)
                .forEach((value, indice) => {
                  hojaDeExcel.cell(hojaDeExcelActualFila, indice + 2)[typeof value](value);
                });
              hojaDeExcelActualFila += 1;
            });
          });

          ordenId += numeroOrdenes;

          if (hojaDeExcelActualFila >= 45000) {

            hojaDeExcelActualFila = 2;

            return guardarArchivo(
              `./output/${configuracion.directorioArchivos}/${configuracion.directorioArchivos} ${numeroArchivosExcel}.xlsx`,
              configuracion.columnas,
            );

          }

          if (fechasArreglo.length - 1 === fechaIndice) {

            hojaDeExcelActualFila = 2;

            return guardarArchivo(
                `./output/${configuracion.directorioArchivos}/${configuracion.directorioArchivos} ${numeroArchivosExcel}.xlsx`,
                  configuracion.columnas,
              );

          }

          return Promise.resolve();
      };
    };

    Utils
      .batchPromises(1, fechas, true, generarDatos)
      .then(() => console.log(`Numero total de ordenes: ${ordenId - 1000} | Numero total de platos: ${numeroTotalPlatos}`))
      .catch(console.error);

  },

};
