import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar, Circle } from "./BlogCard";

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
    const cacheKey = content.slice(0, 100) + content.length; // Unique key for caching

    // Check cache (valid for 24 hours)
    if (summaryCache[cacheKey] && Date.now() - summaryCache[cacheKey].timestamp < 86400000) {
      setSummary(summaryCache[cacheKey].summary);
      return;
    }

    // Rate limit check (15 seconds between requests)
    if (Date.now() - lastAttempt < 15000) {
      setSummary("Please wait 15 seconds before requesting another summary.");
      return;
    }

    setIsLoading(true);
    setLastAttempt(Date.now());

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = `Summarize this blog post in 5-7 bullet points:\n\n${content.slice(0, 30000)}`;

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
        <div className="grid grid-cols-1 md:grid-cols-12 w-full max-w-screen-xl pt-12 gap-6">
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

            {/* Summarize Button and Summary Section */}
            <div className="mt-8">
              <button
                onClick={() => summarizeContent(blog.content)}
                disabled={isLoading || Date.now() - lastAttempt < 15000}
                aria-busy={isLoading}
                aria-live="polite"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isLoading ? "Summarizing..." : "Summarize Blog"}
              </button>

              {isLoading ? (
                <div className="mt-6 text-slate-600">Summarizing... Please wait.</div>
              ) : summary ? (
                <div className="mt-6">
                  <h2 className="text-slate-600 text-lg font-semibold mb-4">Summary</h2>
                  <ReactMarkdown className="text-slate-700 leading-relaxed">
                    {summary.replace(/-/g, "•")}
                  </ReactMarkdown>
                </div>
              ) : (
                <div className="mt-6 text-red-600">
                  {summary === "Rate limit exceeded. Please try again later."
                    ? "Rate limit exceeded. Please try again later."
                    : "Click 'Summarize Blog' to generate a summary."}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};