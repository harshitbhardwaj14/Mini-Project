import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import "./FullBlogcss.css" // Add this
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar, Circle } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 w-full max-w-screen-xl pt-12 gap-6">

          {/* Blog Content */}
          <div className="md:col-span-8">
            <h1 className="text-5xl font-extrabold tracking-wide leading-tight">
              {blog.title}
            </h1>
            <div className="text-slate-500 py-6 flex items-center gap-x-2">
              Published on <Circle /> {new Date().toLocaleDateString()}
            </div>

            {/* Markdown Rendering with Proper Spacing */}
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkBreaks]} // Add remarkBreaks here
                rehypePlugins={[rehypeRaw, rehypeSanitize]}
              >
                {blog.content}
              </ReactMarkdown>
            </div>
          </div>

          {/* Author Section */}
          <div className="md:col-span-4 pl-6">
            <h2 className="text-slate-600 text-lg font-semibold mb-4">Author</h2>
            <div className="flex items-center">
              <Avatar size="big" name={blog.author.name || "Anonymous"} />
              <div className="ml-4">
                <div className="text-xl font-bold">
                  {blog.author.name || "Anonymous"}
                </div>
                <p className="pt-2 text-slate-500">
                  Passionate writer sharing insights with the world.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};