var tileZoom = 19;
// console.log(presetsFile);
var centerPos_l;
var map, tiles, items;
var baseTileID, baseTileSize, centerOffset;

var tilesFromCenter_l;
// console.log(presetsFile_l);
if(presetsFile_l.includes('VID_20190603')){
  tilesFromCenter_l = 3;
}else{
  tilesFromCenter_l = 2;
}
console.log(tilesFromCenter_l);


// Mapnik is the default world-wide OpenStreetMap style.
var tileServer = "https://tilecache.kairo.at/mapnik/";
// Basemap offers hires tiles for Austria.
//var tileServer = "https://tilecache.kairo.at/basemaphires/";
// Standard Overpass API Server
// var overpassURL = "https://overpass-api.de/api/interpreter";

window.onload = function() {
  // Load location presets and subdialog.
  fetch(presetsFile_l)
  .then((response) => {

    if (response.ok) {
      return response.json();
    }
    else {
      throw "HTTP Error " + response.status;
    }
  })
  .then((locationPresets_l) => {
    this.console.log(document.querySelector("#cameraRig").object3D.position);
    // console.log(locationPresets_l);
    // this.console.log(locationPresets[locationPresets.length/2]);
    let locLatInput_l = document.querySelector("#locLatitude");
    let locLonInput_l = document.querySelector("#locLongitude");
    // this.console.log(locationPresets[locationPresets.length/2]);
    locLatInput_l.value = locationPresets_l[Math.round(locationPresets_l.length/2)].y;
    locLonInput_l.value = locationPresets_l[Math.round(locationPresets_l.length/2)].x;
    // this.console.log(locLonInput.value);
    let mItemHeight = 0.1;
    let menuHeight = mItemHeight * locationPresets_l.length;
    menu.setAttribute("height", menuHeight);
    menu.setAttribute("position", {x: 0, y: 1.6 - menuHeight / 6, z: -1});
    centerPos_l = { latitude: locationPresets_l[Math.round(locationPresets_l.length/2)].y,
                  longitude: locationPresets_l[Math.round(locationPresets_l.length/2)].x};
    PosLAT_l=locationPresets_l[Math.round(locationPresets_l.length/2)].y;
    PosLON_l=locationPresets_l[Math.round(locationPresets_l.length/2)].x;
    console.log(PosLAT_l);
    console.log(PosLON_l);
    loadScene();
  })
  .catch((reason) => { console.log(reason); });

  // Hook up menu button iside the VR.
  let leftHand = document.querySelector("#left-hand");
  let rightHand = document.querySelector("#right-hand");
  // Vive controllers, Windows Motion controllers
  leftHand.addEventListener("menudown", toggleMenu, false);
  rightHand.addEventListener("menudown", toggleMenu, false);
  // Oculus controllers (guessing on the button)
  leftHand.addEventListener("surfacedown", toggleMenu, false);
  rightHand.addEventListener("surfacedown", toggleMenu, false);
  // Daydream and GearVR controllers - we need to filter as Vive and Windows Motion have the same event.
  var toggleMenuOnStandalone = function(event) {
    if (event.target.components["daydream-controls"].controllerPresent ||
        event.target.components["gearvr-controls"].controllerPresent) {
      toggleMenu(event);
    }
  }
  leftHand.addEventListener("trackpaddown", toggleMenuOnStandalone, false);
  rightHand.addEventListener("trackpaddown", toggleMenuOnStandalone, false);
  // Keyboard press
  document.querySelector("body").addEventListener("keydown", event => {
    if (event.key == "m") { toggleMenu(event); }
  });

  // Set variables for base objects.
  map = document.querySelector("#map");
  tiles = document.querySelector("#tiles");
  items = document.querySelector("#items");
}

function toggleMenu(event) {
  console.log("menu pressed!");
  let menu = document.querySelector("#menu");
  if (menu.getAttribute("visible") == false) {
    menu.setAttribute("visible", true);
    document.querySelector("#cameraRig").setAttribute("movement-controls", {enabled: false});
    document.querySelector("#left-hand").setAttribute("mixin", "handcursor");
    document.querySelector("#right-hand").setAttribute("mixin", "handcursor");
  }
  else {
    menu.setAttribute("visible", false);
    document.querySelector("#cameraRig").setAttribute("movement-controls", {enabled: true});
    document.querySelector("#left-hand").setAttribute("mixin", "teleport");
    document.querySelector("#right-hand").setAttribute("mixin", "teleport");
  }
}

function loadScene() {
  while (tiles.firstChild) { tiles.removeChild(tiles.firstChild); }
  while (items.firstChild) { items.removeChild(items.firstChild); }
  document.querySelector("#cameraRig").object3D.position.set(0, 0, 0);
  loadGroundTiles();
  loadBuildings();
}

function getTagsForXMLFeature(xmlFeature) {
  var tags = {};
  for (tag of xmlFeature.children) {
    if (tag.nodeName == "tag") {
      tags[tag.attributes['k'].value] = tag.attributes['v'].value;
    }
  }
  return tags;
}

function getBoundingBoxString() {
  startPos_l = latlonFromTileID({x: baseTileID.x - tilesFromCenter_l,
    y: baseTileID.y + tilesFromCenter_l + 1});
endPos_l = latlonFromTileID({x: baseTileID.x + tilesFromCenter_l + 1,
  y: baseTileID.y - tilesFromCenter_l});
console.log(startPos_l);
console.log(endPos_l);
return startPos_l.latitude + "," + startPos_l.longitude + "," +
endPos_l.latitude + "," + endPos_l.longitude;
}

function fetchFromOverpass(opQuery) {
  return new Promise((resolve, reject) => {
    fetch("?data=" + encodeURIComponent
    (opQuery))
    .then((response) => {
      if (response.ok) {
        return response.text();
      }
      else {
        throw "HTTP Error " + response.status;
      }
    })
    .then((response) => {
      var parser = new DOMParser();
      var itemData = parser.parseFromString(response, "application/xml");
    // var itemJSON = JSON.parse($.ajax({'url': "lujiazui.geojson", 'async': false}).responseText); 
      // console.log(itemJSON);
      resolve(itemJSON);
    })
    .catch((reason) => { reject(reason); });
  });
}
