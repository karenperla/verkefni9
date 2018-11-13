// const API_URL = '/example.json?domain=';
const API_URL = 'https://apis.is/isnic?domain=';
const domains = document.querySelector(`.domains`);

/**
 * Leit að lénum á Íslandi gegnum apis.is
 */
const program = (() => {
  const results = domains.querySelector(`.results`);

  function init(_form) {
    _form.addEventListener(`submit`, formHandler);
  }

  return {
    init,
  };

  function emptyResults() {
    while (results.firstChild) {
      results.removeChild(results.firstChild);
    }
  }

  function displayErrorMessage(message) {
    emptyResults();
    const span = document.createElement(`span`);
    span.appendChild(document.createTextNode(message));
    results.appendChild(span);
  }

  

})();

document.addEventListener('DOMContentLoaded', () => {
  program.init(domains);
});
