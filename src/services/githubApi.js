import API from "./API";

export default {
  getData(data, token) {
    return API().get(data, token);
  },
};
