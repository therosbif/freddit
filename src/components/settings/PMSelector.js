import React from "react";
import Selector from "../core/Selector";

export default PMSelector = ({ baseValue, setter }) =>
  <Selector {...{ baseValue, setter }} values={['everyone', 'whitelisted']} />