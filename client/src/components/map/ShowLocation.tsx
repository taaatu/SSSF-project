import { LatLngTuple } from 'leaflet';
import { Dispatch, SetStateAction } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import Modal from 'react-bootstrap/Modal';

// This component shows the item location on a map

function ShowLocation({
  setIsMapOpen,
  coordinates,
}: {
  setIsMapOpen: Dispatch<SetStateAction<boolean>>;
  coordinates: number[] | undefined;
}) {
  const handleClose = () => setIsMapOpen(false);

  if (coordinates === undefined) {
    return <></>;
  }

  return (
    <div id="map-view">
      <Modal show={true} onHide={handleClose} size="lg">
        <Modal.Header closeButton onHide={handleClose}></Modal.Header>
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
        </MapContainer>
      </Modal>
    </div>
  );
}

export default ShowLocation;
