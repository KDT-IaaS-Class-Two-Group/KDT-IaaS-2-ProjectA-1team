'use client';

import React from 'react';
import { ConDiv } from './headerComponent/createConDiv';
import HeaderTags from './headerComponent/createHeaderTag';
import SpanTag from './headerComponent/createSpanTag';
import ButtonClick from './headerComponent/createBtn';
import styles from '@/app/header.module.css';
import { getStoredUserId } from '@/app/lib/HeaderModule/getStorageInfo';

export default function HeaderSection() {
  const insertId = getStoredUserId();

  return (
    <HeaderTags className={styles.header}>
      <ConDiv className={styles.header__left}>
        <ButtonClick
          route={'ViewPage'}
          className={styles.button}
          textNode={`조회`}
        />
        <ButtonClick
          route={'InsertPage'}
          className={styles.button}
          textNode={`입력`}
        />
      </ConDiv>
      <ConDiv className={styles.header__center}>
        <ButtonClick
          route={'TabSetting'}
          className={styles.button}
          textNode={`설정`}
        />
      </ConDiv>
      <ConDiv className={styles.header__right}>
        <SpanTag className={styles.span} textNode={`${insertId}`} />
        <ButtonClick
          route={'ViewPage'}
          className={styles.button__logout}
          textNode={`로그아웃`}
        />
      </ConDiv>
    </HeaderTags>
  );
}

// 'use client';

// import React from 'react';
// import { ConDiv } from './headerComponent/createConDiv';
// import HeaderTags from './headerComponent/createHeaderTag';
// import SpanTag from './headerComponent/createSpanTag';
// import ButtonClick from './headerComponent/createBtn';
// import styles from '@/app/header.module.css';
// import { getStoredUserId } from '@/app/lib/HeaderModule/getStorageInfo';

// export default function HeaderSection() {
//   const insertId = getStoredUserId();

//   return (
//     <HeaderTags className={styles.header}>
//       <ConDiv className={styles.header__left}>
//         <ButtonClick route={'ViewPage'} className={}} textNode={`조회`} />
//         <ButtonClick route={'InsertPage'} className={} textNode={`입력`} />
//       </ConDiv>
//       <ConDiv className={styles.header__center}>
//         <ButtonClick route={'TabSetting'} className={} textNode={`설정`} />
//       </ConDiv>
//       <ConDiv className={styles.header__right}>
//         <SpanTag className={} textNode={`${insertId}`} />
//         <ButtonClick route={'/'} className={} textNode={`로그아웃`} />
//       </ConDiv>
//     </HeaderTags>
//   );
// }
