import React, { useState } from "react";
import "./styles.css";

const a = {
  user: {
    id: 1,
    name: {
      firstName: "James",
      lastName: "Ibori"
    },
    location: {
      city: "Ikoyi",
      state: "Lagos",
      address: "One expensive house like that"
    }
  }
}

function getPath (obj, query) {
  if (obj.constructor !== Object) {
    throw new TypeError("Invalid Input");
  }

  var path = [];
  var found = false;
  function search(item) {
    for(var key in item) {
      path.push (key);
      if (item[key] === query) {
        found =  true;
        break;
      }
      if (item[key].constructor === Object) {
        search(item[key]);
        if (found) break;
      }
      path.pop();
    }
  }
  search(obj);
  setSearch(path);
}

const Form = () => {
  return (
    <form onChange={(e) => {
      // e.preventDefault();
      getPath({a, query: e.target.search.value});
    }}>
      <input type="text" name="search"/>
      <input type="submit" value="Search" />
    </form>
  )
}

function Display({ search }) {
  return (
    <label>{search}</label>
  );
}

export default function App(props) {
  const [search, setSearch] = useState([]);


  const makeSearch = (obj) => {
    setSearch((prev) => [...prev, obj]);
  };

  return (
    <div className="App">
      <h1>Make a search</h1>
      <Form makeSearch={makeSearch} />
      <Display search={search} />
    </div>
  );
}

