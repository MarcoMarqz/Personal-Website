"use strict";

// document.querySelector(".card").addEventListener('click',
//   (event) => {
//     console.log(event.target.closest(".card"));

// });

// JS
const zodiac = [
  {
    animal: "Rat",
    years: [1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020],
    traits: "Quick-witted, resourceful, versatile, kind",
  },
  {
    animal: "Ox",
    years: [1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021],
    traits: "Diligent, dependable, strong, determined",
  },
  {
    animal: "Tiger",
    years: [1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022],
    traits: "Brave, confident, competitive",
  },
  {
    animal: "Rabbit",
    years: [1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023],
    traits: "Quiet, elegant, kind, responsible",
  },
  {
    animal: "Dragon",
    years: [1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024],
    traits: "Confident, intelligent, enthusiastic",
  },
  {
    animal: "Snake",
    years: [1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025],
    traits: "Confident, intelligent, enthusiastic",
  },
  {
    animal: "Horse",
    years: [1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026],
    traits: "Animated, active, energetic",
  },
  {
    animal: "Sheep",
    years: [1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027],
    traits: "Calm, gentle, sympathetic",
  },
  {
    animal: "Monkey",
    years: [1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028],
    traits: "Sharp, smart, curiosity",
  },
  {
    animal: "Rooster",
    years: [1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029],
    traits: "Observant, hardworking, courageous",
  },
  {
    animal: "Dog",
    years: [1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030],
    traits: "Lovely, honest, prudent",
  },
  {
    animal: "Pig",
    years: [1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031],
    traits: "Compassionate, generous, diligent",
  },
];

let animalSection = document.querySelector(".animals");

// How might we loop through the animal section, creating an image with some
// data for every animal ?

for (let i = 0; i < zodiac.length; i++) {
  let name = zodiac[i].animal.toLowerCase();
  let animal = zodiac[i].animal;
  let imgString = `<img data-animal ="${animal}"  data-name ="${name}" src = "images/${name}.png" alt ="${name}" />`;

  animalSection.insertAdjacentHTML("beforeend", imgString);
}

function updateDetailsBlock(animalName) {
  //searches for the animals name inside the zodiac
  // array, and uses that to update the detials

  let animalData = zodiac.find((animal) => (animal.animal === animalName));

  console.log(animalData);


  let newDetails = `
  <h3>${animalData.animal} </h3>
  <p><strong></strong></p>
  <p><strong></strong></p>
  `
  // let animalTextData = ``;
  // for(const key in animalData){
  //   animalTextData += `${animalData[key]}\n`;
  // }

  // return animalTextData;

  document.querySelector("#details").innerHTML = newDetails;
}

// How might we add an event listener to every single image in a document?
let images = document.querySelectorAll("img").forEach((img) => {
  //img.addEvent
  img.addEventListener(
    "click", (event) => {
   ;
  
    document.querySelector("#details").insertAdjacentHTML("beforeend",  updateDetailsBlock(event.target.dataset.animal));



  });
});
