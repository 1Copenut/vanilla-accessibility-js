import { fetchData } from "./fetchData.js";
import { buildCardsFromJSON } from "./cards.js";

document.addEventListener("DOMContentLoaded", () => {
  fetchData("https://jsonplaceholder.typicode.com/users").then((data) =>
    buildCardsFromJSON(data, "all-cards")
  );
});
