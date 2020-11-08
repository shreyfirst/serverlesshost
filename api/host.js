const http = require("https");

module.exports = async (requesting_data, responding_data) => {

    const { name, base } = requesting_data.body;
    let returning = "hi";

    console.log("body", requesting_data.body)
    console.log("name", name)
    console.log("base", base)

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

    const req = await http.request(options, function (res) {
      const chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
        console.log("chunk", chunk)

      });

      res.on("end", function () {
        const body = Buffer.concat(chunks);
                console.log("body2", body)

        console.log(body.toString());
        returning = "hi" + body.toString()
      });
    });

    await req.write(JSON.stringify({
      name: "functionslolol",
      files: [{file: name, data: base, encoding: 'base64'}],
      projectSettings: {framework: null}
    }));
        console.log("write")

    await req.end();
        console.log("end")

    await responding_data.status(201).end(returning);

};