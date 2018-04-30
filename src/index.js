const { argv } = require('yargs');

const ClientesScript = require('./scripts/clientes');
const FechasScript = require('./scripts/fechas');
const GastosScript = require('./scripts/gastos');
const MeserosScript = require('./scripts/meseros');
const PlatosScript = require('./scripts/platos');
const VentasScript = require('./scripts/ventas');

switch (argv.area) {

  case 'domicilios':
    VentasScript.ejecutar('domicilios');
    break;

  case 'clientes':
    ClientesScript.ejecutar();
    break;

  case 'fechas':
    FechasScript.ejecutar();
    break;

  case 'platos':
    PlatosScript.ejecutar();
    break;

  case 'meseros':
    MeserosScript.ejecutar();
    break;

  case 'gastos':
    GastosScript.ejecutar();
    break;

  default:
    VentasScript.ejecutar();
    break;

}
