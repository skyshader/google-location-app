import React, { Component, PropTypes } from 'react';
import './LocationList.css';

class LocationList extends Component {
    static propTypes = {
        locations: PropTypes.arrayOf(PropTypes.shape({
            place_id: PropTypes.string.isRequired,
            address: PropTypes.string.isRequired,
            lat: PropTypes.number.isRequired,
            long: PropTypes.number.isRequired,
            url: PropTypes.string.isRequired,
            country: PropTypes.string,
            postal_code: PropTypes.string
        })).isRequired
    };

    render() {
        return (
            <div className="Location-List">
                {
                    this.props.locations.map((location) => (
                        <div className="Location-list-item" key={`${location.place_id}-${location.user_id}`}>
                            <p><strong>Place Id:</strong> {location.place_id}</p>
                            <p><strong>Address:</strong> {location.address}</p>
                            <p><strong>Lat:</strong> {location.lat}</p>
                            <p><strong>Long:</strong> {location.long}</p>
                            <p><strong>Url:</strong> {location.url}</p>
                            <p><strong>Country:</strong> {location.country}</p>
                            <p><strong>Postal:</strong> {location.postal_code}</p>
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default LocationList;
