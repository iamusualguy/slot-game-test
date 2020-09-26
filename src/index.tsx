import * as React from "react";
import * as ReactDOM from "react-dom";

import { Game } from "./components/Game";
import { GameState } from "./state/state";

const state = new GameState();

ReactDOM.render(
  <Game state={state} />,
  document.getElementById("output")
);
