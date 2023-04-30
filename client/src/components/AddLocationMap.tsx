import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngTuple } from 'leaflet';
import { Dispatch, SetStateAction, useState } from 'react';

function AddLocationMap({
  setCoordinates,
  setIsMapOpen,
  coordinates,
}: {
  setCoordinates: Dispatch<SetStateAction<number[] | undefined>>;
  setIsMapOpen: Dispatch<SetStateAction<boolean>>;
  coordinates: number[] | undefined;
}) {
  const [markers, setMarkers] = useState<LatLngTuple | undefined>(
    coordinates as LatLngTuple
  ); // [
  const SomeComponent = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setMarkers([lat, lng]);
        setCoordinates([lat, lng]);
        console.log('lat lng', lat, lng);
      },
    });

    return null;
  };
  return (
    <div id="map-view">
      <h1>Map</h1>
      <button onClick={() => setIsMapOpen(false)}>Close map</button>
      <MapContainer
        id="map-container"
        center={[60.185779, 24.935953]}
        zoom={13}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers !== undefined && (
          <Marker position={markers}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        )}

        <SomeComponent />
      </MapContainer>
    </div>
  );
}

export default AddLocationMap;
