"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ArticleRendererProps {
  content: string;
}

const VIDEO_MARKER = /\[VIDEO:([^\]]+)\]/;

/** Split content on [VIDEO:ID] markers and render each part */
export function ArticleRenderer({ content }: ArticleRendererProps) {
  const parts = splitOnVideos(content);

  return (
    <div className="university-prose">
      {parts.map((part, i) =>
        part.type === "text" ? (
          <ReactMarkdown key={i} remarkPlugins={[remarkGfm]}>
            {part.value}
          </ReactMarkdown>
        ) : (
          <div key={i} className="my-8 aspect-video w-full overflow-hidden rounded-sm shadow-lg">
            <iframe
              src={`https://www.youtube.com/embed/${part.value}`}
              title="Tutorial video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        )
      )}
    </div>
  );
}

type Part = { type: "text"; value: string } | { type: "video"; value: string };

function splitOnVideos(content: string): Part[] {
  const parts: Part[] = [];
  let remaining = content;

  while (remaining.length > 0) {
    const match = VIDEO_MARKER.exec(remaining);
    if (!match) {
      parts.push({ type: "text", value: remaining });
      break;
    }
    if (match.index > 0) {
      parts.push({ type: "text", value: remaining.slice(0, match.index) });
    }
    parts.push({ type: "video", value: match[1].trim() });
    remaining = remaining.slice(match.index + match[0].length);
  }

  return parts;
}
