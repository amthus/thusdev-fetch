export const logger = {
  info: (msg: string) => console.log(`[ThusFetch] ${msg}`),
  success: (msg: string) => console.log(`[ThusFetch OK] ${msg}`),
  error: (msg: string) => console.log(`[ThusFetch ERROR] ${msg}`),
};