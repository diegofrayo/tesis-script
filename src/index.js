const xl = require('excel4node');
const Utils = require('./utils');
const constants = require('./constants');

const YEARS = [2017];
const MESES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

let ordenId = 1000;

YEARS.forEach(year => {
  Object.values(
    Array.from(Array(year === new Date().getFullYear() ? 120 : Math.round(365 / 1)).keys())
      .map(curr => Utils.crearFecha(year, curr + 1))
      .reduce((acum, curr) => {
        const mes = curr.getMonth();
        let array = acum[mes];
        if (array === undefined) {
          acum[mes] = [];
          array = acum[mes];
        }
        array.push(curr);
        return acum;
      }, {}),
  ).forEach((fechas, mesesIndice) => {
    const workfile = new xl.Workbook();

    fechas.forEach(fecha => {
      const worksheet = workfile.addWorksheet(fecha.getDate());
      let hojaActualIndice = 1;
      let numeroOrdenes = 0;

      if (Utils.esFinDeSemana(fecha)) {
        numeroOrdenes = Utils.crearNumeroAleatorio(100, 130);
      } else {
        numeroOrdenes = Utils.crearNumeroAleatorio(40, 80);
      }

      Array.from(Array(numeroOrdenes).keys()).forEach(() => {
        const numeroPersonas = Utils.crearNumeroDePersonas();
        const platos = Utils.obtenerListadoDePlatos(numeroPersonas, year);
        const valorTotal = platos.reduce((acum, curr) => {
          acum += curr.precio * curr.unidades;
          return acum;
        }, 0);

        const orden = {
          numero_orden: ordenId,
          fecha: Utils.formatearFecha(fecha),
          hora: Utils.crearHora(),
          numero_mesa: Utils.crearNumeroDeMesa(),
          tipo_cliente: Utils.crearTipoCliente(numeroPersonas),
          numero_personas: numeroPersonas,
        };

        const cliente =
          orden.tipo_cliente === 'EMPRESA'
            ? Utils.obtenerItemAleatoriamente(constants.CLIENTES)
            : '-';

        platos.forEach(plato => {
          const fila = {
            ...orden,
            plato: plato.nombre,
            precio: plato.precio,
            unidades: plato.unidades,
            valor_total: valorTotal,
            cliente,
          };

          Object.values(fila).forEach((value, indice) => {
            worksheet.cell(hojaActualIndice, indice + 1)[typeof value](value);
          });

          hojaActualIndice += 1;
        });

        ordenId += 1;
      });
    });

    workfile.write(
      `./output/Ventas En Restaurante/${year}/${mesesIndice + 1}. ${MESES[mesesIndice]}.xlsx`,
      (err, stats) => {
        if (err) {
          console.error(err);
        } else {
          console.log(stats);
        }
      },
    );
  });
});

console.log(`Numero de registros: ${ordenId - 1000}`);
