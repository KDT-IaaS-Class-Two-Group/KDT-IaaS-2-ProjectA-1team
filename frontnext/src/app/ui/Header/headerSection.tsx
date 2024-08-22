'use client';

import React from 'react';
import ButtonClick from './headerComponent/headerBtn';
import SpanTag from './headerComponent/headerSpanTag';
import ConDiv from './headerComponent/headerConDiv';
import HeaderTags from './headerComponent/headerTag';
import TotalStyles from '../styles/TotalStyles';
import { useRouter } from 'next/navigation';
import { TABMENUTEXTS, TABROUTES } from './headerComponent/RoutePath';
import { useLanguage } from '../SettingMoules/LanguageContext';

const HeaderSection: React.FC = () => {
  const router = useRouter();
  const { language } = useLanguage();

  const handleClick = (route: keyof typeof TABROUTES) => {
    router.push(TABROUTES[route]);
  };

  const localizedTexts = TABMENUTEXTS[language];

  return (
    <HeaderTags className={TotalStyles.Header}>
      <ConDiv className={TotalStyles.HeaderLeft}>
        <ButtonClick
          clickFunc={() => handleClick('TAB_ONE')}
          className={`${TotalStyles.HeaderButtonFirst}`}
          textNode={localizedTexts.TABMENUONE}
        />
        <ButtonClick
          clickFunc={() => handleClick('TAB_TWO')}
          className={`${TotalStyles.HeaderButton}`}
          textNode={localizedTexts.TABMENUTWO}
        />
      </ConDiv>
      <ConDiv className={TotalStyles.HeaderCenter}>
        <ButtonClick
          clickFunc={() => handleClick('TAB_THREE')}
          className={`${TotalStyles.HeaderButton}`}
          textNode={localizedTexts.TABMENUTHREE}
        />
      </ConDiv>
      <ConDiv className={TotalStyles.HeaderRight}>
        <SpanTag className={TotalStyles.HeaderSpan} textNode={`admin`} />
        <ButtonClick
          clickFunc={() => handleClick('TAB_FOUR')}
          className={TotalStyles.HeaderButtonLogout}
          textNode={localizedTexts.TABMENUFOUR}
        />
      </ConDiv>
    </HeaderTags>
  );
};

export default HeaderSection;
