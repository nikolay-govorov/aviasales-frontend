import React, {useCallback} from "react";

import "./Filters.css";
import {Card} from "../Card/Card";
import {Filter} from "../../core/types/Filter";
import {Checkbox} from "../Checkbox/Checkbox";
import {VisuallyHidden} from "../VisuallyHidden/VisuallyHidden";

interface Props {
  filters: Filter[];
  onChange: (count: number, value: boolean) => void;
}

export function Filters(props: Props): JSX.Element {
  const onChange = useCallback((ev) => {
    props.onChange(parseInt(ev.target.value), ev.target.checked);
  }, [props]);

  return (
    <Card>
      <VisuallyHidden>
        <h2>Фильтры</h2>
      </VisuallyHidden>

      <form className="filters_Container">
        <legend className="filters_Title">Количество пересадок</legend>

        <div className="filters_List">
          {props.filters.map(({ count, label, selected }) => (
            <label key={count} className="filters_Item">
              <Checkbox name="stops" type="checkbox" checked={selected} onChange={onChange} value={count} />
              <span className="filters_ItemLabel">{label}</span>
            </label>
          ))}
        </div>
      </form>
    </Card>
  )
}
