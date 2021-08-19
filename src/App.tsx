import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { processRows } from 'lib/utils'
import RenderData from 'components/RenderData'
import { StatRow } from 'interfaces/StatRow'

function App() {
  const [data, setData] = useState<StatRow[] | undefined>()
  useEffect(() => {
    axios.get<string>(process.env.REACT_APP_REMOTE_URL ?? '#').then((res) => {
      setData(processRows(res.data))
    })
  }, [])

  return (
    <div className="container">
      <main role="main" className="pb-3">
        {data ? <RenderData data={data} /> : 'Loading...'}
      </main>
    </div>
  )
}

export default App
