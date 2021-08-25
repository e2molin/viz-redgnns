const COLORES_CONEXION = {
  0: 'red',
  1: 'green',
  2: 'red',
  3: 'orange',
}

const ESTADOS_CONEXION = {
  0: 'Sin conexión',
  1: 'Emitiendo',
  2: 'Conexión lenta',
  3: 'Retardo muy alto',
}

/**
 * Aquí se configura la simbología según el atributo uso
 * Si el valor que llkega es tres, se decide con un operador ternario en origen
 * Para no dibujar símbolo, utilizamos M.style.form.NONE
 * Resto de valores disponibles en https://componentes.ign.es/api-core/wiki/#M.style.Point
 */
const PROPIETARY_SYMBOL = {
  /*'SITIBSA - IGN':M.style.form.TRIANGLE,
  'IGN':M.style.form.TRIANGLE,
  'IGNE, Servicio de Programas Geodesicos':M.style.form.TRIANGLE,
  'Instituto de Estadística y Cartografía de Andalucía - IGN':M.style.form.TRIANGLE,
  'Junta de Extremadura - IGN':M.style.form.TRIANGLE,
  'ITACyL - IGN':M.style.form.TRIANGLE,
  'DIRECÇÃO-GERAL DO TERRITÓRIO':M.style.form.NONE,*/
  '1': M.style.form.CIRCLE,   // CCAA
  '2': M.style.form.TRIANGLE, // IGN
  '4': M.style.form.NONE,     // Portugal
}

const PROPIETARY_RADIUS = {
  /*'SITIBSA - IGN': 8,
  'IGN': 8,
  'IGNE, Servicio de Programas Geodesicos': 8,
  'Instituto de Estadística y Cartografía de Andalucía - IGN': 8,
  'Junta de Extremadura - IGN': 8,
  'ITACyL - IGN': 8,*/
  '1': 5, // CCAA
  '2': 9, // IGN
  '4': 0, // Portugal
}



const  urlDataEstaciones = 'https://rep-gnss.es/visorgnss2/api/mapa/';
 //const  urlDataEstaciones = 'https://www.ign.es/resources/geodesia/GNSS/SPTR_geo.json';


const intervalRefresh = 60000;  // Frecuencia de refresco en milisegundos. Valor mínimo 5000 ms

export {COLORES_CONEXION, ESTADOS_CONEXION, PROPIETARY_SYMBOL, PROPIETARY_RADIUS, urlDataEstaciones, intervalRefresh}

