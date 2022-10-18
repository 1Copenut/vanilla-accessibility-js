import { data } from "./json-data.js";
import { buildCardsFromJSON } from "./cards.js";

document.addEventListener("DOMContentLoaded", () => {
  buildCardsFromJSON(data, "all-cards");
});
