import { ThusFetch, setDebug } from "../src";

setDebug(true);

const api = new ThusFetch();

api.plugins.use({
  afterResponse: (res) => {
    return { ...res, injected: true };
  }
});

async function run() {
  const data = await api.request({
    url: "https://jsonplaceholder.typicode.com/posts/1",
    retry: 1,
    timeout: 3000
  });

  console.log(data);
}

run();