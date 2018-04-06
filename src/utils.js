const obtenerItemAleatoriamente = arreglo => {
  const longitud = arreglo.length;
  const indice = Math.floor(Math.random() * longitud);
  return arreglo[indice];
};

const crearNumeroAleatorio = (minimo, maximo) => {
  const numeroAleatorio = Math.round(Math.random() * (maximo - minimo));
  return numeroAleatorio + minimo;
};

const crearArreglo = longitud => Array.from(Array(longitud).keys()).map(value => value + 1);

const obtenerBebida = platos => {
  const bebidas = platos.filter(item => item.categoria === 'Bebidas');
  return obtenerItemAleatoriamente(bebidas);
};

const obtenerPlatoAdicional = platos => {
  const platosAdicionales = platos.filter(item => item.categoria === 'Adicionales');
  return obtenerItemAleatoriamente(platosAdicionales);
};

const obtenerPlatoFuerte = (platos, franjaHoraria) => {

  let platosFuertes;

  if (franjaHoraria === 'NOCHE') {

    const numeroAleatorio = Math.round(Math.random() * 100);

    if (numeroAleatorio <= 70) {
      platosFuertes = platos.filter(item => item.categoria === 'Ceviche');
    } else {
      platosFuertes = platos.filter(item => item.categoria !== 'Adicionales' && item.categoria !== 'Bebidas');
    }

  } else {
    platosFuertes = platos.filter(item => item.categoria !== 'Adicionales' && item.categoria !== 'Bebidas');
  }

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

  crearHora: (horas, Constantes) => {
    const { MINUTOS } = Constantes;
    const formatearHora = numero => (numero < 10 ? `0${numero}` : numero);
    return `${formatearHora(obtenerItemAleatoriamente(horas))}:${formatearHora(obtenerItemAleatoriamente(MINUTOS))}`;
  },

  crearNumeroDeMesa: Constantes => obtenerItemAleatoriamente(Constantes.MESAS),

  obtenerListadoDePlatos: (numeroDePersonas, currentYear, franjaHoraria, Constantes, esDomicilios) => {

    const { PLATOS } = Constantes;
    const listadoPlatos = {};

    crearArreglo(numeroDePersonas)
      .map(() => {
        const platoFuerte = obtenerPlatoFuerte(PLATOS, franjaHoraria);
        agregarPlatoAOrden(listadoPlatos, platoFuerte, currentYear);

        if (esDomicilios === false) {
          const bebida = obtenerBebida(PLATOS);
          agregarPlatoAOrden(listadoPlatos, bebida, currentYear);
        }
      });

    const platoAdicional = crearNumeroAleatorio(0, 1) === 1 ? obtenerPlatoAdicional(PLATOS) : undefined;
    agregarPlatoAOrden(listadoPlatos, platoAdicional, currentYear);

    if (esDomicilios === true && crearNumeroAleatorio(0, 1) === 1) {
      const bebida = obtenerBebida(PLATOS);
      agregarPlatoAOrden(listadoPlatos, bebida, currentYear);
    }

    return Object.values(listadoPlatos);
  },

  calcularRangosHorarios: (numeroOrdenes, esDomicilios) => {

    let inicio;
    let final;
    const rangos = [];

    if (esDomicilios) {

      inicio = 1;
      final = Math.floor((numeroOrdenes / 100) * 90);
      rangos.push({ inicio, final, franja: 'MEDIO DIA',horas: [11, 12, 1] });

      inicio = final + 1;
      final = inicio + Math.floor((numeroOrdenes / 100) * 10);
      rangos.push({ inicio, final, franja: 'TARDE',horas: [2, 3, 4, 5] });

    } else {

      inicio = 1;
      final = Math.floor((numeroOrdenes / 100) * 85);
      rangos.push({ inicio, final, franja: 'MEDIO DIA', horas: [11, 12, 1] });

      inicio = final + 1;
      final = inicio + Math.floor((numeroOrdenes / 100) * 10);
      rangos.push({ inicio, final, franja: 'TARDE', horas: [2, 3, 4, 5] });

      inicio = final + 1;
      final = inicio + Math.floor((numeroOrdenes / 100) * 5);
      rangos.push({ inicio, final, franja: 'NOCHE', horas: [6, 7, 8] });

    }

    return rangos;
  },

  calcularRangosTipoCliente: (numeroOrdenes, esDomicilios) => {

    let inicio = 0;
    let final = 0;
    const porcentajes = esDomicilios ? [0, 40, 10, 0, 50] : [60, 20, 10, 5, 5];
    const rangos = [];

    if (porcentajes[0]) {
      inicio = 1;
      final = Math.floor((numeroOrdenes / 100) * porcentajes[0]);
      rangos.push({ inicio, final, tipo: 'FAMILIA' });
    }

    if (porcentajes[1]) {
      inicio = final + 1;
      final = inicio + Math.floor((numeroOrdenes / 100) * porcentajes[1]);
      rangos.push({ inicio, final, tipo: 'INDIVIDUAL' });
    }

    if (porcentajes[2]) {
      inicio = final + 1;
      final = inicio + Math.floor((numeroOrdenes / 100) * porcentajes[2]);
      rangos.push({ inicio, final, tipo: 'EMPRESA' });
    }

    if (porcentajes[3]) {
      inicio = final + 1;
      final = inicio + Math.floor((numeroOrdenes / 100) * porcentajes[3]);
      rangos.push({ inicio, final, tipo: 'PAREJA' });
    }

    if (porcentajes[4]) {
      inicio = final + 1;
      final = inicio + Math.floor((numeroOrdenes / 100) * porcentajes[4]);
      rangos.push({ inicio, final, tipo: 'GRUPO' });
    }

    return rangos;
  },

  obtenerTipoCliente: (rangos, indice) => {
    return rangos.filter(rango => indice >= rango.inicio && indice <= rango.final)[0].tipo;
  },

  obtenerNumeroPersonas: (tipoCliente, franjaHoraria) => {
    switch (tipoCliente) {
      case 'INDIVIDUAL':
        return 1;
      case 'PAREJA':
        return 2;
      default:
        if (franjaHoraria === 'NOCHE') return crearNumeroAleatorio(2, 4);
        return crearNumeroAleatorio(2, 10);
    }
  },

  obtenerRangoHorario: (rangos, indice) => {
    return rangos.filter(rango => indice >= rango.inicio && indice <= rango.final)[0];
  },

  obtenerCliente: (Constantes) => {
    const { CLIENTES } = Constantes;
    return obtenerItemAleatoriamente(CLIENTES);
  },

  /* eslint-disable */
  batchPromises: (batchSize, array, getWholeArray, callback) => {
    batchSize = batchSize > array.length ? array.length : batchSize;
    return array
      .map((_, i) => i % batchSize ? '' : array.slice(i, i + batchSize))
      .filter(group => group !== '')
      .map((group, index) => {
        return res => {
          return Promise.all(
            group
              .map(getWholeArray ? callback(array, index * batchSize) : callback))
              .then(r => res.concat(r)
          );
        };
      })
      .reduce((chain, work) => chain.then(work), Promise.resolve([]));
  },
  /* eslint-enable */

};
