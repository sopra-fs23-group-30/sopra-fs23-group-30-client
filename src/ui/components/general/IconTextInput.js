import { TextInput } from "flowbite-react";

function IconTextInput(props) {
  return (
    <div className="w-full">
      <TextInput {...props} color={props.colorscheme} />
    </div>
  );
}

export default IconTextInput;
