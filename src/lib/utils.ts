import {StatRow} from "../interfaces/StatRow";
import moment, {Moment} from "moment";

export const average = (arr: number[]) => arr.reduce((p, c) => p + c, 0) / arr.length
export const processRows = (data: string) => {
    const response: StatRow[] = []

    let tempData: Moment | null
    let tempPing: number | null
    let tempUpload: number | null
    let tempDownload: number | null
    const arrayOfLines = data.match(/[^\r\n]+/g) ?? []
    arrayOfLines.forEach(row => {
        if (row.startsWith("--")) {
            response.push(
                {
                    Ping: tempPing,
                    DataOra: tempData,
                    Upload: tempUpload,
                    Download: tempDownload,
                })

            tempPing = 0
            tempData = null
            tempUpload = 0
            tempDownload = 0
        } else if (row.startsWith("Ping")) {
            tempPing = +(row.split(' ')[1])
        } else if (row.startsWith("Download")) {
            tempDownload = +(row.split(' ')[1])
        } else if (row.startsWith("Upload")) {
            tempUpload = +(row.split(' ')[1])
        } else {
            tempData = moment(row, "ddd D MMM YYYY, HH.mm.ss, Z")
        }
    })
    return response
        .filter(item => item.DataOra)
        .sort((a, b) => +(b.DataOra ?? moment()).format('YYYYMMDDHHmm') - +(a.DataOra ?? moment()).format('YYYYMMDDHHmm'))
}