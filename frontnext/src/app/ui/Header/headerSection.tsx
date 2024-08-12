'use client';

import React from 'react';
import HeaderTags from './headerComponent/createHeaderTag';
import ConDiv from './headerComponent/createConDiv';
import SpanTag from './headerComponent/createSpanTag';
import ButtonClick from './headerComponent/createBtn';
import styles from '../styles/styles-header';
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
    <HeaderTags className={styles.header}>
      <ConDiv className={styles.headerLeft}>
        <ButtonClick
          clickFunc={() => handleClick('TAB_ONE')}
          className={`${styles.buttonFirst} ${styles.buttonHover}`}
          textNode={localizedTexts.TABMENUONE}
        />
        <ButtonClick
          clickFunc={() => handleClick('TAB_TWO')}
          className={`${styles.button} ${styles.buttonHover}`}
          textNode={localizedTexts.TABMENUTWO}
        />
      </ConDiv>
      <ConDiv className={styles.headerCenter}>
        <ButtonClick
          clickFunc={() => handleClick('TAB_THREE')}
          className={`${styles.button} ${styles.buttonHover}`}
          textNode={localizedTexts.TABMENUTHREE}
        />
      </ConDiv>
      <ConDiv className={styles.headerRight}>
        <SpanTag className={styles.span} textNode="admin" />
        <ButtonClick
          clickFunc={() => handleClick('TAB_FOUR')}
          className={styles.buttonLogout}
          textNode={localizedTexts.TABMENUFOUR}
        />
      </ConDiv>
    </HeaderTags>
  );
};

export default HeaderSection;
