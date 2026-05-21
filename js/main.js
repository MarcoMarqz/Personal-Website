"use strict";

/* keep track of last selected tab */
let lastSelectedTabId = "home";

/* TAB FUNCTIONALITY */
function showPanel(event) {

  let currentTab = event.target;

  /* save selected tab */
  lastSelectedTabId = currentTab.id;

  /* reset all tabs */
  document.querySelectorAll("[role='tab']").forEach((btn) => {
    btn.setAttribute("aria-selected", "false");
  });

  /* activate clicked tab */
  currentTab.setAttribute("aria-selected", "true");

  /* hide all panels */
  document.querySelectorAll("[role='tabpanel']").forEach((panel) => {
    panel.hidden = true;
  });

  /* show correct panel */
  document.querySelectorAll("[role='tabpanel']").forEach((panel) => {
    if (panel.getAttribute("aria-labelledby") === currentTab.id) {
      panel.hidden = false;
    }
  });
}

/* attach tab listeners */
document.querySelectorAll("[role='tab']").forEach((btn) => {
  btn.addEventListener("click", showPanel);
});


/* DESKTOP FUNCTIONALITY */
const appIcon = document.querySelector("#app-icon");
const windowBox = document.querySelector("#window");
const closeBtn = document.querySelector("#close-btn");

appIcon.addEventListener("click", () => {
  windowBox.hidden = false;

  /* restore last selected tab when reopening */
  const tabs = document.querySelectorAll("[role='tab']");
  const panels = document.querySelectorAll("[role='tabpanel']");

  tabs.forEach((tab) => {
    tab.setAttribute("aria-selected", "false");
    if (tab.id === lastSelectedTabId) {
      tab.setAttribute("aria-selected", "true");
    }
  });

  panels.forEach((panel) => {
    panel.hidden = true;

    if (panel.getAttribute("aria-labelledby") === lastSelectedTabId) {
      panel.hidden = false;
    }
  });
});

closeBtn.addEventListener("click", () => {
  windowBox.hidden = true;
});