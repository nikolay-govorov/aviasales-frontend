import React from "react";

import "./Layout.css";
import { Logo } from "../Logo/Logo";
import {Card} from "../Card/Card";

interface Props {
  loading: boolean;
  fail: boolean;

  filters: JSX.Element;
  sort: JSX.Element;
  tickets: JSX.Element;
}

function LayoutMessage({ children }: { children: JSX.Element | string }): JSX.Element {
  return (
    <Card>
      <div className="layoutMessage">{children}</div>
    </Card>
  );
}

export default function Layout({
  loading,
  fail,
  filters,
  sort,
  tickets
}: Props): JSX.Element {
  return (
    <>
      {loading ? (
        <div className="layout_Loader" aria-label="Ищем билеты..." />
      ) : null}

      <div className="layoutContainer">
        <div className="layoutLogo">
          <Logo />
        </div>

        <div className="layoutFilters">{filters}</div>

        <div className="layoutSort">{sort}</div>

        <div className="layoutTickets">
          {fail ? (
            <LayoutMessage>Не удалось загрузить билеты. Попробуйте перезагрузить страницу, или попробовать позже</LayoutMessage>
          ) : tickets}
        </div>
      </div>
    </>
  )
}
