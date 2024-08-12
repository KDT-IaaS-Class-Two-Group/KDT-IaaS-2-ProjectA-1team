'use client';

import React from 'react';
import HeaderTags from './headerComponent/createHeaderTag';
import ConDiv from './headerComponent/createConDiv';
import SpanTag from './headerComponent/createSpanTag';
import ButtonClick from './headerComponent/createBtn';
import TotalStyles from '../styles/TotalStyles';
import { useRouter } from 'next/navigation';
import { TABMENUTEXTS, TABROUTES } from './headerComponent/RoutePath';

const HeaderSection: React.FC = () => {
  const router = useRouter();

  const handleClick = (route: keyof typeof TABROUTES) => {
    router.push(TABROUTES[route]);
  };

  return (
    <HeaderTags className={TotalStyles.Header}>
      <ConDiv className={TotalStyles.HeaderLeft}>
        <ButtonClick
          clickFunc={() => handleClick('TAB_ONE')}
          className={`${TotalStyles.HeaderButtonFirst}`}
          textNode={TABMENUTEXTS.TABMENUONE}
        />
        <ButtonClick
          clickFunc={() => handleClick('TAB_TWO')}
          className={`${TotalStyles.HeaderButton}`}
          textNode={TABMENUTEXTS.TABMENUTWO}
        />
      </ConDiv>
      <ConDiv className={TotalStyles.HeaderCenter}>
        <ButtonClick
          clickFunc={() => handleClick('TAB_THREE')}
          className={`${TotalStyles.HeaderButton}`}
          textNode={TABMENUTEXTS.TABMENUTHREE}
        />
      </ConDiv>
      <ConDiv className={TotalStyles.HeaderRight}>
        <SpanTag className={TotalStyles.HeaderSpan} textNode={`admin`} />
        <ButtonClick
          clickFunc={() => handleClick('TAB_FOUR')}
          className={TotalStyles.HeaderButtonLogout}
          textNode={TABMENUTEXTS.TABMENUFOUR}
        />
      </ConDiv>
    </HeaderTags>
  );
};

export default HeaderSection;
