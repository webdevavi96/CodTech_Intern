const apiKey = import.meta.env.VITE_NEWS_API_KEY;


export async function data(currPage) {
  const res = await fetch(
    `https://newsapi.org/v2/everything?q=tesla&from=2026-03-01&sortBy=publishedAt&language=en&pageSize=10&page=${currPage}&apikey=${apiKey}`,
  );

  const newRes = await res.json();
  return newRes;
}
