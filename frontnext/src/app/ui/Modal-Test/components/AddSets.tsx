import React, { useRef, useState, useEffect } from 'react';
import { createSetJSX } from '../utils/CreateSet';
import TotalStyles from '../../styles/TotalStyles';
import RecommendTemp from '../../recommendTemp/recommendTemp';
import { callApi } from '@/app/lib/AJAX';
import Modal from '../modalComponent';

interface InputState {
  id: number;
  value: string;
  error: string;
}

export const AddSets: React.FC = () => {
  const [count, setCount] = useState(1);
  const [tableName, setTableName] = useState<InputState>({
    id: 0,
    value: '',
    error: '',
  });
  const [sets, setSets] = useState<InputState[]>([
    { id: 1, value: '', error: '' },
  ]);
  const [isRecommend, setIsRecommend] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // 성공 모달 상태 추가
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tableNameInputRef = useRef<HTMLInputElement | null>(null);
  const isComposingRef = useRef(false);

  const handleClick = () => {
    const id = count + 1;
    setSets([...sets, { id, value: '', error: '' }]);
    setCount(id);
  };

  const handleInputChange = (id: number, value: string) => {
    if (id === 0) {
      setTableName({ ...tableName, value, error: '' });
    } else {
      setSets(
        sets.map((set) => (set.id === id ? { ...set, value, error: '' } : set)),
      );
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: number,
  ) => {
    if (e.key === 'Enter' && !isComposingRef.current) {
      e.preventDefault();
      const inputs = containerRef.current?.querySelectorAll('input');
      if (inputs) {
        const currentIndex = Array.from(inputs).indexOf(
          e.target as HTMLInputElement,
        );
        const nextIndex = (currentIndex + 1) % inputs.length;
        (inputs[nextIndex] as HTMLInputElement).focus();
      }
    }
  };

  const handleCompositionStart = () => {
    isComposingRef.current = true;
  };

  const handleCompositionEnd = () => {
    isComposingRef.current = false;
  };

  const handleRecommend = (): void => {
    setIsRecommend((prevState) => !prevState);
  };

  const clickToCopyRecommend = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const btnTextNode = e.currentTarget.textContent;
    if (btnTextNode === '돌아가기') {
      handleRecommend();
    } else {
      const useData = { table: btnTextNode };
      try {
        const response = await callApi('8000/createRecommend', 'POST', useData);
        console.log(response);
        setShowSuccessModal(true); // alert 대신 모달 표시
      } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
      } finally {
        handleRecommend();
      }
    }
  };

  const validateForm = () => {
    const newSets = sets.map((set) =>
      set.value.trim() === ''
        ? { ...set, error: '이 항목은 필수입니다.' }
        : set,
    );
    const tableNameError =
      tableName.value.trim() === '' ? '이 항목은 필수입니다.' : '';
    setTableName({ ...tableName, error: tableNameError });
    setSets(newSets);

    const allFilled =
      newSets.every((set) => set.value.trim() !== '') && tableNameError === '';
    return allFilled;
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const formIsValid = validateForm();

    if (formIsValid) {
      const formData = {
        tableName: tableName.value,
        sets: sets.map((set) => set.value),
      };

      try {
        const response = await fetch('http://localhost:8000/createTable', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          alert('중복된 테이블 이름입니다.');
        } else {
          setShowSuccessModal(true); // 성공 모달 표시
        }

        const result = await response.json();
        console.log('서버 응답:', result);
      } catch (error) {
        console.error('폼 제출 중 오류 발생:', error);
      }
    }
  };

  const handleDeleteWrapper = (id: number) => {
    setSets((prevSets) => {
      const newSets = prevSets.filter((set) => set.id !== id);
      setCount(newSets.length);
      return newSets;
    });
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    window.location.reload(); // 페이지 새로 고침
  };

  useEffect(() => {
    if (tableNameInputRef.current) {
      tableNameInputRef.current.focus();
    }
  }, []);

  return (
    <>
      {!isRecommend ? (
        <form onSubmit={handleCreate}>
          <div ref={containerRef}>
            <div className={TotalStyles.CreateTableContainer}>
              <input
                type="text"
                placeholder="테이블 이름을 입력하세요."
                className={TotalStyles.CreateTableInput}
                ref={tableNameInputRef}
                onKeyDown={(e) => handleKeyDown(e, 0)}
                onCompositionStart={handleCompositionStart}
                onCompositionEnd={handleCompositionEnd}
                onChange={(e) => handleInputChange(0, e.target.value)}
                value={tableName.value}
                autoComplete="off"
              />
              {tableName.error && (
                <p className={TotalStyles.CreateTableErrorText}>
                  {tableName.error}
                </p>
              )}
            </div>
            {sets.map((set) => (
              <div key={set.id}>
                {createSetJSX(
                  set.id,
                  handleDeleteWrapper,
                  containerRef,
                  setCount,
                  (e) => handleKeyDown(e, set.id),
                  handleCompositionStart,
                  handleCompositionEnd,
                  (e) => handleInputChange(set.id, e.target.value),
                  set.value,
                  set.error,
                )}
              </div>
            ))}
          </div>
          <div>
            <button
              type="button"
              onClick={handleRecommend}
              className={TotalStyles.CreateTableRecommendButton}
            >
              추천 템플릿
            </button>
          </div>
          <div className={TotalStyles.CreateTableButtonContainer}>
            <button
              type="button"
              onClick={handleClick}
              className={`${TotalStyles.CreateTableButton} ${TotalStyles.CreateTableAddButton}`}
            >
              추가
            </button>
            <button
              type="submit"
              className={`${TotalStyles.CreateTableButton} ${TotalStyles.CreateTableCreateButton}`}
            >
              생성
            </button>
          </div>
        </form>
      ) : (
        <RecommendTemp
          className={TotalStyles.CreateTableRecommendButton}
          onClose={clickToCopyRecommend}
        />
      )}

      {/* 성공 모달 */}
      <Modal show={showSuccessModal} onClose={handleModalClose}>
        <div className="text-center">
          <p className={TotalStyles.ModalText}>테이블이 생성되었습니다.</p>
          <button
            className={TotalStyles.ModalConfirmButton}
            onClick={handleModalClose}
          >
            확인
          </button>
        </div>
      </Modal>
    </>
  );
};
