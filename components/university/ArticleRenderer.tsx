"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ArticleRendererProps {
  content:       string;
  upgradePanel?: React.ReactNode; // injected after the 3rd H2 when provided
}

const VIDEO_MARKER = /\[VIDEO:([^\]]+)\]/;

/**
 * Split content at the third "## " heading line so we can inject
 * a content upgrade panel mid-article.
 */
function splitAtThirdH2(content: string): [string, string] {
  const lines = content.split("\n");
  let h2Count = 0;

  for (let i = 0; i < lines.length; i++) {
    if (/^##\s/.test(lines[i])) {
      h2Count++;
      if (h2Count === 3) {
        const before = lines.slice(0, i).join("\n");
        const after  = lines.slice(i).join("\n");
        return [before, after];
      }
    }
  }

  // Fewer than 3 H2s — insert at 50% of lines
  const midpoint = Math.floor(lines.length / 2);
  return [lines.slice(0, midpoint).join("\n"), lines.slice(midpoint).join("\n")];
}

/** Split content on [VIDEO:ID] markers and render each part */
export function ArticleRenderer({ content, upgradePanel }: ArticleRendererProps) {
  if (upgradePanel) {
    const [before, after] = splitAtThirdH2(content);
    return (
      <div className="university-prose">
        <MarkdownSection content={before} />
        {upgradePanel}
        {after && <MarkdownSection content={after} />}
      </div>
    );
  }

  return (
    <div className="university-prose">
      <MarkdownSection content={content} />
    </div>
  );
}

function MarkdownSection({ content }: { content: string }) {
  const parts = splitOnVideos(content);
  return (
    <>
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
    </>
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
