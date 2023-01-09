import boundingClientRectData from "./modules/boundingClientRectData.js";
import offsetClientRectData from "./modules/offsetClientRectData.js";

document.addEventListener("DOMContentLoaded", () => {
  const box1 = boundingClientRectData("parent-box-1");
  const box2 = boundingClientRectData("parent-box-2");
  const box3 = offsetClientRectData("parent-box-3");
  const box4 = offsetClientRectData("parent-box-4");
});
