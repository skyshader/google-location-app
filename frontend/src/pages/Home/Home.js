import React, { Component } from 'react';
import './Home.css';
import LogoutButton from '../../components/LogoutButton';
import LocationAutocomplete from "../../components/LocationAutocomplete";
import LocationList from "../../components/LocationList";
import Authentication from '../../core/authentication';
import constants from '../../constants';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            locations: []
        };
    }

    componentDidMount() {
        this.fetchLocationHistory();
    }

    fetchLocationHistory() {
        const auth_token = Authentication.get().token;

        fetch(`${constants.API_ENDPOINT}/location`, {
            method: 'GET',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `JWT ${auth_token}`
            })
        }).then(_ => _.json())
            .then(result => {
                if (!result.success) {
                    console.error(result.error);
                    return;
                }

                this.setState(Object.assign({}, this.state, { locations: result.data.locations }));
            })
            .catch((err) => this.handleError(err));
    }

    saveLocation(location) {
        const auth_token = Authentication.get().token;

        fetch(`${constants.API_ENDPOINT}/location`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(location),
            headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${auth_token}`
                })
        })
            .then(_ => _.json())
            .then(result => {
                if (!result.success) {
                    console.error(result.error);
                    return;
                }

                return this.handleSuccess(result.data);
            })
            .catch(console.error);
    }

    handleSuccess(result) {
        const locations = this.state.locations;
        locations.unshift(result.location);
        this.setState(Object.assign({}, this.state, { locations }));
    }

    render() {
        return (
            <div className="Home-container">
                <h2 className="heading">Home</h2>

                <LogoutButton/>

                <LocationAutocomplete
                    saveLocation={(location) => { this.saveLocation(location) }}
                />

                <LocationList locations={this.state.locations}/>
            </div>
        );
    }
}

export default Home;
