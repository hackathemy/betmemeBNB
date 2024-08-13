"use client";

import React, { useState } from "react";
import Wrapper from "@/components/Wrapper";
import styles from "./index.module.scss";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import GameList from "@/components/GameList";

const tabs = ["ALL", "TGE", "AMA", "HARDFORK", "REBRANDING"] as const;

export default function Home() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>("ALL");

  const handleTabClick = (tab: typeof tabs[number]) => {
    setActiveTab(tab);
    // 탭 클릭 시 추가 작업을 여기에 추가할 수 있습니다.
  };

  return (
    <Wrapper>
      <>
        <div className={styles.tabContainer}>
          {tabs.map((tab) => (
            <div
              key={tab}
              className={clsx(styles.tab, { [styles.activeTab]: activeTab === tab })}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
        <GameList />
      </>
    </Wrapper>
  );
}
