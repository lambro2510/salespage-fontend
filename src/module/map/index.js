import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapScreen = () => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    // Khởi tạo bản đồ Leaflet
    const map = L.map('map').setView([51.505, -0.09], 13);

    // Thêm layer bản đồ
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    mapRef.current = map;

    // Lấy vị trí hiện tại ban đầu
    getCurrentPosition();

    // Lắng nghe thay đổi vị trí
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        updateCurrentLocationMarker(latitude, longitude);
      },
      (error) => {
        console.log('Không thể lấy vị trí hiện tại:', error);
      }
    );

    // Xóa lắng nghe khi component unmount
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  const getCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          updateCurrentLocationMarker(latitude, longitude);
        },
        (error) => {
          console.log('Không thể lấy vị trí hiện tại:', error);
        }
      );
    }
  };

  const updateCurrentLocationMarker = (latitude, longitude) => {
    const map = mapRef.current;

    if (map) {
      if (markerRef.current) {
        // Nếu đã có đánh dấu vị trí hiện tại, cập nhật lại vị trí mới
        markerRef.current.setLatLng([latitude, longitude]);
      } else {
        // Nếu chưa có đánh dấu vị trí hiện tại, thêm mới
        const marker = L.marker([latitude, longitude]).addTo(map);
        markerRef.current = marker;
      }

      // Cập nhật lại tầm nhìn bản đồ
      map.setView([latitude, longitude]);
    }
  };

  return (
    <div>
      <h1>All Products</h1>
      <div id="map" style={{ height: '400px' }}></div>
    </div>
  );
};

export default MapScreen;
