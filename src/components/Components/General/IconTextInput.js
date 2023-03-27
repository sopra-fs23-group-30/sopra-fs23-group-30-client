import { TextInput } from "flowbite-react";

function IconTextInput(props) {
  return (
    <div className="w-full">
      <TextInput
        {...props}
        color="primary"
      />
    </div>
  );
}

export default IconTextInput;
