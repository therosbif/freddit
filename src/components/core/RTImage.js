import React from "react";
import { Image } from "react-native";
import { useState } from "react/cjs/react.development";

export default RTImage = (props) => {
  const [triggerFallback, setTriggerFallBack] = useState(false);

  if (triggerFallback) {
    return (props?.fallback)
      ? (
        <Image {...props} source={props.fallback} />
      )
      : (
        <Text color='#4F4F4F'>zflhbzleifbzef</Text>
      )
  }
  return (
    <Image {...props} onError={() => {
      if (props?.onError) {
        props?.onError();
      }
      setTriggerFallBack(true);
    }} />
  )
}