import React from "react";
import { Switch } from "react-native-paper";
import { useState } from "react/cjs/react.development";

export default SwitchSetting = ({ baseValue, setter }) => {
  const [value, setValue] = useState(baseValue);

  return <Switch value={value} onValueChange={() => { setValue(!value); setter(value) }} />
}