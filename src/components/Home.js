import React, { Component } from 'react';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.displayName = this.constructor.name;
        this.apiAddress = 'https://localhost:44302/api/people';
        this.state = {
            items: [],
            newPeopleName: ''
        };
        this.handleNewPeopleNameChange = this.handleNewPeopleNameChange.bind(this);
    }

    handleNewPeopleNameChange(event) {
        this.setState({ newPeopleName: event.target.value });
    }

    componentDidMount() {
        this.getPeople();
    }

    getPeople() {
        fetch(this.apiAddress)
            .then(res => res.json())
            .then(data => this.setState({ items: data }))
            .catch(err => console.log(err));
    }

    deletePeople(id) {
        fetch(this.apiAddress + '/' + id, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    alert('Id not found');
                }
                this.getPeople();
            })
            .catch(err => console.log(err));
    }

    savePeople() {
        const fetchOptions = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ "Email": "andrzej@wp.pl", "IsActive": true, "Name": this.state.newPeopleName, "Surname": "Zielony", "Phone": "673012657" })
        };

        fetch(this.apiAddress, fetchOptions)
            .then(response => {
                if (!response.ok) {
                    alert('Error!');
                }
                this.getPeople();
            })
            .catch(err => console.log(err));
    }

    render() {
        const listItems = this.state.items.map((item, index) => (
            <div key={index.toString()}>
                {item.email}
                <button onClick={() => this.deletePeople(item.id)}>Delete</button>
            </div>
        ));

        return (
            <div>
                <div>
                    <input
                        value={this.state.newPeopleName}
                        onChange={this.handleNewPeopleNameChange}
                    />
                    <button onClick={() => this.savePeople()}>Save</button>
                </div>
                {listItems}
            </div>
        );
    }
}
