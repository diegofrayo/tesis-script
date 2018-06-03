const obtenerItemAleatoriamente = arreglo => {
  const longitud = arreglo.length;
  const indice = Math.floor(Math.random() * longitud);
  return arreglo[indice];
};

const crearNumeroAleatorio = (minimo, maximo) => {
  const numeroAleatorio = Math.round(Math.random() * (maximo - minimo));
  return numeroAleatorio + minimo;
};

const eliminarItems = (arreglo, numeroItems) => {

  for (let i = 0; i < numeroItems; i++) {
    arreglo.splice(crearNumeroAleatorio(0, arreglo.length - 1), 1);
  }

  return arreglo;
};

const formatearNumero = numero => (numero < 10 ? `0${numero}` : numero);

const crearArreglo = longitud => Array.from(Array(longitud).keys()).map(value => value + 1);

const obtenerBebida = (platos, esDomicilios) => {

  const numeroAleatorio = crearNumeroAleatorio(0, 100);
  let bebidas = platos.filter(item => item.categoria === 'Bebidas');

  if (esDomicilios) {
    if (numeroAleatorio <= 70) {
      bebidas = bebidas.filter(bebida => bebida.nombre === 'Limonada de coco');
    } else {
      bebidas = bebidas.filter(bebida => bebida.nombre !== 'Limonada de coco');
    }
  } else {
    if (numeroAleatorio <= 70) {
      bebidas = bebidas.filter(
        bebida => bebida.nombre === 'Cerveza Club Colombia' || bebida.nombre === 'Jugos hit',
      );
    } else {
      bebidas = bebidas.filter(
        bebida => bebida.nombre !== 'Cerveza Club Colombia' && bebida.nombre !== 'Jugos hit',
      );
    }
  }

  return obtenerItemAleatoriamente(bebidas);
};

const obtenerPlatoAdicional = platos => {
  const platosAdicionales = platos.filter(item => item.categoria === 'Adicionales');
  return obtenerItemAleatoriamente(platosAdicionales);
};

const obtenerPlatoFuerte = (platos, franjaHoraria, esDomicilios) => {

  let platosFuertes;
  let numeroAleatorio = crearNumeroAleatorio(0, 100);

  if (franjaHoraria === 'NOCHE') {
    if (numeroAleatorio <= 70) {
      platosFuertes = platos.filter(item => item.categoria === 'Ceviches');
    } else {
      platosFuertes = platos.filter(
        item =>
          item.categoria !== 'Adicionales' &&
          item.categoria !== 'Bebidas' &&
          item.categoria !== 'Ejecutivos',
      );
    }
  } else {

    numeroAleatorio = crearNumeroAleatorio(0, 100);

    if (numeroAleatorio <= 70) {

      numeroAleatorio = crearNumeroAleatorio(0, 100);

      if (numeroAleatorio <= 85) {

        platosFuertes = platos.filter(item => item.categoria === 'Ejecutivos');
        numeroAleatorio = crearNumeroAleatorio(0, 100);

        if (esDomicilios) {
          if (numeroAleatorio <= 30) {
            platosFuertes = platos.filter(
              item =>
                item.nombre === 'Ejecutivo con mojarra' ||
                item.nombre === 'Ejecutivo con arroz marinero' ||
                item.nombre === 'Ejecutivo con arroz con camarón',
            );
          } else {
            platosFuertes = platos.filter(
              item =>
                item.nombre !== 'Ejecutivo con mojarra' &&
                item.nombre !== 'Ejecutivo con arroz marinero' &&
                item.nombre !== 'Ejecutivo con arroz con camarón',
            );
          }
        } else {
          if (numeroAleatorio >= 85) {
            platosFuertes = platosFuertes.slice(0, 3);
          } else {
            platosFuertes = platosFuertes.slice(3, platosFuertes.length - 1);
          }
        }

      } else {
        platosFuertes = platos.filter(
          item => item.nombre === 'Cazuela de mariscos' || item.nombre === 'Arroz a la marinera',
        );
      }

    } else {
      platosFuertes = platos.filter(
        item =>
          item.categoria !== 'Adicionales' &&
          item.categoria !== 'Bebidas' &&
          item.categoria !== 'Ejecutivos' &&
          item.nombre !== 'Cazuela de mariscos' &&
          item.nombre !== 'Arroz a la marinera',
      );
    }
  }

  return obtenerItemAleatoriamente(platosFuertes);
};

const agregarPlatoAOrden = (listadoPlatos, plato, currentYear) => {

  if (plato === undefined) return;

  if (listadoPlatos[plato.id] === undefined) {
    listadoPlatos[plato.id] = {
      id: plato.id,
      nombre: plato.nombre,
      precio: plato.precio[currentYear],
      unidades: 1,
    };
  } else {
    listadoPlatos[plato.id].unidades += 1;
  }
};

const crearTelefonoFijo = () => {
  return `7${crearNumeroAleatorio(3, 4)}${crearNumeroAleatorio(2, 7)}${crearArreglo(4)
    .map(() => crearNumeroAleatorio(0, 9))
    .join('')}`;
};

const crearTelefonoCelular = () => {
  return `3${crearNumeroAleatorio(0, 2)}${crearNumeroAleatorio(0, 3)}${crearArreglo(7)
    .map(() => crearNumeroAleatorio(0, 9))
    .join('')}`;
};

const crearCadenaAleatoria = (longitud = 5, opcion = '') => {

  let text = '';
  let possible;

  if (opcion === 'numeros') {
    possible = '1234567890';
  } else {
    possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }

  for (let i = 0; i < longitud; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

module.exports = {

  crearArreglo,

  formatearNumero,

  crearTelefonoFijo,

  crearTelefonoCelular,

  crearCadenaAleatoria,

  crearNumeroAleatorio,

  obtenerItemAleatoriamente,

  esFinDeSemana: fecha => {
    const dia = fecha.getDay();
    return dia === 6 || dia === 0;
  },

  formatearFecha: fecha => `${fecha.getFullYear()}-${formatearNumero(fecha.getMonth() + 1)}-${formatearNumero(fecha.getDate())}`,

  crearFecha: (year, dia) => {
    const fecha = new Date(year, 0);
    return new Date(fecha.setDate(dia));
  },

  crearHora: (horas, minutos) => {
    return `${formatearNumero(obtenerItemAleatoriamente(horas))}:${formatearNumero(
      obtenerItemAleatoriamente(minutos),
    )}`;
  },

  crearHoraFacturacion: horaTomaOrden => {

    const minutosAleatorio = crearNumeroAleatorio(30, 60);

    const itemsHora = horaTomaOrden.split(':');
    let hora = Number(itemsHora[0]);
    let minutos = Number(itemsHora[1]) + minutosAleatorio;

    if (minutos >= 60) {
      hora += 1;
      minutos -= 60;
    }

    return `${formatearNumero(hora)}:${formatearNumero(minutos)}`;
  },

  obtenerListadoDePlatos: (
    numeroDePersonas,
    currentYear,
    franjaHoraria,
    platos,
    esDomicilios,
  ) => {

    const listadoPlatos = {};

    crearArreglo(numeroDePersonas)
      .map(() => {

        const platoFuerte = obtenerPlatoFuerte(platos, franjaHoraria, esDomicilios);
        agregarPlatoAOrden(listadoPlatos, platoFuerte, currentYear);

        if (esDomicilios === false && platoFuerte.categoria !== 'Ejecutivos' && platoFuerte.categoria !== 'Ceviches') {
          const bebida = obtenerBebida(platos, esDomicilios);
          agregarPlatoAOrden(listadoPlatos, bebida, currentYear);
        }
      });

    const platoAdicional = crearNumeroAleatorio(0, 100) >= 85 ? obtenerPlatoAdicional(platos) : undefined;
    agregarPlatoAOrden(listadoPlatos, platoAdicional, currentYear);

    if (esDomicilios === true && crearNumeroAleatorio(0, 100) >= 85) {
      const bebida = obtenerBebida(platos, esDomicilios);
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
      final = Math.floor(numeroOrdenes / 100 * 90);
      rangos.push({ inicio, final, franja: 'MEDIO DIA', horas: [11, 12, 13] });

      inicio = final + 1;
      final = inicio + Math.floor(numeroOrdenes / 100 * 10);
      rangos.push({ inicio, final, franja: 'TARDE', horas: [14, 15, 16, 17] });

    } else {

      inicio = 1;
      final = Math.floor(numeroOrdenes / 100 * 75);
      rangos.push({ inicio, final, franja: 'MEDIO DIA', horas: [11, 12, 13] });

      inicio = final + 1;
      final = inicio + Math.floor(numeroOrdenes / 100 * 15);
      rangos.push({ inicio, final, franja: 'TARDE', horas: [14, 15, 16, 17] });

      inicio = final + 1;
      final = inicio + Math.floor(numeroOrdenes / 100 * 10);
      rangos.push({ inicio, final, franja: 'NOCHE', horas: [18, 19] });

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
      final = Math.floor(numeroOrdenes / 100 * porcentajes[0]);
      rangos.push({ inicio, final, tipo: 'FAMILIA' });
    }

    if (porcentajes[1]) {
      inicio = final + 1;
      final = inicio + Math.floor(numeroOrdenes / 100 * porcentajes[1]);
      rangos.push({ inicio, final, tipo: 'INDIVIDUAL' });
    }

    if (porcentajes[2]) {
      inicio = final + 1;
      final = inicio + Math.floor(numeroOrdenes / 100 * porcentajes[2]);
      rangos.push({ inicio, final, tipo: 'EMPRESA' });
    }

    if (porcentajes[3]) {
      inicio = final + 1;
      final = inicio + Math.floor(numeroOrdenes / 100 * porcentajes[3]);
      rangos.push({ inicio, final, tipo: 'PAREJA' });
    }

    if (porcentajes[4]) {
      inicio = final + 1;
      final = inicio + Math.floor(numeroOrdenes / 100 * porcentajes[4]);
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
        if (franjaHoraria === 'NOCHE') return crearNumeroAleatorio(1, 3);
        return crearNumeroAleatorio(3, 6);
    }
  },

  obtenerRangoHorario: (rangos, indice) => {
    return rangos.filter(rango => indice >= rango.inicio && indice <= rango.final)[0];
  },

  ordenar: (attr = '', order = 'asc') => {

    let greater = 1;
    let smaller = -1;

    if (order === 'desc') {
      greater = -1;
      smaller = 1;
    }

    const sortFn = (a, b) => {

      let aAttr = a[attr];
      let bAttr = b[attr];

      if (aAttr === undefined || aAttr === null) {
        aAttr = '';
      }

      if (bAttr === undefined || bAttr === null) {
        bAttr = '';
      }

      aAttr = aAttr.toLowerCase();
      bAttr = bAttr.toLowerCase();

      if (aAttr === bAttr) {
        return 0;
      } else if (aAttr > bAttr) {
        return greater;
      }

      return smaller;
    };

    return sortFn;
  },

  crearTelefono: tipoCliente => {

    if (tipoCliente === 'FIJO') {
      return crearTelefonoFijo();
    } else if (tipoCliente === 'CELULAR') {
      return crearTelefonoCelular();
    }

    return crearNumeroAleatorio(0, 1) ? crearTelefonoCelular() : crearTelefonoFijo();
  },

  crearDireccion: () => {

    const BARRIOS = [
      '14 De Octubre',
      '25 De Mayo',
      '60 Casas',
      '7 De Agosto',
      'Alfonso López',
      'Almendros',
      'Arco Iris',
      'Arenales',
      'Arrayanes',
      'Berlín',
      'La Adiela',
      'La Alambra',
      'La Alquería',
      'La Arboleda',
      'La Arcadia',
      'La Aurora',
      'La Cecilia',
      'La Clarita',
      'La Esperanza',
      'La Fachada',
      'La Grecia',
      'La Isabela',
      'La Mariela',
      'La Milagrosa',
      'La Unión',
      'Las Acacias',
      'Las Américas',
      'Las Colinas',
      'Libertadores',
      'Limonar',
      'Lindaraja',
      'Los Álamos',
      'Los Naranjos',
      'Manantiales',
      'María Cristina',
      'Mercedes Del Norte',
    ];

    const carrera = crearNumeroAleatorio(1, 23);
    let direccion = `Calle ${crearNumeroAleatorio(
      1,
      50,
    )} Cra ${carrera} #${carrera}-${crearNumeroAleatorio(5, 45)}`;

    if (crearNumeroAleatorio(0, 1) === 0) {
      direccion += ` ${obtenerItemAleatoriamente(BARRIOS)}`;
    }

    return direccion;
  },

  crearPersona: () => {

    const NOMBRES_SINGULARES = [
      'Adrián',
      'Alberto',
      'Alejandro',
      'Alexis',
      'Andres',
      'Carlos',
      'Daniel',
      'David',
      'Eduardo',
      'Enrique',
      'Esteban',
      'Fernando',
      'Hugo',
      'Javier',
      'Jorge',
      'Juan',
      'Julian',
      'Lucas',
      'Manuel',
      'Marcos',
      'Mario',
      'Martin',
      'Mauricio',
      'Orlando',
      'Pablo',
      'Roberto',
    ];

    const NOMBRES_COMPUESTOS = [
      'Andres Esteban',
      'Andres Fernando',
      'Eduardo Luis',
      'Ignacio Andres',
      'Jorge Esteban',
      'Juan Alberto',
      'Juan Alfonso',
      'Juan Diego',
      'Juan Pablo',
      'Juan Sebastian',
      'Julian Andres',
      'Luis Alejandro',
      'Luis Esteban',
      'Luis Fernando',
      'Mauricio Andres',
    ];

    const NOMBRES_MUJERES = [
      'Alejandra',
      'Alicia',
      'Amanda',
      'Ana',
      'Angela',
      'Astrid',
      'Carolina',
      'Catalina',
      'Daniela',
      'Diana',
      'Dora',
      'Estefania',
      'Lina',
      'Maria',
      'Monica',
      'Rosalba',
      'Sofia',
      'Stephany',
      'Teresa',
      'Yessica',
    ];

    const APELLIDOS = [
      'Aguirre',
      'Alvarez',
      'Aristizabal',
      'Cano',
      'Cardona',
      'Castro',
      'Diaz',
      'Florez',
      'García',
      'Gomez',
      'González',
      'Gutierrez',
      'Henriquez',
      'Hernández',
      'Jimenez',
      'Lopez',
      'Martínez',
      'Medina',
      'Mora',
      'Moreno',
      'Prieto',
      'Pérez',
      'Ramírez',
      'Restrepo',
      'Rodriguez',
      'Rojas',
      'Sabogal',
      'Sánchez',
      'Torres',
    ];

    const numeroAleatorio = crearNumeroAleatorio(0, 2);
    let nombre;
    let genero;

    if (numeroAleatorio === 0) {
      genero = 'FEMENINO';
      nombre = obtenerItemAleatoriamente(NOMBRES_MUJERES);
    } else if (numeroAleatorio === 1) {
      genero = 'MASCULINO';
      nombre = obtenerItemAleatoriamente(NOMBRES_SINGULARES);
    } else if (numeroAleatorio === 2) {
      genero = 'MASCULINO';
      nombre = obtenerItemAleatoriamente(NOMBRES_COMPUESTOS);
    }

    return {
      nombre: `${nombre} ${obtenerItemAleatoriamente(APELLIDOS)}`,
      cedula: `10${crearCadenaAleatoria(8, 'numeros')}`,
      genero,
    };
  },

  esAnioBisiesto: (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  },

  obtenerComprasPescado: (gastos, dia) => {

    const gastosPescado = gastos.filter(gasto => gasto.categoria === 'PESCADOS');

    if (dia % 2 === 0) {
      return eliminarItems(gastosPescado.slice(0, Math.floor(gastosPescado.length / 2)), 1);
    }

    return eliminarItems(gastosPescado.slice(Math.floor(gastosPescado.length / 2), gastosPescado.length), 1);
  },

  obtenerComprasInsumos: (gastos, dia) => {

    if (dia === 0) return [];

    return eliminarItems(gastos.filter(gasto => gasto.categoria === 'INSUMOS'), 3);
  },

  obtenerComprasBebidas: (gastos, dia) => {

    if (dia !== 1) return [];

    return eliminarItems(gastos.filter(gasto => gasto.categoria === 'BEBIDAS'), 2);
  },

  obtenerGastosNomina: (gastos, fecha) => {

    const fechaUltimoDiaMes = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0);

    if (fechaUltimoDiaMes.getDate() !== fecha.getDate()) return [];

    return gastos.filter(gasto => gasto.categoria === 'NOMINA');
  },

  obtenerGastosInfraestructura: (gastos, fecha) => {

    const fechaUltimoDiaMes = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0);

    if (fechaUltimoDiaMes.getDate() !== fecha.getDate()) return [];

    return gastos.filter(gasto => gasto.categoria === 'INFRAESTRUCTURA');
  },

  obtenerGastosPublicidad: (gastos, fecha) => {

    const fechaUltimoDiaMes = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0);

    if (fechaUltimoDiaMes.getDate() !== fecha.getDate()) return [];

    return gastos.filter(gasto => gasto.categoria === 'PUBLICIDAD');
  },

  obtenerProveedor: (proveedores, categoriaGasto, fecha) => {

    if (categoriaGasto === 'PESCADOS') {

      if (fecha.getFullYear() === 2017 && (fecha.getMonth() + 1) <= 10) {
        return proveedores.filter(proveedor => proveedor.categoria === 'PESCADERIA')[0];
      }

      return proveedores.filter(proveedor => proveedor.categoria === 'PESCADERIA')[1];

    } else if (categoriaGasto === 'INSUMOS') {

      if ((fecha.getMonth() + 1) <= 2 || fecha.getFullYear() === 2017) {
        return proveedores.filter(proveedor => proveedor.categoria === 'INSUMOS')[0];
      }

      return proveedores.filter(proveedor => proveedor.categoria === 'INSUMOS')[1];

    }

    return proveedores.filter(proveedor => proveedor.categoria === 'N/A')[0];
  },

  /* eslint-disable */
  batchPromises: (batchSize, array, getWholeArray, callback) => {
    batchSize = batchSize > array.length ? array.length : batchSize;
    return array
      .map((_, i) => (i % batchSize ? '' : array.slice(i, i + batchSize)))
      .filter(group => group !== '')
      .map((group, index) => {
        return res => {
          return Promise.all(
            group.map(getWholeArray ? callback(array, index * batchSize) : callback),
          ).then(r => res.concat(r));
        };
      })
      .reduce((chain, work) => chain.then(work), Promise.resolve([]));
  },
  /* eslint-enable */

};
