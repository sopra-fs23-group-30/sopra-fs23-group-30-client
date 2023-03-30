import { Button as FlowbiteButton, Spinner } from "flowbite-react";

function Button(props) {
  if (props.isloading === true) {
    return (
      <FlowbiteButton {...props} type="submit" className="my-4">
        <Spinner />
        <span className="pl-3">{props.text}</span>
      </FlowbiteButton>
    );
  } else {
    return (
      <FlowbiteButton {...props} type="submit" className="my-4 bg-primary">
        <span>{props.text}</span>
      </FlowbiteButton>
    );
  }
}

export default Button;
