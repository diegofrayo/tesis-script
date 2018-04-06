const Utils = require('./../utils');

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

const clientes = Utils
  .crearArreglo(100)
  .map(numero => {

    if (numero <= 90) {
      const persona = crearPersona();
      return {
        id: numero,
        nombre: persona.nombre,
        direccion: Utils.crearDireccion(),
        telefono: Utils.crearTelefono('PERSONA'),
        genero: persona.genero,
        tipo: 'PERSONA',
      };
    }

    return {
      id: numero,
      nombre: Utils.crearNombreEmpresa(),
      direccion: Utils.crearDireccion(),
      telefono: Utils.crearTelefono('EMPRESA'),
      genero: 'EMPRESA',
      tipo: 'EMPRESA',
    };
  })
  .reduce((acum, curr) => {
    acum[curr.nombre] = curr;
    return acum;
  }, {});

module.exports = {
  generar: () => Object.values(clientes).sort(Utils.ordenar('nombre', 'asc')),
};
