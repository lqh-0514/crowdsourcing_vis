var metersPerLevel = 3;
var roofOnlyTypes = ["roof", "carport", "grandstand"];
var ignoredTypes = ["entrance", "collapsed", "destroyed", "proposed", "no"];
var singleLevelTypes = ["grandstand", "houseboat", "bungalow", "static_caravan",
  "kiosk", "cabin", "chapel", "shrine", "bakehouse", "bridge", "bunker",
  "carport", "cowshed", "garage", "garages", "gabage_shed", "hut", "roof",
  "shed", "stable", "sty", "service", "shelter"];
var specialDefaults = {
  construction: {"building:colour": "#808080"},
  house: {"building:levels": 2},
  farm: {"building:levels": 2},
  detached: {"building:levels": 2},
  terrace: {"building:levels": 2},
  transformer_tower: {"height": 10},
  water_tower: {"height": 20},
};

function loadBuildings() {
  // console.log(PosLAT_r);
  // console.log(PosLON_r);
  var opQuery = "(way[building]" + "(" + getBoundingBoxString() + ");" +
                "rel[building]" + "(" + getBoundingBoxString() + "););" +
                "out body;>;out skel qt;";
  return fetchFromOverpass(opQuery)
    .then((itemJSON) => {
      // console.log(itemJSON);
      var count = 0;

      for (feature of itemJSON.features) {
        if (feature.geometry.type == "Polygon") {
          if(feature.geometry.coordinates[0][0][0]>startPos_r.longitude && feature.geometry.coordinates[0][0][0]<endPos_r.longitude && feature.geometry.coordinates[0][0][1]>startPos_r.latitude && feature.geometry.coordinates[0][0][1]<endPos_r.latitude){
          // console.log(feature);
          addBuilding(feature);
          count++;
          }
        }
        else {
          console.log("Couldn't draw building with geometry type " +
                      feature.geometry.type + " (" + feature.id + ")");
        }
      }
      console.log("Loaded " + count + " buildings.");
    })
    .catch((reason) => { console.log(reason); });
}

function addBuilding(jsonFeature) {
  return new Promise((resolve, reject) => {
    // console.log(jsonFeature);
    var itemPos = tileposFromLatlon(latlonFromJSON(jsonFeature.geometry.coordinates[0][0]));
    var height = jsonFeature.properties.Floor * metersPerLevel;
    var RandomColor=["#b8b7b4","#c79387","#97b0ad","#75706d","#ccc293"];
    var color = RandomColor[Math.floor(Math.random() * RandomColor.length)];
    // var color = "#b8b7b4";

    var item = document.createElement("a-entity");
    item.setAttribute("class", "building");
    var outerPoints = [];
    var innerWays = [];
    for (let way of jsonFeature.geometry.coordinates) {
      // if( ){
      let wayPoints = [];
      for (let point of way) {
        let tpos = tileposFromLatlon(latlonFromJSON(point));
        let ppos = getRelativePositionFromTilepos(tpos, itemPos);
        wayPoints.push({x: ppos.x, y: ppos.z});
      }
      if (!outerPoints.length) {
        outerPoints = wayPoints;
      }
      else {
        innerWays.push(wayPoints);
      }
    // }
    }
    // Note that for now only one outer way is supported.
    buildingProperties = {primitive: "building", outerPoints: outerPoints};
    if (innerWays.length) {
      buildingProperties.innerPaths = innerWays; //innerWays.map(x => x.join(", ")).join(" / ");
    }
    if (height) {
      buildingProperties.height = height;
    }
    item.setAttribute("geometry", buildingProperties);
    item.setAttribute("material", {color: color});
    item.setAttribute("position", getPositionFromTilepos(itemPos));
    item.setAttribute("data-gpspos", jsonFeature.geometry.coordinates[0][0][1] + "/" + jsonFeature.geometry.coordinates[0][0][0]);
    items.appendChild(item);
    // console.log(item);
    resolve();
    // reject("whatever the error");
  });
}

AFRAME.registerGeometry('building', {
  schema: {
    outerPoints: {
      parse: function (value) {
        if (typeof value === 'string' && value.length) {
          // e.g. "x1 y1, x2 y2, x3 y3, x4 y4"
          return value.split(',').map(val => AFRAME.utils.coordinates.parse(val));
        }
        else if (typeof value === 'object') {
          // assume we got an object we can use directly
          return value;
        }
        else {
          return [];
        }
      },
      default: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 0, y: 1}],
    },
    innerPaths: {
      parse: function (value) {
        if (typeof value === 'string' && value.length) {
          // e.g. "x1 y1, x2 y2, x3 y3, x4 y4 / x5 y5, x6 y6, x7 y7" describes two paths (holes)
          return value.split('/').map(part => part.split(',').map(val => AFRAME.utils.coordinates.parse(val)));
        }
        else if (typeof value === 'object') {
          // assume we got an object we can use directly
          return value;
        }
        else {
          return [];
        }
      },
      default: [],
    },
    height: { type: 'number', default: 0 },
    minHeight: { type: 'number', default: 0 },
  },

  init: function (data) {
    // console.log(data);
    var shape = new THREE.Shape(data.outerPoints);
    var outerLength = shape.getLength();
    if (data.innerPaths.length) {
      for (ipoints of data.innerPaths) {
        var holePath = new THREE.Path(ipoints);
        shape.holes.push(holePath);
      }
    }
    // Extrude from a 2D shape into a 3D object with a height.
    // var height = data.height - data.minHeight;
    var height = data.height;
    if (!height) {
      height = Math.min(10, outerLength / 5);
    }
    var geometry = new THREE.ExtrudeGeometry(shape, {amount: height, bevelEnabled: false});
    // As Y is the coordinate going up, let's rotate by 90° to point Z up.
    geometry.rotateX(-Math.PI / 2);
    // Rotate around Y and Z as well to make it show up correctly.
    geometry.rotateY(Math.PI);
    geometry.rotateZ(Math.PI);
    // Now we would point under ground, move up the height, and any above-ground space as well.
    geometry.translate (0, height + data.minHeight, 0);
    geometry.center;
    this.geometry = geometry;
  }
});
