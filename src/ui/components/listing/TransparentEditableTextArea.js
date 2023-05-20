import PropTypes from "prop-types";
import {
  XMarkIcon,
  PencilSquareIcon,
  CheckIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useRef, useState } from "react";

function TransparentEditableTextArea(props) {
  const [editable, setEditable] = useState(false);
  const [content, setContent] = useState(props.content);
  const [initialContent, setInitialContent] = useState(props.content);
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    setContent(props.content);
    setInitialContent(props.content);
  }, [props.content]);

  const validate = () => {
    if(content === "") {
      setErrorMessage(props.errormessage);
      return false;
    } else {
      setErrorMessage("");
      return true;
    }
  }

  const save = () => {
    setInitialContent(content);
    setEditable(false);

    props.onSave(content);
  };

  const cancel = () => {
    setErrorMessage("");
    setEditable(false);
    setContent(initialContent);
  };

  return (
    <div className="my-3">
      <div className="flex flex-row mb-1 items-center justify-between">
        <h5
          className={` text-md font-bold tracking-tight text-gray-900 dark:text-white ${
            props.isCardContent ? "p-2.5" : "p-0"
          }`}
        >
          {props.label}
        </h5>

        {props.canEdit && (
          <div
            id="actionsContainer"
            className="flex flex-row justify-center ml-1 px-2"
          >
            <span className="inline-block align-middle cursor-pointer">
              {editable && (
                <CheckIcon
                  height={18}
                  onClick={(e) => {
                    if(validate()) {
                      save();
                    } else {
                      e.preventDefault();
                    }
                  }}
                  className="inline-block align-middle text-blue-500 cursor-pointer"
                />
              )}
              {!editable && (
                <PencilSquareIcon
                  height={18}
                  color="blue"
                  onClick={() => {
                    setEditable(true);
                  }}
                  className="inline-block align-middle text-blue-500"
                />
              )}
            </span>

            {editable && (
              <span className="inline-block align-middle ... cursor-pointer">
                <XMarkIcon
                  height={18}
                  color="blue"
                  onClick={() => cancel()}
                  className="inline-block align-middle text-blue-500 cursor-pointer"
                />
              </span>
            )}
          </div>
        )}
      </div>

      <div className="my-1 mx-0 flex justify-between">
        {!editable && (
          <textarea
            disabled={true}
            id="message"
            rows="4"
            value={content ?? ""}
            onChange={({ target: { value: content } }) => {
              setContent(content);
            }}
            className={`border-none bg-transparent block  pt-0 w-full text-sm text-gray-400 ${
              props.isCardContent ? "p-2.5" : "p-0"
            }`}
            placeholder="Leave a comment..."
          />
        )}

        {editable && (
          <textarea
            disabled={false}
            id="message"
            rows="4"
            ref={inputRef}
            value={content ?? ""}
            onChange={({ target: { value: content } }) => {
              setContent(content);
            }}
            className={`border-none bg-transparent block pt-0 w-full text-sm text-black-900 ${
              props.isCardContent ? "p-2.5" : "p-0"
            }`}
            placeholder="Leave a comment..."
          />
        )}
      </div>
      {errorMessage !== "" && (
        <p className="text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}

TransparentEditableTextArea.propTypes = {
  content: PropTypes.string,
};

export default TransparentEditableTextArea;
