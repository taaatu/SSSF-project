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
import Modal from 'react-bootstrap/Modal';

// Component for adding location to the map

type Props = {
  setCoordinates: Dispatch<SetStateAction<number[] | undefined>>;
  setIsMapOpen: Dispatch<SetStateAction<boolean>>;
  coordinates: number[] | undefined;
};

function AddLocationMap(props: Props) {
  const [markers, setMarkers] = useState<LatLngTuple | undefined>(
    props.coordinates as LatLngTuple
  );
  const SaveCoordinates = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setMarkers([lat, lng]);
        props.setCoordinates([lat, lng]);
      },
    });

    return null;
  };

  const handleClose = () => props.setIsMapOpen(false);

  return (
    <div id="map-view">
      <Modal show={true} onHide={handleClose} size="lg">
        <Modal.Header closeButton onHide={handleClose}>
          <Modal.Title id="contained-modal-title-vcenter">
            Choose location by clicking the map.
          </Modal.Title>
        </Modal.Header>
        <MapContainer
          id="map-container"
          center={markers || [60.185779, 24.935953]}
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

          <SaveCoordinates />
        </MapContainer>
      </Modal>
    </div>
  );
}

export default AddLocationMap;
