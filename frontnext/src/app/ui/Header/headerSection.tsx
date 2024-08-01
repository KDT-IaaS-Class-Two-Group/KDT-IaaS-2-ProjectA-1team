'use client';

import React from 'react';
import HeaderTags from './headerComponent/createHeaderTag';
import ConDiv from './headerComponent/createConDiv';
import SpanTag from './headerComponent/createSpanTag';
import ButtonClick from './headerComponent/createBtn';
import styles from '@/app/header.module.css';
import { useRouter } from 'next/navigation';
import { TABMENUTEXTS, TABROUTES } from './headerComponent/RoutePath';

const HeaderSection: React.FC = () => {
  const router = useRouter();

  const handleClick = (route: keyof typeof TABROUTES) => {
    router.push(TABROUTES[route]);
  };

  return (
    <HeaderTags className={styles.header}>
      <ConDiv className={styles.header__left}>
        <ButtonClick
          clickFunc={() => handleClick('TAB_ONE')}
          className={styles.button}
          textNode={TABMENUTEXTS.TABMENUONE}
        />
        <ButtonClick
          clickFunc={() => handleClick('TAB_TWO')}
          className={styles.button}
          textNode={TABMENUTEXTS.TABMENUTWO}
        />
      </ConDiv>
      <ConDiv className={styles.header__center}>
        <ButtonClick
          clickFunc={() => handleClick('TAB_THREE')}
          className={styles.button}
          textNode={TABMENUTEXTS.TABMENUTHREE}
        />
      </ConDiv>
      <ConDiv className={styles.header__right}>
        <SpanTag className={styles.span} textNode={`admin`} />
        <ButtonClick
          clickFunc={() => handleClick('TAB_FOUR')}
          className={styles.button__logout}
          textNode={TABMENUTEXTS.TABMENUFOUR}
        />
      </ConDiv>
    </HeaderTags>
  );
};

export default HeaderSection;
