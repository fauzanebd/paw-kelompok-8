

import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class CreateAnimal extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeAnimalName = this.onChangeAnimalName.bind(this);
    this.onChangeAnimalSpecies = this.onChangeAnimalSpecies.bind(this);
    this.onChangeAnimalAge = this.onChangeAnimalAge.bind(this);
    this.onChangeAnimalAdopted = this.onChangeAnimalAdopted.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      name: '',
      species: '',
      age: '',
      adopted: false
    }
  }

  onChangeAnimalName(e) {
    this.setState({ name: e.target.value })
  }

  onChangeAnimalSpecies(e) {
    this.setState({ species: e.target.value })
  }

  onChangeAnimalAge(e) {
    this.setState({ age: e.target.value })
  }

  onChangeAnimalAdopted(e) {
    this.setState({ adopted: !this.state.adopted })
  }  

  onSubmit(e) {
    e.preventDefault()

    const animalObject = {
      name: this.state.name,
      species: this.state.species,
      age: this.state.age,
      adopted: this.state.adopted
    };

    axios.post('http://paw8backend.herokuapp.com/animals/create-animal/', animalObject)
      .then(res => console.log(res.data));

    //this.props.history.push('/')
    // this.setState({
    //   name: '',
    //   species: '',
    //   age: '',
    //   adopted: false
    // });
  }



  render() {
    return (<div className="form-wrapper">
      <h3 >Insert Animal Data </h3>
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={this.state.name} onChange={this.onChangeAnimalName} />
        </Form.Group>

        <Form.Group controlId="Species">
          <Form.Label>Species</Form.Label>
          <Form.Control type="text" value={this.state.species} onChange={this.onChangeAnimalSpecies} />
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Born date</Form.Label>
          <Form.Control type="Date" value={this.state.age} onChange={this.onChangeAnimalAge} />
        </Form.Group>

        <div>
        <Form.Group controlId="Adopted">
          <Form.Label>  Adoption Status</Form.Label>
          <Form.Check as="input" class="form-check-input" type="checkbox" label="Adopted" value={this.state.adopted} onChange={this.onChangeAnimalAdopted}  />
        </Form.Group>
        </div>

        <Button onClick = {this.onSubmit} className='button' variant="primary" size="lg" block="block" type="submit" href="/animal-list"> 
          Add Animal
        </Button>
      </Form>
    </div>);
  }
}
