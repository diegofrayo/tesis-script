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

    Constantes
      .YEARS
      .forEach(year => {

        const fechasAgrupadasPorMes = Object.values(
          Utils
            .crearArreglo(year === new Date().getFullYear() ? 120 : 365)
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

              Utils
                .crearArreglo(numeroOrdenes)
                .forEach(() => {

                  const numeroPersonas = Utils.crearNumeroDePersonas(Constantes);
                  const platos = Utils.obtenerListadoDePlatos(numeroPersonas, year, Constantes);
                  const valorTotal = platos.reduce((acum, curr) => {
                    acum += curr.precio * curr.unidades;
                    return acum;
                  }, 0);

                  const orden = {
                    numero_orden: ordenId,
                    fecha: Utils.formatearFecha(fecha),
                    hora: Utils.crearHora(Constantes),
                    numero_mesa: Utils.crearNumeroDeMesa(Constantes),
                    tipo_cliente: configuracion.esDomicilios
                      ? Utils.crearTipoClienteDomicilios(platos.length, Constantes)
                      : Utils.crearTipoClienteNormal(numeroPersonas, Constantes),
                    numero_personas: numeroPersonas,
                  };

                  let cliente;

                  if (orden.tipo_cliente === 'EMPRESA') {
                    cliente = Utils.obtenerCliente(orden.tipo_cliente, Constantes);
                  } else if (configuracion.esDomicilios || Utils.crearNumeroAleatorio(0, 1) === 1) {
                    cliente = Utils.obtenerCliente('INDIVIDUO', Constantes);
                  } else {
                    cliente = { nombre: '-' };
                  }

                  platos.forEach(plato => {

                    const fila = {
                      ...orden,
                      plato: plato.nombre,
                      precio: plato.precio,
                      unidades: plato.unidades,
                      valor_total: valorTotal,
                      nombre_cliente: cliente.nombre,
                    };

                    if (configuracion.esDomicilios) fila.direccion_cliente = cliente.direccion;

                    Object
                      .values(fila)
                      .forEach((value, indice) => {
                        hojaDeExcel.cell(hojaDeExcelActualFila, indice + 1)[typeof value](value);
                      });

                    hojaDeExcelActualFila += 1;
                  });

                  ordenId += 1;
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
          .then(() => console.log(`Numero total de registros: ${ordenId - 1000}`))
          .catch(console.error);
    });

  },

};
