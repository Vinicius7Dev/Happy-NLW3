import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup} from 'react-leaflet';

import '../../styles/pages/orphaneges-map.css';

import { FiPlus, FiArrowRight } from 'react-icons/fi';

import mapMarkerImg from '../../assets/map-marker.svg';
import mapIcon from '../../utils/mapIcon';
import api from '../../service/api';

interface OrphanageData {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

function OrphanegesMap() {
    const [orphanages, setOrphanages] = useState<OrphanageData[]>([]);

    useEffect(() => {
        api.get('/orphanages').then(response => {
            setOrphanages(response.data);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>
                        Muitas crianças estão esperando sua visita :D
                    </p>
                </header>

                <footer>
                    <strong>Franca</strong>
                    <span>São Paulo</span>
                </footer>
            </aside>

            <Map
                center={[-20.5350158,-47.4045004]}
                zoom={14}
                style={{ width: '100%', height: '100%' }}
            >
                <TileLayer
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                {
                    orphanages.map(orphan => (
                        <Marker
                            key={orphan.id}
                            icon={mapIcon}
                            position={[orphan.latitude, orphan.longitude]}
                        >
                            <Popup
                                closeButton={false}
                                minWidth={240}
                                maxWidth={240}
                                className="map-popup"
                            >
                                { orphan.name }
                                <Link to={`/orphanages/${orphan.id}`}>
                                    <FiArrowRight size={20} color="#FFFFFF" />
                                </Link>
                            </Popup>
                        </Marker>
                    ))
                }
            </Map>

            <Link to="/create-orphanage" className="create-orphanage" >
                <FiPlus size={32} color="#FFFFFF" />
            </Link>
        </div>
    )
}

export default OrphanegesMap;