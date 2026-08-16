"use strict";

const tabs = [...document.querySelectorAll('[role="tab"]')];
const panels = [...document.querySelectorAll('[role="tabpanel"]')];
const windowBox = document.querySelector("#window");
const appIcon = document.querySelector("#app-icon");
const closeBtn = document.querySelector("#close-btn");
const themeToggle = document.querySelector("#theme-toggle");
let lastSelectedTabId = "home";

// Start with the portfolio window closed
windowBox.hidden = true;

function setTheme(isDarkMode) {
  document.body.classList.toggle("dark-mode", isDarkMode);
  const label = isDarkMode ? "Switch to light mode" : "Switch to dark mode";
  themeToggle.setAttribute("aria-label", label);
  themeToggle.setAttribute("aria-pressed", String(isDarkMode));
  themeToggle.title = label;
  localStorage.setItem("portfolio-theme", isDarkMode ? "dark" : "light");
}

setTheme(localStorage.getItem("portfolio-theme") !== "light");
themeToggle.addEventListener("click", () => setTheme(!document.body.classList.contains("dark-mode")));

function selectTab(tab, shouldFocus = false) {
  lastSelectedTabId = tab.id;
  tabs.forEach((item) => {
    const selected = item === tab;
    item.setAttribute("aria-selected", selected);
    item.tabIndex = selected ? 0 : -1;
  });
  panels.forEach((panel) => {
    panel.hidden = panel.getAttribute("aria-labelledby") !== tab.id;
  });
  if (shouldFocus) tab.focus();
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectTab(tab));
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    selectTab(tabs[nextIndex], true);
  });
});

document.querySelectorAll("[data-tab-target]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    selectTab(document.getElementById(link.dataset.tabTarget), true);
  });
});

appIcon.addEventListener("click", () => {
  windowBox.hidden = false;
  selectTab(document.getElementById(lastSelectedTabId));
});

closeBtn.addEventListener("click", () => {
  windowBox.hidden = true;
  appIcon.focus();
});

const container = document.getElementById("bg-dots");
for (let i = 0; i < 250; i += 1) {
  const wrapper = document.createElement("div");
  const dot = document.createElement("div");
  wrapper.className = "dot-wrapper";
  dot.className = "dot";
  wrapper.appendChild(dot);
  wrapper.style.left = `${Math.random() * 100}vw`;
  wrapper.style.top = `${Math.random() * 100}vh`;
  const size = Math.random() * 2 + 1;
  dot.style.width = `${size}px`;
  dot.style.height = `${size}px`;
  dot.style.animationDuration = `${Math.random() * 10 + 3}s`;
  container.appendChild(wrapper);
}

const dots = document.querySelectorAll(".dot-wrapper");
function moveDots(x, y) {
  dots.forEach((dot) => {
    const rect = dot.getBoundingClientRect();
    const dx = rect.left - x;
    const dy = rect.top - y;
    const distance = Math.hypot(dx, dy);
    const force = distance < 120 ? (120 - distance) / 120 : 0;
    dot.style.setProperty("--push-x", `${dx * force}px`);
    dot.style.setProperty("--push-y", `${dy * force}px`);
  });
}
const cursorCanvas = document.getElementById("cursor-canvas");
const cursorContext = cursorCanvas.getContext("2d");
const brushPoints = Array.from({ length: 18 }, () => ({ x: 0, y: 0 }));
let cursorPoint = null;
let isCursorOnPage = false;
let isCursorOverWindow = false;

function resizeCursorCanvas() {
  const scale = window.devicePixelRatio || 1;
  cursorCanvas.width = window.innerWidth * scale;
  cursorCanvas.height = window.innerHeight * scale;
  cursorContext.setTransform(scale, 0, 0, scale, 0, 0);
  cursorContext.lineCap = "round";
  cursorContext.lineJoin = "round";
}

function drawBrushTail() {
  cursorContext.clearRect(0, 0, window.innerWidth, window.innerHeight);

  if (cursorPoint && isCursorOnPage && !isCursorOverWindow) {
    brushPoints[0].x += (cursorPoint.x - brushPoints[0].x) * .42;
    brushPoints[0].y += (cursorPoint.y - brushPoints[0].y) * .42;

    for (let index = 1; index < brushPoints.length; index += 1) {
      brushPoints[index].x += (brushPoints[index - 1].x - brushPoints[index].x) * .36;
      brushPoints[index].y += (brushPoints[index - 1].y - brushPoints[index].y) * .36;
    }

    const themeStyles = getComputedStyle(document.body);
    cursorContext.strokeStyle = themeStyles.getPropertyValue("--trail-color").trim();
    cursorContext.shadowBlur = 4;
    cursorContext.shadowColor = themeStyles.getPropertyValue("--trail-glow").trim();
    cursorContext.globalAlpha = .78;
    cursorContext.lineWidth = 5.5;
    cursorContext.beginPath();
    cursorContext.moveTo(brushPoints.at(-1).x, brushPoints.at(-1).y);
    for (let index = brushPoints.length - 2; index >= 0; index -= 1) {
      const currentPoint = brushPoints[index + 1];
      const nextPoint = brushPoints[index];
      const midpointX = (currentPoint.x + nextPoint.x) / 2;
      const midpointY = (currentPoint.y + nextPoint.y) / 2;
      cursorContext.quadraticCurveTo(currentPoint.x, currentPoint.y, midpointX, midpointY);
    }
    cursorContext.lineTo(brushPoints[0].x, brushPoints[0].y);
    cursorContext.stroke();
    cursorContext.globalAlpha = 1;
    cursorContext.shadowBlur = 0;
  }

  requestAnimationFrame(drawBrushTail);
}

resizeCursorCanvas();
drawBrushTail();
window.addEventListener("resize", resizeCursorCanvas);

document.addEventListener("pointermove", (event) => {
  moveDots(event.clientX, event.clientY);
  if (event.pointerType === "touch") return;

  isCursorOverWindow = Boolean(event.target.closest("#window"));
  cursorPoint = { x: event.clientX, y: event.clientY };
  if (!isCursorOnPage || isCursorOverWindow) {
    brushPoints.forEach((point) => {
      point.x = cursorPoint.x;
      point.y = cursorPoint.y;
    });
  }
  isCursorOnPage = true;
});

document.addEventListener("pointerleave", () => {
  isCursorOnPage = false;
});

document.querySelectorAll(".home-button").forEach((button) => {
  button.addEventListener("click", () => {
    const targetTab = document.getElementById(button.dataset.target);
    if (targetTab) targetTab.click();
  });
});