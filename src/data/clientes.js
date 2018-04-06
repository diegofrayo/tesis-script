const Utils = require('./../utils');

const crearCadenaAleatoria = (longitud = 5) => {

  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  for (let i = 0; i < longitud; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

const crearPersona = () => {

  const NOMBRES_SINGULARES = [
    'Alberto',
    'Alexis',
    'Andres',
    'Carlos',
    'Diego',
    'Eduardo',
    'Enrique',
    'Esteban',
    'Fernando',
    'Jairo',
    'Jorge',
    'Juan',
    'Julian',
    'Mario',
    'Mauricio',
    'Orlando',
    'Pablo',
    'Ricardo',
    'Roberto',
    'Sebastian',
  ];

  const NOMBRES_COMPUESTOS = [
    'Andres Esteban',
    'Andres Fernando',
    'Diego Fernando',
    'Eduardo Luis',
    'Ignacio Andres',
    'Jaime Daniel',
    'Jhon Jairo',
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
    'Ricardo Augusto',
    'Roberto Antonio',
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
    'Florez',
    'Gomez',
    'Gutierrez',
    'Henriquez',
    'Hincapie',
    'Jimenez',
    'Lamprea',
    'Lopera',
    'Lopez',
    'Mora',
    'Noriega',
    'Rayo',
    'Rodriguez',
    'Tabares',
    'Torres',
    'Zamora',
  ];

  const numeroAleatorio = Utils.crearNumeroAleatorio(0, 2);
  let nombre;
  let genero;

  if (numeroAleatorio === 0) {
    genero = 'FEMENINO';
    nombre = Utils.obtenerItemAleatoriamente(NOMBRES_MUJERES);
  } else if (numeroAleatorio === 1) {
    genero = 'MASCULINO';
    nombre = Utils.obtenerItemAleatoriamente(NOMBRES_SINGULARES);
  } else if (numeroAleatorio === 2) {
    genero = 'MASCULINO';
    nombre = Utils.obtenerItemAleatoriamente(NOMBRES_COMPUESTOS);
  }

  return { nombre: `${nombre} ${Utils.obtenerItemAleatoriamente(APELLIDOS)}`, genero };
};

const crearNombreEmpresa = () => {
  return `Empresa ${crearCadenaAleatoria(3)}`;
};

const crearTelefonoFijo = () => {
  return `7${Utils.crearNumeroAleatorio(3, 4)}${Utils.crearNumeroAleatorio(2, 7)}${Utils.crearArreglo(4).map(() => Utils.crearNumeroAleatorio(0, 9)).join('')}`;
};

const crearTelefonoCelular = () => {
  return `3${Utils.crearNumeroAleatorio(0, 2)}${Utils.crearNumeroAleatorio(0, 3)}${Utils.crearArreglo(7).map(() => Utils.crearNumeroAleatorio(0, 9)).join('')}`;
};

const crearTelefono = tipoCliente => {

  if (tipoCliente === 'EMPRESA') {
    return crearTelefonoFijo();
  }

  return Utils.crearNumeroAleatorio(0, 1) ? crearTelefonoCelular() : crearTelefonoFijo();
};

const crearDireccion = () => {

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

  const carrera = Utils.crearNumeroAleatorio(1, 23);
  let direccion = `Calle ${Utils.crearNumeroAleatorio(
    1,
    50,
  )} Cra ${carrera} #${carrera}-${Utils.crearNumeroAleatorio(5, 45)}`;

  if (Utils.crearNumeroAleatorio(0, 1) === 0) {
    direccion += ` ${Utils.obtenerItemAleatoriamente(BARRIOS)}`;
  }

  return direccion;
};

const clientes = Utils
  .crearArreglo(100)
  .map(numero => {

    if (numero <= 90) {
      const persona = crearPersona();
      return {
        id: numero,
        nombre: persona.nombre,
        direccion: crearDireccion(),
        telefono: crearTelefono('PERSONA'),
        genero: persona.genero,
        tipo: 'PERSONA',
      };
    }

    return {
      id: numero,
      nombre: crearNombreEmpresa(),
      direccion: crearDireccion(),
      telefono: crearTelefono('EMPRESA'),
      genero: 'EMPRESA',
      tipo: 'EMPRESA',
    };
});

module.exports = {
  generar: () => clientes,
};
