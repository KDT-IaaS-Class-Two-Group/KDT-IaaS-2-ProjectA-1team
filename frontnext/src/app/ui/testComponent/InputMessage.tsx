import React from 'react';
import { styles } from './stylesContent';

interface MessageProps {
  message: string;
  isSuccess: boolean;
}

const Message: React.FC<MessageProps> = ({ message, isSuccess }) => (
  <div className={styles.messageContainer}>
    <h1 className={isSuccess ? styles.successText : styles.failureText}>
      {message}
    </h1>
  </div>
);

export default Message;
