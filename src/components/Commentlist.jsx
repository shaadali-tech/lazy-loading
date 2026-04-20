import { useEffect, useState } from "react";
import axios from "axios";

const Commentlist = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let isCancelled = false;

    async function fetchPosts() {
      try {
        setLoading(true);

        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=5`,
        );

        if (!isCancelled) {
          setComments(response.data);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    fetchPosts();

    return () => {
      isCancelled = true;
    };
  }, [page]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Pagination 🚀</h1>

      {comments.map((comm) => (
        <div key={comm.id}>
          <h4>{comm.name}</h4>
          <p>{comm.email}</p>
          <p>{comm.body}</p>
        </div>
      ))}

      <button onClick={() => setPage((prev) => prev - 1)} disabled={page === 1}>
        Prev
      </button>

      <span> Page {page} </span>

      <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
    </div>
  );
};

export default Commentlist;
