/**
 * ----------------------------------------------------------------------------------------------------------- 
 * Customizaci贸n del popup 馃帿 informativo
 * -----------------------------------------------------------------------------------------------------------
 * 
 * Utilizamos la implementaci贸n de OL para crear un overlay en la que muestra el popup customizado con los atributos de las estaciones GNSS.
 * Posiblemente se pueda hacer con la API, pero la utilizaci贸n del popup est谩 poco documentada. 
 * Hace falta documentar con m谩s ejemplos de customizaci贸n el popup de la API.
 * Mientasr uso esto. Vamos al l铆o.
 * 
 * 馃巸@e2molin
 */

import { COLORES_CONEXION, ESTADOS_CONEXION } from "./config.js";

/**
 * 
 * @param {M.Map} mapAPICNIG 
 */
const addCustomPopup = (mapAPICNIG) =>{

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
    * Bot贸n para cerrar el popup
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
                <span title="Conexi贸n">馃摗</span><span style='color:${colorEstado}; font-weight:bold;'> ${nombreEstado}</span>
              </td></tr>
              <tr><td><span title="Localizaci贸n">馃搶</span> ${feature.get('localizacion')}</td></tr>
              <tr><td><span title="Coordenadas">馃寪</span> ${feature.get('coordenadas')}</td></tr>
              <tr><td><span title="Propietario">馃攼</span> ${feature.get('propietario')}</td></tr>
              <tr><td><span title="Tiempo">鈱氾笍</span> ${feature.get('tiempo')}</td></tr>
              <tr><td><span title="N煤mero sat茅lites GPS">馃摗</span> GPS: ${feature.get('gps')}</td></tr>
              <tr><td><span title="N煤mero sat茅lites GLONASS">馃摗</span> GLONASS: ${feature.get('glonass')}</td></tr>
              </table>
              <hr/>
              `;

    },{
      hitTolerance: 5,
      checkWrapped: false,
    });

    if (cadOUT !== '<hr/>'){
        var coordinate = evt.coordinate;
        content.innerHTML = cadOUT; 
        overlay.setPosition(coordinate);
    }

    return;

  });

}

export {addCustomPopup}
    
