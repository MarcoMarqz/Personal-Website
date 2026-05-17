"use strict";


function showPanel(event){
  let currentTab = event.target;
  console.log(currentTab);

  document.querySelectorAll("button").forEach (
    (btn) =>{
      btn.setAttribute("aria-selected", "false")
    }
  );
}


document.querySelectorAll("button").forEach( (btn) => {
  btn.addEventListener('click', showPanel);
});