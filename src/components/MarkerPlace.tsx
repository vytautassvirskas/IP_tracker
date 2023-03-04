import React, { useEffect } from "react";
import { useMap, Marker, Popup } from "react-leaflet";
import { AddressData } from "../App";

interface MarkerPlaceProps {
  address: AddressData;
}

const MarkerPlace = ({ address }: MarkerPlaceProps) => {
  const map = useMap();
  const position = [address.latitude, address.longitude];
  useEffect(() => {
    console.log("MarkerPlace useefect veikia");

    map.flyTo(position, 13, {
      animate: true,
    });
  }, [map, address.latitude, address.longitude]);

  return (
    <Marker position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  );
};

export default MarkerPlace;
