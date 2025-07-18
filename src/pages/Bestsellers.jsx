import { useContext, useMemo } from "react";
import RenderCard from "../components/RenderCard";
import LoadingAnimation from "../components/LoadingAnimation";
import { BookContext } from "../context/BookContext";

/* Simulación de best sellers con una selección "aleatoria" determinista que cambia según la colección de libros o el número de semana del año */
function Bestsellers({ limit }) {
  const { books, loading, error } = useContext(BookContext);

  const milisecondsInWeek = 7 * 24 * 60 * 60 * 1000;

  const getWeeklySeed = () => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const weekNumber = Math.ceil((now - startOfYear) / milisecondsInWeek);
    return weekNumber;
  };

  // Función de selección determinista basada en semilla
  const getSeededSelection = (array, count, seed) => {
    if (!array || array.length === 0) return [];
    const hashString = (str) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char + seed;
        hash = hash & hash;
      }
      return Math.abs(hash);
    };
    const rankedBooks = array.map((book) => ({
      ...book,
      rank: hashString(book.id),
    }));
    const sortedBooks = rankedBooks.sort((a, b) => a.rank - b.rank);
    return sortedBooks.slice(0, count).map((book) => {
      const { rank: UNUSED_RANK, ...cleanBook } = book;
      return cleanBook;
    });
  };

  const currentWeek = getWeeklySeed();
  const bestSellers = useMemo(() => {
    return getSeededSelection(books, limit, currentWeek);
  }, [books, limit, currentWeek]);

  return (
    <section className="container mt-4">
      {loading && <LoadingAnimation />}
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
