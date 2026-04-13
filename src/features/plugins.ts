import { RequestConfig } from "../core/client";

export type Plugin = {
  beforeRequest?: (config: RequestConfig) => RequestConfig;
  afterResponse?: (response: any) => any;
};

export class PluginManager {
  plugins: Plugin[] = [];

  use(plugin: Plugin) {
    this.plugins.push(plugin);
  }

  runBefore(config: RequestConfig) {
    return this.plugins.reduce(
      (acc, p) => (p.beforeRequest ? p.beforeRequest(acc) : acc),
      config
    );
  }

  runAfter(response: any) {
    return this.plugins.reduce(
      (acc, p) => (p.afterResponse ? p.afterResponse(acc) : acc),
      response
    );
  }
}