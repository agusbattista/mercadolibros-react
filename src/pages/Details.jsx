import RenderDetails from "../components/RenderDetails";
import LoadingAnimation from "../components/LoadingAnimation";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${id}`
        );
        if (!response.ok) {
          throw new Error("No se pudo encontrar el libro");
        }
        const data = await response.json();
        setBookDetails(data);
      } catch (error) {
        console.error("Error al cargar el libro:", error);
        setError("Error al cargar los detalles del libro");
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchBookDetails();
    }
  }, [id]);

  if (loading) return <LoadingAnimation />;
  if (error)
    return (
      <div className="container mt-4 text-center">
        <p>{error}</p>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>
    );

  return (
    <section className="container mt-4">
      <div className="row">
        <div className="col-md-12">
          <RenderDetails book={bookDetails} />
        </div>
      </div>
    </section>
  );
}

export default Details;
