import Page from "@/components/pages/Page";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function GamesPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games } = steamtracker;

  return (
    <Page
      left={<div>Games Left</div>}
      header={<div>Games Header</div>}
      content={<div>Games Content</div>}
      right={<div>Games Right</div>}
    />
  );
}
