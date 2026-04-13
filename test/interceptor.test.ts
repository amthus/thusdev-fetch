import { ThusFetch } from "../src";

const api = new ThusFetch();

api.interceptors.useRequest((config) => {
  console.log("Intercept Request");
  return config;
});

api.interceptors.useResponse((res) => {
  console.log("Intercept Response");
  return res;
});

async function run() {
  const data = await api.request({
    url: "https://jsonplaceholder.typicode.com/posts/1"
  });

  console.log(data);
}

run();