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
        file: 'index.png',
        data: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==',
        encoding: 'base64'
      }
    ],
    projectSettings: {framework: null}
  }
};

    axios.request(options).then(function(response) {
      console.log(response.data);
      responding_data.status(200).end(response.data);
    }).catch(function (error) {
      console.error(error);
      responding_data.status(500).end(error);
    });

};