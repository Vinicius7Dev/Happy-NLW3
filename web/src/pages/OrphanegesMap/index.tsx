import React from 'react';
import { Link } from 'react-router-dom';
import { Map, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import '../../styles/pages/orphaneges-map.css';

import { FiPlus } from 'react-icons/fi';

import mapMarkerImg from '../../assets/map-marker.svg';

function OrphanegesMap() {
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
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
            </Map>

            <Link to="/" className="create-orphanage" >
                <FiPlus size={32} color="#FFFFFF" />
            </Link>
        </div>
    )
}

export default OrphanegesMap;