import React from 'react'
import { render } from '@testing-library/react'
import moment from 'moment'

import RenderData from 'components/RenderData'
import { StatRow } from 'interfaces/StatRow'

describe('RenderData', () => {
  it('happy path', () => {
    const data: StatRow[] = [
      {
        DataOra: moment('dom 15 ago 2021, 00.48.28, CEST', 'ddd D MMM YYYY, HH.mm.ss, Z'),
        Ping: 28.941,
        Download: 82.95,
        Upload: 19.24,
      },
      {
        DataOra: moment('dom 15 ago 2021, 00.46.55, CEST', 'ddd D MMM YYYY, HH.mm.ss, Z'),
        Ping: 29.355,
        Download: 83.38,
        Upload: 18.98,
      },
    ]
    const { getAllByTestId, getByTestId } = render(<RenderData data={data} />)

    expect(getAllByTestId('rendered-row')).toHaveLength(2)
    expect(getByTestId('total-count').textContent).toStrictEqual('2 total count')
  })
  it('no data', () => {
    const { queryByTestId, getByTestId } = render(<RenderData data={[]} />)

    expect(queryByTestId('rendered-row')).toBeNull()
    expect(getByTestId('total-count').textContent).toStrictEqual('0 total count')
  })
})
