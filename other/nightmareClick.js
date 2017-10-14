const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });

nightmare
  .goto('https://www.google.com/maps/@40.6884692,-74.0452625,170a,35y,39.75h,24.68t/data=!3m1!1e3')
  .wait(8000)
  .click('#omnibox-singlebox > div.omnibox-singlebox-root.omnibox-active > div.searchbox-hamburger-container > button')
  .wait(8000)
  .end()
  .then(console.log);

/*
  .click("#omnibox-singlebox > div.omnibox-singlebox-root.omnibox-active > div.searchbox-hamburger-container > button")
  .wait(3000)
  .end()
  .then(console.log)
  .catch((error) => {
        console.error('Search failed:', error);

  });
  */
