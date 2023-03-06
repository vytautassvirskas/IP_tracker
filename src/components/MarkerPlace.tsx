import { useEffect } from "react";
import { useMap, Marker } from "react-leaflet";
import { AddressData } from "../App";
import icon from "./Icon";

interface MarkerPlaceProps {
  address: AddressData;
}

const MarkerPlace = ({ address }: MarkerPlaceProps) => {
  const map = useMap();
  const position: [number, number] = [address.latitude, address.longitude];

  useEffect(() => {
    map.flyTo(position, 13, {
      animate: true,
    });
  }, [map, address.latitude, address.longitude]);

  return <Marker icon={icon} position={position}></Marker>;
};

export default MarkerPlace;
