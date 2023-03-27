import PropTypes from "prop-types";

function Header({ header }) {
  return <h1 className="text-1xl font-medium mb-4">{header}</h1>;
}

Header.propTypes = {
  name: PropTypes.string,
};

export default Header;
