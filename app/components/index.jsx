// npm modules
import React, { PropTypes } from "react";
import ReactDOM from "react-dom";
import { DragSource } from "react-dnd";

import Board from "./Board";

ReactDOM.render((
  <Board />
), document.getElementById("container"));
