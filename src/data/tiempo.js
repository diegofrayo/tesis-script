const Utils = require('./../utils');

const horas = Utils
  .crearArreglo(24)
  .map(hora => hora - 1);

const minutos = Utils
  .crearArreglo(60)
  .map(minuto => minuto - 1);

const tiempos = horas.map(hora => {
  return minutos.map(minuto => {

    let franja = 'NO SERVICIO ';

    if (hora >= 11 && hora <= 13) {
      franja = 'MEDIO DIA';
    } else if (hora >= 14 && hora <= 17) {
      franja = 'TARDE';
    } else if (hora >= 18 && hora <= 19) {
      franja = 'NOCHE';
    }

    return {
      tiempo: `${Utils.formatearNumero(hora)}:${Utils.formatearNumero(minuto)}`,
      hora,
      minuto,
      franja,
    };
  });
});

module.exports = {
  generar: () =>
    tiempos
      .reduce((acum, curr) => {
        return acum.concat(curr);
      }, [])
      .sort(Utils.ordenar('tiempo', 'asc')),
};
