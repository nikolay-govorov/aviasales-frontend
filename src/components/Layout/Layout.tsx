import React from "react";

import "./Layout.css";
import { Logo } from "../Logo/Logo";
import {Card} from "../Card/Card";
import {VisuallyHidden} from "../VisuallyHidden/VisuallyHidden";

interface Props {
  loading: boolean;
  fail: boolean;
  noFiltered: boolean;

  filters: JSX.Element;
  sort: JSX.Element;
  tickets: JSX.Element;
}

function LayoutMessage({ children }: { children: JSX.Element | string }): JSX.Element {
  return (
    <Card>
      <div className="layout_Message">{children}</div>
    </Card>
  );
}

export function Layout({
  loading,
  fail,
  noFiltered,
  filters,
  sort,
  tickets
}: Props): JSX.Element {
  return (
    <>
      {loading ? (
        <div className="layout_Loader" aria-label="Ищем билеты..." />
      ) : null}

      <div className="layout_Container">
        <div className="layout_Logo">
          <Logo />
        </div>

        <VisuallyHidden>
          <h1>Поиск билетов на aviasales</h1>
        </VisuallyHidden>

        <div className="layout_Filters">{filters}</div>

        <div className="layoutSort">{sort}</div>

        <div className="layout_Tickets">
          {fail ? (
            <LayoutMessage>Не удалось загрузить билеты. Попробуйте перезагрузить страницу, или попробовать позже</LayoutMessage>
          ) : noFiltered ? (
            <LayoutMessage>Ни один из рейсов не соответствует заданным фильтрам.</LayoutMessage>
          ) : tickets}
        </div>
      </div>
    </>
  )
}
