export const jsonFetcher = async <T,>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return (await response.json()) as T;
};
