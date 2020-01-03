import {interval, Observable} from "rxjs";
import {fromFetch} from 'rxjs/fetch';
import {pluck, retry, scan, switchMap, takeWhile} from "rxjs/operators";

import {ITicket} from "../types/Ticket";
import {SortType} from "../types/Sort.type";
import {Filter} from "../types/Filter";
import {useEffect, useState} from "react";

const API_URL = "https://front-test.beta.aviasales.ru";

interface ResponseSearch {
  searchId: string;
}

interface ResponseTicketPool {
  stop: boolean;
  tickets: ITicket[];
}

function fetch<T>(url: string): Observable<T> {
  return fromFetch(url, {}).pipe(
    switchMap(response => response.json()),
    retry(3)
  );
}

export function loadTickets(): Observable<ITicket[]> {
  return fetch<ResponseSearch>(`${API_URL}/search`)
    .pipe(
      pluck("searchId"),
      switchMap(searchId => interval(200).pipe(
        switchMap(() => fetch<ResponseTicketPool>(`${API_URL}/tickets?searchId=${searchId}`)),
        takeWhile(({ stop }) => !stop, true),
      )),
      scan((acc, { tickets }) => acc.concat(tickets || []), [] as ITicket[]),
    );
}

export function hasTicketFitsTheFilter(filters: Filter[], ticket: ITicket): boolean {
  return ticket.segments.reduce((allSegmentFits, { stops }) => {
    const haveFitsFilterForSegment = filters
      .filter(filter => filter.selected)
      .map(filter => filter.count === -1 || filter.count === stops.length)
      .some(hasValid => hasValid);

    return allSegmentFits && haveFitsFilterForSegment;
  }, true as boolean);
}

export function compareTickets(sort: SortType, a: ITicket, b: ITicket): number {
  const getDuration = (segment: ITicket): number => {
    return segment.segments.reduce((acc, el) => acc + el.duration, 0);
  };

  const byFast = () => getDuration(a) - getDuration(b);
  const byCheap = () => a.price - b.price;
  const byCompanyName = () => (a.carrier > b.carrier) ? 1 : (a.carrier < b.carrier) ? -1 : 0; // if tickets the equals

  switch (sort) {
    case "cheap":
      return byCheap() || byFast() || byCompanyName();

    case "fast":
      return byFast() || byCheap() || byCompanyName();

    default:
      console.error(`Unknow SortType "${sort}"`);
      return 0;
  }
}

export function useTickets(
  sort: SortType,
  filters: Filter[]
): [ITicket[], boolean, boolean, boolean] {
  const [hasFail, setFail] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const [allTickets, setAllTickets] = useState<ITicket[]>([]);
  const [tickets, setTickets] = useState<ITicket[]>([]);

  useEffect(() => {
    setLoading(true);

    const subscribe = loadTickets().subscribe({
      next(tickets: ITicket[]) {
        setAllTickets(tickets);
      },
      error() {
        setFail(true);
        setLoading(false);
      },
      complete(...args) {
        setLoading(false)
      }
    });

    return () => subscribe.unsubscribe();
  }, []);

  useEffect(() => {
    setTickets(allTickets
      .sort(compareTickets.bind(null, sort))
      .filter(hasTicketFitsTheFilter.bind(null, filters))
      .slice(0, 5)
    );
  }, [allTickets, sort, filters]);

  return [
    tickets,
    isLoading,
    !!allTickets.length && !tickets.length,
    hasFail];
}
