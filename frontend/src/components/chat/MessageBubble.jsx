import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";

import {
  Prism as SyntaxHighlighter,
} from "react-syntax-highlighter";

import {
  oneDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";

function MessageBubble({
  role,
  content,
}) {

  const isUser =
    role === "user";

  return (
    <div
      className={`
        w-full
        flex
        ${
          isUser
            ? "justify-end"
            : "justify-start"
        }
      `}
    >

      <div
        className={`
          max-w-3xl
          px-5
          py-4
          rounded-3xl
          text-sm
          leading-7
          overflow-hidden

          ${
            isUser
              ? "bg-[#2f2f2f] text-white"
              : "bg-[#1f1f1f] text-gray-100"
          }
        `}
      >

        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{

            code({
              inline,
              className,
              children,
              ...props
            }) {

              const match =
                /language-(\w+)/.exec(
                  className || ""
                );

              return !inline &&
                match ? (
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{
                    borderRadius:
                      "16px",
                    padding:
                      "16px",
                    fontSize:
                      "14px",
                  }}
                  {...props}
                >
                  {String(
                    children
                  ).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code
                  className="
                    bg-[#333]
                    px-1.5
                    py-0.5
                    rounded
                  "
                  {...props}
                >
                  {children}
                </code>
              );
            },

          }}
        >
          {content}
        </ReactMarkdown>

      </div>

    </div>
  );
}

export default MessageBubble;