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
                  const horaTomaOrden = Utils.crearHora(rangoHorario.horas, Constantes.MINUTOS);
                  const horaFactura = Utils.crearHoraFacturacion(horaTomaOrden);
                  const tipoCliente = Utils.obtenerTipoCliente(rangosTipoCliente, ordenIndice);

                  const numeroPersonas = Utils.obtenerNumeroPersonas(tipoCliente, rangoHorario.franja);
                  let platos = Utils.obtenerListadoDePlatos(numeroPersonas, year, rangoHorario.franja, Constantes.PLATOS, configuracion.esDomicilios);
                  const valorTotal = platos.reduce((acum, curr) => {
                    acum += curr.precio * curr.unidades;
                    return acum;
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
