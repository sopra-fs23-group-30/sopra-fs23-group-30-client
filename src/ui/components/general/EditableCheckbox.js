import React, { useEffect, useState } from "react";

function EditableCheckbox(props) {
  const [checked, setChecked] = useState(props.content);

  useEffect(() => {
    setChecked(props.content);
  }, [props]);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
    props.onChange(event.target.checked);
  };

  return (
    <div>
      <input
        className="mr-2 rounded"
        checked={checked}
        type="checkbox"
        disabled={!props.canEdit}
        onChange={handleCheckboxChange}
      />
      <label
        htmlFor="small-input"
        className="text-sm font-medium text-gray-900 dark:text-white"
      >
        {props.label}
      </label>
    </div>
  );
}

export default EditableCheckbox;
