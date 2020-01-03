import React from "react";
import {ITicket} from "../../core/Ticket";

import "./TicketsList.css"

import Ticket from "../Ticket/Ticket";

interface TicketsListProps {
  tickets: ITicket[],
}

export default function TicketsList({ tickets }: TicketsListProps): JSX.Element {
  return (
    <div>
      <div className="ticketList_sortContainer">
        <label className="ticketsList_SortButton">
          <input className="ticketsList_SortCheckbox" name="sort-type" type="radio" value="cheap" defaultChecked />
          <span className="ticketsList_SortButtonText">Самый дешевый</span>
        </label>

        <label className="ticketsList_SortButton">
          <input className="ticketsList_SortCheckbox" name="sort-type" type="radio" value="fast" />
          <span className="ticketsList_SortButtonText">Самый быстрый</span>
        </label>
      </div>

      <ul className="ticketsList_List">
        {tickets.map((ticket: ITicket, i: number) => (
          <li key={i} className="ticketsList_Item">
            <Ticket ticket={ticket} />
          </li>
        ))}
      </ul>
    </div>
  )
}
