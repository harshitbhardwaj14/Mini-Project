import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

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
    <div >
      <Appbar />
      <h1 className="text-4xl font-bold p-6 pb-2 mx-auto max-w-7xl">Trending Now</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6  mx-auto max-w-7xl">
        
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            authorName={blog.author.name || "Anonymous"}
            title={blog.title}
            content={blog.content}
            publishedDate={blog.publishedDate}
          />
        ))}
      </div>
    </div>
  );
};