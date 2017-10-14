var Nightmare = require('nightmare');

new Nightmare({timeout: 60000, show: true})
  .viewport(1920, 10000)
  .goto('http://mtv.de/charts/5-hitlist-germany-top-100')
  .wait(10000)
  .screenshot('before.png')
  .click('div#content div.chart-container a.button.show-all')
  .wait(20000)
  .screenshot('after.png')
  .run();
