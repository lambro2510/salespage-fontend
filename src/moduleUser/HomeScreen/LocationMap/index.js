import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function LocationMap() {
  const [position, setPosition] = useState([0, 0]); // Mặc định [0, 0]

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        const { latitude, longitude } = location.coords;
        console.log('Latitude:', latitude);
        console.log('Longitude:', longitude);
        setPosition([latitude, longitude]);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);
  

  return (
    <div className="Map">
      <MapContainer
        center={position}
        zoom={1}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>Vị trí của bạn</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default LocationMap;
