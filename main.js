/*

Algorithm:
  1. Create folders for batches
  2. Create array of random lat/long pairs
  3. Create array of arrays for urls
  4. Execute vo on this array of arrays

*/

// Import packages
var Nightmare = require('nightmare'),
    vo = require('vo'),
    mkdirp = require('mkdirp'),
    chance = new require('chance')();

// Instantiate nightmare
var nightmare = Nightmare({
  show: true
});


// Generator function for vo to run
var run = function* (urls) {
  var titles = [];

  for(var j = 0; j < urls.length; j++) {
    for (var i = 0; i < urls[j].length; i++) {
      var doneLoading = false;
      var title = yield nightmare
        .viewport(1280, 720)
        .goto(urls[j][i])
        .wait(8000)
        .click('#omnibox-singlebox > div.omnibox-singlebox-root.omnibox-active > div.searchbox-hamburger-container > button')
        .wait(3000)
        .click('#settings > div > div.widget-settings-pane > div > ul:nth-child(3) > li:nth-child(2) > div > button:nth-child(2) > label:nth-child(3)')
        .wait(3000)
        .screenshot('./batch_pics/batch_' + j.toString() + '/' +
          i.toString() + '.png')
        .title()
        .then(console.log(urls[j][i]));
      titles.push(title);
    }
  }

  return titles;
};

// While less than <number of batches>
var batchCount = 0;
var urls = [];

var lat_0 = 40.69;
var long_0 = 73.9;
var plus_minus = [ -1, 1 ];

while(batchCount < 5) {

  mkdirp('./batch_pics/batch_' + batchCount.toString(), function(err) {
    if(err) console.error(err);
    else console.log('pow!');
  });

  // Generate random latitude and longitude
  var lat = lat_0 + (plus_minus[chance.integer({min: 0, max: 1})] * chance.floating({min: 0.00001, max: 0.09999}));
  var long = long_0 + (plus_minus[chance.integer({min: 0, max: 1})] * chance.floating({min: 0.00010, max: 0.09999}));
  var heading = chance.floating({min: 0, max: 360});

  // Url pieces
  var url_0 = 'https://www.google.com/maps/@';
  var url_1 = ',-';
  var url_2 = ',';
  var url_3 = 'a,35y,';
  var url_4 = 'h,';
  var url_5 = 't/data=!3m1!1e3?force=tt';

  // Create urls for current batch
  var a = 15;
  urls[batchCount] = [];
  for(var i = 90; i > 60; i -= 3) {
    urls[batchCount].push(url_0 + lat.toString() + url_1 + long.toString() +
      url_2 + a.toString() + url_3 + heading.toString() + url_4 +
      i.toString() + url_5);
    a += 8;
  }

  batchCount++;
}

vo(run(urls))(function(err, titles) {
  if(err) console.error(err);
  else console.dir(titles);
});




