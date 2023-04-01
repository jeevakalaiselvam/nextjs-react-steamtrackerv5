import ProfileImage from "@/components/atoms/Profile";
import RecentHistory from "@/components/atoms/RecentHistory";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import GamesPageMenu from "../menu/GamePageMenu";
import ProfileLevel from "@/components/atoms/ProfileLevel";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  padding: 0.25rem;
  min-height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.2);
`;

export default function GamesLeftSidebar() {
  const router = useRouter();

  return (
    <Container>
      <ProfileImage
        profileLink="https://steamcommunity.com/id/notreallogan"
        profileImageLink="https://avatars.cloudflare.steamstatic.com/3984d41a867b9b4eca056cdfcd1134bd591d9100_full.jpg"
      />
      <GamesPageMenu />
      <ProfileLevel />
      <RecentHistory />
    </Container>
  );
}
