// logincheck.tsx
import React, { useState } from "react";
import { readDataFromLogin } from "./readDataFromLogin";
import { checkCredentials } from "./loginfunc";

type AdminData = {
  id: string;
  password: string;
};

const LoginCheck = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogin = async () => {
    try {
      const result = await readDataFromLogin<AdminData>(
        ["id", "password"],
        "adminData"
      );
      const dbId = result.id;
      const dbPassword = result.password;
      const isValid = checkCredentials(
        id,
        password,
        dbId,
        dbPassword,
        showErrorModal
      );

      if (isValid) {
        window.location.href = "/dummi.tsx"; // 로그인 성공 시 페이지를 이동합니다.
      }
    } catch (error) {
      console.error("로그인 데이터를 불러오는 중 오류가 발생했습니다:", error);
    }
  };

  const showErrorModal = (message: string) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="아이디"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <p>{modalMessage}</p>
          </div>
        </div>
      )}

      <style jsx>{`
        .modal {
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          z-index: 1;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgba(0, 0, 0, 0.4);
        }
        .modal-content {
          background-color: #fefefe;
          margin: auto;
          padding: 20px;
          border: 1px solid #888;
          width: 80%;
          max-width: 400px;
        }
        .close {
          color: #aaa;
          float: right;
          font-size: 28px;
          font-weight: bold;
        }
        .close:hover,
        .close:focus {
          color: black;
          text-decoration: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default LoginCheck;
