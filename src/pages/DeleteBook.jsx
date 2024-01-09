import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";

// Imports from another files
import Spinner from "../Components/Spinner";
import BackButton from "../Components/backButton";

const DeleteBook = () => {
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = async () => {
    try {
      setloading(true);
      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/books/${id}`);
      setloading(false);
      enqueueSnackbar("Book deleted Successfully", { variant: "success" });
      navigate("/");
    } catch (error) {
      setloading(false);
      enqueueSnackbar("Book not deleted", { variant: "error" });
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl ">
          Are you Sure you want to delete this book?
        </h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteBook}
        >
          Delete Book
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
