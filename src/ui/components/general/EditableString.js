import PropTypes from "prop-types";
import {
  XMarkIcon,
  PencilSquareIcon,
  CheckIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useRef, useState } from "react";

function EditableString(props) {
  const [editable, setEditable] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [content, setContent] = useState(props.content);
  const [initialContent, setInitialContent] = useState(props.content);
  const inputRef = useRef(null);
  const [inputWidth, setInputWidth] = useState('100%'); // Added state to track input width

  useEffect(() => {
    setContent(props.content);
    setInitialContent(props.content);
  }, [props.content]);

  const save = () => {
    setInitialContent(content);
    setEditable(false);
    setShowSaved(true);
    setTimeout(() => {
      setShowSaved(false);
    }, 3000);
  };

  const cancel = () => {
    setEditable(false);
    setContent(initialContent);
  };

  const handleInputChange = (event) => {
    setContent(event.target.value);
    setInputWidth(`${event.target.scrollWidth}px`); // Update input width based on content width
  };

  return (
    <div className="my-3">
      <div className="flex flex-row mb-1 items-center">
        <label
          htmlFor="small-input"
          className="block text-sm font-medium text-gray-900 dark:text-white"
        >
          {props.label}
        </label>

        {showSaved && (
          <label
            htmlFor="small-input"
            className="block ml-1 text-xs text-blue-500 animate-in fade-in-50 animate-out fade-out-50"
          >
            saved!
          </label>
        )}
      </div>

      <div className="px-2 py-1 mx-0 flex justify-between border border-gray-300 rounded-lg bg-gray-50">
        {!editable && (
          <p
            className="text-sm cursor-pointer"
            onClick={() => setEditable(true)}
          >
            {content}
          </p>
        )}

        {editable && (
          <textarea
            {...props}
            ref={inputRef}
            className="p-0 text-sm border-none bg-transparent focus:border-none focus:ring-transparent block w-full text-black-900"
            rows={Math.max(Math.ceil(content.length / 45), 1)}
            value={content ?? ""}
            onChange={({ target: { value: content } }) => {
              setContent(content);
            }}
          />
        )}

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
      </div>
    </div>
  );
}

EditableString.propTypes = {
  content: PropTypes.string,

};



export default EditableString;
