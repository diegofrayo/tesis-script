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
        const diaSemana = fecha.getDay();
        const diaAnio = fecha.getDate();
        return {
          fecha: Utils.formatearFecha(fecha),
          dia: diaAnio,
          mes: mes + 1,
          year: fecha.getFullYear(),
          nombre_mes: `(${Utils.formatearNumero(mes + 1)}) ${MESES[mes]}`,
          nombre_dia: `(${Utils.formatearNumero(diaAnio)}) ${DIAS[diaSemana]}`,
          es_fin_de_semana: Utils.esFinDeSemana(fecha) ? 1 : 0,
        };
      });
  });

module.exports = {
  generar: () =>
    fechas.reduce((acum, curr) => {
      return acum.concat(curr);
    }, []),
};
