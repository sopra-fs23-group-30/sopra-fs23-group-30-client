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
  const inputRef = useRef(null);

  useEffect(() => {
    setContent(props.content);
    setInitialContent(props.content);
  }, [props.content]);

  const save = () => {
    setInitialContent(content);
    setEditable(false);

    props.onSave(content);
  };

  const cancel = () => {
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
            <span className="inline-block align-middle">
              {editable && (
                <CheckIcon
                  height={18}
                  onClick={() => {
                    save();
                  }}
                  className="inline-block align-middle text-blue-500"
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
              <span className="inline-block align-middle ...">
                <XMarkIcon
                  height={18}
                  color="blue"
                  onClick={() => cancel()}
                  className="inline-block align-middle text-blue-500"
                />
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

TransparendEditableString.propTypes = {
  content: PropTypes.string,
};

export default TransparendEditableString;
