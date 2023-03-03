import styled, { createGlobalStyle } from "styled-components";
import DataSheet from "./components/DataSheet";
import InputWithButton from "./components/InputWithButton";
import { Title } from "./components/Title";
import { GlobalStyle } from "./GlobalStyles.styles";
import DekstopBackkgroundImg from "./assets/images/pattern-bg-desktop.png";

const AppDiv = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  padding-top: 50px;
  background: url(${DekstopBackkgroundImg}) no-repeat top;
  background-size: contain;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <AppDiv>
        <Title>IP Address Tracker</Title>
        <InputWithButton />
        <DataSheet></DataSheet>
      </AppDiv>
    </>
  );
}

export default App;
