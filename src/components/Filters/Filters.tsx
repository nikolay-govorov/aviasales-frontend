import React, {useCallback} from "react";
import {Card} from "../Card/Card";

import "./Filters.css";
import Checkbox from "../Checkbox/Checkbox";

export default function Filters(): JSX.Element {
  const onChange = useCallback((ev) => {}, []);

  return (
    <Card>
      <form className="filters_Container">
        <legend className="filters_Title">Количество пересадок</legend>

        <div className="filters_List">
          <label className="filters_Item">
            <Checkbox name="stops" type="checkbox" onChange={onChange} />
            <span className="filters_ItemLabel">Все</span>
          </label>

          <label className="filters_Item">
            <Checkbox name="stops" type="checkbox" onChange={onChange} />
            <span className="filters_ItemLabel">Без пересадок</span>
          </label>

          <label className="filters_Item">
            <Checkbox name="stops" type="checkbox" onChange={onChange} />
            <span className="filters_ItemLabel">1 пересадка</span>
          </label>

          <label className="filters_Item">
            <Checkbox name="stops" type="checkbox" onChange={onChange} />
            <span className="filters_ItemLabel">2 пересадки</span>
          </label>

          <label className="filters_Item">
            <Checkbox name="stops" type="checkbox" onChange={onChange} />
            <span className="filters_ItemLabel">3 пересадки</span>
          </label>
        </div>
      </form>
    </Card>
  )
}
