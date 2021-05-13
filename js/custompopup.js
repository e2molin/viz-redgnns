/**
 * ----------------------------------------------------------------------------------------------------------- 
 * Customización del popup 🎫 informativo
 * -----------------------------------------------------------------------------------------------------------
 * 
 * Utilizamos la implementación de OL para crear un overlay en la que muestra el popup customizado con los atributos de las estaciones GNSS.
 * Posiblemente se pueda hacer con la API, pero la utilización del popup está poco documentada. 
 * Hace falta documentar con más ejemplos de customización el popup de la API.
 * Mientasr uso esto. Vamos al lío.
 * 
 * 🎃@e2molin
 */

/**
 * 
 * con los atributos de las estaciones GNSS.
 */

var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

var overlay = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
                duration: 250,
    },
});

/**
  * Botón para cerrar el popup
  * @return {boolean} Don't follow the href.
  */
closer.onclick = function () {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};

container.addEventListener('click', (e) =>  {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
});



/**
 * 
 * @param {M.Map} mapAPICNIG 
 */
const addCustomPopup = (mapAPICNIG) =>{

  let mapaOL = mapAPICNIG.getMapImpl();
  mapaOL.addOverlay(overlay);


  mapaOL.on('singleclick', function (evt) {
        
    var cadOUT = "<hr/>";

    mapaOL.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {

      const nombreEstado = ESTADOS_CONEXION[feature.get('numestado')] || 'Emitiendo';
      const colorEstado = COLORES_CONEXION[feature.get('numestado')] || 'green';

      cadOUT = cadOUT + 
              `
              <table style="width:100%; cursor:pointer; -moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;-o-user-select:none;">
              <tr><td style='text-align:center; color:white; background-color: steelblue; font-weight:bold;'>${feature.get('identificador')}</td></tr>
              <tr><td>
                <span title="Conexión">📡</span><span style='color:${colorEstado}; font-weight:bold;'> ${nombreEstado}</span>
              </td></tr>
              <tr><td><span title="Localización">📌</span> ${feature.get('localizacion')}</td></tr>
              <tr><td><span title="Coordenadas">🌐</span> ${feature.get('coordenadas')}</td></tr>
              <tr><td><span title="Propietario">🔐</span> ${feature.get('red')}</td></tr>
              <tr><td><span title="Tiempo">⏰</span> ${feature.get('tiempo')}</td></tr>
              <tr><td><span title="Número satélites GPS">📡</span> GPS: ${feature.get('gps')}</td></tr>
              <tr><td><span title="Número satélites GLONASS">📡</span> GLONASS: ${feature.get('glo')}</td></tr>
              </table>
              <hr/>
              `;

    });

    if (cadOUT !== '<hr/>'){
        var coordinate = evt.coordinate;
        content.innerHTML = cadOUT; 
        overlay.setPosition(coordinate);
    }

    return;

  });

}
    

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


  //