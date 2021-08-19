import {Moment} from "moment";

export interface StatRow {
    Ping: number | undefined
    DataOra: Moment | undefined
    Upload: number | undefined
    Download: number | undefined
}