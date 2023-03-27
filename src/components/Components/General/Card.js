function Card(props) {
  const { title } = props;

  return (
    <div
      className="
      w-full
      bg-white
      border
      border-gray-200
      rounded-lg
      shadow
      mb-5"
    >
      <div className="flex flex-row justify-between px-4 pt-4">
        <p className="text-gray-500 text-sm">{title}</p>
      </div>

      <div {...props} className="px-4 pb-4 text-primary">
        {props.children}
      </div>
    </div>
  );
}

export default Card;
