import React from "react";

import "./Ticket.css";

import {Card} from "../Card/Card";
import {ITicket, ITicketSegment} from "../../core/types/Ticket";
import {plural} from "../../core/lib/plural";
import {formatPrice} from "../../core/lib/formatPrice";
import {formatTimeDuration, formatTimePeriod} from "../../core/lib/formatTime";

interface TicketSegmentProps {
  segment: ITicketSegment
}

interface TicketProps {
  ticket: ITicket,
}

function TicketSegment({ segment }: TicketSegmentProps) {
  const stopsPlural = plural(["пересадка", "пересадки", "пересадок"], "Без пересадок");

  return (
    <dl className="ticketSegment_Container">
      <div>
        <dt className="ticketSegment_RecordTitle">{segment.origin} – {segment.destination}</dt>
        <dd className="ticketSegment_RecordValue">{formatTimePeriod(segment.date, segment.duration)}</dd>
      </div>

      <div>
        <dt className="ticketSegment_RecordTitle">В пути</dt>
        <dd className="ticketSegment_RecordValue">{formatTimeDuration(segment.duration)}</dd>
      </div>

      <div>
        <dt className="ticketSegment_RecordTitle">{stopsPlural(segment.stops.length)}</dt>
        <dd className="ticketSegment_RecordValue">{segment.stops.join(", ") || "-"}</dd>
      </div>
    </dl>
  );
}

export const Ticket = React.memo(function({ ticket }: TicketProps): JSX.Element {
  return (
    <Card>
      <section className="ticket_Container">
        <h3 className="ticket_Price">{formatPrice(ticket.price)}</h3>

        <img
          width={110}
          height={36}
          className="ticket_CarrierLogo"
          src={`https://pics.avs.io/99/36/${ticket.carrier}.png`}
          alt={`${ticket.carrier} logo`}
        />

        <ul className="ticket_SegmentsList">
          {ticket.segments.map((segment: ITicketSegment, i:  number) => (
            <li key={i}>
              <TicketSegment segment={segment} />
            </li>
          ))}
        </ul>
      </section>
    </Card>
  )
});
