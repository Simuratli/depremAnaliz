import '../../App.css';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const convertFloat = (num) => {
    let first = [];
    let second = [];
    num = num.toString();
    num = num.split('');
    first = [num[0], num[1]];
    second = [...num.splice(2)];
    let lastArray = [].concat(first, '.', second).join('');
    return Number(lastArray);
};

const choseColor = (time) => {
    const oldYear = new Date(`${time}`).getFullYear();
    const newYear = new Date().getFullYear();
    const difference = newYear - oldYear;

    if (difference >= 100) {
        return '#474E68';
    } else if (difference >= 80) {
        return '#6B728E';
    } else if (difference >= 50) {
        return '#3F3B6C';
    } else if (difference >= 25) {
        return '#FD841F';
    } else if (difference >= 10) {
        return '#E14D2A';
    } else {
        return '#FF6464';
    }
};

function App() {
    const [deprem, setDeprem] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get('https://simuratli.github.io/DepremAPI/db.json').then((response) => {
            setDeprem(response.data.deprem);
            console.log('dere', response.data.deprem)
            setLoading(false);
        });
    }, []);

    return (
        <div className='App'>
            {loading ? (
                <>Loading..</>
            ) : (
                <MapContainer
                    center={[38.9637, 35.2433]}
                    zoom={7}
                    className='markercluster-map'
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />
                    {deprem.map((d, id) => {
                        return (
                            <CircleMarker
                                key={id}
                                center={[d.Enlem, d.Boylam]}
                                pathOptions={{ color: choseColor(d.Zaman) }}
                                radius={10}
                            >
                                <Tooltip>
                                    {d.Zaman} - {d.UTC} - {d.Buyukluk} - {d.Derinlik}
                                </Tooltip>
                            </CircleMarker>
                        );
                    })}
                </MapContainer>
            )}
        </div>
    );
}

export default App;
