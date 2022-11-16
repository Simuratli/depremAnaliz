import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.stock.react';
import axios from 'axios';
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

class StockChartWithRangeSelector extends Component {
  constructor(props) {
    super(props);
    this.state = { dataPoints: [], isLoaded: false };
  }

  componentDidMount() {
    //Reference: https://reactjs.org/docs/faq-ajax.html#example-using-ajax-results-to-set-local-state
    fetch('https://canvasjs.com/data/gallery/react/btcusd2017-18.json').then(
      (res) => res.json()
    );

    let newDops = [];

    axios
      .get('https://simuratli.github.io/DepremAPI/db.json')
      .then((response) => {
        for (var i = 0; i < response.data.deprem.length; i++) {
          newDops.push({
            x: new Date(response.data.deprem[i].Zaman),
            y: Number(response.data.deprem[i].Derinlik),
          });

          console.log(newDops, 'newDops');
          this.setState({
            isLoaded: true,
            dataPoints: newDops,
          });
        }
      });
  }

  render() {
    const options = {
      title: {
        text: 'Yıllara göre deprem derinliği',
      },
      theme: 'light2',
      subtitles: [
        {
          text: 'BTC/USD',
        },
      ],
      charts: [
        {
          axisX: {
            crosshair: {
              enabled: true,
              snapToDataPoint: true,
              valueFormatString: 'MMM DD YYYY',
            },
          },
          axisY: {
            title: 'Deprem derinliği',
            prefix: '',
            crosshair: {
              enabled: true,
              snapToDataPoint: true,
              valueFormatString: '#,###.##',
            },
          },
          toolTip: {
            shared: true,
          },
          data: [
            {
              name: 'Derinlik',
              type: 'splineArea',
              color: '#3576a8',
              yValueFormatString: '#,###.##',
              xValueFormatString: 'MMM DD YYYY',
              dataPoints: this.state.dataPoints,
            },
          ],
        },
      ],
      navigator: {
        slider: {
          minimum: new Date('2017-05-01'),
          maximum: new Date('2018-05-01'),
        },
      },
    };
    const containerProps = {
      width: '80%',
      height: '450px',
      margin: 'auto',
    };
    return (
      <div>
        {this.state.isLoaded && (
          <CanvasJSStockChart
            containerProps={containerProps}
            options={options}
          />
        )}
      </div>
    );
  }
}

export default StockChartWithRangeSelector;
