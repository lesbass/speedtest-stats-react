import {Moment} from "moment";

export interface StatRow {
    Ping: number | null
    DataOra: Moment | null
    Upload: number | null
    Download: number | null
}