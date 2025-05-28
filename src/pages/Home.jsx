import RenderCard from "../components/RenderCard";
import LoadingAnimation from "../components/LoadingAnimation";

function Home({ books, loading, error }) {
  return (
    <section className="container mt-4">
      {loading && <LoadingAnimation />}
      {error && !loading && <p>{error}</p>}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {books.map((book) => (
          <div className="col d-flex align-items-stretch " key={book.id}>
            <RenderCard book={book} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Home;
