const { argv } = require('yargs');

const Constantes = require('./data/constantes');
const ClientesScript = require('./scripts/clientes');
const ComprasScript = require('./scripts/compras');
const InsumosScript = require('./scripts/insumos');
const ProveedoresScript = require('./scripts/proveedores');
const VentasScript = require('./scripts/ventas');

let configuracion;

switch (argv.area) {

  case 'domicilios':
    configuracion = {
      rangoNumerosDeOrdenNormal: [5, 10],
      rangoNumerosDeOrdenFinDeSemana: [10, 15],
      esDomicilios: true,
      directorioArchivos: 'Ventas A Domicilio',
      columnas: Constantes.COLUMNAS_VENTAS_DOMICILIOS,
    };
    VentasScript.ejecutar(configuracion);
    break;

  case 'clientes':
    ClientesScript.ejecutar();
    break;

  case 'insumos':
    InsumosScript.ejecutar();
    break;

  case 'proveedores':
    ProveedoresScript.ejecutar();
    break;

  case 'compras':
    ComprasScript.ejecutar();
    break;

  default:
    configuracion = {
      rangoNumerosDeOrdenNormal: [40, 80],
      rangoNumerosDeOrdenFinDeSemana: [80, 100],
      esDomicilios: false,
      directorioArchivos: 'Ventas En Restaurante',
      columnas: Constantes.COLUMNAS_VENTAS_RESTAURANTE,
    };
    VentasScript.ejecutar(configuracion);
    break;

}
