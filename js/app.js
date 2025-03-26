// app.js
import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

// 로그인 버튼 클릭 이벤트 리스너 추가
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("login_btn");

  // 버튼이 존재하는 경우에만 이벤트 리스너 설정
 // 로그인 버튼 클릭 시 login 함수 호출
 loginBtn.addEventListener("click", () => {
  login();
});
});

export function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");
  const message = document.getElementById("message");

  // 기존 메시지 초기화
  emailError.innerText = "";
  passwordError.innerText = "";
  message.innerText = "";

  // 오류 메시지 스타일 적용
  emailError.classList.add("error-message");
  passwordError.classList.add("error-message");
  message.classList.add("error-message");

  let formValid = true;

  if (!email) {
    document.getElementById("email-error").innerText = "이메일을 입력하세요.";
    formValid = false;
  }

  if (!password) {
    document.getElementById("password-error").innerText = "비밀번호를 입력하세요.";
    formValid = false;
  }

  if (!formValid) {
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("로그인 성공:", user);
      document.getElementById("message").innerText = "로그인 성공!";
    })
    .catch((error) => {
      console.log("로그인 실패:", error);
      document.getElementById("message").innerText = "로그인 실패! 이메일 또는 비밀번호를 확인해주세요.";
    });
}
