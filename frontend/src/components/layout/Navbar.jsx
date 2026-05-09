import {
  HiOutlineBars3,
} from "react-icons/hi2";

function Navbar({
  sidebarOpen,
  setSidebarOpen,
}) {
  return (
    <header
      className="
        h-14
        px-4
        flex
        items-center
        justify-between
        border-b
        border-[#2a2a2a]
        bg-[#212121]/95
        backdrop-blur-md
        sticky
        top-0
        z-30
      "
    >
      <div className="flex items-center gap-3">

        {!sidebarOpen && (
          <button
            onClick={() =>
              setSidebarOpen(true)
            }
            className="
              text-gray-400
              hover:text-white
              transition
            "
          >
            <HiOutlineBars3 size={20} />
          </button>
        )}

        <h1
          className="
            text-[15px]
            font-medium
            text-gray-100
          "
        >
          ChatGPT
        </h1>

      </div>

      <button
        className="
          text-sm
          px-3
          py-1.5
          rounded-lg
          bg-[#2b2b2b]
          hover:bg-[#343434]
          transition
        "
      >
        Upgrade
      </button>

    </header>
  );
}

export default Navbar;