const Utils = require('./../utils');

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

const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

const fechas = [2017, 2018, 2019, 2020]
  .map(year => {
    return Utils
      .crearArreglo(Utils.esAnioBisiesto(year) ? 366 : 365)
      .map(dia => {
        const fecha = Utils.crearFecha(year, dia);
        const mes = fecha.getMonth();
        return {
          fecha: Utils.formatearFecha(fecha),
          dia: fecha.getDate(),
          mes: mes + 1,
          year: fecha.getFullYear(),
          nombre_mes: MESES[mes],
          nombre_dia: DIAS[fecha.getDay()],
        };
      });
  });

module.exports = {
  generar: () =>
    fechas.reduce((acum, curr) => {
      return acum.concat(curr);
    }, []),
};
