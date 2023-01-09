const offsetClientRectData = (parentId) => {
  const parent = document.getElementById(parentId);
  const target = parent.querySelector(".box");
  const stats = parent.querySelector(".stats");

  const paraHeight = document.createElement("p");
  const paraWidth = document.createElement("p");

  paraHeight.textContent = `width: ${target.offsetHeight}`;
  paraWidth.textContent = `width: ${target.offsetWidth}`;

  stats.appendChild(paraWidth);
  stats.appendChild(paraHeight);
};

export default offsetClientRectData;
