import {StatRow} from "../interfaces/StatRow";
import moment from "moment";
import 'moment/locale/it'

export const average = (arr: number[]) => arr.reduce((p, c) => p + c, 0) / arr.length
export const processRows = (data: string) => {
    const response: StatRow[] = []

    const isItemValid = (item: StatRow) => item.Ping && item.Upload && item.Download && item.DataOra
    const addToResponse = (item: StatRow) => {
        isItemValid(item) && response.push(item)
        tempItem = resetTempItem()
    }
    const resetTempItem = (): StatRow => {
        return {
            Ping: undefined,
            Download: undefined,
            Upload: undefined,
            DataOra: undefined
        }
    }

    let tempItem = resetTempItem()
    const arrayOfLines = data.match(/[^\r\n]+/g) ?? []
    arrayOfLines.forEach(row => {
        if (row.startsWith("--")) {
            addToResponse(tempItem)
        } else if (row.startsWith("Ping")) {
            tempItem.Ping = +(row.split(' ')[1])
        } else if (row.startsWith("Download")) {
            tempItem.Download = +(row.split(' ')[1])
        } else if (row.startsWith("Upload")) {
            tempItem.Upload = +(row.split(' ')[1])
        } else {
            tempItem.DataOra = moment(row, "ddd D MMM YYYY, HH.mm.ss, Z")
        }
    })
    addToResponse(tempItem)

    return response
        .sort((a, b) => +(b.DataOra ?? moment()).format('YYYYMMDDHHmm') - +(a.DataOra ?? moment()).format('YYYYMMDDHHmm'))
}