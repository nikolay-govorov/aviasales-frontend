import React, {useState} from 'react';

import Layout from "../Layout/Layout";
import Filters from "../Filters/Filters";
import Tickets from "../TicketsList/TicketsList";
import {ITicket} from "../../core/Ticket";

function App(): JSX.Element {
  const [tickets] = useState<ITicket[]>([
    {
      "price": 37135,
      "carrier": "MH",
      "segments": [
        {
          "origin": "MOW",
          "destination": "HKT",
          "date": "2020-01-11T07:39:00.000Z",
          "stops": [],
          "duration": 1981
        },
        {
          "origin": "MOW",
          "destination": "HKT",
          "date": "2020-01-31T06:46:00.000Z",
          "stops": [
            "SIN"
          ],
          "duration": 650
        }
      ]
    },
    {
      "price": 83957,
      "carrier": "FV",
      "segments": [
        {
          "origin": "MOW",
          "destination": "HKT",
          "date": "2020-01-11T05:32:00.000Z",
          "stops": [
            "HKG"
          ],
          "duration": 1716
        },
        {
          "origin": "MOW",
          "destination": "HKT",
          "date": "2020-01-31T07:56:00.000Z",
          "stops": [],
          "duration": 1467
        }
      ]
    },
    {
      "price": 23920,
      "carrier": "EY",
      "segments": [
        {
          "origin": "MOW",
          "destination": "HKT",
          "date": "2020-01-11T04:08:00.000Z",
          "stops": [
            "HKG",
            "IST"
          ],
          "duration": 1594
        },
        {
          "origin": "MOW",
          "destination": "HKT",
          "date": "2020-01-31T04:58:00.000Z",
          "stops": [
            "HKG",
            "AUH"
          ],
          "duration": 1152
        }
      ]
    },
    {
      "price": 97963,
      "carrier": "FV",
      "segments": [
        {
          "origin": "MOW",
          "destination": "HKT",
          "date": "2020-01-11T04:27:00.000Z",
          "stops": [],
          "duration": 1698
        },
        {
          "origin": "MOW",
          "destination": "HKT",
          "date": "2020-01-31T05:27:00.000Z",
          "stops": [
            "SIN",
            "DXB"
          ],
          "duration": 1312
        }
      ]
    },
    {
      "price": 57083,
      "carrier": "MH",
      "segments": [
        {
          "origin": "MOW",
          "destination": "HKT",
          "date": "2020-01-11T17:16:00.000Z",
          "stops": [
            "AUH"
          ],
          "duration": 1062
        },
        {
          "origin": "MOW",
          "destination": "HKT",
          "date": "2020-01-31T16:21:00.000Z",
          "stops": [
            "BKK",
            "SIN"
          ],
          "duration": 988
        }
      ]
    },
  ]);

  return (
      <Layout
        filters={<Filters />}
        tickets={<Tickets tickets={tickets} />}
      />
  );
}

export default App;
