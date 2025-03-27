import { auth } from './firebase-config.js';
import { 
  signInWithEmailAndPassword, 
  onAuthStateChanged 
} from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

// 로그인 버튼 클릭 이벤트 리스너 추가
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("login_btn");

  if (loginBtn) {
    loginBtn.addEventListener("click", login);
  }

  // 로그인 상태 확인하여 자동 이동
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("로그인 유지됨:", user);
      document.body.classList.add("fade-out");
      setTimeout(() => {
        window.location.href = "main.html"; // 로그인 상태라면 메인 페이지로 이동
      }, 2000); //0.8초
      
      
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded"); // 페이지 애니메이션
})

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");
  const message = document.getElementById("message");

  // 기존 메시지 초기화
  emailError.innerText = "";
  passwordError.innerText = "";
  message.innerText = "";

  let formValid = true;

  if (!email) {
    emailError.innerText = "이메일을 입력하세요.";
    formValid = false;
  }

  if (!password) {
    passwordError.innerText = "비밀번호를 입력하세요.";
    formValid = false;
  }

  if (!formValid) return;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("로그인 성공:", user);
      message.innerText = "로그인 성공!";
      window.location.href = "main.html"; // 로그인 성공 시 메인 페이지로 이동
    })
    .catch((error) => {
      console.log("로그인 실패:", error);
      message.innerText = "로그인 실패! 이메일 또는 비밀번호를 확인해주세요.";
    });
}
