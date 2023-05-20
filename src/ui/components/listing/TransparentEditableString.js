import {
  CheckIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

function TransparendEditableString(props) {
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
    } else if (props.isNumeric && !Number.isInteger(parseInt(content))) {
      setErrorMessage("Please enter a whole number (non-decimal value)");
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
    <div>
      <div className="mx-0 flex justify-between items-center">
        {!editable && <p {...props}>{content}</p>}

        {editable && (
          <input
            {...props}
            ref={inputRef}
            value={content ?? ""}
            onChange={({ target: { value: content } }) => {
              setContent(content);
            }}
          />
        )}

        {props.canEdit && (
          <div
            id="actionsContainer"
            className="flex flex-row justify-center ml-1"
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
                    setTimeout(() => {
                      inputRef.current.focus();
                    }, 0);
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
    {errorMessage !== "" && props.alignerrorright && (
      <p className="text-sm text-red-500 text-right">{errorMessage}</p>
    )}
    {errorMessage !== "" && !props.alignerrorright && (
      <p className="text-sm text-red-500">{errorMessage}</p>
    )}
    </div>
  );
}

TransparendEditableString.propTypes = {
  content: PropTypes.string,
};

export default TransparendEditableString;
