import PropTypes from "prop-types";
import {
  XMarkIcon,
  PencilSquareIcon,
  CheckIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useRef, useState } from "react";

function EditableTextarea(props) {
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
    <div className="my-3">
      <div className="flex flex-row mb-1 items-center justify-between">
        <div className="flex flex-row">
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

        {props.canEdit && (
          <div
            id="actionsContainer"
            className="flex flex-row justify-center ml-1 px-2"
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
            class="block p-2.5 w-full text-sm text-gray-400 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            class="block p-2.5 w-full text-sm text-black-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Leave a comment..."
          />
        )}
      </div>
    </div>
  );
}

EditableTextarea.propTypes = {
  content: PropTypes.string,
};

export default EditableTextarea;
