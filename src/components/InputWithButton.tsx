import React, { useState } from "react";
import styled from "styled-components";
import iconArrow from "../assets/images/icon-arrow.svg";

const InputContainer = styled.div`
  position: relative;
  max-width: 700px;
  overflow: hidden;
  margin: 0 auto;
  text-align: left;
  border-radius: 12px;
  padding: 0.8rem 1rem;
  background-color: rgb(255, 255, 255);
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  width: calc(100% - 40px);
  background-color: transparent;
`;

const IconArrow = styled.img`
  height: 10px;
  width: auto;
  margin: 0 auto;
`;

const SearchButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 40px;
  border: none;
  background-color: rgb(3, 3, 3);
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: rgb(43, 43, 43);
  }
`;

const InputWithButton = () => {
  const [input, setInput] = useState("");
  console.log(input);

  return (
    <InputContainer>
      <SearchInput
        type="text"
        placeholder="Search for any IP address or domain"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      ></SearchInput>
      <SearchButton onClick={() => console.log("click")}>
        <IconArrow src={iconArrow}></IconArrow>
      </SearchButton>
    </InputContainer>
  );
};

export default InputWithButton;
