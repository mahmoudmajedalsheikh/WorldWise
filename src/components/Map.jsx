import {useEffect} from 'react'
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import {useGeolocation} from '../hooks/useGeolocation';
import Button from './Button';

const Map = () => {

  const { cities } = useCities();
  const {isLoading:isLoadingPostion,position:geoLocationPostion ,getPosition} = useGeolocation()
  const [searchParams, setsearchParams] = useSearchParams();
  const [mapPostion, setMapPostion] = useState([40, 0]);

  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");
  
  useEffect(() => {
    if(mapLat && mapLng) setMapPostion([mapLat,mapLng]);
  }, [mapLat,mapLng])

  useEffect(()=>{
    if(geoLocationPostion) setMapPostion([geoLocationPostion.lat,geoLocationPostion.lng])
  },[geoLocationPostion])
  //
  return (
    //
    <div className={styles.mapContainer}>

      <Button type="position" onClick={getPosition}>
        {isLoadingPostion ? "Loading.... ":"Use your postion"}
      </Button>

      <MapContainer
        center={mapPostion}
        // center={[mapLat,mapLng]}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPostion} />
        <DetectClick/>
      </MapContainer>
    </div>
  );
};

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick (){
  const navigate = useNavigate();
  useMapEvents({
    click:(e) =>{
      // console.log(e);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);

    },
  });
}







export default Map;
