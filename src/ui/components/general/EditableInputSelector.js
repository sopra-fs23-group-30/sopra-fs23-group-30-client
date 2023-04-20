import { Select } from "flowbite-react";
import React, { useState } from "react";

function InputSelector(props) {
  const [selectedOption, setSelectedOption] = useState(props.selected);

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
        className="block text-sm font-medium text-gray-900 dark:text-white"
      >
        {props.label}
      </label>
      <Select
        id="countries"
        required={true}
        value={selectedOption}
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
        className="block text-sm font-medium text-gray-900 dark:text-white"
      >
        {props.label}
      </label>
      <Select disabled id="countries" required={true} value={selectedOption}>
        <option value="" disabled>
          Select an option
        </option>
      </Select>
    </>
  );
}

export default InputSelector;
