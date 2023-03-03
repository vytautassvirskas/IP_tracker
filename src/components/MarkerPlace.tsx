import React, { useEffect } from "react";
import { useMap, Marker, Popup } from "react-leaflet";
import { MyIpAdressData } from "../App";

interface MarkerPlaceProps {
  ipAdress: MyIpAdressData;
}

const MarkerPlace = ({ ipAdress }: MarkerPlaceProps) => {
  const map = useMap();
  const position = [ipAdress.latitude, ipAdress.longitude];
  useEffect(() => {
    map.flyTo(position, 13, {
      animate: true,
    });
  }, [map, ipAdress.latitude, ipAdress.longitude]);

  return (
    <Marker position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  );
};

export default MarkerPlace;
