import PropTypes from "prop-types";

function Subheader({ header }) {
  return <h2 className="text-md mb-4 text-primary font-semibold ">{header}</h2>;
}

Subheader.propTypes = {
  name: PropTypes.string,
};

export default Subheader;
