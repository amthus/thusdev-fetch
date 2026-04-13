export async function retry<T>(fn: () => Promise<T>, count: number): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (count <= 0) throw err;
    return retry(fn, count - 1);
  }
}