import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SearchForm() {

    const [search, setSearch] = useState({nameSearch:"", idSearch:"", scoreSearch:""})
    const [searchResults, setSearchResults] = useState([]);
    const [searchResponse, setSearchResponse] = useState([]);

    const handleChange = (evt) => setSearch({...search, [evt.target.name]: evt.target.value});

    const handleSubmit = (evt) => { 
        console.log("submitted", search.nameSearch)
        if (search.nameSearch === "" && search.idSearch === "" && search.scoreSearch === "") {
            alert("Cannot search for nothing!");
        }
        else {
            axios.post("http://127.0.0.1:5000/hw2/api", {...search, pType: 'S'})
            .then(response => {
                setSearchResults(JSON.parse(response.data))
                console.log(searchResults);
            }).catch(error => {
                console.log(error);
            });
        }
    };

    let display;    

    if (searchResults.length === 0) {
        display = <h3>Nothing to show for search.</h3>
    }
    else {
        display = (<table>
            <thead>
            <tr>
                <th>Name</th>
                <th>ID</th>
                <th>Score</th>
            </tr>
            </thead>
            <tbody>
            {searchResults.map((val) => {
            return (
            <tr key={val.id}>
                <td>{val.name}</td>
                <td>{val.id}</td>
                <td>{val.score}</td>
            </tr>
            )
        })}
            </tbody>
        </table>
        )
        }

    return (
        <div>
        <h1>Search</h1>
        <form onChange={handleChange}>
            <label>Name:</label>
            <input type="text" name="nameSearch" value={search.nameSearch}></input><br></br>
            <label>ID:</label>
            <input type="text" name="idSearch" value={search.idSearch}></input><br></br>
            <label>Score:</label>
            <input type="text" name="scoreSearch" value={search.scoreSearch}></input><br></br>
            <button type="button" onClick={handleSubmit}>Submit</button>
        </form>
        <h2>Results</h2>
        <div>
            {display}
        </div>
        </div>
    );
}

export default SearchForm;