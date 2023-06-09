import {
  CheckIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import EditableAddress from "../general/EditableAddress";

function TransparentEditableAddress(props) {
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
      <div className="flex justify-between">
        {!editable && <p {...props}>{content.address}</p>}

        {editable && (
          <EditableAddress
            value={content ?? ""}
            onChange={(updatedContent) => {
              setContent(updatedContent);
            }}
          />
        )}

        {props.canEdit && (
          <div id="actionsContainer" className="flex flex-row ml-1">
            <span className="inline-block align-right cursor-pointer">
              {editable && (
                <CheckIcon
                  height={18}
                  onClick={() => {
                    save();
                  }}
                  className="inline-block align-right text-blue-500 cursor-pointer"
                />
              )}
              {!editable && (
                <PencilSquareIcon
                  height={18}
                  color="blue"
                  onClick={() => {
                    setEditable(true);
                    setTimeout(() => {
                      inputRef.current?.focus();
                    }, 0);
                  }}
                  className="inline-block align-right text-blue-500"
                />
              )}
            </span>

            {editable && (
              <span className="inline-block align-right ... cursor-pointer">
                <XMarkIcon
                  height={18}
                  color="blue"
                  onClick={() => cancel()}
                  className="inline-block align-right text-blue-500 cursor-pointer"
                />
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

TransparentEditableAddress.propTypes = {
  content: PropTypes.string,
};

export default TransparentEditableAddress;
