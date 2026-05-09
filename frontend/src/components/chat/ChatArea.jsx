import {
  useEffect,
  useRef,
  useState,
} from "react";

import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";

import {
  FiArrowDown,
} from "react-icons/fi";

function ChatArea({
  messages,
  loading,
  onSuggestionClick,
}) {

  const bottomRef = useRef();

  const containerRef = useRef();

  const [showScrollButton,
    setShowScrollButton] =
    useState(false);

  /* AUTO SCROLL */

  useEffect(() => {

    scrollToBottom();

  }, [messages]);

  const scrollToBottom = () => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  /* SCROLL DETECTION */

  const handleScroll = () => {

    const container =
      containerRef.current;

    if (!container) return;

    const isNearBottom =
      container.scrollHeight -
        container.scrollTop -
        container.clientHeight <
      250;

    setShowScrollButton(
      !isNearBottom
    );
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="
        flex-1
        overflow-y-auto
        px-4
        pb-44
        scroll-smooth
      "
    >

      {/* EMPTY STATE */}

      {messages.length === 0 && (

        <div
          className="
            h-full
            flex
            flex-col
            items-center
            justify-center
            text-center
          "
        >

          <h1
            className="
              text-4xl
              font-semibold
              mb-3
              tracking-tight
            "
          >
            What can I help with?
          </h1>

          <p className="text-gray-400">
            Ask anything and start chatting
          </p>

          {/* Suggestions */}

          <div
            className="
              mt-10
              grid
              grid-cols-1
              md:grid-cols-2
              gap-3
              w-full
              max-w-4xl
            "
          >

            {[
              "Create a React roadmap 🚀",
              "Best AI project ideas 🤖",
              "How to learn backend development 💻",
              "Prepare me for interviews 🎯",
            ].map((item, index) => (

              <button
                key={index}
                onClick={() =>
                  onSuggestionClick(item)
                }
                className="
                  bg-[#2a2a2a]
                  hover:bg-[#343434]
                  transition
                  rounded-2xl
                  p-4
                  text-left
                  text-sm
                "
              >
                {item}
              </button>

            ))}

          </div>

        </div>
      )}

      {/* CHAT */}

      <div
        className="
          max-w-6xl
          mx-auto
          pt-8
        "
      >

        {messages.map(
          (
            message,
            index
          ) => (

            <div
              key={index}
              className={`
                mb-10
                flex

                ${
                  message.role ===
                  "user"
                    ? "justify-end"
                    : "justify-start"
                }
              `}
            >

              <div
                className={`
                  flex
                  gap-4
                  items-start
                  max-w-[92%]
                `}
              >

                {/* AI Avatar */}

                {message.role ===
                  "assistant" && (

                  <div
                    className="
                      w-8
                      h-8
                      rounded-full
                      bg-[#2d2d2d]
                      flex
                      items-center
                      justify-center
                      text-sm
                      shrink-0
                      mt-1
                    "
                  >
                    🤖
                  </div>

                )}

                {/* Message */}

                <div
                  className={`
                    rounded-3xl
                    px-5
                    py-4
                    overflow-hidden

                    ${
                      message.role ===
                      "user"
                        ? "bg-[#303030]"
                        : "bg-transparent"
                    }
                  `}
                >

                  <div
                    className="
                      prose
                      prose-invert
                      max-w-none

                      prose-p:leading-8
                      prose-p:mb-5

                      prose-headings:mb-5
                      prose-headings:mt-8

                      prose-strong:text-white

                      prose-code:text-green-400

                      prose-pre:bg-[#181818]
                      prose-pre:border
                      prose-pre:border-[#333]

                      prose-li:mb-2

                      prose-ul:mb-5
                      prose-ol:mb-5

                      prose-blockquote:border-gray-600
                    "
                  >

                    <ReactMarkdown
                      remarkPlugins={[
                        remarkGfm,
                      ]}
                    >
                      {message.content}
                    </ReactMarkdown>

                  </div>

                </div>

                {/* USER AVATAR */}

                {message.role ===
                  "user" && (

                  <div
                    className="
                      w-8
                      h-8
                      rounded-full
                      bg-linear-to-br
                      from-purple-500
                      to-cyan-500
                      flex
                      items-center
                      justify-center
                      text-sm
                      font-semibold
                      shrink-0
                      mt-1
                    "
                  >
                    U
                  </div>

                )}

              </div>

            </div>
          )
        )}

        {/* LOADING */}

        {loading && (

          <div
            className="
              flex
              items-center
              gap-2
              mb-10
              ml-12
            "
          >

            <div
              className="
                w-2
                h-2
                rounded-full
                bg-gray-400
                animate-bounce
              "
            />

            <div
              className="
                w-2
                h-2
                rounded-full
                bg-gray-400
                animate-bounce
                delay-100
              "
            />

            <div
              className="
                w-2
                h-2
                rounded-full
                bg-gray-400
                animate-bounce
                delay-200
              "
            />

          </div>

        )}

        <div ref={bottomRef} />

      </div>

      {/* SCROLL BUTTON */}

      {showScrollButton && (

        <button
          onClick={scrollToBottom}
          className="
            fixed
            bottom-32
            right-8
            z-50

            w-11
            h-11

            rounded-full

            bg-[#2f2f2f]
            hover:bg-[#3a3a3a]

            border
            border-[#444]

            flex
            items-center
            justify-center

            shadow-lg

            transition
          "
        >

          <FiArrowDown size={18} />

        </button>

      )}

    </div>
  );
}

export default ChatArea;