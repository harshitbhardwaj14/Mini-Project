import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";
import { useLocation } from "react-router-dom";
import FooterLinks from "../components/FooterLinks";
import Footer from "../components/Footer";


export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  const location = useLocation();

  // Extract search query from URL
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  // Filter blogs based on title
  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery)
  );

  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 mx-auto max-w-7xl">
          {[...Array(6)].map((_, index) => (
            <BlogSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Appbar />
      <main className="flex-grow">
        <h1 className="text-4xl font-bold p-6 pb-2 mx-auto max-w-7xl">Trending Now</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 mx-auto max-w-7xl">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                authorName={blog.author.name || "Anonymous"}
                title={blog.title}
                content={blog.content}
                publishedDate={blog.publishedDate}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400 mt-28 text-4xl font-bold">No blogs found.</div>
          )}
        </div></main>
      <Footer />
    </div>
  );
};
