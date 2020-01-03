export interface ITicketSegment {
  origin: string
  destination: string
  date: string
  stops: string[]
  duration: number
}

export interface ITicket {
  price: number
  carrier: string
  segments: [ITicketSegment, ITicketSegment] // back and forth
}
