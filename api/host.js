var axios = require("axios").default;

module.exports = async (requesting_data, responding_data) => {

    const { name, base } = requesting_data.body;
    let returning = "hi";

    console.log("body", requesting_data.body)
    console.log("name", name)
    console.log("base", base)

    let uuid = "";

    await axios.get("https://dinopass.com/password/simple").then(function (res) {
    uuid = res.data;
    });

var options = {
  method: 'POST',
  url: 'https://api.vercel.com/v12/now/deployments',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + process.env.token
  },
  data: {
    name: uuid,
    files: [
      {
        file: name,
        data: base,
        encoding: 'base64'
      }
    ],
    projectSettings: {framework: null}
  }
};

    axios.request(options).then(function(response) {
      console.log(response.data);
      responding_data.setHeader('Access-Control-Allow-Origin', '*');
      responding_data.status(201).send(response.data.url);
    }).catch(function (error) {
      console.error(error);
      responding_data.status(500).send(error);
    });

};