# Leaflet.TileFilter

This [Leaflet](https://leafletjs.org) plugin provides multispectral channel manipulation and processing tools (such as NDVI or other remote sensing methods) for Leaflet tile layers using pure client-side JavaScript. It uses [image-sequencer](https://github.com/publiclab/image-sequencer) and was developed by [Public Lab](https://publiclab.org).

It is based on the simpler plugin for ImageOverlays at https://github.com/publiclab/leaflet-multispectral

It is available as a [node module](https://npmjs.com/package/leaflet-tile-filter) as `leaflet-tile-filter`.

![demo.png](https://github.com/publiclab/leaflet-tile-filter/blob/main/demo.png?raw=true)

This library was made possible in part by [NASA](https://science.nasa.gov/stem-activation-team)'s [AREN project](https://www.globe.gov/web/aren-project/).

## Usage

See the demo for basic usage: https://publiclab.github.io/leaflet-tile-filter/

```js
// create an tile layer
var tileLayer = L.tileLayer(
  'https://gibs-{s}.earthdata.nasa.gov/wmts/epsg3857/best/' +
  '{layer}/default/{time}/{tileMatrixSet}/{z}/{y}/{x}.jpg',
  {
    layer: 'MODIS_Terra_CorrectedReflectance_Bands721',
    tileMatrixSet: 'GoogleMapsCompatible_Level9',
    maxZoom: 9,
    time: '2013-11-04',
    tileSize: 256,
    subdomains: 'abc',
    noWrap: true,
    continuousWorld: true,
    // Prevent Leaflet from retrieving non-existent tiles on the
    // borders.
    bounds: [
      [-85.0511287776, -179.999999975],
      [85.0511287776, 179.999999975]
    ],
    attribution:
      '<a href="https://wiki.earthdata.nasa.gov/display/GIBS">' +
      'NASA EOSDIS GIBS</a>&nbsp;&nbsp;&nbsp;' +
      '<a href="https://github.com/nasa-gibs/web-examples/blob/master/examples/leaflet/webmercator-epsg3857.js">' +
      'View Source' +
      '</a>'
});

// apply a colormap:
tileLayer.filter('colormap');

tileLayer.addTo(map);
```

To revert the image to it's previous state, use:

```js
tileLayer.revert();
```

### Multi-step commands

With a small change [coming in Image Sequencer](https://github.com/publiclab/image-sequencer/issues/731), multi-step commands and the full Image Sequencer syntax will be available:

```js
// apply NDVI equation to the image, and then a colormap:
tileLayer.filter('ndvi,colormap');
```

For more complex commands, you can use JavaScript expresssions, in the following format:

```js
tileLayer.filter('dynamic{red:R*2|green:B|blue:B/2}');
```

In this example, we're using Image Sequencer's `dynamic` module to set the displayed RGB values individually, with the expressions `R*2`, `B`, and `B/2`, respectively. 


## Image Sequencer

(coming soon) Commands you can pass into the filter are extremely flexible; they are Image Sequencer string syntax (full object notation coming soon). Read about Image Sequencer and how to use it here:

https://github.com/publiclab/image-sequencer

Using the visual editor, you can develop a command string to pass into this filter:

https://sequencer.publiclab.org

Image Sequencer is implemented in pure JavaScript, and is under development; we expect optimizations as well as worker threads and WebAssembly to improve performance in upcoming versions. 


## About Multispectral imagery

Learn about multi-band imagery, some of it's uses at this great blog post by Charlie Lloyd of Mapbox:

https://blog.mapbox.com/putting-landsat-8s-bands-to-work-631c4029e9d1

Here's some sources of Landsat 8 data: 

* https://www.mapbox.com/bites/00145/
* https://aws.amazon.com/blogs/aws/start-using-landsat-on-aws/

Here's more on NDVI and DIY techniques to collect multi-band imagery: https://publiclab.org/infragram


## Multispectral TMS tile sources

* https://earthdata.nasa.gov/about/science-system-description/eosdis-components/global-imagery-browse-services-gibs
* https://wiki.earthdata.nasa.gov/display/GIBS/Map+Library+Usage
* https://github.com/nasa-gibs/gibs-web-examples/tree/master/examples/leaflet
* https://wiki.earthdata.nasa.gov/display/GIBS/GIBS+Available+Imagery+Products#expand-CorrectedReflectance16Products
* https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/MODIS_Terra_CorrectedReflectance_Bands721/default/2013-08-21/250m/${z}/${y}/${x}.jpg
* https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/MODIS_Aqua_CorrectedReflectance_TrueColor/default/2013-08-21/250m/${z}/${y}/${x}.jpg


## Additional multi-band imagery

* https://github.com/mapbox/landsat-tiler - demo: https://viewer.remotepixel.ca/#3/40/-70.5
* https://wiki.openstreetmap.org/wiki/Landsat

