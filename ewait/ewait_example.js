var Nightmare = require('./nightmare');
var vo = require('vo');


vo(run)(function (err, result) {
    if (err) throw err;
});

function *run() {
    var nightmare = Nightmare({
        show: true,
        paths: {
            userData: '/dev/null'
        }
    });

    var title = yield nightmare
        .goto("https://github.com/")
        .evaluate(()=> {
            document.querySelector(`.header-actions .btn[href="/login"]`).click();
        })
        .ewait("dom-ready")
        .evaluate(() => {
            document.querySelector("#login_field").value = "{SOME_GITHUB_LOGIN}";
            document.querySelector("#password").value = "{SOME_GITHUB_PASS}";
            document.querySelector(".auth-form-body .btn.btn-primary.btn-block").click();
        })
        .ewait("dom-ready")
        .screenshot("github.png")
        .evaluate(()=> {
            return document.title;
        });
    yield nightmare.end();

    console.log(title);
}