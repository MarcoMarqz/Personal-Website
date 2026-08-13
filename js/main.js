"use strict";

const tabs = [...document.querySelectorAll('[role="tab"]')];
const panels = [...document.querySelectorAll('[role="tabpanel"]')];
const windowBox = document.querySelector("#window");
const appIcon = document.querySelector("#app-icon");
const closeBtn = document.querySelector("#close-btn");
let lastSelectedTabId = "home";

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
document.addEventListener("pointermove", (event) => moveDots(event.clientX, event.clientY));
