import React from "react";

import "./VisuallyHidden.css";

interface Props {
  children: React.ReactNode;
}

export function VisuallyHidden({ children }: Props): JSX.Element {
  return (
    <div className="visuallyHidden">{children}</div>
  );
}
