const container = document.querySelector(".container");
const boxes = document.querySelectorAll(".box");

const addBox = () => {
  container.innerHTML += `<div class="box"></div>`;
  let tmp = document.querySelectorAll(".box");
  let newBox = tmp[tmp.length - 1];
  console.log(newBox);
  newBox.addEventListener("click", changeColor);
};

const changeColor = function () {
  console.log(this);
};

let observer = new IntersectionObserver(
  function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0.5) {
        entry.target.classList.remove("not-visible");
      }
    });
  },
  { threshold: 1 }
);

boxes.forEach(function (box) {
  box.addEventListener("click", changeColor);
  box.classList.add("not-visible");
  observer.observe(box);
});
