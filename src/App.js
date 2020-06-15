import React, {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck';
import Form from 'react-bootstrap/Form';
import Columns from 'react-columns';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from "axios";

function App() {
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const [searchCountries, setSearchCountries] = useState("");

  useEffect(() => {
    axios
    .all([
      axios.get("https://covid-dashboard.herokuapp.com/api/stats/"),
      axios.get("https://covid-dashboard.herokuapp.com/api/countries/")
    ])
    
    .then(resArr => {
      setLatest(resArr[0].data);
      setResults(resArr[1].data);
    })
    .catch(err => {
      console.error();
    });
  }, []);

const filterCountries = results.filter(item => {
  return searchCountries !== "" ? item.country.includes(searchCountries) : item;
});

const countries = filterCountries.map((data, i) => {
  return(
    <Card
    key={i}
    className="text-center"
    bg={"light"}
    text={'dark'}
    style={{ margin: "10px"}}>
      <Card.Body>
        <Card.Title>{data.country}</Card.Title>
        <Card.Text>
          Confirmed {data.confirmed}
        </Card.Text>
        <Card.Text>
          Deaths {data.deaths}
        </Card.Text>
        <Card.Text>
          Recovered {data.recovered}
        </Card.Text>
        <Card.Text>
          Active {data.confirmed - (data.deaths + data.recovered)}
        </Card.Text>
      </Card.Body>
    </Card>
  );
});



  return (
    <div>
      <br/>
        <h2 style={{ textAlign: "center"}}> COVID-19 Worldwide Data </h2>
      <br/>
    <CardDeck>
    <Card
    className="text-center"
    bg={"secondary"}
    text={'white'}
    style={{ margin: "10px"}}>
      <Card.Body>
        <Card.Title>Confirmed</Card.Title>
        <Card.Text>
          {latest.confirmed}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small>{latest.lastupdate}</small>
      </Card.Footer>
    </Card>
    <Card
    className="text-center"
    bg={"danger"}
    text={'white'}
    style={{ margin: "10px"}}>
      <Card.Body>
        <Card.Title>Deaths</Card.Title>
        <Card.Text>
        {latest.deaths}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small>{latest.lastupdate}</small>
      </Card.Footer>
    </Card>
    <Card 
    className="text-center"
    bg={"success"}
    text={'white'}
    style={{ margin: "10px"}}>
      <Card.Body>
        <Card.Title>Recovered</Card.Title>
        <Card.Text>
        {latest.recovered}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small>{latest.lastupdate}</small>
      </Card.Footer>
    </Card>
  </CardDeck>
  <Form>
  <Form.Group controlId="formGroupSearch">
    <Form.Control type="text" placeholder="Search" 
    onChange={e => setSearchCountries(e.target.value)}/>
  </Form.Group>
</Form>

  <Columns>
  {countries}
  </Columns>
  
  </div>
  );
}

export default App;
