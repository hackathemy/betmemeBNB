"use client";

import Wrapper from "@/components/Wrapper";
import styles from "./index.module.scss";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import GameList from "@/components/GameList";

export default function Home() {
  const router = useRouter();

  return (
    <Wrapper>
      <div>
        <GameList />
      </div>
    </Wrapper>
  );
}
