function Container({ children }) {
  return (
    <div className="flex md:w-1/2 justify-center py-10 items-center bg-white w-full">
      {children}
    </div>
  );
}

export default Container;
