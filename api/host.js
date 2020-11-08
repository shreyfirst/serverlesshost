var axios = require("axios").default;

module.exports = async (requesting_data, responding_data) => {

    const { name, base } = requesting_data.body;
    let returning = "hi";

    console.log("body", requesting_data.body)
    console.log("name", name)
    console.log("base", base)

var options = {
  method: 'POST',
  url: 'https://api.vercel.com/v12/now/deployments',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer nTTzOm6rofsvMr8w5TzoCEYn'
  },
  data: {
    name: 'my-instant-deployment',
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
      responding_data.status(200).send(response.data);
    }).catch(function (error) {
      console.error(error);
      responding_data.status(500).send(error);
    });

};