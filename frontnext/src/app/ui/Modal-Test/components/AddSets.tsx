import React, { useRef, useState, useEffect } from 'react';
import { handleDelete } from '../utils';
import { createSetJSX } from '../utils/CreateSet';
import CreateTableStyle from '../styles/ModalStyles';

interface InputState {
  id: number;
  value: string;
  error: string;
}

export const AddSets: React.FC = () => {
  const [count, setCount] = useState(1);
  const [sets, setSets] = useState<InputState[]>([
    { id: 1, value: '', error: '' },
  ]);
  const [isFormValid, setIsFormValid] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tableNameInputRef = useRef<HTMLInputElement | null>(null);
  const isComposingRef = useRef(false);

  const handleClick = () => {
    const id = count + 1;
    setSets([...sets, { id, value: '', error: '' }]);
    setCount(id);
  };

  const handleInputChange = (id: number, value: string) => {
    setSets(
      sets.map((set) => (set.id === id ? { ...set, value, error: '' } : set)),
    );
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

  const validateForm = () => {
    const newSets = sets.map((set) =>
      set.value.trim() === ''
        ? { ...set, error: '이 필드는 필수입니다.' }
        : set,
    );
    setSets(newSets);

    const allFilled = newSets.every((set) => set.value.trim() !== '');
    setIsFormValid(allFilled);
    return allFilled;
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const formIsValid = validateForm();

    if (formIsValid) {
      const formData = {
        tableName: '테이블 이름', // 여기에 테이블 이름 입력 값을 추가하세요
        sets: sets.map((set) => set.value),
      };

      try {
        const response = await fetch('/createTable', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('네트워크 응답이 정상이 아닙니다.');
        }

        const result = await response.json();
        console.log('서버 응답:', result);

        // 서버 응답 처리 로직 추가
      } catch (error) {
        console.error('폼 제출 중 오류 발생:', error);
        // 오류 처리 로직 추가
      }
    }
  };

  useEffect(() => {
    if (tableNameInputRef.current) {
      tableNameInputRef.current.focus();
    }
  }, []);

  return (
    <form onSubmit={handleCreate}>
      <div ref={containerRef}>
        <div className={CreateTableStyle.container}>
          <input
            type="text"
            placeholder="테이블 이름을 입력하세요."
            className={CreateTableStyle.input}
            ref={tableNameInputRef}
            onKeyDown={(e) => handleKeyDown(e, 0)}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            autoComplete="off"
          />
        </div>
        {sets.map((set) => (
          <div key={set.id}>
            {createSetJSX(
              set.id,
              handleDelete,
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
      <div className={CreateTableStyle.buttonContainer}>
        <button
          type="button"
          onClick={handleClick}
          className={`${CreateTableStyle.button} ${CreateTableStyle.addButton}`}
        >
          추가
        </button>
        <button
          type="submit"
          className={`${CreateTableStyle.button} ${CreateTableStyle.createButton}`}
        >
          생성
        </button>
      </div>
    </form>
  );
};
