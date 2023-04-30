import { LatLngTuple } from 'leaflet';
import { Dispatch, SetStateAction } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

function ShowLocation({
  setIsMapOpen,
  coordinates,
}: {
  setIsMapOpen: Dispatch<SetStateAction<boolean>>;
  coordinates: number[] | undefined;
}) {
  if (coordinates === undefined) {
    return <></>;
  }
  return (
    <div id="map-view">
      <h1>Map</h1>
      <button onClick={() => setIsMapOpen(false)}>Close map</button>
      <MapContainer
        id="map-container"
        center={coordinates as LatLngTuple}
        zoom={13}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coordinates as LatLngTuple}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        {/* <SomeComponent /> */}
      </MapContainer>
    </div>
  );
}

export default ShowLocation;
