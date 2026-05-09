import {
  FiCode,
  FiPenTool,
  FiCpu,
  FiBookOpen,
} from "react-icons/fi";

function EmptyState({ onSuggestionClick }) {
  const suggestions = [
    {
      icon: <FiCode size={18} />,
      title: "Write code",
      text: "Create a React authentication page",
    },

    {
      icon: <FiCpu size={18} />,
      title: "AI project",
      text: "Suggest AI/ML project ideas",
    },

    {
      icon: <FiBookOpen size={18} />,
      title: "Learn",
      text: "Explain FastAPI step by step",
    },

    {
      icon: <FiPenTool size={18} />,
      title: "Create content",
      text: "Write a professional LinkedIn post",
    },
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center px-4 pt-16">

      <h1
        className="
          text-3xl
          md:text-4xl
          font-medium
          text-gray-100
          mb-10
          text-center
        "
      >
        What can I help with?
      </h1>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-4
          w-full
          max-w-3xl
        "
      >

        {suggestions.map(
          (suggestion, index) => (
            <button
              key={index}
              onClick={() =>
                onSuggestionClick(
                  suggestion.text
                )
              }
              className="
                bg-[#2a2a2a]
                border
                border-[#3a3a3a]
                rounded-2xl
                p-5
                text-left
                hover:bg-[#323232]
                transition
              "
            >

              <div className="text-gray-300 mb-4">
                {suggestion.icon}
              </div>

              <h3
                className="
                  font-medium
                  text-[15px]
                  mb-1
                "
              >
                {suggestion.title}
              </h3>

              <p
                className="
                  text-sm
                  text-gray-400
                  leading-6
                "
              >
                {suggestion.text}
              </p>

            </button>
          )
        )}

      </div>

    </div>
  );
}

export default EmptyState;