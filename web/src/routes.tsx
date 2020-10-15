import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CreateOrphanage from './pages/CreateOrphanage';

import Landing from './pages/Landing';
import Orphanage from './pages/Orphanage';
import OrphanagesMap from './pages/OrphanegesMap';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Landing} exact />
                <Route path="/orphanages" component={OrphanagesMap} exact />
                <Route path="/orphanages/:id" component={Orphanage} exact />
                <Route path="/create-orphanage" component={CreateOrphanage} exact />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;