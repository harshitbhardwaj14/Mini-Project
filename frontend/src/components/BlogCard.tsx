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
  return (
    <Link to={`/blog/${id}`}>
      <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-lg cursor-pointer hover:bg-slate-100 hover:transition-all px-8">
        <div className="flex pb-2">
          <Avatar name={authorName} />
          <div className="font-medium tracking-wide pl-2 text-sm flex justify-center flex-col">
            {authorName}
          </div>
          <div className="flex justify-center flex-col pl-2 align-middle">
            <Circle />
          </div>
          <div className="pl-2  text-slate-500 text-sm flex justify-center flex-col">
            {publishedDate}
          </div>
        </div>

        <div className="text-2xl font-semibold py-1 tracking-wide pb-2 hover:underline-offset-3 hover:underline hover:-translate-y-1 transition">
          {title}
        </div>
        <div className="text-md tracking-wide">
          {content.slice(0, 100) + "..."}
        </div>

        <div className="text-slate-500 text-sm pt-4">
          {`${Math.ceil(content.length / 100)} minute(s) read`}
        </div>
      </div>
    </Link>
  );
};

export function Circle() {
  return (
    <div className="h-1 w-1 rounded-full bg-slate-500 justify-center align-middle"></div>
  );
}

const getRandomColorClass = (): string => {
  const colors: string[] = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-orange-500",
    "bg-teal-500",
  ];
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
      className={`relative inline-flex items-center justify-center overflow-hidden ${randomColorClass} rounded-full ${
        size === "small" ? "w-6 h-6" : "w-10 h-10"
      }`}
    >
      <span
        className={`${
          size === "small" ? "text-xs" : "text-md"
        } font-medium dark:text-white`}
      >
        {name[0]}
      </span>
    </div>
  );
}
