import React from "react";
import styled, { keyframes } from "styled-components";
import { AddressData } from "../App";

const DataContainer = styled.div`
  display: flex;
  width: 45rem;
  min-height: 7.5rem;
  margin: 3.4375rem auto 0;
  padding: 1.5625rem;
  border-radius: 10px;
  background-color: rgb(255, 255, 255);
  transition: all 0.2s ease-in-out;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    width: 90%;
    margin-top: 2rem;
    text-align: center;
  }
`;

const DataCard = styled.div`
  flex-basis: 50%;
  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
  &:not(:last-child) {
    border-right: 1px solid rgb(225, 225, 225);
    @media (max-width: 768px) {
      border-right: none;
    }
  }
  &:not(:first-child) {
    padding-left: 20px;
    @media (max-width: 768px) {
      padding-left: 0;
    }
  }
`;

const CardTitle = styled.h3`
  font-size: 0.625rem;
  letter-spacing: 1px;
  font-weight: 500;
  margin-bottom: 0.625rem;
  color: rgb(150, 150, 150);
  text-transform: uppercase;
`;

const CardText = styled.h4`
  font-size: 1.125rem;
  font-weight: 500;
  color: rgb(3, 3, 3);
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;
const fadeIn = keyframes`
0% {
  opacity: 0;
}
50% {
  opacity: 1;
}

  100% {
    opacity: 0;
  }
`;

const MessageText = styled.h4`
  flex-basis: 100%;
  text-align: center;
  font-size: 1.5rem;
  line-height: 4.0625rem;
  font-weight: 500;
  color: rgb(3, 3, 3);
  animation: ${fadeIn} 3s ease-in-out infinite;
`;

interface DataSheetProps {
  address: AddressData;
  alert: string;
  isLoading: boolean;
}

const DataSheet = ({ address, alert, isLoading }: DataSheetProps) => {

  const data = [
    { title: "ip address", text: address.ip },
    { title: "location", text: address.location },
    { title: "timezone", text: address.timezone },
    { title: "isp", text: address.isp },
  ];
 

  return (
    <DataContainer>
      {isLoading ? (
        <MessageText>Loading...</MessageText>
      ) : alert ? (
        <MessageText>{alert}</MessageText>
      ) : (
        address.ip &&
        data.map((card) => (
          <DataCard key={card.title}>
            <CardTitle>{card.title}</CardTitle>
            <CardText>{card.text}</CardText>
          </DataCard>
        ))
      )}
    </DataContainer>
  );
};

export default DataSheet;
