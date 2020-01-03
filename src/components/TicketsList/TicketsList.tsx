import React from "react";
import {ITicket} from "../../core/types/Ticket";

import "./TicketsList.css"

import {Ticket} from "../Ticket/Ticket";

interface TicketsListProps {
  tickets: ITicket[],
}

export function TicketsList({ tickets }: TicketsListProps): JSX.Element {
  return (
    <ul className="ticketsList_List">
      {tickets.map((ticket: ITicket, i: number) => (
        <li key={ticket.price + ticket.carrier + ticket.segments.length} className="ticketsList_Item">
          <Ticket ticket={ticket} />
        </li>
      ))}
    </ul>
  )
}
