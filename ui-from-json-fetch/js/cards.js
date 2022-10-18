let html = "";

function iterator(obj, headerId) {
  let tmpId = "";

  Object.keys(obj).forEach((key, i) => {
    if (key === "id") {
      tmpId = obj[key];
      return;
    }

    if (key === "name" && i !== 0) {
      html += `<h2 class="cd-card__header" id=${headerId}>${obj[key]}</h2>`;
      html += `<span><strong>user ID:</strong> ${tmpId}</span>`;
    }

    if (typeof obj[key] !== "object") {
      html += `<span><strong>${key}:</strong> ${obj[key]}</span>`;
    }

    if (typeof obj[key] === "object" && obj[key] !== null) {
      html += `<span class="cd-card__sub-section cd-card__sub-section--${key}"><strong>${key}</strong></span>`;
      iterator(obj[key]);
    }
  });
}

function buildCardsFromJSON(arr, container) {
  arr.forEach((item, i) => {
    let headerId = `header-id-${i + 1}`;

    html += `<div class="cd-card__container" aria-labelledby=${headerId} role="group">`;
    iterator(item, headerId);
    html += `</div>`;
  });

  /**
   * Be aware this is a potential vector for cross-site scripting (XSS).
   * ALWAYS know your data source and if it seems hinky, DO NOT
   * add data in such a cavalier fashion.
   *
   * For instance:
   * target.innerHTML += "<img src='x' onerror='alert(1)'>";
   * WILL fire an alert, which means a bad actor could run
   * also bad JavaScript in your page if the data being
   * returned is compromised.
   *
   * Also see:
   * https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML#security_considerations
   */
  const target = document.getElementById(container);
  target.innerHTML += html;
}

export { buildCardsFromJSON };
