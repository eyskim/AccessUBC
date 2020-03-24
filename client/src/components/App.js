import SearchBar from "./SearchBar";
import SearchMap from "./SearchMap";
import React from "react";
import axios from "axios";

class App extends React.Component {
    state = {building: "", entrances: [{lat: null, long: null}]};

    onSearchSubmit = async term => {
        let search = parseInt(term, 10);
        const res = await axios.get("http://localhost:4000/api/buildings", {
            params: { query: term }
        });
        let changed = false;
        res.data.data.forEach((data) => {
            if (data["id"] === search) {
                changed = true;
                this.setState({building: data["name"]});
                this.setState({entrances: data["entrances"]});
            }
        });
        if(!changed) {
            this.setState({building: "not found"});
            this.setState({entrances: [{lat: "not found", long: "not found"}]})
        }
    };

    render = () => {
        return(
            <div className="app">
                <h1>Access UBC</h1>
                <div>Search Icon</div>
                <SearchBar onSubmit={this.onSearchSubmit}/>
                <SearchMap coords={this.state.entrances} name={this.state.building}/>
            </div>
        );
    };
}

export default App;