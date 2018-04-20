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
            .map(indice => Utils.crearFecha(year, indice))
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

              const ordenes = Utils
                .crearArreglo(numeroOrdenes)
                .map(ordenIndice => {

                  const rangoHorario = Utils.obtenerRangoHorario(rangosHorarios, ordenIndice);
                  const horaTomaOrden = Utils.crearHora(rangoHorario.horas, Constantes);
                  const horaFactura = Utils.crearHoraFacturacion(horaTomaOrden);
                  const tipoCliente = Utils.obtenerTipoCliente(rangosTipoCliente, ordenIndice);

                  const numeroPersonas = Utils.obtenerNumeroPersonas(tipoCliente, rangoHorario.franja);
                  let platos = Utils.obtenerListadoDePlatos(numeroPersonas, year, rangoHorario.franja, Constantes, configuracion.esDomicilios);
                  const valorTotal = platos.reduce((acum, curr) => {
                    acum += curr.precio * curr.unidades;
                    return acum;
                  }, 0);

                  let orden;

                  if (!configuracion.esDomicilios) {
                    orden = {
                      fecha: Utils.formatearFecha(fecha),
                      hora_toma_orden: horaTomaOrden,
                      hora_factura: horaFactura,
                      numero_mesa: Utils.crearNumeroDeMesa(Constantes),
                    };
                  } else {
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
                      const cliente = Utils.obtenerCliente(Constantes);
                      fila.identificador_cliente = cliente.id;
                      fila.nombre_cliente = cliente.nombre;
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
