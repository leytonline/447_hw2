import logo from './../logo.svg';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function createForm() {
    const [first, setFirst] = useState("");

    return (
        <form onSubmit={console.log(this.useState(first))}>
          <label>First name:</label>
          <input type="text" value={first} onChange={(text) => {first(text.target.value)}}></input>
          <input type="submit"></input>
        </form>
      );


}

export default createForm;