const http = require("https");

module.exports = async (requesting_data, responding_data) => {

    const { name, base } = req.body;

    const options = {
      "method": "POST",
      "hostname": "api.vercel.com",
      "port": null,
      "path": "/v12/now/deployments",
      "headers": {
        "Content-Type": "application/json",
        "Content-Length": "211",
        "Authorization": "Bearer nTTzOm6rofsvMr8w5TzoCEYn"
      }
    };

    const req = http.request(options, function (res) {
      const chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        const body = Buffer.concat(chunks);
        console.log(body.toString());
        responding_data.status(200).end(body.toString());
      });
    });

    req.write(JSON.stringify({
      name: "functionslolol",
      files: [{file: name, data: base, encoding: 'base64'}],
      projectSettings: {framework: null}
    }));
    req.end();

};