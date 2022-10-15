import axios from "axios";
const githubUrl = import.meta.env.VITE_VUE_APP_GITHUB_URL;

export default (url = githubUrl) => {
  return axios.create({
    baseURL: url,
  });
};
