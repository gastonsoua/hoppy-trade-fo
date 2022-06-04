import Jsona from 'jsona';

const url = process.env.apiUrl;
const jsona = new Jsona();

function get(params, axios) {
  return axios.get(`/user`)
    .then(response => {
      return {
        list: response.data,
      };
    });
}

function update(profile, axios) {
  const payload = jsona.serialize({
    stuff: profile,
    includeNames: []
  });

  return axios.patch(`${url}/me`, payload)
    .then(response => {
      return jsona.deserialize(response.data);
    });
}

export default {
  get,
  update
};
