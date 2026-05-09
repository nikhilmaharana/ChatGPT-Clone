import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  FiEdit,
  FiSidebar,
  FiSearch,
  FiLogOut,
  FiTrash2,
} from "react-icons/fi";

import {
  HiOutlineSparkles,
} from "react-icons/hi2";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "../../context/AuthContext";

import {
  useState,
} from "react";

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  chatList,
  openChat,
  currentChatId,
  handleNewChat,
  handleDeleteChat,
}) {

  const { user, logout } =
    useAuth();

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] =
    useState("");

  const [
    showProfileMenu,
    setShowProfileMenu,
  ] = useState(false);

  const [
    showGPTModal,
    setShowGPTModal,
  ] = useState(false);

  const filteredChats =
    chatList?.filter((chat) =>
      chat.title
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
    );

  const handleLogout = () => {

    logout();

    navigate("/login");
  };

  return (
    <AnimatePresence>

      {sidebarOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() =>
              setSidebarOpen(false)
            }
            className="
              fixed
              inset-0
              bg-black/40
              backdrop-blur-sm
              z-40
              md:hidden
            "
          />

          {/* GPT Modal */}
          {showGPTModal && (
            <div
              className="
                fixed
                inset-0
                z-100
                bg-black/60
                flex
                items-center
                justify-center
              "
            >

              <div
                className="
                  bg-[#202020]
                  border
                  border-[#3a3a3a]
                  rounded-3xl
                  w-full
                  max-w-lg
                  p-6
                "
              >

                <h2 className="text-2xl font-semibold mb-5">
                  Explore GPTs
                </h2>

                <div className="space-y-3">

                  {[
                    "Code Assistant",
                    "AI Teacher",
                    "Travel Planner",
                    "Fitness Coach",
                  ].map((gpt, index) => (
                    <div
                      key={index}
                      className="
                        bg-[#2a2a2a]
                        hover:bg-[#323232]
                        transition
                        rounded-2xl
                        p-4
                        cursor-pointer
                      "
                    >
                      {gpt}
                    </div>
                  ))}

                </div>

                <button
                  onClick={() =>
                    setShowGPTModal(false)
                  }
                  className="
                    mt-6
                    w-full
                    bg-white
                    text-black
                    py-3
                    rounded-xl
                    font-medium
                  "
                >
                  Close
                </button>

              </div>

            </div>
          )}

          {/* Sidebar */}
          <motion.aside
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ duration: 0.2 }}
            className="
              fixed
              md:relative
              z-50
              w-65
              lg:w-62.5
              h-screen
              bg-[#181818]
              border-r
              border-[#2a2a2a]
              flex
              flex-col
            "
          >

            {/* Top */}
            <div className="p-2">

              <div className="flex items-center justify-between mb-2">

                <button
                  onClick={handleNewChat}
                  className="
                    flex-1
                    flex
                    items-center
                    gap-3
                    px-3
                    py-2
                    rounded-xl
                    hover:bg-[#2a2a2a]
                    transition
                  "
                >

                  <FiEdit size={18} />

                  <span className="text-sm font-medium">
                    New chat
                  </span>

                </button>

                <button
                  onClick={() =>
                    setSidebarOpen(false)
                  }
                  className="
                    p-2
                    rounded-lg
                    hover:bg-[#2a2a2a]
                    transition
                  "
                >
                  <FiSidebar size={18} />
                </button>

              </div>

              {/* Search */}
              <div
                className="
                  flex
                  items-center
                  gap-2
                  px-3
                  py-2
                  rounded-xl
                  bg-[#222222]
                  border
                  border-[#333]
                  mb-2
                "
              >

                <FiSearch size={16} />

                <input
                  type="text"
                  placeholder="Search chats"
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(
                      e.target.value
                    )
                  }
                  className="
                    bg-transparent
                    outline-none
                    text-sm
                    flex-1
                  "
                />

              </div>

              {/* GPTs */}
              <button
                onClick={() =>
                  setShowGPTModal(true)
                }
                className="
                  w-full
                  flex
                  items-center
                  gap-3
                  px-3
                  py-2
                  rounded-xl
                  hover:bg-[#2a2a2a]
                  transition
                  text-gray-300
                  text-sm
                "
              >

                <HiOutlineSparkles size={18} />

                <span>Explore GPTs</span>

              </button>

            </div>

            {/* Chats */}
            <div className="flex-1 overflow-y-auto px-2">

              {filteredChats?.length > 0 ? (

                filteredChats.map((chat) => (

                  <div
                    key={chat._id}
                    className="
                      group
                      flex
                      items-center
                      gap-1
                      mb-1
                    "
                  >

                    <button
                      onClick={() =>
                        openChat(chat._id)
                      }
                      className={`
                        flex-1
                        text-left
                        px-3
                        py-2
                        rounded-xl
                        text-sm
                        transition
                        truncate

                        ${
                          currentChatId ===
                          chat._id
                            ? "bg-[#2f2f2f] text-white"
                            : "text-gray-300 hover:bg-[#2a2a2a]"
                        }
                      `}
                    >
                      {chat.title}
                    </button>

                    <button
                      onClick={() =>
                        handleDeleteChat(
                          chat._id
                        )
                      }
                      className="
                        opacity-0
                        group-hover:opacity-100
                        transition
                        p-2
                        rounded-lg
                        hover:bg-[#2a2a2a]
                      "
                    >

                      <FiTrash2 size={14} />

                    </button>

                  </div>

                ))

              ) : (

                <p
                  className="
                    text-sm
                    text-gray-500
                    px-3
                    py-2
                  "
                >
                  No chats found
                </p>

              )}

            </div>

            {/* Bottom */}
            <div className="border-t border-[#2a2a2a] p-2 relative">

              {user ? (
                <>
                  <button
                    onClick={() =>
                      setShowProfileMenu(
                        !showProfileMenu
                      )
                    }
                    className="
                      w-full
                      flex
                      items-center
                      gap-3
                      p-2
                      rounded-xl
                      hover:bg-[#2a2a2a]
                      transition
                    "
                  >

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
                      "
                    >
                      {user.username[0].toUpperCase()}
                    </div>

                    <div className="overflow-hidden">

                      <p className="text-sm font-medium truncate">
                        {user.username}
                      </p>

                      <p className="text-xs text-gray-400 truncate">
                        {user.email}
                      </p>

                    </div>

                  </button>

                  {showProfileMenu && (
                    <div
                      className="
                        absolute
                        bottom-20
                        left-2
                        right-2
                        bg-[#252525]
                        border
                        border-[#3a3a3a]
                        rounded-2xl
                        p-2
                      "
                    >

                      <button
                        onClick={handleLogout}
                        className="
                          w-full
                          flex
                          items-center
                          gap-3
                          px-3
                          py-2
                          rounded-xl
                          hover:bg-[#333]
                          transition
                          text-sm
                        "
                      >

                        <FiLogOut size={16} />

                        Logout

                      </button>

                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-2">

                  <Link to="/login">

                    <button
                      className="
                        w-full
                        bg-[#2b2b2b]
                        hover:bg-[#343434]
                        transition
                        py-2
                        rounded-xl
                        text-sm
                      "
                    >
                      Login
                    </button>

                  </Link>

                  <Link to="/signup">

                    <button
                      className="
                        w-full
                        bg-white
                        text-black
                        hover:opacity-90
                        transition
                        py-2
                        rounded-xl
                        text-sm
                        font-medium
                      "
                    >
                      Sign Up
                    </button>

                  </Link>

                </div>
              )}

            </div>

          </motion.aside>
        </>
      )}

    </AnimatePresence>
  );
}

export default Sidebar;