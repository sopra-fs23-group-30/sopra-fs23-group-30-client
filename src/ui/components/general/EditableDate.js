import PropTypes from "prop-types";
import {
  XMarkIcon,
  PencilSquareIcon,
  CheckIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useRef, useState } from "react";

function EditableDate(props) {
  const [editable, setEditable] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
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
    setShowSaved(true);
    setTimeout(() => {
      setShowSaved(false);
    }, 3000);

    props.onSave(content);
  };

  const cancel = () => {
    setEditable(false);
    setContent(initialContent);
  };

  return (
    <div>
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

      <div className="px-2 py-1 mx-0 flex justify-between items-center border border-gray-300 rounded-lg bg-gray-50">
        {!editable && <p className="text-sm text-gray-400">{content}</p>}

        {editable && (
          <input
            {...props}
            ref={inputRef}
            type="date"
            pattern="\d{4}\d{1,2}/\d{1,2}/"
            className="p-0 text-sm border-none bg-transparent focus:border-none focus:ring-transparent block w-full text-black-900 cursor-pointer"
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
              <span className="inline-block align-middle ... cursor-pointer">
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

EditableDate.propTypes = {
  content: PropTypes.string,
};

export default EditableDate;
