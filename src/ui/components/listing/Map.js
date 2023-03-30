import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { MarkerF } from "@react-google-maps/api";

function Map({ coords }) {
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
      <div className="rounded-xl overflow-hidden">
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "400px",
          }}
          center={coords}
          zoom={16}
        >
          <MarkerF position={coords} />
        </GoogleMap>
      </div>
    </LoadScript>
  );
}

export default Map;
