const Utils = require('./../utils');

const obtenerSemena = dt => {

  const tdt = new Date(dt.valueOf());
  const dayn = (dt.getDay() + 6) % 7;
  tdt.setDate(tdt.getDate() - dayn + 3);

  const firstThursday = tdt.valueOf();
  tdt.setMonth(0, 1);

  if (tdt.getDay() !== 4) {
    tdt.setMonth(0, 1 + (4 - tdt.getDay() + 7) % 7);
  }

  return 1 + Math.ceil((firstThursday - tdt) / 604800000);
};

const fechas = [2017, 2018, 2019, 2020, 2021, 2022]
  .map(year => {
    return Utils
      .crearArreglo(365)
      .map(dia => {
        const fecha = Utils.crearFecha(year, dia);
        return {
          fecha: Utils.formatearFecha(fecha),
          dia: fecha.getDate(),
          semana: obtenerSemena(fecha),
          mes: fecha.getMonth() + 1,
          year: fecha.getFullYear(),
        };
      });
  });

module.exports = {
  generar: () => [].concat(fechas[0]).concat(fechas[1]),
};
