const boundingClientRectData = (parentId) => {
  const parent = document.getElementById(parentId);
  const target = parent.querySelector(".box");
  const stats = parent.querySelector(".stats");
  const rect = target.getBoundingClientRect();

  for (const key in rect) {
    if (typeof rect[key] !== "function") {
      let para = document.createElement("p");
      para.textContent = `${key}: ${rect[key]}`;
      stats.appendChild(para);
    }
  }

  let para2 = document.createElement("p");
  para2.textContent = `offsetParent: ${target.offsetParent}`;
  stats.appendChild(para2);
};

export default boundingClientRectData;
