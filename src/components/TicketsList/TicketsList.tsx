import React from "react";
import {ITicket} from "../../core/types/Ticket";

import "./TicketsList.css"

import {Ticket} from "../Ticket/Ticket";
import {VisuallyHidden} from "../VisuallyHidden/VisuallyHidden";

interface TicketsListProps {
  tickets: ITicket[],
}

export function TicketsList({ tickets }: TicketsListProps): JSX.Element {
  return (
    <>
      <VisuallyHidden>
        <h2>Список билетов</h2>
      </VisuallyHidden>

      <ul className="ticketsList_List">
        {tickets.map((ticket: ITicket, i: number) => (
          <li key={ticket.price + ticket.carrier + ticket.segments.length} className="ticketsList_Item">
            <Ticket ticket={ticket} />
          </li>
        ))}
      </ul>
    </>
  )
}
