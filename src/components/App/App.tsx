import {interval, Observable} from "rxjs";
import {fromFetch} from 'rxjs/fetch';
import {pluck, retry, scan, switchMap, takeWhile} from "rxjs/operators";
import React, {useCallback, useEffect, useState} from 'react';

import Layout from "../Layout/Layout";
import Filters from "../Filters/Filters";
import Tickets from "../TicketsList/TicketsList";
import Sort from "../Sort/Sort";
import {ITicket} from "../../core/Ticket";
import {SortType} from "../../core/Sort.type";
import {Filter} from "../../core/Filter.type";
import {plural} from "../../core/lib/plural";

interface SearchResponse {
  searchId: string;
}

interface TicketPoolResponse {
  stop: boolean;
  tickets: ITicket[];
}

function fetch<T>(url: string): Observable<T> {
  return fromFetch(url).pipe(
    switchMap(response => response.json()),
    retry(3)
  );
}

function loadTickets(): Observable<ITicket[]> {
  return fetch<SearchResponse>("https://front-test.beta.aviasales.ru/search")
    .pipe(
      pluck("searchId"),
      switchMap(searchId => interval(1000).pipe(
        switchMap(() => fetch<TicketPoolResponse>(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`)),
        takeWhile(({ stop }) => !stop),
      )),
      scan((acc, { tickets }) => acc.concat(tickets || []), [] as ITicket[]),
    );
}

function App(): JSX.Element {
  const stopsPlural = plural(["пересадка", "пересадки", "пересадок"], "Без пересадок");

  // Loading and error
  const [hasFail, setFail] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  // Sort and filtering
  const [sort, setSort] = useState<SortType>("cheap");
  const [filters, setFilters] = useState<Filter[]>([
    {
      count: -1,
      selected: true,
      label: "Все"
    },
    ...Array(4)
      .fill(0)
      .map((_, index): Filter => ({
        count: index,
        selected: true,
        label: stopsPlural(index)
      })),
  ]);

  const onSortChange = useCallback((type: SortType) => setSort(type), []);
  const onFiltersChange = useCallback((count: number, value: boolean) => {
    console.log('filter', count, value)
    // If change `all`, change all filters
    if (count === -1) {
      setFilters(filters.map(filter => Object.assign(filter, { selected: value })));
      return;
    }

    // Set new value in filter
    let newFilters: Filter[] = filters.map(filter => {
      if (count === filter.count) {
        filter.selected = value;
      }

      return filter;
    });

    // Check and update the `all` filter
    const isCanNotSelected = !!newFilters.find(el => el.count !== -1 && !el.selected);
    newFilters = filters.map(filter => {
      if (filter.count === -1) {
        filter.selected = !isCanNotSelected;
      }

      return filter;
    });

    setFilters(newFilters);
  }, [filters]);

  // Loading tickets
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
        setLoading(false);
      }
    });

    return () => subscribe.unsubscribe();
  }, []);

  useEffect(() => {
    const tickets = allTickets
      .filter((ticket) => {
        for (const filter of filters) {
          if (filter.count === -1 && filter.selected) {
            return true;
          }

          if (filter.selected && ticket.segments[0].stops.length === filter.count) {
            return true;
          }
        }

        return false;
      })
      .sort((a, b) => {
        if (sort === "fast") {
          const getDuration = (segment: ITicket): number => {
            return segment.segments.reduce((acc, el) => acc + el.duration, 0);
          };

          return getDuration(b) - getDuration(a);
        }

        if (sort === "cheap") {
          return b.price - a.price;
        }

        return 0;
      })
      .slice(-5);

    setTickets(tickets);
  }, [allTickets, sort, filters]);

  // render
  return (
      <Layout
        loading={isLoading}
        fail={hasFail}
        filters={<Filters filters={filters} onChange={onFiltersChange} />}
        sort={<Sort onChange={onSortChange} />}
        tickets={<Tickets tickets={tickets} />}
      />
  );
}

export default App;
