import { Label as FlowbiteLabel } from "flowbite-react";

function Label(props) {
  return (
    <div className="w-full mb-1">
      <FlowbiteLabel {...props} value={props.value} />
    </div>
  );
}

export default Label;
