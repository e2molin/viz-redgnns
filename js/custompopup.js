/**
 * Utiliza la implementación de OL para crear un overlay en la que muestra el popup customizado 
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
      
      cadOUT = cadOUT + 
              `
              <table style="width:100%;">
              <tr><td style='text-align:center;''>${feature.get('nombre')}</td></tr>
              <tr><td style='text-align:center; color:white; background-color: steelblue; font-weight:bold;'>${feature.get('identificador')}</td></tr>
              <tr><td>📡 ${feature.get('estado')==='Emitiendo' ? "<span style='color:green; font-weight:bold;'>Emitiendo</span>" : "<span style='color:red; font-weight:bold;'>Sin conexión</span>"}</td></tr>
              <tr><td>📌 ${feature.get('localizacion')}</td></tr>
              <tr><td>🌐 ${feature.get('web')}</td></tr>
              <tr><td>🏰 ${feature.get('propietario')}</td></tr>
              <tr><td>⏰ ${feature.get('tiempo')}</td></tr>
              <tr><td>🛰 GPS: ${feature.get('gps')}</td></tr>
              <tr><td>🛰 Glonass: ${feature.get('glonass')}</td></tr>
              <tr><td>🔗 <a href='${feature.get('ftp')}' target='_blank'>${feature.get('ftp')}</a></td></tr>
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