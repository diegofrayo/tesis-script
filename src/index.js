const { argv } = require('yargs');

const Constantes = require('./data/constantes');
const ClientesScript = require('./scripts/clientes');
const VentasScript = require('./scripts/ventas');

let configuracion;

switch (argv.area) {

  case 'domicilios':
    configuracion = {
      rangoNumerosDeOrdenNormal: [5, 10],
      rangoNumerosDeOrdenFinDeSemana: [15, 20],
      esDomicilios: true,
      directorioArchivos: 'Ventas A Domicilio',
      columnas: Constantes.COLUMNAS_VENTAS_DOMICILIOS,
    };
    VentasScript.ejecutar(configuracion);
    break;

  case 'clientes':
    ClientesScript.ejecutar();
    break;

  default:
    configuracion = {
      rangoNumerosDeOrdenNormal: [40, 80],
      rangoNumerosDeOrdenFinDeSemana: [100, 120],
      esDomicilios: false,
      directorioArchivos: 'Ventas En Restaurante',
      columnas: Constantes.COLUMNAS_VENTAS_NORMAL,
    };
    VentasScript.ejecutar(configuracion);
    break;

}
