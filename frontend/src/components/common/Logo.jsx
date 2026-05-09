function Logo({ size = 40 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
      }}
      className="rounded-full bg-white flex items-center justify-center"
    >
      <div className="relative w-[65%] h-[65%]">

        <div className="absolute inset-0 border-[3px] border-black rounded-full rotate-0" />

        <div className="absolute inset-0 border-[3px] border-black rounded-full rotate:60deg" />

        <div className="absolute inset-0 border-[3px] border-black rounded-full rotate:120deg" />

      </div>
    </div>
  );
}

export default Logo;