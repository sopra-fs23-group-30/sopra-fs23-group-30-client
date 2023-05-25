import {
  CheckIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

function EditableLifespan(props) {
  const [canAdd, setCanAdd] = useState(true);
  const [lifespans, setLifespans] = useState([]);
  useEffect(() => {
    const updatedArray = props.lifespans?.map((lifespan) => ({
      ...lifespan,
      isEditing: false,
    }));
    setLifespans(updatedArray);
  }, [props.lifespans]);

  const save = () => {
    const incompleteItemIndex = lifespans.findIndex(
      (item) => item.isEditing === true
    );

    if (incompleteItemIndex !== -1) {
      const updatedItems = [...lifespans];
      updatedItems[incompleteItemIndex] = {
        ...updatedItems[incompleteItemIndex],
        isEditing: false,
      };
      setLifespans(updatedItems);
      setCanAdd(true);
      props.onChange(updatedItems);
    }
  };

  const cancel = () => {
    const itemsWithoutCancelledOne = lifespans.filter(
      (span) => span.isEditing !== true
    );
    setLifespans(itemsWithoutCancelledOne);
    setCanAdd(true);
  };

  const updateText = (text) => {
    const incompleteItemIndex = lifespans.findIndex(
      (item) => item.isEditing === true
    );

    if (incompleteItemIndex !== -1) {
      const updatedItems = [...lifespans];
      updatedItems[incompleteItemIndex] = {
        ...updatedItems[incompleteItemIndex],
        text: text,
      };
      setLifespans(updatedItems);
    }
  };

  const updateFrom = (fromDate) => {
    const incompleteItemIndex = lifespans.findIndex(
      (item) => item.isEditing === true
    );

    if (incompleteItemIndex !== -1) {
      const updatedItems = [...lifespans];
      updatedItems[incompleteItemIndex] = {
        ...updatedItems[incompleteItemIndex],
        fromDate: fromDate,
      };
      setLifespans(updatedItems);
    }
  };

  const updateTo = (toDate) => {
    const incompleteItemIndex = lifespans.findIndex(
      (item) => item.isEditing === true
    );

    if (incompleteItemIndex !== -1) {
      const updatedItems = [...lifespans];
      updatedItems[incompleteItemIndex] = {
        ...updatedItems[incompleteItemIndex],
        toDate: toDate,
      };
      setLifespans(updatedItems);
    }
  };

  const addNewLifespan = () => {
    //can't add a new lifespan before saving / cancelling
    setCanAdd(false);

    let emptyLifespanObj = {
      text: "",
      toDate: null,
      fromDate: null,
      isExperience: props.label === "Experience" ? true : false,
      isEditing: true,
    };
    const updatedItems = lifespans;
    updatedItems.splice(0, 0, emptyLifespanObj);
    setLifespans(updatedItems);
  };

  const deleteLifespanItem = (indexToRemove) => {
    props.onChange(lifespans.filter((_, index) => index !== indexToRemove));
    setLifespans(lifespans.filter((_, index) => index !== indexToRemove));
  };

  const topSection = () => {
    return (
      <div className="flex flex-row mb-1 items-center justify-between">
        <div className="flex flex-row">
          <label
            htmlFor="small-input"
            className="block text-sm font-medium dark:text-white"
          >
            {props.label}
          </label>
        </div>

        {props.canEdit && (
          <div
            id="actionsContainer"
            className="flex flex-row justify-center px-2"
          >
            <span className="inline-block align-middle cursor-pointer">
              {canAdd && (
                <PlusIcon
                  height={18}
                  color="blue"
                  onClick={() => {
                    addNewLifespan();
                  }}
                  className="inline-block align-middle text-blue-500"
                />
              )}

              {!canAdd && (
                <PlusIcon
                  height={18}
                  className="inline-block align-middle text-blue-500 invisible"
                />
              )}
            </span>
          </div>
        )}
      </div>
    );
  };

  const itemsSection = (lifespan, idx) => {
    return (
      <div className="grid grid-cols-12">
        <div className="col-span-11 flex flex-col">
          <div className="mb-2">
            <input
              disabled={!lifespan.isEditing}
              type="text"
              id="small-input"
              value={lifespan.text}
              onChange={(e) => updateText(e.target.value)}
              placeholder="What did you do?"
              className={`h-7 block w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 ${lifespan.isEditing ? 'text-black' : 'text-gray-400'}`}
            />
          </div>
          <div className="flex flex-row">
            <input
              disabled={!lifespan.isEditing}
              type="date"
              id="small-input"
              value={lifespan.fromDate}
              placeholder="From"
              onChange={(e) => updateFrom(e.target.value)}
              className={`h-7 block w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 ${lifespan.isEditing ? 'text-black' : 'text-gray-400'}`}
            />
            <div className="mx-4">-</div>
            <input
              disabled={!lifespan.isEditing}
              type="date"
              id="small-input"
              placeholder="To"
              onChange={(e) => updateTo(e.target.value)}
              value={lifespan.toDate}
              className={`h-7 block w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 ${lifespan.isEditing ? 'text-black' : 'text-gray-400'}`}
            />
          </div>
        </div>
        <div className="col-span-1 flex flex-row justify-end px-2">
          {lifespan.isEditing && (
            <div className="flex flex-col justify-center cursor-pointer">
              <CheckIcon
                height={18}
                onClick={() => {
                  save();
                }}
                className="inline-block align-middle text-blue-500"
              />
              <XMarkIcon
                height={18}
                onClick={() => {
                  cancel();
                }}
                className="inline-block align-middle text-blue-500"
              />
            </div>
          )}

          {!lifespan.isEditing && props.canEdit && (
            <div className="flex flex-col justify-center cursor-pointer">
              <TrashIcon
                height={18}
                onClick={() => {
                  deleteLifespanItem(idx);
                }}
                className="inline-block align-middle text-blue-500"
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      {topSection()}
      {props.label === "Experience" && (
        <div>
          {lifespans
            .sort(function (a, b) {
              if (a.isEditing) {
                return true;
              }
              const c = new Date(a.toDate);
              const d = new Date(b.toDate);
              return d - c;
            })
            ?.filter((x) => x.isExperience)
            .map((item, index) => (
              <div className="flex flex-col mb-4" key={index}>
                {itemsSection(item, index)}
              </div>
            ))}
        </div>
      )}

      {props.label !== "Experience" && (
        <div>
          {lifespans
            .sort(function (a, b) {
              if (a.isEditing) {
                return false;
              }
              const c = new Date(a.toDate);
              const d = new Date(b.toDate);
              return d - c;
            })
            ?.filter((x) => !x.isExperience)
            .map((item, index) => (
              <div className="flex flex-col mb-4" key={index}>
                {itemsSection(item, index)}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default EditableLifespan;
