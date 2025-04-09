import { auth, db } from './firebase-config.js';
import { signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

document.addEventListener("DOMContentLoaded", async () => {
  const logoutBtn = document.getElementById("logout_btn");
  const profileImg = document.getElementById("profile_img");
  const userName = document.getElementById("user_name");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      signOut(auth)
        .then(() => {
          console.log("로그아웃 성공");
          window.location.href = "index.html";
        })
        .catch((error) => {
          console.error("로그아웃 실패:", error);
        });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("loaded"); // 페이지 애니메이션
  })

  // 로그인 상태 확인
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      console.log("비로그인 상태 -> 로그인 페이지로 이동");
      window.location.href = "index.html";
    } else {
      console.log("로그인 유지됨 - UID:", user.uid); // UID 확인
      await loadUserData(user.uid);
    }
  });

  // Firebase Firestore에서 유저 정보 불러오기
  async function loadUserData(uid) {
    try {
      console.log("Firestore에서 유저 데이터 불러오는 중 - UID:", uid);
      const userDocRef = doc(db, "user", uid); // users 컬렉션에서 uid 문서를 참조
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("유저 데이터 가져옴:", userData); // 가져온 데이터 확인

        // 프로필 이미지 적용
        profileImg.src = userData.image || "user-solid.svg";
        
        // 유저 이름 적용
        userName.textContent = userData.name || "사용자";
      } else {
        console.log("유저 데이터 없음");
      }
    } catch (error) {
      console.error("유저 데이터 불러오기 실패:", error);
    }
  }
});

window.addEventListener("scroll", () => {
  const header = document.querySelector(".hidden-header");
  if (window.scrollY > 100) {
    header.classList.add("visible");
  } else {
    header.classList.remove("visible");
  }
});