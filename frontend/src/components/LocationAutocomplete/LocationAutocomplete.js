import React, { Component, PropTypes } from 'react';
import './LocationAutocomplete.css';

class LocationAutocomplete extends Component {
    static propTypes = {
        saveLocation: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.input = null;
        this.autocomplete = null;
    }

    componentDidMount() {
        this.autocomplete = new window.google.maps.places.Autocomplete(this.input, {});
        this.autocomplete.addListener('place_changed', () => { this.onPlaceChanged(); });
    }

    onPlaceChanged() {
        const place = this.autocomplete.getPlace();
        const data = {};

        data.place_id = place.place_id;
        data.address = place.formatted_address;
        data.lat = place.geometry.location.lat();
        data.long = place.geometry.location.lng();
        data.url = place.url;

        for (let i = 0; i < place.address_components.length; i++) {
            if(place.address_components[i].types[0] === 'postal_code'){
                data.postal_code = place.address_components[i].long_name;
            }
            if(place.address_components[i].types[0] === 'country'){
                data.country = place.address_components[i].long_name;
            }
        }

        if (this.props.saveLocation) {
            this.props.saveLocation(data);
        }
    }

    render() {
        return (
            <input
                ref={(e) => { this.input = e; }}
                type="text"
                className="Location-Autocomplete-Search"
                placeholder="Search for a location!"
            />
        );
    }
}

export default LocationAutocomplete;
