"use strict";


function showPanel(event){
  let currentTab = event.target;
  console.log(currentTab);

  document.querySelectorAll("button").forEach (
    (btn) =>{
      btn.setAttribute("aria-selected", "false")
    }
  );

  document.querySelectorAll("button").forEach(
    (btn) =>{
      if(btn.id == event.target.id){
        btn.setAttribute("aria-selected" , true);
      }
    }
  );


  document.querySelectorAll('[role = "tabpanel"]').forEach( 
    (tab) =>{
      tab.setAttribute('hidden', 'true');
  });


    document.querySelectorAll('[role = "tabpanel"]').forEach( 
    (panel) =>{
      
      if(panel.getAttribute("aria-labelledby") == currentTab.id){
        panel.removeAttribute('hidden');


      }
  });


}


document.querySelectorAll("button").forEach( (btn) => {
  btn.addEventListener('click', showPanel);
});


const appIcon = document.querySelector("#app-icon");
const windowBox = document.querySelector("#window");

appIcon.addEventListener("click", () => {
    windowBox.hidden = false;
});

