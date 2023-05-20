import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Map as ReactMapGL, Marker, Popup } from "react-map-gl";
// import * as turf from "@turf/turf";
import { getCenter } from "geolib";
import "mapbox-gl/dist/mapbox-gl.css"; //fix marker location

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
                    <Marker
                        longitude={result.long}
                        latitude={result.lat}
                        anchor="top"
                    >
                        <p
                            role="img"
                            className="cursor-pointer text-2xl animate-bounce"
                            onClick={() => {
                                setSelectedLocation(result);
                            }}
                            aria-label="push-pin"
                        >
                            📌
                        </p>
                    </Marker>
                    {selectedLocation.long === result.long ? (
                        <Popup
                            onClose={() => setSelectedLocation({})}
                            closeOnClick={false}
                            anchor="bottom-left"
                            latitude={selectedLocation.lat}
                            longitude={selectedLocation.long}
                            className="font-semibold py-auto items-center justify-center"
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
