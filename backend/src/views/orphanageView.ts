import Orphanage from '../models/Orphanage';

import imageView from './imageView';

export default {
    render(orphanage: Orphanage) {
        return {
            id: orphanage.id,
            name: orphanage.name,
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
            about: orphanage.about,
            instructions: orphanage.instructions,
            opening_hours: orphanage.opening_hours,
            open_on_weekends: orphanage.open_on_weekends,
            images: imageView.renderMany(orphanage.images)
        }
    },
    
    renderMany(orphanages: Orphanage[]) {
        return orphanages.map(orphanage => this.render(orphanage));
    }
}