import { Appbar } from "../components/Appbar";
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import "../App.css";
import Footer from "../components/Footer";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });

  if (loading || !blog) {
    return (
      <div className="flex flex-col min-h-screen">
        <Appbar />
        <div className="flex-1 flex justify-center items-center">
          <Spinner />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <FullBlog blog={blog} />
      </main>
      <Footer />
    </div>
  );
};
