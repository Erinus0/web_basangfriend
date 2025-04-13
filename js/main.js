document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded"); // 페이지 애니메이션

  // 스크롤 시 헤더 표시
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".hidden-header");
    if (window.scrollY > 100) {
      header.classList.add("visible");
    } else {
      header.classList.remove("visible");
    }
  });
});


const features = document.querySelectorAll('.feature');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
}, {
  threshold: 0.3,
});

features.forEach(feature => {
  observer.observe(feature);
});