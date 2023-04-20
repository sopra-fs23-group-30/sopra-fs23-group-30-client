import React, { useState } from "react";
import { Button, Modal } from "flowbite-react";

function DecisionConfirmationInquiry(props) {
  const [, setShow] = useState(true);

  return (
    <Modal
      show={props.show}
      onClose={() => {
        props.onClose();
        setShow(false);
      }}
    >
      <Modal.Header>{props.title}</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            {props.content}
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex flex-row justify-between p-4">
        <Button
          onClick={() => {
            props.onClose();
            props.onClick();
            setShow(false);
          }}
        >
          Confirm
        </Button>
        <Button
          color="gray"
          onClick={() => {
            props.onClose();
            setShow(false);
          }}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DecisionConfirmationInquiry;
