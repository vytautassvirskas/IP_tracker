import React from "react";
import styled from "styled-components";

const DataContainer = styled.div`
  display: flex;
  max-width: 800px;
  margin: 25px auto 0;
  padding: 25px;
  border-radius: 10px;
  background-color: rgb(255, 255, 255);
`;

const DataCard = styled.div`
  flex-basis: 50%;
  &:not(:last-child) {
    border-right: 1px solid rgb(225, 225, 225);
  }
  &:not(:first-child) {
    padding-left: 20px;
  }
`;

const CardTitle = styled.h3`
  font-size: 10px;
  letter-spacing: 1px;
  font-weight: 500;
  margin-bottom: 10px;
  color: rgb(150, 150, 150);
  text-transform: uppercase;
`;

const CardText = styled.h4`
  font-size: 18px;
  font-weight: 500;
  color: rgb(3, 3, 3);
`;

const DataSheet = () => {
  const data = [
    { title: "ip adress", text: "192.212.174.101" },
    { title: "location", text: "Brooklyn, NY, 10001" },
    { title: "timezone", text: "UTC-05:00" },
    { title: "isp", text: "SpaceX Starlink" },
  ];
  console.log(data);

  return (
    <DataContainer>
      {data.map((card) => (
        <DataCard key={card.title}>
          <CardTitle>{card.title}</CardTitle>
          <CardText>{card.text}</CardText>
        </DataCard>
      ))}
    </DataContainer>
  );
};

export default DataSheet;