import React, {useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios"
import 'moment/locale/it'

import RenderData from "./components/RenderData";
import {StatRow} from "./interfaces/StatRow";
import {processRows} from "./lib/utils";

function App() {
    const [data, setData] = useState<StatRow[] | undefined>()
    useEffect(() => {
        const remoteUrl = process.env.REACT_APP_REMOTE_URL ?? "#"
        console.log("remoteUrl", remoteUrl)
        axios.get<string>(remoteUrl).then(res => {
            setData(processRows(res.data))
        })
    }, [])

    return (
        <div className="container">
            <main role="main" className="pb-3">
                {data ? <RenderData data={data}/> : "Loading..."}
            </main>
        </div>
    )
}

export default App