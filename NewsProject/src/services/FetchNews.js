const apiKey = import.meta.env.VITE_NEWS_API_KEY;

export async function data(currPage) {
  const d = new Date();
  d.setDate(d.getDate()-1)
  const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

  const res = await fetch(
    `https://newsapi.org/v2/everything?q=tesla&from=${date}&sortBy=publishedAt&language=en&pageSize=10&page=${currPage}&apiKey=${apiKey}`,
  );

  const newRes = await res.json();
  return newRes;
}
