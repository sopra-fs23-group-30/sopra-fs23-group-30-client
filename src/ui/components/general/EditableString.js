import PropTypes from "prop-types";
import {
  XMarkIcon,
  PencilSquareIcon,
  CheckIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useRef, useState } from "react";

function EditableString(props) {
  const [editable, setEditable] = useState();
  const [showSaved, setShowSaved] = useState(false);
  const [content, setContent] = useState();
  const [initialContent, setInitialContent] = useState();
  const inputRef = useRef(null);

  useEffect(() => {
    setEditable(false);
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
        <input
          {...props}
          ref={inputRef}
          type="text"
          className={`p-0 t text-sm border-none bg-transparent focus:border-none focus:ring-transparent block w-full ${
            editable ? "text-black-900" : "text-gray-400"
          }`}
          value={content ?? ""}
          onChange={({ target: { value: content } }) => {
            setContent(content);
          }}
          disabled={!editable}
        />

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
                  inputRef.current.focus();
                  setEditable(true);
                }}
                className="inline-block align-middle text-blue-500"
              />
            )}
          </span>

          <span className="inline-block align-middle ...">
            {editable && (
              <XMarkIcon
                height={18}
                color="blue"
                onClick={() => {
                  setEditable(false);
                  setContent(initialContent);
                }}
                className="inline-block align-middle text-blue-500"
              />
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

EditableString.propTypes = {
  content: PropTypes.string,
};

export default EditableString;
