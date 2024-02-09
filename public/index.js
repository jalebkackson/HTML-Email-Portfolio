// import { getElements, getElementsByTagType, getElementById } from "domutils";
/**
 *  TYPEWRITER
 */
let messageArray = ["Hey", "I'm Caleb,", "An Email Developer"];
var textPosition = 0;
// lower = faster
var speed = 75;

var message0 = document.querySelector("#message0");
var message1 = document.querySelector("#message1");
var message2 = document.querySelector("#message2");

const typewriter = () => {
  message0.innerHTML =
    messageArray[0].substring(0, textPosition) +
    '<span id="mySpan" class="mySpan">||</span>';

  if (textPosition++ != messageArray[0].length) {
    setTimeout(typewriter, speed);
  } else {
    message0.innerHTML = messageArray[0];
    textPosition = 0;
    typewriter2();
  }
};

const typewriter2 = () => {
  message1.innerHTML =
    messageArray[1].substring(0, textPosition) +
    '<span id="mySpan" class="mySpan">||</span>';

  if (textPosition++ != messageArray[1].length) {
    setTimeout(typewriter2, speed);
  } else {
    message1.innerHTML = messageArray[1];
    textPosition = 0;
    typewriter3();
  }
};

const typewriter3 = () => {
  message2.innerHTML =
    messageArray[2].substring(0, textPosition) +
    '<span id="mySpan" class="mySpan">_</span>';

  if (textPosition++ != messageArray[2].length) {
    setTimeout(typewriter3, speed);
  }
};
window.addEventListener("load", typewriter);

//
// Hacker animation on text
// const letters = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
// const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const letters = "abcdefghijklmnopqrstuvwxyz";

let interval = null;

document.querySelectorAll("#hacker").forEach((h1) => {
  h1.onmouseover = (event) => {
    let iteration = 0;

    clearInterval(interval);

    interval = setInterval(() => {
      event.target.innerText = event.target.innerText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return event.target.dataset.value[index];
          }

          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iteration >= event.target.dataset.value.length) {
        console.log();
        clearInterval(interval);
      }

      iteration += 1 / 6;
    }, 15);
  };
});

// Observer Togglers aka start animation on window scroll ABOUT ME Section
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // slide animation on p
        entry.target.classList.add("slide-in-from-right");
      }
    });
  },
  // intersect at center of viewport instead of bottom
  {
    rootMargin: "0px 0px -18% 0px",
  }
);
observer.observe(document.querySelector(".about-me-p"));

// Controls signature and bitmoji animation
const observerTwo = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // svg path animation
        document
          .querySelector(".signaturePath")
          .classList.add("signature-animation-toggle");
        // bitmoji animation
        document.querySelector(".bitmoji").classList.add("wobble");
      }
    });
  },
  // intersect at center of viewport instead of bottom
  {
    rootMargin: "0px 0px -15% 0px",
  }
);
observerTwo.observe(document.querySelector(".sign-svg"));

// EMAIL CONTACT FORM
const contactForm = document.querySelector(".contact-form");

let name = document.getElementById("name");
let email = document.getElementById("email");
let message = document.getElementById("contactMessage");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = {
    name: name.value,
    email: email.value,
    message: message.value,
  };

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.onload = function (e) {
    console.log(xhr.responseText);

    if (xhr.responseText == "success") {
      alert("Message Delivered 👍🏼");
      name.value = "";
      email.value = "";
      message.value = "";
    } else {
      alert("something went wrong");
      console.log(e);
    }
  };

  xhr.send(JSON.stringify(formData));
});
