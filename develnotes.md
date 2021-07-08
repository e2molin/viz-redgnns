# 👨‍💻 Develnotes - Visor GNSS

## ☑️ Tarea en REDMINE
https://www.guadaltel.es/redmine/issues/187623

## 🕵️‍♂️ Análisis previo de las necesidades

Necesidad de un visor de las estaciones GNSS, que sustituya a la versión actual desarrollada con la API v2.7. El visor actual se encuentra en 👉 [http://redgae.ign.es/web/guest/inicio](http://redgae.ign.es/web/guest/inicio).

El visualizador muestra la ubicación de las estaciones en el mapa y muestra su estado e información en tiempo real. Para ello consulta de manera periódica un fichero en formato geojson. La consulta de este fichero se realiza cada minuto, refreascando la totalidad de la página web, no conservando los datos de navegación del usuario. 

* Fichero con la información de las estaciones  👉 [https://rep-gnss.es/visorgnss2/api/mapa/](https://rep-gnss.es/visorgnss2/api/mapa/)

Como imagen de fondo muestra información de IGNBAse, Ortofoto del PNOA. Set de herramientas  mínimo. Simbología que distingue entre estaciones del IGN y CCAA. Colores que indican el estado de la estación.

El nuevo visualizador utilizará la nueva versión de la APICNIG v3 o superior. Configuración mínima de herramientas. Zoom inicial que incluya la totalidad del territorio español. El planteamiento inicial consiste en utilizar las posibilidades de configuración que ofrece a día de hoy la API. Para aquellos requisitos no alcanzables mediante configuración, se hará uso del acceso a la implementación del motor cartográfico de OL.

* Customización del popup.
* Refresco de la capa de estaciones sin refrfescar la página al completo.
* Botones y paneles.

## 🔸 Puntos de partida

* Este es el visualizador que hay que sustituir 👉 [http://redgae.ign.es/web/guest/inicio](http://redgae.ign.es/web/guest/inicio)
* Este es el geojson del que se nutre y que se refresca temporalmente 👉 [https://rep-gnss.es/visorgnss2/api/mapa/](https://rep-gnss.es/visorgnss2/api/mapa/)
* Prototipo para evaluar posibilidades 👉 [http://www.ign.es/resources/viewer/api-ejemplos/Redgae.html](http://www.ign.es/resources/viewer/api-ejemplos/Redgae.html)
* Este es el portal en desarrollo para comprobar la página donde irá embebido [http://10.67.33.167:8081/web/ign/portal/gds-gnss-tiempo-real](http://10.67.33.167:8081/web/ign/portal/gds-gnss-tiempo-real)


## 🔸 Requisitos tras propuesta inicial

Tras conversaciones iniciales con Sandra

* Simbología (Está consensuada con Geodesia)
  * [x] Símbolos en azul.
  * [x] Sólo fondos rojos cuando hay incidencia
  * [x] Triángulos apuntando hacia arriba
* Herramientas. Simplificar, pensar en que tiene uso desde el móvil.
  * [x] Quitar: zoom ventana, Buscar por coordenadas, Vistas predefinidas, Búsqueda por geometría, Compartir, girar al norte
  * [x] Mapas de fondo: Sólo dejar IGNBase, Imagen, Mapa Raster
  * [ ] TOC: Dejar solo la capa de tiempo real. Tiene que tener leyenda.
* Versión móvil.
  * Que se vea Península, Baleares y Canarias de inicio.
  
 Optamos por prescindir del plugin *BackImgLayer* porque sólo se quieren tres capas de fondo. Para la simbología se utilizan las especificaciones recogidas en [https://github.com/IGN-CNIG/API-CNIG/wiki/M.style.Point](https://github.com/IGN-CNIG/API-CNIG/wiki/M.style.Point). 

 💡 Es necesario ampliar el Wiki recogiendo ejemplos de cómo customizar la simbología en función de propiedades de los elementos o el nivel de zoom.
 
 ```javascript
 let estiloPoint = new M.style.Point({
        icon: {
		[....]
          /**
		* e2m: customización de la simbología.
        * Este es el punto clave. En vez de igualar el valor de la propiedad a unos de los valores, lo igualamos a una función anónima que pasa como como parámetros el feature y el mapa
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
 		[....]
 ```
   

## 📝 Requisitos tras revisión 1

Móvil (en dispositivo, no en modo debug):

* El Nivel de zoom se queda con tropecientos decimales: p.e.: 12,4554105442154511 .
  * [Chema] Pedir a Guadaltel que solucione el plugin.
  * ✅ [Esteban] Quitarlo. No lo veo necesario en esta aplicación y ocupa en la versión móvil.
* El triángulo es mucho más grande que el círculo. En el móvil se aprecia más la diferencia. En mi opinión, reducir un poco el triángulo y aumentar algo el círculo. Incluso hacer más visibles los símbolos imitando el estilo de http://redgae.ign.es/web/guest/inicio . Poner los círculos con relleno.
* ✅ Para los círculos a veces es difícil acertar en la estación para que muestre el *pop-up*.
* ✅ Al poner como capa de fondo el mapa ráster, lo agrega al TOC y luego interacciona con la capa de fondo. P.e. si se desactiva la visualización en el TOC ya no se puede activar o desactivar desde la capa de fondo.
* ✅ Con el móvil es relativamente sencillo girar el mapa sin querer. Volver a poner el botón de orientación norte.
* ✅ Quitar el botón de medición.
* [ ] Como hemos comentado por teléfono, ver la simbolización.  Por ejemplo Cazalla de la Sierra (CAZA) tiene 2 estaciones en el mismo punto y con la misma simbolización. En el original se ve círculo y triángulo.
* [ ] Refresco de la página. Hazlo de la forma más sencilla posible, imitando como está hecho ahora y si hace falta, que nos ayude **Guadaltel**.
* [ ] Leyenda, queda pendiente.

> Por mi parte lo voy a quitar pero, los tropecientos decimales del nivel de zoom se deben a que al  variar el zoom haciendo pitch (aumento del zoom) o spread (disminución de zoom), la cartografía aumenta o disminuye en niveles reales de zoom. Si en vez de los gestos usas los botones verás que no sucede esto, ya que avanzas o desciendes niveles enteros de zoom. Creo que es posible restringir los saltos de zoom a niveles enteros con la propiedad constrainResolution, pero creo que es un tema del core. De todas maneras creo que lo mejor es dejarlo como está y en todo caso maquillar los valores del nivel, poniendo nivel 4-5 para 4.621546565 o algo similar. Si haces zoom con gestos y te salta al nivel entero por debajo o por encima, la experiencia de usuario se va a haber afectada. 

💡 Lo que sí estaría bien es que la herramienta que muestra la coordenada de la posición del cursor, que desaparece en el modo movíl, se mantuviera en pantalla pero indicando la coordenada del centro de la pantalla. Puede ser interesante en el modo móvil conocer la coordenada de un determinado punto, y sería una manera muy fácil.

> He cambiado los tamaños de la simbología, a ver si ahora solucionamos tanto la visualización como la facilidad para acertar sobre el icono.He cambiado el selector de capas de fondo, quitando el BackImgLayer y sustituyendo por el control standard, que es más discreto y se adapta mejor a los móviles. De esta manera no reproduzco el comportamiento de que la capa de fondo se sume al TOC, luego creo que matamos dos pájaros de un tiro 🐦🐦🔫.

## 📝 Refresco, cierre del popup y leyenda

La opción de mantener el refresco completo de la página la descartamos porque es de usabilidad pobre 😓 e incómoda para la navegación. Nos planteamos un procedimiento periódico que, fijado un intervalo de tiempo configurable en desarrollo, que establecemos en 60 segundos, consulte la fuente de los datos, descargue los elementos del **geoJSON**, y sustituya los de la capa activa con las estaciones por los recién descargados.

El reducido tamaño de la pantalla en la versión móvil provoca que la ❌ de cierre del popup quede oculta por otros controles. Se habilita la posibilidad de cerrar el popup tocando sobre el panel, manteniendo la posibilidad de acceder a los enlaces de la tabla de atributos del elemento.

Para mostrar la leyenda, incluimos un botón y un panel customizados según el estilo de la APICNIG con la descripción de la simbología. Dado que la capa de estaciones GNSS es la única capa que queremos mostrar, y tiene que estar siempre encendida, prescindimos del plugin [TOC].

## ⏳ Bitácora

### 🔹 20200708 - Cambiamos la URL del fichero con las estaciones

La URL definitiva por ahora es

* 🔗 [https://rep-gnss.es/visorgnss2/api/mapa/](https://rep-gnss.es/visorgnss2/api/mapa/)

### 🔹 20200513 - Actualización de los colores simbología v2.0.1

En función del estado emisión, se asignan colores a los símbolos:

* Verde – emitiendo
* Azul – conexión lenta
* Naranja – retardo muy alto
* Rojo – Sin conexión

### 🔹 20200506 - Cambio de formato 

* "id": "1001"
* "identificador": "ABAN"
* "mountpoint": "ABAN3"
* "localizacion": "Abanilla"
* "red": "REGAM"
* "coordenadas": "38.18N 1.05W"
* "tiempo": "2021-05-06 08:39:57"
* "estado": "Emitiendo"
* "numestado": 1.0
* "gps": "8"
* "glo": "7"

Los triangulitos son las estaciones del IGN, que tienen el campo red con valor 

### 🔹 20200429 - Origen de estaciones GNSS.

Cambios la URL de las estaciones GNSS 👉 [http://193.144.251.103:2101/geojson](http://193.144.251.103:2101/geojson).

* Es una URL interna. No podemos verificarla hasta que no nos den acceso.
* Avisamos de que debe servirse bajo protocolo https.

## ⛲️ Referencias

* API Documentation [https://componentes.ign.es/api-core/doc/](https://componentes.ign.es/api-core/doc/)
* Visor GNSS [http://ntrip.rep-gnss.es](http://ntrip.rep-gnss.es/)


### Trabajando con SVG

Artículo https://medium.com/adalab/c%C3%B3mo-dar-color-a-una-imagen-svg-en-css-9f6f84199bf4

Eleginos el SVG deseado, como este de la librería Font Awesome https://fontawesome.com/icons/map-signs?style=solid
Con el programa https://jakearchibald.github.io/svgomg/ podemos transformalo en una etiqueta svg

```svg
<svg aria-hidden="true" data-prefix="fas" data-icon="map-signs" class="svg-inline--fa fa-map-signs fa-w-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M507.31 84.69L464 41.37c-6-6-14.14-9.37-22.63-9.37H288V16c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v16H56c-13.25 0-24 10.75-24 24v80c0 13.25 10.75 24 24 24h385.37c8.49 0 16.62-3.37 22.63-9.37l43.31-43.31c6.25-6.26 6.25-16.38 0-22.63zM224 496c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V384h-64v112zm232-272H288v-32h-64v32H70.63c-8.49 0-16.62 3.37-22.63 9.37L4.69 276.69c-6.25 6.25-6.25 16.38 0 22.63L48 342.63c6 6 14.14 9.37 22.63 9.37H456c13.25 0 24-10.75 24-24v-80c0-13.25-10.75-24-24-24z"/></svg>
```
Con el atributo *fill* definimos el color y con la propiedad *viewBox* definimos el tamaño. Si lo queremos más pequelño cambiamos los valores por defecto viewBox="0 0 512 512" por viewBox="128 128 768 768"
