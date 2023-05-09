import { Select } from "flowbite-react";
import React, { useState } from "react";

function InputSelector(props) {
  const [, setSelectedOption] = useState(props.selected);

  const getOption = (option) => {
    return option !== props.selected ? <option>{option}</option> : <></>;
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    props.onSave(event.target.value);
  };

  return props.canEdit ? (
    <>
      <label
        htmlFor="small-input"
        className="block text-sm font-medium text-gray-900 dark:text-white pt-3"
      >
        {props.label}
      </label>
      <Select
        className="cursor-pointer pt-1"
        required={true}
        value={props.content}
        onChange={handleOptionChange}
      >
        <option value="" disabled>
          Select an option
        </option>
        {props.options.map((option) => getOption(option))}
      </Select>
    </>
  ) : (
    <>
      <label
        htmlFor="small-input"
        className="block text-sm font-medium text-gray-900 dark:text-white pt-3"
      >
        {props.label}
      </label>
      <Select disabled id="countries" required={true} value={props.content}>
        <option value="" disabled>
          Select an option
        </option>
        {props.options.map((option) => getOption(option))}
      </Select>
    </>
  );
}

export default InputSelector;
