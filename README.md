<p align="center">
  <img src="assets/img/iconWebApp.png" height="152" />
</p>
<h1 align="center"><strong>VIZREDGAE</strong> <small>Visualizador red GNSS</small></h1>
<p align="center">
  <a title="Language" href="https://www.w3schools.com/html/" target="_blank">
    <img src="https://img.shields.io/static/v1?label=Lang&message=HTML&color=maroon">
  </a>  
  <a title="Language" href="https://www.w3schools.com/js/" target="_blank">
    <img src="https://img.shields.io/static/v1?label=Lang&message=Javascript&color=maroon">
  </a>
  <a title="Language" href="https://www.w3schools.com/css/" target="_blank">
    <img src="https://img.shields.io/static/v1?label=Lang&message=CSS3&color=maroon">
  </a> 
  <a title="Library" href="https://componentes.cnig.es/api-core/test.html" target="_blank">
    <img src="https://img.shields.io/static/v1?label=Lib&message=APICNIG&color=khaki">
  </a>      
  <a title="Library" href="https://parceljs.org/cli.html" target="_blank">
    <img src="https://img.shields.io/static/v1?label=Build&message=Parcel&color=blue">
  </a>     
  <br />
</p>

# Visualizador red GNSS

Las Comunidades Autónomas y el [Instituto Geográfico Nacional](https://www.ign.es) proporcionan conjuntamente un [servicio de posicionamiento diferencial GNSS](http://www.ign.es/web/resources/docs/IGNCnig/SPTR_IGN.pdf) en tiempo real para toda España. Para generar este servicio se utilizan las estaciones permanentes de las redes GNSS de las Comunidades Autónomas con las que existe un acuerdo de colaboración y de la [Red Geodésica Nacional de Referencia de Estaciones Permanentes GNSS (ERGNSS)](https://www.ign.es/web/ign/portal/gds-gnss-estaciones-permanentes). Algunas de las estaciones de la ERGNSS son compartidas entre el IGN y otras instituciones como Puertos del Estado y Comunidades Autónomas. La utilización de un mayor número de estaciones distribuidas por el territorio aumenta la fiabilidad del sistema al incrementarse la integridad del mismo.

 ![Captura de la pantalla principal](assets/img/captura01.jpg)

---

<a name="contenidos"></a>

## 📇 Contenidos

* 🔹 [Funciones del visualizador](#funciones)
  * 🔹 [Actualización de capas](#actualizacion)
* 🛠 [Configuraciones](#configs)
* 📐 [Stack de desarrollo](#stackdevel)
  * 🔸 [Instalación de dependencias](#dependencies)
  * 🔸 [Arranque del servidor de desarrollo](#rundevel)
  * 🔸 [Despliegue en producción de la aplicación](#deployapp)
  * 📁 [Estructura del código](#scaffolding)
* 🚀 [Despliegue](#deployserver)
* ⛲️ [Referencias](#referencias)


--- 
## 🔹 Funciones del visualizador <a name="funciones"></a>

[👆 Volver](#contenidos)

* Cambios de mapa base: Mapa, Imagen, Híbrido.
* Buscador de topónimos **IGN Search**.
* Información de coordenadas.
* Localizador.
* Herramienta para mostrar al norte la cartografía.
* Botón mostrar/ocultar leyenda.

Al hacer clic sobre el punto que representa a la estación permanente, aparecerá una ventana emergente en la cual podremos ver la información del elemento

* Código de identificación.
* Estado de emisión.
* Información de satélites.
* Coordenadas.
* Propietario.
* Actividad.

En función del estado emisión, se asignan colores a los símbolos:

* <span style='color:darkgreen; font-weight:bold'>Verde</span> – emitiendo
* <span style='color:blue; font-weight:bold'>Azul</span> – conexión lenta
* <span style='color:orangered; font-weight:bold'>Naranja</span> – retardo muy alto
* <span style='color:red; font-weight:bold'>Rojo</span> – Sin conexión

### 🔹 Actualización de capas <a name="actualizacion"></a>

[👆 Volver](#contenidos)

Fijado un tiempo en milisegundos, la aplicación consulta un fichero en formato **geoJSON** con la información actualizada de las estaciones. Accede al fichero, lee su contenido, y sustituye los elementos de la capa por los recién leídos. El refresco no afecta a la aplicación, sino sólo a la capa de estaciones GNSS.

## 🛠 Configuraciones <a name="configs"></a>

[👆 Volver](#contenidos)

El fichero [config.js](src/js/config.js) contiene agrupados todos los parámetros configurables. 

* Estados de conexión.
* Colores de representación de los estados. [👉 Lista completa de colores](https://www.w3schools.com/colors/colors_names.asp)
* Simbología aplicada en función del propietario. [👉 Lista completa de simbología](https://componentes.ign.es/api-core/wiki/#M.style.Point)
* Tiempo de **refresco** de la capa de estaciones GNSS. Valor mínimo: 5000 ms.
* Fichero geojson con los datos de representación.

## 📐 Stack de desarrollo <a name="stackdevel"></a>

[👆 Volver](#contenidos)

Para el desarrollo de este visualizador se ha utilizado Visual Studio Code como editor de código. Para la gestión de paquetes:

* NodeJS Version: 14.16
* NPM Version: 6.14.11

El desarrollo se ha realizado utilizando módulos ESM. Las funciones y procedimientos se exportan desde un fichero a otro, reutilizando contenido, haciendo el código más modular y organizando mejor la aplicación. Está técnica se conoce como separación de código o *code splitting*. 

Esta es una forma de mejorar el rendimiento de un sitio web es aprovechar el caché del navegador, de manera que se sirvan de la memoria de la computadora o dispositivo los archivos que cambian muy poco (como imágenes, javascript y css) y que el navegador sólo tenga que descargar los archivos que hayan cambiado.

En el ecosistema Javascript, existen ciertas herramientas denominadas automatizadores o bundlers. Se utilizan para generar un sólo archivo .js final donde se guardará todo el código Javascript de nuestra web o aplicación, que leerá el navegador.

Este proyecto utiliza **Parcel** como empaquetador de aplicaciones web. Está basado en recursos. Un recurso puede ser cualquier archivo, sin embargo, parcel tiene soporte especial para algunos tipos de archivos como JavaScript, CSS, y HTML. [Parcel](https://parceljs.org/cli.html) analiza automáticamente las dependencias a las que se hace referencia en estos archivos y los incluye en el paquete de salida.

### 🔸 Instalación de dependencias / *Install Dependencies*  <a name="dependencies"></a>

[👆 Volver](#contenidos)

Una vez clonado el proyecto, instalaremos las dependencias. Para este proyecto sólo utilizamos Parcel como dependencia de desarrollo.

```bash
npm i
```

### 🔸 Arranque del servidor de desarrollo / *Run Application* <a name="rundevel"></a>

[👆 Volver](#contenidos)

```bash
parcel src/index.html # npm run dev
```

### 🔸 Despliegue en producción de la aplicación / *Deploy Application* <a name="deployapp"></a>

[👆 Volver](#contenidos)

```bash
parcel build src/index.html --public-url ./ # npm run buildv
```

**Parcel** utiliza como minificador de **HTML** *htmlnano*. Como utilizamos ficheros **SVG**, añadimos la opción en el fichero de configuración *.htmlnanorc.js*

```json
module.exports = {
  "minifySvg": false
}
```

Los ficheros para el despliegue aparecerán en la carpeta **dist**.


### 📁 Estructura del código / *Code scaffolding* <a name="scaffolding"></a>

[👆 Volver](#contenidos)

```any
/
├── assets 🌈               # Recursos
├── dist 📁                  # Generado tras hacer un parcel build
├── src 📦                  # Código fuente.
└── ...
```

### 🔸 Repositorio AdminCNIG / *CNIG delivery* <a name="repocinig"></a>

El fuente válido para el desarrollo se encuentra e esta cuenta de Github. Y su puesta en producción en la web de proyectos de DEVELMAP. Además, cuelgo el desarrollo compilado en el servicor de desarrollo, la máquina **CentOS** que tengo asignada.

http://10.67.33.171/web/mashups/redgnss/

Por último, subo al repo del CNIG el código

https://github.com/administradorcnig/vis.REDGAE

👀‼❗️ Al repo administradorcnig también subimos la carpeta dist


## 🚀 Despliegue <a name="deployserver"></a>

[👆 Volver](#contenidos)

* En web de proyectos de DEVELMAP [https://projects.develmap.com/apicnig/redgnss/](https://projects.develmap.com/apicnig/redgnss/)
* En desarrollo en intranet [http://10.67.33.171/web/mashups/redgnss/](http://10.67.33.171/web/mashups/redgnss/)

## ⛲️ Referencias

[👆 Volver](#contenidos)

* [Apuntes de desarrollo](develnotes.md)
* API Documentation [https://componentes.ign.es/api-core/doc/](https://componentes.ign.es/api-core/doc/)
* [APICNIG Plugins](https://componentes.ign.es/api-core/test.html)
* [Wiki APICNIG](https://github.com/IGN-CNIG/API-CNIG/wiki)
* [Mapea Plugins](https://github.com/sigcorporativo-ja/mapea-plugins)
* Visualizador GNSS [http://ntrip.rep-gnss.es](http://ntrip.rep-gnss.es/)
