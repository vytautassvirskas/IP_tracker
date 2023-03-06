import React from "react";
import styled from "styled-components";
import iconArrow from "../assets/images/icon-arrow.svg";

const Form = styled.form`
  position: relative;
  width: 30rem;
  overflow: hidden;
  margin: 0 auto;
  text-align: left;
  border-radius: 12px;
  padding: 0.8rem 1rem;
  background-color: rgb(255, 255, 255);
  transition: all 0.2s ease-in-out;
  @media (max-width: 768px) {
    width: 90%;
    padding: 1.2rem 1.2rem;
  }
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  width: calc(100% - 2.5rem); //subtract button width
  background-color: transparent;
`;

const IconArrow = styled.img`
  height: 0.625rem;
  width: auto;
  margin: 0 auto;
`;

const SearchButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 2.5rem;
  border: none;
  background-color: rgb(3, 3, 3);
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: rgb(43, 43, 43);
  }
`;

interface InputProps {
  ipAddress: string;
  setIpAddress: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (e: React.FormEvent) => void;
}

const InputWithButton = ({
  ipAddress,
  setIpAddress,
  handleSearch,
}: InputProps) => {
  return (
    <Form action="" onSubmit={(e) => handleSearch(e)}>
      <SearchInput
        type="text"
        placeholder="Search for any IP address or domain"
        value={ipAddress}
        onChange={(e) => {
          setIpAddress(e.target.value);
        }}
      ></SearchInput>
      <SearchButton type="submit">
        <IconArrow src={iconArrow}></IconArrow>
      </SearchButton>
    </Form>
  );
};

export default InputWithButton;
