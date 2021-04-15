const url = 'https://rep-gnss.es/visorgnss2/api/mapa/'; // URL fuente de los datos de estaciones GNSS
const intervalRefresh = 60000;                          // Frecuencia de refresco en milisegundos

/**
 * Refresco de los datos de estaciones GNSS
 * 
 * @param {M.layer.Vector} lyrVector //Capa vectorial del APICNIG que refresca sus datos
 */
const refrescarGNSS = (lyrVector) =>{

    //Hacemos una petición al servicio que devuelve las estaciones GNSS. Usamos una promesa
    fetch(url, {})
      .then(response => response.json())
      .then(datajson => {
        // Obtenemos un array con los elementos
        const featuresOL = new ol.format.GeoJSON().readFeatures(datajson,{featureProjection:"EPSG:3857"});
        
        if (featuresOL.length === 0){
          throw new Error('Los elementos obtenidos no son los esperados');
        }

        //Para refrescar la capa, borramos sus elementos (features) y después los rellenamos con los que acabamos de descargar
        lyrVector.clear()

        // 👀OJO!! Los features que descargamos en el array featuresOL tienen formato Openlayers. Hay que transformarlos a formato APICNIG para que los admita la capa que hemos creado con el APICNIG.
        featuresOL.forEach(featureOL => {
          lyrVector.addFeatures([M.impl.Feature.olFeature2Facade(featureOL)]);//Transformamos los features de tipo OL a Facade.
        });
      
        const tempoTranscurrido = Date.now();
        const hoy = new Date(tempoTranscurrido);
        console.log(`Refresco: ${hoy.toISOString()}. Elementos: ${featuresOL.length}`);

      }).catch(error => {
        console.log(error);
      });

}

/*
window.setTimeout(function() {

  refrescarGNSS(REDGNSSCCAA);

}, 5000);
*/

window.setInterval(function() {

  refrescarGNSS(REDGNSSCCAA);

}, intervalRefresh);

