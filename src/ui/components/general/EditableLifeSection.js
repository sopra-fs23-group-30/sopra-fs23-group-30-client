import PropTypes from "prop-types";
import {
  XMarkIcon,
  PencilSquareIcon,
  CheckIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

function EditableLifeSection(props) {
  const [editable, setEditable] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [lifeSection, setLifeSection] = useState();
  const [initialLifeSection, setInitialLifeSection] = useState();

  useEffect(() => {
    setLifeSection(props.section);
    setInitialLifeSection(props.section);
  }, [props.section]);

  const save = () => {
    setInitialLifeSection(lifeSection);

    setEditable(false);
    setShowSaved(true);
    setTimeout(() => {
      setShowSaved(false);
    }, 30000);
  };

  return (
    <div className="py-4 flex flex-row justify-between border-b border-gray-200">
      <div className="flex flex-col w-10/12">
        <div className="flex flex-row items-center">
          <input
            className={`p-0 text-sm block w-full ${
              editable
                ? " text-black-900 border border-gray-300 rounded-lg bg-gray-50 px-2"
                : "text-gray-400 bg-transparent border-none focus:border-none focus:ring-transparent"
            }`}
            disabled={!editable}
            value={lifeSection?.title ?? ""}
            onChange={({ target: { value: newTitle } }) => {
              let section = {
                title: newTitle,
                from: lifeSection?.from,
                to: lifeSection?.to,
              };
              setLifeSection(section);
            }}
          />
        </div>

        <div className="flex flex-row mt-1">
          <input
            className={`p-0 text-sm w-16 block${
              editable
                ? " text-black-900 border border-gray-300 rounded-lg bg-gray-50 px-2"
                : "text-gray-400 border-none bg-transparent focus:border-none focus:ring-transparent"
            }`}
            disabled={!editable}
            value={lifeSection?.from ?? ""}
            type="number"
            maxLength={4}
            onChange={({ target: { value: newFrom } }) => {
              let section = {
                title: lifeSection?.title,
                from: newFrom,
                to: lifeSection?.to,
              };
              setLifeSection(section);
            }}
          />
          <p className="text-sm flex justify-center w-16"> - </p>
          <input
            className={`p-0 text-sm  w-16 block${
              editable
                ? " text-black-900 border border-gray-300 rounded-lg bg-gray-50 px-2"
                : "text-gray-400 border-none bg-transparent focus:border-none focus:ring-transparent"
            }`}
            disabled={!editable}
            value={lifeSection?.to ?? ""}
            type="number"
            maxLength={4}
            onChange={({ target: { value: newTo } }) => {
              let section = {
                title: lifeSection?.title,
                from: lifeSection?.from,
                to: newTo,
              };
              setLifeSection(section);
            }}
          />
        </div>
      </div>

      <div id="actionsContainer" className="flex flex-row items-center ml-1">
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
              }}
              className="inline-block align-middle text-blue-500"
            />
          )}
        </span>

        <span className="inline-block align-middle items-middle">
          {editable && (
            <XMarkIcon
              height={18}
              color="blue"
              onClick={() => {
                setEditable(false);
                setLifeSection(initialLifeSection);
              }}
              className="inline-block align-middle text-blue-500"
            />
          )}
        </span>
      </div>
    </div>
  );
}

EditableLifeSection.propTypes = {
  content: PropTypes.string,
};

export default EditableLifeSection;
