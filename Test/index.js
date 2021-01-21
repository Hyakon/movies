const container = document.querySelector(".container");

const addBox = () => {
  container.innerHTML += `<div class="box"></div>`;
  let tmp = document.querySelectorAll(".box");
  // let newBox = tmp[tmp.length - 1];
  // console.log(newBox);
  // newBox.addEventListener("click", addBox);

  const boxes = document.querySelectorAll(".box");
  boxes.forEach(function (box) {
    box.addEventListener("click", addBox);
  });
};
const boxes = document.querySelectorAll(".box");
boxes.forEach(function (box) {
  box.addEventListener("click", addBox);
});
