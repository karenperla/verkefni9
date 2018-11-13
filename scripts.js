// const API_URL = '/example.json?domain=';
const API_URL = 'https://apis.is/isnic?domain=';
const domains = document.querySelector('.domains');
/**
 * Leit að lénum á Íslandi gegnum apis.is
 */
const program = (() => {
  const results = domains.querySelector('.results');

  function init(_form) {
    _form.addEventListener('submit', formHandler);
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
    const span = document.createElement('span');
    span.appendChild(document.createTextNode(message));
    results.appendChild(span);
  }
 
   function addToList(listparent, title, data) {
    if (data !== '') {
      const datatitle = document.createElement('dt');
      datatitle.appendChild(document.createTextNode(title));
      const datatext = document.createElement('dd');
      datatext.appendChild(document.createTextNode(data));
      listparent.appendChild(datatitle);
      listparent.appendChild(datatext);
    }
  }
  
  function loading() {
    emptyResults();
    const div = document.createElement('div');
    div.classList.add('loading');
    const img = document.createElement('img');
    img.setAttribute('src', 'loading.gif');
    div.appendChild(img);

    const text = document.createElement('span');
    text.appendChild(document.createTextNode('Leita af Léni'));
    div.appendChild(text);
    results.appendChild(div);
  }

  function displayResults(domainInfo) {
    emptyResults();
    if (domainInfo.length === 0) {
      displayErrorMessage('Lén er ekki skráð');
      return;
    }
    const [{ domain, registered, lastChange, expires, registrantname, email, address, country }] = domainInfo; /* eslint-disable-line */
    const dl = document.createElement('dl');
    results.appendChild(dl);
    addToList(dl, 'Lén', domain);
    addToList(dl, 'Skráð', new Date(registered).toISOString().split('T')[0]);
    addToList(dl, 'Síðast breytt', new Date(lastChange).toISOString().split('T')[0]);
    addToList(dl, 'Rennur út', new Date(expires).toISOString().split('T')[0]);
    addToList(dl, 'Skráningaraðili', registrantname);
    addToList(dl, 'Netfang', email);
    addToList(dl, 'Heimilisfang', address);
    addToList(dl, 'Land', country);
  }

  function fetcher(dom) {
    loading();
    fetch(`${API_URL}${dom}`)
      .then((result) => {
        if (!result.ok) {
          return displayErrorMessage('Villa í tengingu');
        }
        return result.json();
      })
      .then((data) => {
        displayResults(data.results);
      })
      .catch((error) => {
        displayErrorMessage('Villa við að sækja gögn');
      });
  }

  function formHandler(e) {
    e.preventDefault();
    const domain = document.querySelector('input').value;
    if (domain.trim() === '') {
      displayErrorMessage('Lén verður að vera strengur');
      document.querySelector('input').value = '';
      return;
    }
    fetcher(domain);
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  program.init(domains);
});
