import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';
import { Map, View, Overlay } from 'ol';
import { Tile, Image, Group, Vector } from 'ol/layer';
import { OSM, ImageWMS, BingMaps, StadiaMaps } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import { GeoJSON } from 'ol/format';
import { fromLonLat } from 'ol/proj';
import { ScaleLine, FullScreen, MousePosition, ZoomSlider,  } from 'ol/control';
import LayerSwitcher from 'ol-layerswitcher';
import { createStringXY } from 'ol/coordinate';
import { Style, Stroke } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';

let osm = new Tile({
    type: "base",
    title: "Open Street Maps",
    visible: true,
    source: new OSM()
});

let SuceptibilityMap = new Image({
    title: "Susceptibility Map",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_08:LandslideSusceptibilityMap'}
    })
});

let SuceptibilityMapReclass = new Image({
    title: "Susceptibility Map Reclassified",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_08:LandslideSusceptibilityMap_reclass'}
    }),
    visible: false
});

let Population = new Image({
    title: "Population",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_08:population'}
    }),
    visible: false
});

let Dtm = new Image({
    title: "DTM",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_08:dtm'}
    }),
    visible: false
});

let Ndvi = new Image({
    title: "NDVI",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_08:ndvi'}
    }),
    visible: false
});

let Dusaf = new Image({
    title: "DUSAF",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_08:dusaf'}
    }),
    visible: false
});

let Faults = new Image({
    title: "Faults",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_08:faults'}
    }),
    visible: false
});

let Rivers = new Image({
    title: "Rivers",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_08:rivers'}
    }),
    visible: false
});

let Roads = new Image({
    title: "Roads",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_08:roads'}
    }),
    visible: false
});

let Slope = new Image({
    title: "Slope",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_08:slope'}
    }),
    visible: false
});

let Aspect = new Image({
    title: "Aspect",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_08:aspect'}
    }),
    visible: false
});

let Plan = new Image({
    title: "Plan Curvature",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_08:plan'}
    }),
    visible: false
});

let Profile = new Image({
    title: "Profile Curvature",
    source: new ImageWMS({
        url: 'https://www.gis-geoserver.polimi.it/geoserver/wms',
        params: { 'LAYERS': 'gisgeoserver_08:profile'}
    }),
    visible: false
});


//Create the layer groups and add the layers to them
let basemapLayers = new Group({
    title: "Base Maps",
    layers: [osm]
})

let ResultLayers = new Group({
    title: "Results Layers",
    layers: [
        Population,SuceptibilityMapReclass,SuceptibilityMap
    ]
})

let FactorsLayers = new Group({
    title: "Factors Layers",
    layers: [
        Dtm, Ndvi, Dusaf, Faults, Rivers, Roads, Slope, Aspect, Plan, Profile
    ]
})

// Map Initialization
let map = new Map({
    target: document.getElementById('map'),
    layers: [basemapLayers, ResultLayers,FactorsLayers],
    view: new View({
        center: fromLonLat([10.12, 45.94]),
        zoom: 12.5
    })
});

// Add the map controls:
map.addControl(new ScaleLine());
map.addControl(new FullScreen());
map.addControl(new MousePosition({
    coordinateFormat: createStringXY(4),
    projection: 'EPSG:4326',
    className: 'custom-control',
    placeholder: '0.0000, 0.0000'
}));

let layerSwitcher = new LayerSwitcher({});
map.addControl(layerSwitcher);


//OPTIONAL
//Add the Bing Maps layers
var BING_MAPS_KEY = "AqbDxABFot3cmpxfshRqLmg8UTuPv_bg69Ej3d5AkGmjaJy_w5eFSSbOzoHeN2_H";
var bingRoads = new Tile({
    title: 'Bing Maps—Roads',
    type: 'base',
    visible: false,
    source: new BingMaps({
        key: BING_MAPS_KEY,
        imagerySet: 'Road'
    })
});

var bingAerial = new Tile({
    title: 'Bing Maps—Aerial',
    type: 'base',
    visible: false,
    source: new BingMaps({
        key: BING_MAPS_KEY,
        imagerySet: 'Aerial'
    })
});
basemapLayers.getLayers().extend([bingRoads, bingAerial]);




// //Add the WFS layer
// let wfsSource = new VectorSource()
// let wfsLayer = new Vector({
//     title: "Colombia water areas",
//     source: wfsSource,

//     style: new Style({
//         stroke: new Stroke({
//             color: 'rgb(255, 102, 102)',
//             width: 4
//         })
//     }),
//     zIndex: 9999
// });
// overlayLayers.getLayers().extend([wfsLayer]);

// This allows to use the function in a callback!
// function loadFeatures(response) {
//     wfsSource.addFeatures(new GeoJSON().readFeatures(response))
// }
// // This is not a good practice, but works for the jsonp.
// window.loadFeatures = loadFeatures;


// var base_url = "https://www.gis-geoserver.polimi.it/geoserver/gis/ows?";
// var wfs_url = base_url;
// wfs_url += "service=WFS&"
// wfs_url += "version=2.0.0&"
// wfs_url += "request=GetFeature&"
// wfs_url += "typeName=gis%3ACOL_water_areas&"
// wfs_url += "outputFormat=text%2Fjavascript&"
// wfs_url += "srsname=EPSG:3857&"
// wfs_url += "format_options=callback:loadFeatures"

// console.log(wfs_url);

// map.once('postrender', (event) => {
//     // Load the WFS layer
//     $.ajax({ url: wfs_url, dataType: 'jsonp' });
    
// })

// //Add the code for the Pop-up
// var container = document.getElementById('popup');
// var content = document.getElementById('popup-content');
// var closer = document.getElementById('popup-closer');

// var popup = new Overlay({
//     element: container
// });
// map.addOverlay(popup);

// // The click event handler for closing the popup.
// // This ensures that JQuery ($) is already available in the page.
// $(document).ready(function () {
//     map.on('singleclick', function (event) {
//         //This iterates over all the features that are located on the pixel of the click (can be many)
//         var feature = map.forEachFeatureAtPixel(event.pixel, function (feature, layer) {
//             return feature;
//         });

//         //If there is a feature, open the popup by setting a position to it and put the data from the feature
//         if (feature != null) {
//             var pixel = event.pixel;
//             var coord = map.getCoordinateFromPixel(pixel);
//             popup.setPosition(coord);
//             content.innerHTML =
//                 '<h5>Colombia Water Areas</h5><br><b>Name: </b>' +
//                 feature.get('NAME') +
//                 '</br><b>Description: </b>' +
//                 feature.get('HYC_DESCRI');
//         } else {
//             //Only if the colombiaRoads layer is visible, do the GetFeatureInfo request
//             if (colombiaRoads.getVisible()) {
//                 var viewResolution = (map.getView().getResolution());
//                 var url = colombiaRoads.getSource().getFeatureInfoUrl(event.coordinate, viewResolution, 'EPSG:3857', { 'INFO_FORMAT': 'text/html' });
//                 console.log(url);

//                 if (url) {
//                     var pixel = event.pixel;
//                     var coord = map.getCoordinateFromPixel(pixel);
//                     popup.setPosition(coord);
//                     //We do again the AJAX request to get the data from the GetFeatureInfo request
//                     $.ajax({ url: url })
//                         .done((data) => {
//                             //Put the data of the GetFeatureInfo response inside the pop-up
//                             //The data that arrives is in HTML
//                             content.innerHTML = data;
//                         });
//                 }
//             }
//         }
//     });
// });



// // Adding map event for pointermove
// // The click event handler for closing the popup.
// closer.onclick = function () {
//     popup.setPosition(undefined);
//     closer.blur(); 
//     return false;
// };

// map.on('pointermove', function(event){
//     var pixel = map.getEventPixel(event.originalEvent);
//     var hit = map.hasFeatureAtPixel(pixel);
//     map.getTarget().style.cursor = hit ? 'pointer' : '';
// });

// map.on('moveend', function(event){
//     console.log("moved map");
// });