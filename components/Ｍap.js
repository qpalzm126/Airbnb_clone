import React, { useState } from "react";
import { Map as ReactMapGL, Marker, Popup } from "react-map-gl";
// import * as turf from "@turf/turf";
import { getCenter } from "geolib";
import { MapPinIcon } from "@heroicons/react/24/solid";

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

  const onMove = React.useCallback(({ viewState }) => {
    const newCenter = [viewState.longitude, viewState.latitude];
    // Only update the view state if the center is inside the geofence
    // if (turf.booleanPointInPolygon(newCenter, GEOFENCE)) {
    setViewport(newCenter);
  }, []);

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/lilun316/clel4hdrt000901n0lu0swixw"
      mapboxAccessToken={process.env.mapbox_key}
      {...viewport}
      onMove={onMove}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker longitude={result.long} latitude={result.lat} anchor="bottom">
            <p
              role="img"
              className="cursor-pointer text-2xl animate-bounce"
              onClick={() => setSelectedLocation(result)}
              aria-label="push-pin"
            >
              🎸
              {/* <MapPinIcon /> */}
            </p>
          </Marker>
          {/* The pop uop that should show if we click on a marker */}
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
