import { useEffect, useState } from "react";
import styled from "styled-components";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import DataSheet from "./components/DataSheet";
import InputWithButton from "./components/InputWithButton";
import { Title } from "./components/Title";
import { GlobalStyle } from "./GlobalStyles.styles";
import DekstopBackgroundImg from "./assets/images/pattern-bg-desktop.png";
import MarkerPlace from "./components/MarkerPlace";

const MainWrapper = styled.main`
  min-height: 100vh;
  position: relative;
`;

const BackgroundImage = styled.img`
  height: 33vh;
  width: 100%;
`;
const AppDiv = styled.div`
  position: absolute;
  top: 150px;
  left: 0;
  right: 0;
  transition: all 0.2s ease-in-out;
  @media (max-width: 768px) {
    top: 50px;
  }
`;

export interface AddressData {
  ip: string;
  location: string;
  timezone: string;
  isp: string;
  latitude: number;
  longitude: number;
}

function App() {
  const [address, setAddress] = useState<AddressData>({
    ip: "",
    location: "",
    timezone: "",
    isp: "",
    latitude: 51.505,
    longitude: -0.09,
  });
  const [ipAddress, setIpAddress] = useState<string>("");
  const [alert, setAlert] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const API_KEY = "at_TgmrcUJ4ggnPgqm3NsVUpzC0apXLK";
  useEffect(() => {
    getAddress();
  }, []);

  async function fetchAddress(url: string): Promise<void> {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      const location = data.location;
      setTimeout(() => {
        setIsLoading(false);
        setAddress({
          ...address,
          ip: data.ip,
          location: `${location.city}${
            location.region && `, ${location.region}`
          }${location.postalCode && `, ${location.postalCode}`}`,
          timezone: `UTC ${location.timezone}`,
          isp: data.isp,
          latitude: location.lat,
          longitude: location.lng,
        });
      }, 500);
    } catch (error) {
      setIsLoading(false);
      setAlert("Connection error. Try again!");
    }
  }

  async function getAddress(): Promise<void> {
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress`;
    await fetchAddress(url);
  }

  async function getEnteredAddress(): Promise<void> {
    const ipRegex = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
    const domainRegex = /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,6}$/;
    const apiUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&${
      ipRegex.test(ipAddress)
        ? `ipAddress=${ipAddress}`
        : domainRegex.test(ipAddress)
        ? `domain=${ipAddress}`
        : "ipAddress"
    }`;
    await fetchAddress(apiUrl);
  }

  const handleSearch = (e: React.FormEvent): void => {
    e.preventDefault();
    setAlert("");
    getEnteredAddress();
  };

  return (
    <>
      <GlobalStyle />
      <MainWrapper>
        <BackgroundImage
          src={DekstopBackgroundImg}
          alt="background-image"
        ></BackgroundImage>
        <MapContainer
          center={[address.latitude, address.longitude]}
          zoom={13}
          zoomControl={false}
          scrollWheelZoom={true}
          style={{ height: "67vh", zIndex: 0 }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MarkerPlace address={address}></MarkerPlace>
        </MapContainer>

        <AppDiv>
          <Title>IP Address Tracker</Title>
          <InputWithButton
            ipAddress={ipAddress}
            setIpAddress={setIpAddress}
            handleSearch={handleSearch}
          />
          <DataSheet
            address={address}
            alert={alert}
            isLoading={isLoading}
          ></DataSheet>
        </AppDiv>
      </MainWrapper>
    </>
  );
}

export default App;
