'use client'; // 이 파일이 클라이언트 사이드 렌더링을 위한 것임을 Next.js에 알립니다.

import React, { useState, useEffect } from 'react'; // React와 React hooks (useState, useEffect)를 가져옵니다.
import { useRouter } from 'next/navigation'; // Next.js 라우터 훅을 가져옵니다.

interface Tab {
  name: string; // 탭의 이름을 나타냅니다.
  hash: string; // 탭의 해시 값을 나타냅니다.
}

// 탭 객체를 정의합니다. 각 탭은 이름과 해시 값을 가지고 있습니다.
const tabs = {
  tabMenu1: {
    name: '조회',
    hash: 'check',
  },
  tabMenu2: {
    name: '입력 및 수정',
    hash: 'input-edit',
  },
  tabMenu3: {
    name: '설정',
    hash: 'settings',
  },
};

const Tabs: React.FC = () => {
  // Tabs 컴포넌트를 정의합니다.
  const router = useRouter(); // Next.js 라우터 훅을 사용합니다.
  // 현재 활성화된 탭을 상태로 관리합니다. 초기값은 URL의 해시 값 또는 'query'입니다.
  const [activeTab, setActiveTab] = useState<string>(
    () => window.location.hash.substring(1) || 'query',
  );

  useEffect(() => {
    // 컴포넌트가 마운트될 때 해시 변경 이벤트를 처리하는 훅입니다.
    const handleHashChange = () => {
      setActiveTab(window.location.hash.substring(1) || 'query'); // 해시 값이 변경되면 활성화된 탭을 업데이트합니다.
    };

    window.addEventListener('hashchange', handleHashChange); // 해시 변경 이벤트를 리스닝합니다.
    return () => window.removeEventListener('hashchange', handleHashChange); // 컴포넌트 언마운트 시 이벤트 리스너를 제거합니다.
  }, []);

  const handleTabClick = (hash: string) => {
    // 탭 클릭 시 호출되는 함수입니다.
    router.push(`#${hash}`); // URL 해시를 변경합니다.
    setActiveTab(hash); // 활성화된 탭을 업데이트합니다.
  };

  return (
    <div>
      <div className="tabs">
        {' '}
        {/* 탭 버튼을 감싸는 컨테이너입니다. */}
        {Object.values(tabs).map(
          (
            tab, // 탭 객체의 값을 반복하여 각 탭 버튼을 생성합니다.
          ) => (
            <button
              key={tab.hash} // 각 버튼의 고유 키입니다.
              className={`tab-button ${activeTab === tab.hash ? 'active' : ''}`} // 활성화된 탭에 클래스 'active'를 추가합니다.
              onClick={() => handleTabClick(tab.hash)} // 버튼 클릭 시 해당 해시로 탭을 변경합니다.
            >
              {tab.name} {/* 탭 이름을 표시합니다. */}
            </button>
          ),
        )}
      </div>
      <div className="tab-content">
        {' '}
        {/* 탭 내용 영역입니다. */}
        {activeTab === 'check' && <div>조회 탭 내용</div>}{' '}
        {/* 활성화된 탭에 따라 다른 내용을 표시합니다. */}
        {activeTab === 'input-edit' && <div>입력 및 수정 탭 내용</div>}
        {activeTab === 'settings' && <div>설정 탭 내용</div>}
      </div>
      <style jsx>{` {/* CSS-in-JS 스타일링입니다. */}
        .tabs {
          display: flex;
          border-bottom: 1px solid #ccc;
          background: #f0f0f0; /* 단색 배경을 설정합니다 */
        }
        .tab-button {
          padding: 10px;
          cursor: pointer;
          border: none;
          background: #e0e0e0; /* 단색 배경을 설정합니다 */
          margin-right: 5px;
        }
        .tab-button.active {
          background: #fff;
          border-bottom: 1px solid #fff;
        }
        .tab-content {
          padding: 20px;
          border: 1px solid #ccc;
          border-top: none;
        }
      `}</style>
    </div>
  );
};

export default Tabs; // Tabs 컴포넌트를 내보냅니다.
