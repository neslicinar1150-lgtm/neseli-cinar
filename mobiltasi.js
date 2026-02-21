/* 📱 MOBİL SÜRÜKLEME – GERİ EKLENDİ */
let touchDrag = false;
let touchOffsetX = 0;
let touchOffsetY = 0;

keyboard.addEventListener("touchstart", e => {
  touchDrag = true;
  keyboard.classList.add("dragging");

  const touch = e.touches[0];
  const rect = keyboard.getBoundingClientRect();

  touchOffsetX = touch.clientX - rect.left;
  touchOffsetY = touch.clientY - rect.top;

  keyboard.style.transform = "none";
  keyboard.style.left = rect.left + "px";
  keyboard.style.top = rect.top + "px";
  keyboard.style.bottom = "auto";
}, { passive: true });

document.addEventListener("touchmove", e => {
  if (!touchDrag) return;

  const touch = e.touches[0];
  keyboard.style.left = (touch.clientX - touchOffsetX) + "px";
  keyboard.style.top = (touch.clientY - touchOffsetY) + "px";
}, { passive: true });

document.addEventListener("touchend", () => {
  touchDrag = false;
  keyboard.classList.remove("dragging");
});
