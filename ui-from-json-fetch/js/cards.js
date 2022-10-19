let fragment = document.createDocumentFragment();

function iterator(obj, headerId) {
  let tmpId = "";

  Object.keys(obj).forEach((key, i) => {
    if (key === "id") {
      tmpId = obj[key];

      // In this case I know the ID is unique per user, so
      // I'll use it to create the wrapper DIV for each card.
      const cardContainer = document.createElement("div");
      cardContainer.classList.add("cd-card__container");
      cardContainer.setAttribute("aria-labelledby", headerId);
      cardContainer.setAttribute("role", "region");

      fragment.appendChild(cardContainer);

      // Return early because I'll use the ID in the next stanza
      return;
    }

    if (key === "name" && i !== 0) {
      const heading = document.createElement("h2");
      const span = document.createElement("span");
      const strong = document.createElement("strong");
      const headingText = document.createTextNode(obj[key]);
      const userIdLabel = document.createTextNode("User ID: ");
      const userId = document.createTextNode(tmpId);

      heading.classList.add("cd-card__header");
      heading.setAttribute("id", headerId);
      heading.appendChild(headingText);

      strong.appendChild(userIdLabel);
      span.appendChild(strong);
      span.appendChild(userId);

      fragment.lastElementChild.appendChild(heading);
      fragment.lastElementChild.appendChild(span);
    }

    if (typeof obj[key] !== "object") {
      const span = document.createElement("span");
      const strong = document.createElement("strong");
      const label = document.createTextNode(`${key}: `);
      const value = document.createTextNode(obj[key]);

      strong.appendChild(label);
      span.appendChild(strong);
      span.appendChild(value);

      fragment.lastElementChild.appendChild(span);
    }

    if (typeof obj[key] === "object" && obj[key] !== null) {
      const span = document.createElement("span");
      const label = document.createTextNode(`${key}`);

      span.classList.add("cd-card__sub-section");
      span.classList.add(`cd-card__sub-section--${key}`);
      span.appendChild(label);

      fragment.lastElementChild.appendChild(span);

      iterator(obj[key]);
    }
  });
}

function buildCardsFromJSON(arr, targetId) {
  arr.forEach((item, i) => {
    let headerId = `header-id-${i + 1}`;
    iterator(item, headerId);
  });

  // Append the completed document fragment to the container
  const targetElementById = document.getElementById(targetId);
  targetElementById.appendChild(fragment);
}

export { buildCardsFromJSON };
