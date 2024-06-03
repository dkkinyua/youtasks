// eslint-disable-next-line
const Modal = ({ open, close, children }) => {
  return (
    <div className="">
      {/* backdrop */}
      <div
        onClick={close}
        className={`fixed inset-0 z-20 flex items-center justify-center transition-colors ${open ? "visible bg-black/80" : "invisible"} `}
      >
        {/* modal */}
        <div
          className={`rounded-xl bg-black/80 p-6 shadow transition-all ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"} `}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <button
            onClick={close}
            className="absolute right-2 top-2 h-7 w-7 rounded-lg border border-red-700 bg-white text-center hover:bg-red-700 hover:text-white"
          >
            X
          </button>{" "}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
