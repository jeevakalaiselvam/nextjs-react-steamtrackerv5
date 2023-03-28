import { actionFetchAllGames } from "@/store/actions/games.actions";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Loaders from "react-spinners";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100vw;
  min-height: 100vh;
`;

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games } = steamtracker;

  useEffect(() => {
    dispatch(actionFetchAllGames());
  }, [dispatch]);

  useEffect(() => {
    if (games && games.length > 0) {
      router.push("/games");
    }
  }, [games]);

  return <Page content={<Loaders.HashLoader />} />;
}
