import React from "react";

import "./Checkbox.css"

interface Props {
  [key: string]: any
}

export default function Checkbox({ ...props }: Props): JSX.Element {
  return (
    <>
      <input className="checkbox_native" type="checkbox" {...props} />

      <span className="checkbox_visual"></span>
    </>
  )
}
