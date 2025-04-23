import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: number;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  const formattedDate = publishedDate
    ? new Date(publishedDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
    : "Jan 1, 2025";

  return (
    <Link to={`/blog/${id}`}>
      <div className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-2 group border border-neutral-600">
        {/* Blog Content */}
        <div className="p-6">
          {/* Author Section with Hover Effect */}
          <div className="relative flex items-center space-x-2 mb-4 group-hover:justify-center transition-all duration-300">
            {/* Default Author Name and Date */}
            <div className="text-sm font-medium text-gray-300 transition-all duration-300 group-hover:opacity-0 gap-x-2 flex items-center">
              <Avatar name={authorName} />
              {authorName}
            </div>

            {/* "By Author" Text (Appears on Hover) */}
            <div className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 text-gray-200 font-medium text-xl items-center flex space-x-4">
              By {authorName}
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-200 group-hover:text-blue-500 transition-colors duration-300">
            {title}
          </h2>

          {/* Content Preview */}
          <p className="mt-2 text-gray-400">{content.slice(0, 100) + "..."}</p>

          {/* Read Time */}
          <div className="my-4 text-sm text-gray-300">
            {`${Math.ceil(content.length / 400)} minute(s) read`}
          </div>

          {/* Published Date */}
          <div className="text-sm text-gray-300 flex items-center gap-x-2">
            Published on <Circle /> {formattedDate}
          </div>
        </div>
      </div>
    </Link>
  );
};

export function Circle() {
  return <div className="w-1 h-1 rounded-full bg-gray-500"></div>;
}

const getRandomColorClass = (): string => {
  const colors: string[] = ["bg-red-500"];
  const randomIndex: number = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size?: "small" | "big";
}) {
  const randomColorClass = getRandomColorClass();
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 overflow-hidden ${randomColorClass} rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"
        }`}
    >
      <span className={`${size === "small" ? "text-sm" : "text-md"} font-medium text-white`}>
        {name[0]}
      </span>
    </div>
  );
}
