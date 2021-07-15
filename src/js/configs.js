const COLORES_CONEXION = {
  0:'red',
  1:'green',
  2:'blue',
  3:'orange',
}

const ESTADOS_CONEXION = {
  0:'Sin conexión',
  1:'Emitiendo',
  2:'Conexión lenta',
  3:'Retardo muy alto',
}

const PROPIETARY_SYMBOL = {
  'SITIBSA - IGN':M.style.form.TRIANGLE,
  'IGN':M.style.form.TRIANGLE,
  'IGNE, Servicio de Programas Geodesicos':M.style.form.TRIANGLE,
  'Instituto de Estadística y Cartografía de Andalucía - IGN':M.style.form.TRIANGLE,
  'Junta de Extremadura - IGN':M.style.form.TRIANGLE,
  'ITACyL - IGN':M.style.form.TRIANGLE,
}

const  urlDataEstaciones = 'https://rep-gnss.es/visorgnss2/api/mapa/';
 //const  urlDataEstaciones = 'https://www.ign.es/resources/geodesia/GNSS/SPTR_geo.json';


const intervalRefresh = 10000;  // Frecuencia de refresco en milisegundos 

export {COLORES_CONEXION, ESTADOS_CONEXION, PROPIETARY_SYMBOL, urlDataEstaciones, intervalRefresh}