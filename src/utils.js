const obtenerItemAleatoriamente = arreglo => {
  const longitud = arreglo.length;
  const indice = Math.floor(Math.random() * longitud);
  return arreglo[indice];
};

const crearNumeroAleatorio = (minimo, maximo) => {
  const numeroAleatorio = Math.round(Math.random() * (maximo - minimo));
  return numeroAleatorio + minimo;
};

const crearArreglo = longitud => Array.from(Array(longitud).keys());

const obtenerBebida = platos => {
  const bebidas = platos.filter(item => item.categoria === 'Bebidas');
  return obtenerItemAleatoriamente(bebidas);
};

const obtenerPlatoAdicional = platos => {
  const platosAdicionales = platos.filter(item => item.categoria === 'Adicionales');
  return obtenerItemAleatoriamente(platosAdicionales);
};

const obtenerPlatoFuerte = platos => {
  const platosFuertes = platos.filter(item => item.categoria !== 'Adicionales' && item.categoria !== 'Bebidas');
  return obtenerItemAleatoriamente(platosFuertes);
};

const agregarPlatoAOrden = (listadoPlatos, plato, currentYear) => {
  if (plato === undefined) return;
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

  crearArreglo,

  crearNumeroAleatorio,

  obtenerItemAleatoriamente,

  esFinDeSemana: fecha => {
    const dia = fecha.getDay();
    return dia === 6 || dia === 0;
  },

  formatearFecha: fecha => `${fecha.getDate()}-${fecha.getMonth() + 1}-${fecha.getFullYear()}`,

  crearFecha: (year, dia) => {
    const fecha = new Date(year, 0);
    return new Date(fecha.setDate(dia));
  },

  crearHora: Constantes => {
    const { HORAS, MINUTOS } = Constantes;
    const formatearHora = numero => (numero < 10 ? `0${numero}` : numero);
    return `${formatearHora(obtenerItemAleatoriamente(HORAS))}:${formatearHora(obtenerItemAleatoriamente(MINUTOS))}`;
  },

  crearNumeroDeMesa: Constantes => obtenerItemAleatoriamente(Constantes.MESAS),

  crearNumeroDePersonas: Constantes => obtenerItemAleatoriamente(Constantes.NUMERO_PERSONAS),

  crearTipoClienteNormal: (numeroDePersonas, Constantes) => {

    const { TIPOS_DE_CLIENTE } = Constantes;

    if (numeroDePersonas === 1) {
      return TIPOS_DE_CLIENTE.INDIVIDUAL[0];
    } else if (numeroDePersonas === 2) {
      return obtenerItemAleatoriamente(TIPOS_DE_CLIENTE.DOS_PERSONAS);
    }

    return obtenerItemAleatoriamente(TIPOS_DE_CLIENTE.GRUPAL);
  },

  crearTipoClienteDomicilios: (numeroPlatos, Constantes) => {

    const { TIPOS_DE_CLIENTE } = Constantes;

    if (numeroPlatos < 4) {
      return TIPOS_DE_CLIENTE.INDIVIDUAL[0];
    }

    return obtenerItemAleatoriamente(['EMPRESA', 'GRUPO']);
  },

  obtenerListadoDePlatos: (numeroDePersonas, currentYear, Constantes) => {

    const { PLATOS } = Constantes;
    const listadoPlatos = {};

    crearArreglo(numeroDePersonas)
      .map(() => {
        const platoFuerte = obtenerPlatoFuerte(PLATOS);
        const bebida = obtenerBebida(PLATOS);
        const platoAdicional = crearNumeroAleatorio(0, 1) === 1 ? obtenerPlatoAdicional(PLATOS) : undefined;
        agregarPlatoAOrden(listadoPlatos, platoFuerte, currentYear);
        agregarPlatoAOrden(listadoPlatos, bebida, currentYear);
        agregarPlatoAOrden(listadoPlatos, platoAdicional, currentYear);
      });

    return Object.values(listadoPlatos);
  },

  obtenerCliente: (tipo, Constantes) => {
    const { CLIENTES } = Constantes;
    const clientes = CLIENTES.filter(item => item.tipo === tipo);
    return obtenerItemAleatoriamente(clientes);
  },

};
