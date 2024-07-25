'use client';

import React, { FormEvent } from 'react';
import InputField from './MakeInputField';
import Button from './MakeBtnTag';
import { styles } from './stylesContent';
import {
  ID_LABEL,
  PASSWORD_LABEL,
  ID_PLACEHOLDER,
  PASSWORD_PLACEHOLDER,
  SUBMIT_BUTTON_TEXT,
} from './labelsContent';

interface FormProps {
  id: string;
  password: string;
  setId: (value: string) => void;
  setPassword: (value: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const Form: React.FC<FormProps> = ({
  id,
  password,
  setId,
  setPassword,
  handleSubmit,
}) => (
  <form className={styles.form} onSubmit={handleSubmit}>
    <InputField
      id="id"
      type="text"
      value={id}
      onChange={(e) => setId(e.target.value)}
      label={ID_LABEL}
      placeholder={ID_PLACEHOLDER}
    />
    <InputField
      id="password"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      label={PASSWORD_LABEL}
      placeholder={PASSWORD_PLACEHOLDER}
    />
    <Button type="submit" text={SUBMIT_BUTTON_TEXT} />
  </form>
);

export default Form;
