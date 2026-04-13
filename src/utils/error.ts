export class ThusError extends Error {
  status: number | null;
  url: string | null;

  constructor(message: string, status: number | null, url: string | null) {
    super(message);
    this.name = "ThusError";
    this.status = status;
    this.url = url;
  }
}