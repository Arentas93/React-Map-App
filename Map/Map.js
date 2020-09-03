import * as React from "../../node_modules/react";
import { useState } from "../../node_modules/react";
import ReactMapGL, { Marker } from "../../node_modules/react-map-gl";
import "./map.css";
import { ImLocation } from "react-icons/im";
import { getDistance } from "geolib";
import * as geolib from "geolib";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiYXJpczkzIiwiYSI6ImNrZWUxcXhyNzBnbzcycmtmd25iYm11NWwifQ.-mltKSC0s7kSVSbRgB7Dfg";
let lat = 54.687157;
let long = 25.279652;
const points = [];
let distance = 0;

//This method is fired after mouse click on the map,
// it gets the cords of the point,
// puts a point into array ant calculates rhumb distance between the all points.
//all data is shown in console.
function GetPointCords(point) {
  long = point.lngLat[0];
  lat = point.lngLat[1];

  points.push(long, lat);
  console.log(points);

  if (points.length > 3) {
    distance =
      distance +
      getDistance(
        {
          latitude: points[points.length - 3],
          longitude: points[points.length - 4],
        },
        {
          latitude: geolib.decimalToSexagesimal(points[points.length - 1]),
          longitude: geolib.decimalToSexagesimal(points[points.length - 2]),
        }
      );
  }
  console.log("Total distance between the points is " + distance + " meters.");
}
function Map() {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 54.687157,
    longitude: 25.279652,
    zoom: 12,
  });
  return (
    <div className="map">
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        width="100%"
        height="70vh"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onClick={GetPointCords}
      >
        <Marker
          latitude={lat}
          longitude={long}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <div className="Marker">
            <ImLocation size={35} />
          </div>
        </Marker>
      </ReactMapGL>
      <div className="TotalDistance">
        <h2>Total distance between the points is {distance} meters.</h2>
      </div>
    </div>
  );
}
export default Map;
