import { useState } from "react";
import ReactMarkdown from "react-markdown";
import "./../../css/filter.css";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/xml/xml";
import "codemirror/mode/markdown/markdown";
import { Controlled as CodeMirror } from "react-codemirror2";

export function Post({ data, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const markdownText = data.markdown || ""; // Fallback to empty string
  const truncatedProb =
    markdownText.length > 150
      ? markdownText.substring(0, 150) + "..."
      : markdownText;

  const formattedDate = data.uploadDate
    ? new Date(data.uploadDate).toLocaleDateString()
    : "Unknown Date";

  const tagsList = Array.isArray(data.tags)
    ? data.tags.map((tag) => tag.label).join(", ")
    : "No Tags";

  return (
    <div className="PostData">
      <h3>Title : {data.title}</h3>

      {data.imageURL && <img src={data.imageURL} alt="Related" />}

      <div>
        <ReactMarkdown>
          {isExpanded ? data.markdown : truncatedProb}
        </ReactMarkdown>
      </div>

      {data.markdown.length > 150 && (
        <button className="readMore" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}

      {data.code &&
      <CodeMirror
        value={data.code}
        options={{
          mode: data.language,
          theme: "material",
          lineNumbers: true,
          lineWrapping: true,
        }}
        readOnly
      />
    }

      <button onClick={onDelete}> Delete</button>

      <div className="Tags">
        <h5>Tags : {tagsList}</h5>
        <h5>{formattedDate}</h5>
      </div>
    </div>
  );
}
