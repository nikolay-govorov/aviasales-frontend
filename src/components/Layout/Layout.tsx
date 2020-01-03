import React from "react";

import "./Layout.css";
import { Logo } from "../Logo/Logo";

interface Props {
  filters: JSX.Element,
  tickets: JSX.Element
}

export default function Layout({ filters, tickets }: Props): JSX.Element {
  return (
    <div className="layoutContainer">
      <div className="layoutLogo">
        <Logo />
      </div>

      <div className="layoutFilters">{filters}</div>

      <div className="layoutTickets">{tickets}</div>
    </div>
  )
}
