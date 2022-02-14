class TypeWriter {
  constructor(txtElement, words, wait = 4000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;

    // Get full text of current word;
    const fullTxt = this.words[current];

    // console.log(fullTxt);

    // Check if deleting
    if (this.isDeleting) {
      // remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    //  Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed;
    let typeSpeed = 200;

    if (this.isDeleting) {
      typeSpeed /= 5;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at the end
      typeSpeed = this.wait;
      // set delete to true;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      // Move to the next word;
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Type Method

// Init On the DOM Load
document.addEventListener("DOMContentLoaded", init);

function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");

  //   Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");
const allNavLinkEl = document.querySelectorAll(".nav-link");

// click give nav open.
btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

//  when burger screen clicked, it comes back to normal
allNavLinkEl.forEach((a) =>
  a.addEventListener("click", () => {
    headerEl.classList.remove("nav-open");
  })
);
