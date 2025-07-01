import { useState, useEffect } from "react";
import RenderCard from "../components/RenderCard";
import LoadingAnimation from "../components/LoadingAnimation";

/*  Simulo al azar los libros más vendidos y 
    los guardo en el localStorage para que no cambien con tanta frecuencia */
function Bestsellers({ books, loading, error, limit }) {
  const [bestSellers, setBestSellers] = useState(() => {
    const savedBestSellers = localStorage.getItem("bestSellers");
    return savedBestSellers ? JSON.parse(savedBestSellers) : [];
  });

  function getRandomElements(array, n) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, n);
  }

  useEffect(() => {
    if (books.length > 0 && bestSellers.length === 0) {
      const randomBooks = getRandomElements(books, limit);
      setBestSellers(randomBooks);
      localStorage.setItem("bestSellers", JSON.stringify(randomBooks));
    }
  }, [books, bestSellers.length, limit]);

  return (
    <section className="container mt-4">
      {loading && bestSellers.length === 0 && <LoadingAnimation />}
      {error && !loading && <p>{error}</p>}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {bestSellers.map((book) => (
          <div className="col d-flex align-items-stretch" key={book.id}>
            <RenderCard book={book} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Bestsellers;
