import React, { useEffect, useState } from 'react';
import { data } from '../services/FetchNews';
import { Card, CardSkeleton } from '../components/exportComponents';
import { FaArrowUp, FaArrowCircleRight } from "react-icons/fa";
import { TbLoader3 } from "react-icons/tb";

function Home() {

  const [news, setNews] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currPage, setCurrPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {

      currPage === 1 ? setLoading(true) : setLoadingMore(true);

      const res = await data(currPage);

      setNews((prevNews) => [
        ...prevNews,
        ...res.articles
      ]);

      setLoading(false);
      setLoadingMore(false);
    };

    fetchData();
  }, [currPage]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loadData = () => {
    setCurrPage((prev) => prev + 1);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">

        {loading ? (
          <div className="flex justify-center items-center w-full lg:w-[85%]">
            <div className="w-full lg:w-[85%] space-y-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full lg:w-[85%] space-y-6">
            {news?.map((ne) => (
              <Card key={ne.url} props={ne} />
            ))}
          </div>
        )}

        <div className="w-full lg:w-[15%] bg-gray-100 p-4 rounded-xl h-fit sticky top-16">
          <h2 className="font-semibold mb-3 text-lg">Trending</h2>
          <p className="text-sm text-gray-600">Coming soon...</p>
        </div>

      </div>

      {scrolled && (
        <div className="fixed bottom-6 right-6">
          <button
            className="bg-blue-600 p-4 rounded-full text-white shadow-lg cursor-pointer"
            onClick={scrollToTop}
          >
            <FaArrowUp />
          </button>
        </div>
      )}

      <div className="w-full flex justify-center items-center mt-6">
        <button
          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 underline"
          onClick={loadData}
          disabled={loadingMore}
        >
          {loadingMore ? "Loading..." : "Load more..."}
          <FaArrowCircleRight className="text-lg" />
        </button>
      </div>
    </>
  );
}

export default Home;