/**
 * Configuración del mapa del visualizador
 * Creamos un objeto mapa de APICNIG
 * Definimos las capas
 * Configuramos y añadimos los plugin
 */


M.config.attributions.defaultAttribution = 'Instituto Geográfico Nacional';
M.config.attributions.defaultURL = 'https://www.ign.es';

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

//e2m: esta es la capa que accede a la API de GNSS para acceder al estado de las estaciones
const REDGNSSCCAA = new M.layer.GeoJSON({
    name: "Monitorización tiempo real",
    url: "https://rep-gnss.es/visorgnss2/api/mapa/",
    extract: true, //Si lo ponemos a false, sale el popup standard con las propiedades
});


        
//e2m: estilo complejo. Utilizo el elemento icon para simbolizar        
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
                                if (feature.getAttribute('web').indexOf("IGN")>=0){
                                    return M.style.form.TRIANGLE;
                                } else if (feature.getAttribute('propietario').trim()==='DIRECÇÃO-GERAL DO TERRITÓRIO'){
                                    return M.style.form.NONE;
                                }else{
                                    return M.style.form.CIRCLE;
                                }
                                
                            },
                            //e2m: luego sigo definiendo el resto de propiedades comunes a todos los símbolos       
                            radius: function(feature,map) {
                                                if (feature.getAttribute('web').indexOf("IGN")>=0){
                                                    return 8;
                                                }else{
                                                    return 5;//5
                                                }
                                    },
                            rotation: 3.14159,            // Giro el icono 180 en radianes
                            rotate: false,                // Activar rotacion con dispositivo
                            offset: function(feature,map) {
                                if (feature.getAttribute('web').indexOf("IGN")>=0){
                                    return [0,0]
                                }else{
                                    return [0,-3]
                                }
                            },               // Desplazamiento en pixeles en los ejes X, Y con respecto a su posición según la coordenada
                            color: '#3e77f7',               // No es el color del símbolo, sino de un pequeño borde que ayuda al contraste con el mapa62, 119, 247
                            fill: function(feature,map) {
                                                var colorPunto;
                                                if ((feature.getAttribute('estado')==='Emitiendo')){
                                                    colorPunto = 'transparent';
                                                }else{
                                                    colorPunto = 'red';
                                                }
                                                return colorPunto;
                            },//'#8A0829',                  // Color de relleno
                            gradientcolor:  '#3e77f7',       // Color del borde
                            gradient:  function(feature,map) {
                                                if (feature.getAttribute('web').indexOf("IGN")>=0){
                                                    return false;
                                                }else{
                                                    return false;
                                                }
                                    },               // Degradado entre color de borde e interior
                            opacity: 1,                    // Transparencia. 0(transparente). 1(opaco).
                            snaptopixel: true,
                            
                    },                                    
});

REDGNSSCCAA.setStyle(estiloPoint);// Asociamos a la capa el estilo definido

map.addLayers([REDGNSSCCAA]);// Añadimos array con todas las capas definidas, en nuestro caso 1

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


const mp5 = new M.plugin.OverviewMap({
        position: 'BL',
        collapsible: true,
        collapsed: true,            
        fixed: true,
});

map.addPlugin(mp1);
map.addPlugin(mp2);
map.addPlugin(mp3);
map.addPlugin(mp5);

//Añadimos el overlay para mostrar el popup
addCustomPopup(map);