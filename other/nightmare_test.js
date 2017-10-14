const Nightmare = require('nightmare');
const nightmare = Nightmare({ 
	show: false,
});

var url_0 = 'https://www.google.com/maps/@40.6884692,-74.0452625,170a,35y,39.75h,';
var url_2 = 't/data=!3m1!1e3?force=tt';
var tilt = 24;
var url = 'https://www.google.com/maps/@40.6884692,-74.0452625,170a,35y,39.75h,24.68t/data=!3m1!1e3?force=tt';

nightmare
  .viewport(1680,1050)
  .goto(url)
  .wait(4000)
  .screenshot('test.png')
  .run(function(err, nightmare) {
    if (err) {
      console.log(err);
    } else {
	    console.log('Done.');
    } 
  })
  .end();

