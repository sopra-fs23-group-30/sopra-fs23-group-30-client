function EditableContentContainer({ children }) {
  return (
    <div className="grid justify-items-stretch mx-4 py-10">
      <div className="justify-self-center w-full md:w-3/5">{children}</div>
    </div>
  );
}

export default EditableContentContainer;
