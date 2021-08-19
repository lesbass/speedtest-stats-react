import React from "react";
import {StatRow} from "../interfaces/StatRow";
import {average} from "../lib/utils";

const RenderData : React.VFC<{data: StatRow[]}> = ({data}) => {
    return <>
        <div className="text-center">
            <p>{data?.length} total count</p>
        </div>

        <table style={{"width": "100%"}}>
            <thead>
            <tr>
                <th>Time</th>
                <th>Ping</th>
                <th>Download</th>
                <th>Upload</th>
            </tr>
            </thead>
            <tbody>
            {data?.map((item, i) => {
                return (<tr key={i}>
                    <td>{item.DataOra?.format("DD/MM/YY HH:mm")}</td>
                    <td>{item.Ping} ms</td>
                    <td>{item.Download} Mbit/s</td>
                    <td>{item.Upload} Mbit/s</td>
                </tr>)
            })}
            </tbody>
            <tfoot>
            <tr>
                <th>Avg.</th>
                <th>{data && average(data.map(item => item.Ping ?? 0)).toFixed(2)} ms</th>
                <th>{data && average(data.map(item => item.Download ?? 0)).toFixed(2)} Mbit/s</th>
                <th>{data && average(data.map(item => item.Upload ?? 0)).toFixed(2)} Mbit/s</th>
            </tr>
            </tfoot>
        </table></>
}

export default RenderData