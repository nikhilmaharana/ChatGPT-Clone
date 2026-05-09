function TypingIndicator() {
  return (
    <div className="flex justify-start">

      <div className="bg-[#262626] px-5 py-4 rounded-3xl flex items-center gap-2">

        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>

        <span
          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: "0.15s" }}
        ></span>

        <span
          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: "0.3s" }}
        ></span>

      </div>

    </div>
  );
}

export default TypingIndicator;