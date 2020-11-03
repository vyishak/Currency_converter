const proxy = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    proxy("/*", {
      target: "https://api.frankfurter.app/latest?amount=10&from=GBP&to=USD ",
    })
  );
};
