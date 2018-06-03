const { argv } = require('yargs');

const ClientesScript = require('./scripts/clientes');
const FechasScript = require('./scripts/fechas');
const GastosDimensionScript = require('./scripts/gastos-dimension');
const GastosScript = require('./scripts/gastos');
const MeserosScript = require('./scripts/meseros');
const PlatosScript = require('./scripts/platos');
const ProveedoresScript = require('./scripts/proveedores');
const TiempoScript = require('./scripts/tiempo');
const VentasScript = require('./scripts/ventas');

switch (argv.area) {

  case 'clientes':
    ClientesScript.ejecutar();
    break;

  case 'fechas':
    FechasScript.ejecutar();
    break;

  case 'gastos-dim':
    GastosDimensionScript.ejecutar();
    break;

  case 'meseros':
    MeserosScript.ejecutar();
    break;

  case 'platos':
    PlatosScript.ejecutar();
    break;

  case 'proveedores':
    ProveedoresScript.ejecutar();
    break;

  case 'tiempo':
    TiempoScript.ejecutar();
    break;

  case 'dimensiones':
    ClientesScript.ejecutar();
    MeserosScript.ejecutar();
    FechasScript.ejecutar();
    TiempoScript.ejecutar();
    PlatosScript.ejecutar();
    GastosDimensionScript.ejecutar();
    ProveedoresScript.ejecutar();
    break;

  case 'domicilios':
    ClientesScript.ejecutar();
    PlatosScript.ejecutar();
    VentasScript.ejecutar('domicilios');
    break;

  case 'gastos':
    GastosScript.ejecutar();
    break;

  default:
    MeserosScript.ejecutar();
    PlatosScript.ejecutar();
    VentasScript.ejecutar('restaurante');
    break;

}
