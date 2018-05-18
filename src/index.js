const { argv } = require('yargs');

const ClientesScript = require('./scripts/clientes');
const FechasScript = require('./scripts/fechas');
const GastosScript = require('./scripts/gastos');
const MeserosScript = require('./scripts/meseros');
const PlatosScript = require('./scripts/platos');
const TiempoScript = require('./scripts/tiempo');
const VentasScript = require('./scripts/ventas');

switch (argv.area) {

  case 'domicilios':
    ClientesScript.ejecutar();
    PlatosScript.ejecutar();
    VentasScript.ejecutar('domicilios');
    break;

  case 'clientes':
    ClientesScript.ejecutar();
    break;

  case 'fechas':
    FechasScript.ejecutar();
    break;

  case 'tiempo':
    TiempoScript.ejecutar();
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

  case 'all':
    ClientesScript.ejecutar();
    MeserosScript.ejecutar();
    FechasScript.ejecutar();
    TiempoScript.ejecutar();
    PlatosScript.ejecutar();
    break;

  default:
    MeserosScript.ejecutar();
    PlatosScript.ejecutar();
    VentasScript.ejecutar('restaurante');
    break;

}
