import GamesContent from "@/components/pages/content/GamesContent";
import GameHeader from "@/components/pages/header/GameHeader";
import GamesLeft from "@/components/pages/left/GamesLeft";
import Page from "@/components/pages/Page";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function GamesPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games } = steamtracker;

  return <Page left={<GamesLeft />} content={<GamesContent />} />;
}
