import RenderCard from "../components/RenderCard";
import LoadingAnimation from "../components/LoadingAnimation";
import { useContext } from "react";
import { BookContext } from "../context/BookContext";

function Offers({ limit }) {
  const { books, loading, error } = useContext(BookContext);
  return (
    <section className="container mt-4">
      {loading && <LoadingAnimation />}
      {error && !loading && <p>{error}</p>}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {[...books]
          .sort(
            (a, b) =>
              a.saleInfo?.listPrice?.amount - b.saleInfo?.listPrice?.amount
          )
          .slice(0, limit)
          .map((book) => (
            <div className="col d-flex align-items-stretch " key={book.id}>
              <RenderCard book={book} />
            </div>
          ))}
      </div>
    </section>
  );
}

export default Offers;
