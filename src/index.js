/**
 * ----------------------------------------------------------------------------------------------------------- 
 * Configuración del mapa APICORE
 * -----------------------------------------------------------------------------------------------------------
 * 
 * Configuración del mapa del visualizador
 * Creamos un objeto mapa de APICNIG
 * Definimos las capas
 * Configuramos y añadimos los plugin
 * 
 * 🎃@e2molin
 */

import { COLORES_CONEXION, PROPIETARY_SYMBOL,PROPIETARY_RADIUS, urlDataEstaciones, intervalRefresh } from './js/config.js';
import { addCustomPopup } from './js/custompopup.js'
import { refreshLyrVector } from '/js/refreshLyrVector.js'

 M.config.attributions.defaultAttribution = 'Instituto Geográfico Nacional';
 M.config.attributions.defaultURL = 'https://www.ign.es';
 
 // 🌍 e2m: definimos el mapa
  const map = M.map({
             container: 'mapjs',
             controls: ['backgroundlayers','panzoom', 'scaleline', 'rotate' , 'location'],
             zoom: 5,
             maxZoom: 22,
             minZoom: 4,
             projection: "EPSG:3857*m",
             center: {
                 x: -712300,
                 y: 4310700,
                 draw: false  //Dibuja un punto en el lugar de la coordenada
             },
 });
 
 //e2m: esta es la capa que accede a la API de GNSS para acceder al estado de las estaciones 📡
 const REDGNSSCCAA = new M.layer.GeoJSON({
     name: "Monitorización tiempo real",
     url: urlDataEstaciones,
     extract: true, //Si lo ponemos a false, sale el popup standard con las propiedades
 });

 // 🎨 e2m: estilo complejo. Utilizo el elemento icon para simbolizar        
 let estiloPoint = new M.style.Point({
                     icon: {
                             /**
                              * e2m: En la propiedad form se decide qué forma adopta el icon de las preconfiguradas
                              * Valores: BAN|BLAZON|BUBBLE|CIRCLE|LOZENGE|MARKER|NONE|SHIELD|SIGN|SQUARE|TRIANGLE
                              */
                             /**
                              * Este es el punto. En vez de igualar el valor de la propiedad a unos de los valores, lo igualamos a una función anónima que pasa como como parámetros el feature y el mapa
                              * Con el elemento (feature) puedo acceder a los atributos que tiene el geoJSON. La forma la determina el propietario de la estación.
                              * Como valor devuelto por el return es la clase de Mapea que representa a la forma: M.style.form.TRIANGLE para el triángulo y M.style.form.CIRCLE para el círculo
                              */
                             form: function(feature,map) {

                                //return  PROPIETARY_SYMBOL[feature.getAttribute('uso')] || feature.getAttribute('web').indexOf("IGN")>=0 ? M.style.form.TRIANGLE : M.style.form.CIRCLE;

                                if (feature.getAttribute('uso')==='1'){
                                    return M.style.form.CIRCLE;     // CCAA
                                }else if (feature.getAttribute('uso')==='2'){
                                    return M.style.form.TRIANGLE;   // IGN
                                }else if (feature.getAttribute('uso')==='3'){
                                    if (feature.getAttribute('web').indexOf("IGN")>=0){
                                        return M.style.form.TRIANGLE;   // Compartido
                                    }else{
                                        return M.style.form.CIRCLE;   // Compartido
                                    }
                                }else if (feature.getAttribute('uso')==='4'){
                                    return M.style.form.NONE;       // Portugal
                                }else{
                                    return M.style.form.NONE;       // Otras no 
                                }

                                //return  PROPIETARY_SYMBOL[feature.getAttribute('propietario')] || M.style.form.CIRCLE;

                                /*
                                const colorEstado = PROPIETARY_SYMBOL[feature.getAttribute('red')] || 'green';
                                 if (feature.getAttribute('red')==='ERGNSS'){
                                     return M.style.form.TRIANGLE;
                                 }else{
                                     return M.style.form.CIRCLE;
                                     //return M.style.form.NONE; //e2m: Si quisieramos que no se pintara, devolveríamos esto
                                 }
                                 */
                                 
                             },
                             //e2m: luego sigo definiendo el resto de propiedades comunes a todos los símbolos       
                             radius: function(feature,map) {

                                //return  PROPIETARY_RADIUS[feature.getAttribute('uso')] || feature.getAttribute('web').indexOf("IGN")>=0 ? 9 : 5;

                                if (feature.getAttribute('uso')==='1'){
                                    return 5;     // CCAA
                                }else if (feature.getAttribute('uso')==='2'){
                                    return 9;   // IGN
                                }else if (feature.getAttribute('uso')==='3'){
                                    if (feature.getAttribute('web').indexOf("IGN")>=0){
                                        return 9;   // Compartido
                                    }else{
                                        return 5;   // Compartido
                                    }
                                }else if (feature.getAttribute('uso')==='4'){
                                    return 0;       // Portugal
                                }else{
                                    return 0;       // Otras no 
                                }                                 
                                //return  PROPIETARY_RADIUS[feature.getAttribute('propietario')] || 5;

                            },
                             rotation: 3.14159,            // Giro el icono 180 en radianes
                             rotate: false,                // Activar rotacion con dispositivo
                             offset: function(feature,map) {
                                if (feature.getAttribute('uso')==='1'){
                                    return [0,-3];     // CCAA
                                }else if (feature.getAttribute('uso')==='2'){
                                    return [0,0];   // IGN
                                }else if (feature.getAttribute('uso')==='3'){
                                    if (feature.getAttribute('web').indexOf("IGN")>=0){
                                        return [0,0];   // Compartido
                                    }else{
                                        return [0,-3];   // Compartido
                                    }
                                }else if (feature.getAttribute('uso')==='4'){
                                    return [0,0];       // Portugal
                                }else{
                                    return [0,0];       // Otras no 
                                }                                  

                             },               // Desplazamiento en pixeles en los ejes X, Y con respecto a su posición según la coordenada
                             color: function(feature,map) {
                                let colorPunto;
                                const colorEstado = COLORES_CONEXION[feature.getAttribute('numestado')] || 'green';
                                colorPunto = colorEstado;
                                return colorPunto;  // '#3e77f7';
                            }, // No es el color del símbolo, sino de un pequeño borde que ayuda al contraste con el mapa                          
                             fill: function(feature,map) {
                                                 /*let colorPunto;
                                                 const colorEstado = COLORES_CONEXION[feature.getAttribute('numestado')] || 'green';
                                                 colorPunto = colorEstado;*/
                                                 /*if (feature.getAttribute('web').indexOf("IGN")===-1){
                                                    let colorPunto;
                                                    const colorEstado = COLORES_CONEXION[feature.getAttribute('numestado')] || 'green';
                                                    colorPunto = colorEstado;
                                                    return colorPunto;
                                                 }*/
                                                 return  'transparent';
                                                 /*if ((feature.getAttribute('estado')==='Emitiendo')){
                                                     colorPunto = 'transparent';
                                                 }else{
                                                     colorPunto = 'red';
                                                 }
                                                 return colorPunto;*/
                             },//'#8A0829',                  // Color de relleno
                             //gradientcolor:  '#3e77f7',       // Color del borde
                             gradientcolor: function(feature,map) {
                                let colorPunto;
                                const colorEstado = COLORES_CONEXION[feature.getAttribute('numestado')] || 'green';
                                colorPunto = colorEstado;
                                return colorPunto; // '#3e77f7';
                            },
                             gradient:  function(feature,map) {
                                if (feature.getAttribute('uso')==='1'){
                                    return true;     // CCAA
                                }else if (feature.getAttribute('uso')==='2'){
                                    return false;   // IGN
                                }else if (feature.getAttribute('uso')==='3'){
                                    if (feature.getAttribute('web').indexOf("IGN")>=0){
                                        return false;   // Compartido
                                    }else{
                                        return true;   // Compartido
                                    }
                                }else if (feature.getAttribute('uso')==='4'){
                                    return false;       // Portugal
                                }else{
                                    return false;       // Otras no 
                                }  
                            },                     // Degradado entre color de borde e interior
                             opacity: 1,                    // Transparencia. 0(transparente). 1(opaco).
                             snaptopixel: true,
                     },                                    
 });
 
 REDGNSSCCAA.setStyle(estiloPoint);// Asociamos a la capa el estilo definido
 
 map.addLayers([REDGNSSCCAA]);// Añadimos array con todas las capas definidas, en nuestro caso 1
 
 /**
  * 🔌 Definición de plugins para esta versión
  */
 
 const mp1 = new M.plugin.IGNSearch({
     servicesToSearch: 'gn',
     maxResults: 10,
     isCollapsed: false,
     noProcess: 'municipio,poblacion',
     countryCode: 'es',
     reverse: true,
 });
 
 const mp2 = new M.plugin.Attributions({
     mode: 1,
     scale: 25000,
     url: 'https://componentes.ign.es/NucleoVisualizador/vectorial_examples/atribucion.kml',
     type: 'kml',
 
 });
 
 const mp3 = new M.plugin.MouseSRS({
     srs: 'EPSG:4326',
     label: 'WGS84',
     precision: 6,
     geoDecimalDigits: 4,
     utmDecimalDigits: 2,
 });
 
 
 const mp4 = new M.plugin.OverviewMap({
         position: 'BL',
         collapsible: true,
         collapsed: true,            
         fixed: true,
 });
 
 map.addPlugin(mp1);
 map.addPlugin(mp2);
 map.addPlugin(mp3);
 map.addPlugin(mp4);
 
 //Añadimos la capa overlay para mostrar el popup
 addCustomPopup(map);
 
 //Controles
 
 /**
  * Botón de la leyenda
  */
 
  document.getElementById('btnlegend').addEventListener('click', (e) =>  {
     let elem = document.getElementById('panellegend');
     if(elem.style.display == 'block') {
         elem.style.display = 'none';
     }
     else {
         elem.style.display = 'block';
     }
     });
     document.getElementById('panellegend').addEventListener('click', (e) =>  {
     let elem = document.getElementById('panellegend');
     if(elem.style.display == 'block') {
         elem.style.display = 'none';
     }
     else {
         elem.style.display = 'block';
     }
     });
   
/*
// 🚀 Refrescamos la capa a los cinco segundos de arrancar
window.setTimeout(function() {

  refrescarGNSS(REDGNSSCCAA);

}, 5000);
*/

/**
 * ⏳ Refresco periódico de la capa
 * 
 */
if (intervalRefresh>5000) {
    window.setInterval(function() {
        refreshLyrVector(REDGNSSCCAA);
      }, intervalRefresh);
}
