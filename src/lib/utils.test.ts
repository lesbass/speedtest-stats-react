import {average, processRows} from "./utils";
import {StatRow} from "../interfaces/StatRow";
import moment from "moment";
import 'moment/locale/it'

test('average happy path', () => {
    const data = [1, 2, 3]
    expect(average(data)).toEqual(2)
})

test('processRows happy path', () => {
    const actual = processRows(`--------
dom 15 ago 2021, 00.46.55, CEST
Ping: 29.355 ms
Download: 83.38 Mbit/s
Upload: 18.98 Mbit/s
--------
dom 15 ago 2021, 00.48.28, CEST
Ping: 28.941 ms
Download: 82.95 Mbit/s
Upload: 19.24 Mbit/s`)

    const expected :StatRow[] = [
        {
            DataOra: moment("dom 15 ago 2021, 00.48.28, CEST", "ddd D MMM YYYY, HH.mm.ss, Z"),
            Ping: 28.941,
            Download:82.95,
            Upload: 19.24
        },
        {
            DataOra: moment("dom 15 ago 2021, 00.46.55, CEST", "ddd D MMM YYYY, HH.mm.ss, Z"),
            Ping: 29.355,
            Download:83.38,
            Upload: 18.98
        },
    ]

    expect(actual).toStrictEqual(expected)
})

test('processRows with broken data', () => {
    const actual = processRows(`--------
dom 15 ago 2021, 00.46.55, CEST
Ping: 29.355 ms
Download: 83.38 Mbit/s
Upload: 18.98 Mbit/s
--------
test
--------
dom 15 ago 2021, 00.48.28, CEST
Ping: 28.941 ms
Download: 82.95 Mbit/s
Upload: 19.24 Mbit/s`)

    const expected :StatRow[] = [
        {
            DataOra: moment("dom 15 ago 2021, 00.48.28, CEST", "ddd D MMM YYYY, HH.mm.ss, Z"),
            Ping: 28.941,
            Download:82.95,
            Upload: 19.24
        },
        {
            DataOra: moment("dom 15 ago 2021, 00.46.55, CEST", "ddd D MMM YYYY, HH.mm.ss, Z"),
            Ping: 29.355,
            Download:83.38,
            Upload: 18.98
        },
    ]

    expect(actual.length).toBe(2)

    expect(actual).toStrictEqual(expected)
})