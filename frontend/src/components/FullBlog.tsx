import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar, Circle } from "./BlogCard";
import GenericPopover from "./GenericPopover";

// Cache interface
interface SummaryCache {
  [key: string]: {
    summary: string;
    timestamp: number;
  };
}

export const FullBlog = ({ blog }: { blog: Blog }) => {
  const [summary, setSummary] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [summaryCache, setSummaryCache] = useState<SummaryCache>({});
  const [lastAttempt, setLastAttempt] = useState<number>(0);

  // Initialize Gemini
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  // Load cache from localStorage on mount
  useEffect(() => {
    const savedCache = localStorage.getItem("summaryCache");
    if (savedCache) {
      setSummaryCache(JSON.parse(savedCache));
    }
  }, []);

  // Save cache to localStorage on update
  useEffect(() => {
    localStorage.setItem("summaryCache", JSON.stringify(summaryCache));
  }, [summaryCache]);

  const summarizeContent = async (content: string) => {
    const cacheKey = content.slice(0, 100) + content.length;
  
    if (summaryCache[cacheKey] && Date.now() - summaryCache[cacheKey].timestamp < 86400000) {
      setSummary(summaryCache[cacheKey].summary);
      return;
    }
  
    if (Date.now() - lastAttempt < 15000) {
      setSummary("Please wait 15 seconds before requesting another summary.");
      return;
    }
  
    setIsLoading(true);
    setLastAttempt(Date.now());
  
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Updated model name
      const prompt = `Provide a concise summary of the following blog post in 5-7 bullet points. Do not include any introductory phrases like "Here is your summary" or use formatting such as **. Simply list the bullet points:\n\n${content.slice(0, 30000)}`;
      
  
      const result = await model.generateContent(prompt);
      const text = result.response.text();
  
      setSummary(text);
      setSummaryCache((prev) => ({
        ...prev,
        [cacheKey]: {
          summary: text,
          timestamp: Date.now(),
        },
      }));
    } catch (error) {
      console.error("Summarization error:", error);
      setSummary("Failed to generate summary. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Appbar />
      <div className="flex justify-center px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 w-full max-w-screen-xl py-12 md:gap-2">
          {/* Blog Content */}
          <div className="md:col-span-8">
            <h1 className="text-5xl font-extrabold tracking-wide leading-tight">
              {blog.title}
            </h1>
            <div className="text-slate-500 py-6 flex items-center gap-x-2">
              Published on <Circle /> {new Date().toLocaleDateString()}
            </div>

            {/* Markdown Rendering */}
            <div className="prose prose-lg max-w-none leading-relaxed space-y-4">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkBreaks]}
                rehypePlugins={[rehypeRaw, rehypeSanitize]}
              >
                {blog.content}
              </ReactMarkdown>
            </div>
          </div>

          {/* Author Section */}
          <div className="md:col-span-4 md:pl-6 mt-6 md:mt-0">
            <div className="border-neutral-700 p-5 rounded-lg  mb-4">
              <h1 className="text-gray-400 text-lg font-semibold mb-4 ">Author</h1>
              <div className="items-center flex">
                <Avatar size="big" name={blog.author.name || "Anonymous"} />
                <div className="ml-4">
                  <div className="text-xl font-bold">
                    {blog.author.name || "Anonymous"}
                  </div>
                  <p className="pt-2 text-gray-400">
                    Passionate writer sharing insights with the world.
                  </p>
                </div>

              </div>
            </div>

            {/* AI Summary Button */}
            <GenericPopover
              buttonText="Summarize for me"
              popoverTitle="AI Summary"
              popoverContent="Click to summarize this blog content!"
              onClick={() => summarizeContent(blog.content)}
              disabled={isLoading || Date.now() - lastAttempt < 15000}
              isLoading={isLoading}
            />


            {/* Summarize Button and Summary Section */}
            <div className="mt-6">
              {isLoading ? (
                <div className="my-6 bg-neutral-800 p-6 rounded-lg shadow-lg text-center text-gray-200">Please hold on</div>
              ) : summary ? (
                <div className="my-6 bg-neutral-800 p-6 rounded-lg shadow-lg">
                  <h2 className="text-gray-100 text-lg font-semibold mb-4">Summary</h2>
                  <div className="text-gray-200 prose-sm prose-invert">
                    {summary
                      .replace(/-/g, "•") // Convert dashes to bullets
                      .split("\n")
                      .map((line, index) => (
                        <p key={index} className="mb-3 last:mb-0">
                          {line}
                        </p>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="text-[#171717] text-center">
                  {summary === "Rate limit exceeded. Please try again later."
                    ? "Rate limit exceeded. Please try again later."
                    : "Click the button above to generate a summary."}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};