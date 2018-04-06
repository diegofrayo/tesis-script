const xl = require('excel4node'); // docs: https://www.npmjs.com/package/excel4node

const Constantes = require('./../data/constantes');
const Utils = require('./../utils');

const guardarArchivo = (archivoExcel, nombreArchivo) => {
  return new Promise((resolve, reject) => {
    archivoExcel.write(nombreArchivo, err => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(`Archivo creado correctamente: ${nombreArchivo} | ${new Date()}`);
        resolve(`Archivo creado correctamente: ${nombreArchivo} | ${new Date()}`);
      }
    });
  });
};

module.exports = {

  ejecutar: configuracion => {

    console.log(`Creando archivo [${configuracion.directorioArchivos}]...`, new Date());

    let ordenId = 1000;
    let numeroTotalPlatos = 0;

    Constantes
      .YEARS
      .forEach(year => {

        const fechasAgrupadasPorMes = Object.values(
          Utils
            .crearArreglo(year === new Date().getFullYear() ? 119 : 365)
            .map(indice => Utils.crearFecha(year, indice + 1))
            .reduce((acum, fecha) => {
              const mes = fecha.getMonth();
              let fechas = acum[mes];
              if (fechas === undefined) {
                acum[mes] = [];
                fechas = acum[mes];
              }
              fechas.push(fecha);
              return acum;
            }, {}),
        );

        const generarDatos = (arrayEntero, mesesIndice) => {
          return fechas => {

            const archivoExcel = new xl.Workbook();

            fechas.forEach(fecha => {

              const hojaDeExcel = archivoExcel.addWorksheet(fecha.getDate());
              Object
                .values(configuracion.columnas)
                .forEach((value, indice) => {
                  hojaDeExcel.cell(1, indice + 1).string(value);
                });

              let hojaDeExcelActualFila = 2;
              let numeroOrdenes = 0;

              if (Utils.esFinDeSemana(fecha)) {
                numeroOrdenes = Utils.crearNumeroAleatorio(...configuracion.rangoNumerosDeOrdenFinDeSemana);
              } else {
                numeroOrdenes = Utils.crearNumeroAleatorio(...configuracion.rangoNumerosDeOrdenNormal);
              }

              const rangosHorarios = Utils.calcularRangosHorarios(numeroOrdenes, configuracion.esDomicilios);
              const rangosTipoCliente = Utils.calcularRangosTipoCliente(numeroOrdenes, configuracion.esDomicilios);

              Utils
                .crearArreglo(numeroOrdenes)
                .forEach(ordenIndice => {

                  const rangoHorario = Utils.obtenerRangoHorario(rangosHorarios, ordenIndice);
                  const hora = Utils.crearHora(rangoHorario.horas, Constantes);
                  const tipoCliente = Utils.obtenerTipoCliente(rangosTipoCliente, ordenIndice);

                  const numeroPersonas = Utils.obtenerNumeroPersonas(tipoCliente, rangoHorario.franja);
                  const platos = Utils.obtenerListadoDePlatos(numeroPersonas, year, rangoHorario.franja, Constantes, configuracion.esDomicilios);
                  const valorTotal = platos.reduce((acum, curr) => {
                    acum += curr.precio * curr.unidades;
                    return acum;
                  }, 0);

                  let orden;

                  if (!configuracion.esDomicilios) {
                    orden = {
                      numero_orden: ordenId,
                      fecha: Utils.formatearFecha(fecha),
                      hora,
                      tipo_cliente: tipoCliente,
                      numero_mesa: Utils.crearNumeroDeMesa(Constantes),
                      numero_personas: numeroPersonas,
                    };
                  } else {
                    orden = {
                      numero_orden: ordenId,
                      fecha: Utils.formatearFecha(fecha),
                      hora,
                      tipo_cliente: tipoCliente,
                      numero_personas: numeroPersonas,
                    };
                  }

                  platos.forEach(plato => {

                    const fila = {
                      ...orden,
                      plato: plato.nombre,
                      precio: plato.precio,
                      unidades: plato.unidades,
                      valor_total: valorTotal,
                    };

                    if (configuracion.esDomicilios) {
                      const cliente = Utils.obtenerCliente(Constantes);
                      fila.identificador_cliente = cliente.id;
                    }

                    Object
                      .values(fila)
                      .forEach((value, indice) => {
                        hojaDeExcel.cell(hojaDeExcelActualFila, indice + 1)[typeof value](value);
                      });

                    hojaDeExcelActualFila += 1;
                  });

                  ordenId += 1;
                  numeroTotalPlatos += platos.length;
                });
            });

            return guardarArchivo(
              archivoExcel,
              `./output/${configuracion.directorioArchivos}/${year}/${mesesIndice + 1}. ${
                Constantes.MESES[mesesIndice]
              }.xlsx`,
            );
          };
        };

        Utils
          .batchPromises(1, fechasAgrupadasPorMes, true, generarDatos)
          .then(() => console.log(`Numero total de ordenes: ${ordenId - 1000} | Numero total de platos: ${numeroTotalPlatos}`))
          .catch(console.error);
    });

  },

};
