import { ThusFetch } from "../src";

const api = new ThusFetch();

async function run() {
  try {
    const data = await api.request({
      url: "https://jsonplaceholder.typicode.com/posts/1",
      timeout: 3000,
      retry: 2,
    });

    console.log("RESULT:", data);
  } catch (err) {
    console.error("ERROR:", err);
  }
}

run();