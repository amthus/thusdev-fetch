# thusdev-fetch

A lightweight developer experience engine for API requests.

It enhances HTTP calls with built-in timeout handling, retry system, interceptors, plugins, debug mode, and performance tracking.

---

# Features

* Simple HTTP client based on fetch
* Timeout handling
* Automatic retry system
* Request and response interceptors
* Plugin system
* Debug mode
* Performance tracking (request duration)
* Human-friendly error messages

---

# Installation

```bash
npm install thusdev-fetch
```

---

# Usage

```ts
import { ThusFetch, setDebug } from "thusdev-fetch";

setDebug(true);

const api = new ThusFetch();

const data = await api.request({
  url: "https://jsonplaceholder.typicode.com/posts/1",
  retry: 2,
  timeout: 3000
});

console.log(data);
```

---

# Interceptors

## Request interceptor

```ts
api.interceptors.useRequest((config) => {
  return config;
});
```

## Response interceptor

```ts
api.interceptors.useResponse((response) => {
  return response;
});
```

---

# Plugins

```ts
api.plugins.use({
  afterResponse: (response) => {
    return response;
  }
});
```


# Concept

This library is not just an HTTP client.

It is a developer experience layer for API calls.

It focuses on simplicity, control, and extensibility.

---

# License

MIT
