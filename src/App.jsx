import "./App.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon, divIcon, point } from "leaflet";
import markerIcon from "./assets/icons/marker-icon.png";
import MarkerClusterGroup from 'react-leaflet-cluster';

export default function App() {
  const markers = [
    {
      geocode: [-34.63529, -58.36271],
      popUp: "Pop-up 1"
    },
    {
      geocode: [-34.63169, -58.36980],
      popUp: "Pop-up 1"
    },
    {
      geocode: [-34.63870, -58.36877],
      popUp: "Pop-up 1"
    }
  ];

  const customIcon = new icon({
    iconUrl: markerIcon,
    iconSize: [38, 38]
  });

  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true)
    })
  }

  return (
    <div className="app">
      <MapContainer
        style={{ width: "100%", height: "100vh" }}
        zoom={13}
        center={[-34.63543, -58.36476]}
        scrollWheelZoom={false}
        fadeAnimation={true}
        markerZoomAnimation={true}
      >
        {/* <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> */}
        <TileLayer
          attribution="CyclOSM" // from http://leaflet-extras.github.io/leaflet-providers/preview/
          url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createCustomClusterIcon}
        >
        {markers.map(marker => (
          <Marker key={marker.popUp} position={marker.geocode} icon={customIcon}>
            <Popup>
              {marker.popUp}
            </Popup>
          </Marker>
        ))}
          </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}