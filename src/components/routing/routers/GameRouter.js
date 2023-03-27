import { Route } from "react-router-dom";
import Game from "components/views/Game";
import PropTypes from "prop-types";

const GameRouter = (props) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Route exact path={`${props.base}/dashboard`}>
        <Game />
      </Route>
      <Route exact path={`${props.base}`}>
        {/* <Redirect to={`${props.base}/dashboard`} /> */}
      </Route>
    </div>
  );
};

GameRouter.propTypes = {
  base: PropTypes.string,
};

export default GameRouter;
