"use strict";function waitForElement(e,a,r){setTimeout(function(){var t=a.call(null,e,r);t||waitForElement(e,a,r)},50)}function mapManager(e,a){if(!a.leaflet.showMap)return!0;var r=document.querySelector(e);if(!r)return!1;mapEl=mapEl||addMap();var t=JSON.parse(JSON.stringify(a.events)),l=void 0;if(a.leaflet.markers.forEach(function(e){var r=e.id;markersEl[r]?markersEl[r].setLatLng([e.lat,e.lng]):(markersEl[r]=L.marker([e.lat,e.lng]).addTo(mapEl),selectMarker(markersEl[r],r));var n=!!a.leaflet.selectedMarker&&a.leaflet.selectedMarker===r;n&&(l=markersEl[r]),markersEl[r].setIcon(n?selectedIcon:defaultIcon);var o=t.indexOf(r);t.splice(o,1)}),a.leaflet.markers.length){try{mapEl.getBounds()}catch(n){mapEl.fitBounds(a.leaflet.markers)}l?mapEl.panTo(l._latlng):mapEl.fitBounds(a.leaflet.markers)}else mapEl.setZoom(1);t.forEach(function(e){markersEl[e]&&(mapEl.removeLayer(markersEl[e]),markersEl[e]=void 0)});for(var o in markersEl)a.events.indexOf(parseInt(o))>-1||markersEl[o]&&(mapEl.removeLayer(markersEl[o]),markersEl[o]=void 0);return!0}function selectMarker(e,a){e.on("click",function(e){elmApp.ports.selectEvent.send(a)})}function addMap(){var e=L.map("map");return L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ",{maxZoom:10,id:"mapbox.streets"}).addTo(e),e}function attachDropzone(e,a){if("Article"!=a.activePage)return!1;var r=document.querySelector(e);if(!r)return!1;if(dropZone)return"Done"==a.postStatus&&(dropZone.removeAllFiles(!0),ck.setData("")),!0;var t=a.backendUrl+"/api/file-upload?access_token="+a.accessToken;dropZone=new Dropzone(e,{url:t}),dropZone.on("complete",function(e){if(e.accepted&&200===e.xhr.status){var a=JSON.parse(e.xhr.response),r=parseInt(a.data[0].id);elmApp.ports.dropzoneUploadedFile.send(r)}}),ck=CKEDITOR.replace("body"),ck.on("change",function(){elmApp.ports.ckeditor.send(ck.getData())})}var initialValues={ckeditor:"",dropzoneUploadedFile:null,selectEvent:null},elmApp=Elm.fullscreen(Elm.Main,initialValues),mapEl=void 0,markersEl={},defaultIcon=L.icon({iconUrl:"default@2x.5859992f.png",iconRetinaUrl:"default@2x.5859992f.png",iconSize:[35,46]}),selectedIcon=L.icon({iconUrl:"selected@2x.c4402371.png",iconRetinaUrl:"selected@2x.c4402371.png",iconSize:[35,46]});elmApp.ports.mapManager.subscribe(function(e){return!e.leaflet.showMap&&mapEl?(mapEl.remove(),mapEl=void 0,void(markersEl={})):void waitForElement("#map",mapManager,e)});var ck=void 0,dropZone=void 0;elmApp.ports.activePage.subscribe(function(e){return"Article"!=e.activePage?(ck=void 0,void(dropZone=void 0)):void waitForElement(".dropzone",attachDropzone,e)});