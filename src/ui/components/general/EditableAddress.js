import { TextInput } from "flowbite-react";
import { useState } from "react";

import PlacesAutocomplete, {
  geocodeByAddress,
} from "react-places-autocomplete";

function EditableAddress(props) {
  const [address, setAddress] = useState(props.address);
  const [, setCoordinates] = useState(props.coordinates);

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const ll = results[0].geometry.location;
    setAddress(results[0].formatted_address);
    const updatedCoordinates = {
      lat: ll.lat(),
      lng: ll.lng(),
    };
    setCoordinates(updatedCoordinates);
    props.onChange({
      address: address,
      coordinates: updatedCoordinates,
    });
  };

  return (
    <>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <TextInput
              {...getInputProps({
                placeholder: "Search Places ...",
                className: "location-search-input",
              })}
            />
            <div className="p-0 text-sm border-none bg-transparent focus:border-none focus:ring-transparent block w-full text-black-900">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </>
  );
}

export default EditableAddress;
