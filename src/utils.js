const fs = require('fs');
const constants = require('./constants');

const obtenerItemAleatoriamente = array => {
  const longitud = array.length;
  const indice = Math.floor(Math.random() * longitud);
  return array[indice];
};

const obtenerBebida = platos => {
  const bebidas = platos.filter(item => item.categoria === 'Bebidas');
  return obtenerItemAleatoriamente(bebidas);
};

const obtenerPlatoAdicional = platos => {
  const platosAdicionales = platos.filter(item => item.categoria === 'Adicionales');
  return obtenerItemAleatoriamente(platosAdicionales);
};

const obtenerPlatoFuerte = platos => {
  const platosFuertes = platos.filter(
    item => item.categoria !== 'Adicionales' && item.categoria !== 'Bebidas',
  );
  return obtenerItemAleatoriamente(platosFuertes);
};

const agregarPlato = (listadoPlatos, plato, currentYear) => {
  if (listadoPlatos[plato.id] === undefined) {
    listadoPlatos[plato.id] = {
      nombre: plato.nombre,
      precio: plato.precio[currentYear],
      unidades: 1,
    };
  } else {
    listadoPlatos[plato.id].unidades += 1;
  }
};

module.exports = {
  obtenerItemAleatoriamente,

  esFinDeSemana: fecha => {
    const dia = fecha.getDay();
    return dia === 6 || dia === 0;
  },

  crearNumeroAleatorio: (minimo, maximo) => {
    const numeroAleatorio = Math.round(Math.random() * (maximo - minimo));
    return numeroAleatorio + minimo;
  },

  formatearFecha: fecha => `${fecha.getDate()}-${fecha.getMonth() + 1}-${fecha.getFullYear()}`,

  crearFecha: (year, dia) => {
    const fecha = new Date(year, 0);
    return new Date(fecha.setDate(dia));
  },

  crearHora: () => {
    const { HORAS, MINUTOS } = constants;
    const formatearHora = numero => (numero < 10 ? `0${numero}` : numero);
    return `${formatearHora(obtenerItemAleatoriamente(HORAS))}:${formatearHora(
      obtenerItemAleatoriamente(MINUTOS),
    )}`;
  },

  crearNumeroDeMesa: () => {
    return obtenerItemAleatoriamente(constants.MESAS);
  },

  crearNumeroDePersonas: () => {
    return obtenerItemAleatoriamente(constants.PERSONAS);
  },

  crearTipoCliente: numeroDePersonas => {
    const { TIPOS_DE_CLIENTE } = constants;

    if (numeroDePersonas === 1) {
      return TIPOS_DE_CLIENTE.INDIVIDUAL[0];
    } else if (numeroDePersonas === 2) {
      return obtenerItemAleatoriamente(TIPOS_DE_CLIENTE.DOS_PERSONAS);
    }

    return obtenerItemAleatoriamente(TIPOS_DE_CLIENTE.GRUPAL);
  },

  obtenerListadoDePlatos: (numeroDePersonas, currentYear) => {
    const { PLATOS } = constants;
    const listadoPlatos = {};

    Array.from(Array(numeroDePersonas).keys()).map(() => {
      const platoFuerte = obtenerPlatoFuerte(PLATOS);
      const bebida = obtenerBebida(PLATOS);
      const platoAdicional =
        Math.round(Math.random() * 1) === 1 ? obtenerPlatoAdicional(PLATOS) : undefined;

      agregarPlato(listadoPlatos, platoFuerte, currentYear);
      agregarPlato(listadoPlatos, bebida, currentYear);
      if (platoAdicional) agregarPlato(listadoPlatos, platoAdicional, currentYear);
    });

    return Object.values(listadoPlatos);
  },

  crearArchivoExcel: data => {
    const transform = array => array.map(item => `${Object.values(item).join(';')}`).join('\n');
    fs.writeFile('./output/Fuente de datos.csv', transform(data), err => {
      if (err) {
        console.log(err);
      } else {
        console.log('The file was saved!');
      }
    });
  },
};
