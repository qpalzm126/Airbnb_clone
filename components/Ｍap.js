import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Map as ReactMapGL, Marker, Popup } from "react-map-gl";
// import * as turf from "@turf/turf";
import { getCenter } from "geolib";
import "mapbox-gl/dist/mapbox-gl.css"; //<-- 解決 zoom 的時候 marker 跟著移動

function Map({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({});

  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  const center = getCenter(coordinates);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    longitude: center.longitude,
    latitude: center.latitude,
    zoom: 11,
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/lilun316/clel4hdrt000901n0lu0swixw"
      mapboxAccessToken={process.env.mapbox_key}
      {...viewport}
      onMove={(evt) => setViewport(evt.viewport)}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker longitude={result.long} latitude={result.lat} anchor="bottom">
            <p
              role="img"
              className="cursor-pointer text-2xl animate-bounce"
              onClick={() => {
                setSelectedLocation(result);
                console.log(selectedLocation);
              }}
              aria-label="push-pin"
            >
              📌
            </p>
          </Marker>
          {/* The pop up that should show if we click on a marker */}
          {selectedLocation.long === result.long ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={result.lat}
              longitude={result.long}
            >
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
