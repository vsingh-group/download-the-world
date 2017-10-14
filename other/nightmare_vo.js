var Nightmare = require('nightmare'),
  vo = require('vo'),
  nightmare = Nightmare({
    show: false
  });

var urls = [];
var url_0 = 'https://www.google.com/maps/@40.6881726,-74.0465089,';
var url_1 = 'a,35y,54.19h,';
var url_2 = 't/data=!3m1!1e3?force=tt';
// https://www.google.com/maps/@40.6881726,-74.0465089,15a,35y,54.19h,80t/data=!3m1!1e3?force=tt

var a = 52;
for(var i = 78.78; i > 50; i -= 2) {
  urls.push(url_0 + a.toString() + url_1 + i.toString() + url_2);
  a += 8;
}

var run = function * (urls) {
  var titles = [];
  for (var i = 0; i < urls.length; i++) {
    var title = yield nightmare.goto(urls[i])
      .viewport(1280, 720)
      .wait(8000)
      .screenshot('./vo_pics/' + i.toString() + '.png')
      .title()
      .then(console.log(urls[i]));
    titles.push(title);
  }
  return titles;
}

vo(run(urls))(function(err, titles) {
  console.dir(titles);
});
