import React from 'react'
import { StockBuyukluk, StockDerinlik } from '../../components'
import './ChartsPage.css'

function ChartsPage() {
    return (
        <div className='charts__page'>
            <StockBuyukluk />
            <br /><br /><br />
            <StockDerinlik />
        </div>
    )
}

export default ChartsPage