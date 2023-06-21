"use strict";

//main buttons
const buttonArticle = document.querySelector(".btn--art");
const buttonForm = document.querySelector(".btn--form");
const buttonVideo = document.querySelector(".btn--video");

//content divs
const articleContent = document.querySelector("#articleDiv");
const formContent = document.querySelector("#formDiv");
const videoContent = document.querySelector("#videoDiv");

//display paragraphs
const inputDisplay = document.getElementById("inputDisplay");
const fNameDisplay = document.getElementById("fnameDisplay");
const lNameDisplay = document.getElementById("lnameDisplay");
const voivodeshipDisplay = document.getElementById("voivodeshipDisplay");
const interestsDisplay = document.getElementById("interestsDisplay");
const agreementDisplay = document.getElementById("agreementDisplay");

const editBtn = document.getElementById("editBtn");

//forms
const myForm = document.getElementById("myForm");

//player
const videoPlayer = document.getElementById("videoPlayer");
const playerForm = document.getElementById("playerForm");
const playPauseBtn = document.getElementById("playPauseBtn");
const skipForBtn = document.getElementById("skipForwBtn");

let isVideoPlaying = false;

const voivodeshipsArr = [
  "",
  "Dolnośląskie",
  "Kujawsko-pomorskie",
  "Lubelskie",
  "Lubuskie",
  "Łódzkie",
  "Małopolskie",
  "Mazowieckie",
  "Opolskie",
  "Podkarpackie",
  "Podlaskie",
  "Pomorskie",
  "Śląskie",
  "Świętokrzyskie",
  "warmińsko-mazurskie",
  "Wielkopolskie",
  "Zachodniopomorskie",
];

buttonArticle.addEventListener("click", function () {
  articleContent.classList.remove("hidden");
  if (!formContent.classList.contains("hidden")) {
    formContent.classList.add("hidden");
  }
  if (!videoContent.classList.contains("hidden")) {
    videoContent.classList.add("hidden");
  }
});

buttonForm.addEventListener("click", function () {
  formContent.classList.remove("hidden");
  if (!articleContent.classList.contains("hidden")) {
    articleContent.classList.add("hidden");
  }
  if (!videoContent.classList.contains("hidden")) {
    videoContent.classList.add("hidden");
  }
  if (
    localStorage.getItem("fname") &&
    localStorage.getItem("lname") &&
    localStorage.getItem("interests") &&
    localStorage.getItem("agreement") &&
    localStorage.getItem("voivodeship")
  ) {
    displayInputs(
      localStorage.getItem("fname"),
      localStorage.getItem("lname"),
      localStorage.getItem("interests"),
      localStorage.getItem("agreement"),
      localStorage.getItem("voivodeship")
    );
  }
  let options = "";
  voivodeshipsArr.map((op, i) => {
    options += `<option value="${op}" id="${i}" style="border-radius: 5px;"">${op}</option>`;
  });
  document.getElementById("voivodeshipsDropdown").innerHTML = options;
});

buttonVideo.addEventListener("click", function () {
  uploadVideo(
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  );

  videoContent.classList.remove("hidden");
  if (!articleContent.classList.contains("hidden")) {
    articleContent.classList.add("hidden");
  }
  if (!formContent.classList.contains("hidden")) {
    formContent.classList.add("hidden");
  }
});

function submitForm() {
  let firstName = document.getElementById("fname");
  let lastName = document.getElementById("lname");
  let interests = document.getElementById("interests");
  let agreement = document.getElementById("agreement").checked;
  let voivodeship = document.getElementById("voivodeshipsDropdown");

  if (
    firstName.value === "" ||
    lastName.value === "" ||
    interests.value === "" ||
    voivodeship.value === ""
  ) {
    //throw error
    alert("Ensure you input a value in all fields!");
  } else {
    displayInputs(
      firstName.value,
      lastName.value,
      interests.value,
      agreement,
      voivodeship.value
    );
  }
}

function saveDataToLocalStorage(
  fname,
  lname,
  interests,
  agreement,
  voivodeship
) {
  localStorage.setItem("fname", fname);
  localStorage.setItem("lname", lname);
  localStorage.setItem("interests", interests);
  localStorage.setItem("agreement", agreement);
  localStorage.setItem("voivodeship", voivodeship);
}

function displayInputs(fname, lname, interests, agreement, voivodeship) {
  saveDataToLocalStorage(fname, lname, interests, agreement, voivodeship);
  myForm.classList.add("hidden");
  inputDisplay.classList.remove("hidden");
  console.log(fname);
  console.log(lname);
  console.log(interests);
  console.log(agreement);
  console.log(voivodeship);
  fNameDisplay.textContent = `First Name: ${fname}`;
  lNameDisplay.textContent = `Last name: ${lname}`;
  voivodeshipDisplay.textContent = `Voivodeship: ${voivodeship}`;
  interestsDisplay.textContent = `Interests: ${interests}`;
  agreementDisplay.textContent = `I do ${
    agreement ? "" : "not"
  } agree on processing of my data `;
}

myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  submitForm();
});

playerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  uploadVideo(document.getElementById("sourceInput").value);
});

editBtn.addEventListener("click", () => {
  myForm.classList.remove("hidden");
  inputDisplay.classList.add("hidden");
});

function uploadVideo(url) {
  document.getElementById("sourcePlayer").src = url;
  videoPlayer.load();
  playPauseBtn.textContent = "⏸️ Pause";
  isVideoPlaying = true;
  videoPlayer.play();
}

playPauseBtn.addEventListener("click", () => {
  if (isVideoPlaying) {
    videoPlayer.pause();
    playPauseBtn.textContent = "▶ Play";
    isVideoPlaying = false;
  } else {
    videoPlayer.play();
    playPauseBtn.textContent = "⏸️ Pause";
    isVideoPlaying = true;
  }
});

skipForBtn.addEventListener("click", () => {
  videoPlayer.currentTime = videoPlayer.currentTime + 15;
});
