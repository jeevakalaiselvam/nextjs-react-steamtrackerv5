import { getIcon } from "@/helpers/iconHelper";
import React from "react";
import styled from "styled-components";

const TrophyObtained = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const TrophyIcon = styled.div`
  display: flex;
  padding: 0.25rem;
  align-items: center;
  font-size: ${(props) => props.size ?? "2rem"};
  justify-content: center;
  color: ${(props) => props.color ?? ""};
  transform: translateY(${(props) => props.transformY ?? "0px"});
`;

const TrophyTitle = styled.div`
  display: flex;
  padding: 0.25rem;
  align-items: center;
  margin: 0 0.5rem;
  font-size: 1.5rem;
  justify-content: center;
  color: ${(props) => props.color ?? ""};
`;

export default function TrophyFancy({ color, title }) {
  return (
    <TrophyObtained>
      <TrophyIcon color={color} size={"1rem"} transformY={"1rem"}>
        {getIcon("trophy")}
      </TrophyIcon>
      <TrophyIcon color={color} size={"1.5rem"} transformY={"0.5rem"}>
        {getIcon("trophy")}
      </TrophyIcon>
      <TrophyIcon color={color} size={"2rem"}>
        {getIcon("trophy")}
      </TrophyIcon>
      <TrophyTitle color={color}>{title}</TrophyTitle>
      <TrophyIcon color={color} size={"2rem"}>
        {getIcon("trophy")}
      </TrophyIcon>
      <TrophyIcon color={color} size={"1.5rem"} transformY={"0.5rem"}>
        {getIcon("trophy")}
      </TrophyIcon>{" "}
      <TrophyIcon color={color} size={"1rem"} transformY={"1rem"}>
        {getIcon("trophy")}
      </TrophyIcon>
    </TrophyObtained>
  );
}
