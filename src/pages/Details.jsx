import RenderDetails from "../components/RenderDetails";
import LoadingAnimation from "../components/LoadingAnimation";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BookContext } from "../context/BookContext";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getBook } = useContext(BookContext);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const localBook = getBook(id);
        if (!localBook) {
          setError("El libro no existe en la colección local");
          return;
        }
        try {
          const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes/${id}`
          );
          if (response.ok) {
            const data = await response.json();
            const combinedBook = {
              ...data,
              volumeInfo: {
                ...data.volumeInfo,
                ...localBook.volumeInfo,
                imageLinks: {
                  ...data.volumeInfo?.imageLinks,
                  ...localBook.volumeInfo?.imageLinks,
                },
              },
              saleInfo: {
                ...data.saleInfo,
                ...localBook.saleInfo,
                listPrice: {
                  ...data.saleInfo?.listPrice,
                  ...localBook.saleInfo?.listPrice,
                },
              },
            };
            setBookDetails(combinedBook);
          } else {
            console.log(
              "No se pudo obtener información adicional de la API, usando solo datos locales."
            );
            setBookDetails(localBook);
          }
        } catch (apiError) {
          console.error("Error al obtener detalles adicionales:", apiError);
          setBookDetails(localBook);
        }
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
  }, [id, getBook]);

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
