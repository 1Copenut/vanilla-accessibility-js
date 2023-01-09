const offsetClientRectData = (parentId) => {
  const parent = document.getElementById(parentId);
  const target = parent.querySelector(".box");
  const stats = parent.querySelector(".stats");

  const rect = {
    offsetTop: "offsetTop",
    offsetLeft: "offsetLeft",
    offsetWidth: "offsetWidth",
    offsetHeight: "offsetHeight",
    offsetParent: "offsetParent",
  };

  for (const key in rect) {
    if (typeof key !== "function") {
      let para = document.createElement("p");
      para.textContent = `${key}: ${target[rect[key]]}`;
      stats.appendChild(para);
    }
  }
};

export default offsetClientRectData;
