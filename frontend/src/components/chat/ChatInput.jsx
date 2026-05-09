import { useState } from "react";

import {
  IoSend,
} from "react-icons/io5";

import {
  FiPlus,
} from "react-icons/fi";

function ChatInput({ onSend }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    onSend(input);

    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      handleSend();
    }
  };

  return (
    <div className="px-4 pb-6 pt-2">

      <div className="max-w-4xl mx-auto">

        <div
          className="
            bg-[#2f2f2f]
            border
            border-[#3a3a3a]
            rounded-[28px]
            shadow-lg
            flex
            items-end
            gap-3
            px-3
            py-2.5
          "
        >

          <button
            className="
              w-9
              h-9
              rounded-full
              flex
              items-center
              justify-center
              hover:bg-[#3a3a3a]
              transition
              text-gray-300
            "
          >
            <FiPlus size={18} />
          </button>

          <textarea
            rows="1"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);

              e.target.style.height = "auto";

              e.target.style.height =
                e.target.scrollHeight + "px";
            }}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything"
            className="
              flex-1
              bg-transparent
              outline-none
              resize-none
              overflow-y-auto
              text-[15px]
              text-white
              placeholder:text-gray-400
              py-2
              max-h-50
            "
          />

          <button
            onClick={handleSend}
            className="
              w-9
              h-9
              rounded-full
              bg-white
              text-black
              flex
              items-center
              justify-center
              hover:scale-105
              transition
            "
          >
            <IoSend size={17} />
          </button>

        </div>

        <p
          className="
            text-center
            text-[12px]
            text-gray-500
            mt-3
          "
        >
          ChatGPT can make mistakes. Check important info.
        </p>

      </div>

    </div>
  );
}

export default ChatInput;