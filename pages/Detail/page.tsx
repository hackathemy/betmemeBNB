'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { RecoilRoot } from 'recoil';
import Wrapper from "@/components/Wrapper";
import GameInfo from "@/components/DetailPage/GameInfo";
import CommentsSection from "@/components/DetailPage/CommentsSection";
import BetDetails from "@/components/DetailPage/BetDetails";
import '../../src/styles/globals.scss';
import "./page.module.scss";

const DetailPage = () => {
    const params = useSearchParams();
    const gameId = params.get('gameId');
    const token = params.get('token');

    if (!gameId || !token) {
        return <div>Missing game ID or token.</div>;
    }

    return (
      <RecoilRoot>
        <Wrapper>
          <>
              <div className="page-header">
                  <h1>#Ongoing Match</h1>
                  <h2>After AMA, predict changes in BnB token price</h2>
              </div>
              <div className="content-section">
                  <GameInfo gameId={gameId}/>
                  <CommentsSection gameId={gameId} />
                  <BetDetails gameId={gameId} token={token} />
              </div>
          </>
        </Wrapper>
      </RecoilRoot>
    );
};

export default DetailPage;
