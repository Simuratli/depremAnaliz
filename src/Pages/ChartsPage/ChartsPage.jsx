import React from 'react'
import { StockBuyukluk, StockDerinlik, YikicilikGraph } from '../../components'
import './ChartsPage.css'

function ChartsPage() {
    return (
        <div className='charts__page'>
            <StockBuyukluk />
            <br /><br /><br />
            <StockDerinlik />
            <br /><br /><br />
            <YikicilikGraph />
        </div>
    )
}

export default ChartsPage