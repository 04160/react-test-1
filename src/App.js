import React, { Component } from 'react';
import Projects from './Components/Projects'
import Todos from './Components/Todos'
import AddProject from './Components/AddProject'
import uuid from 'uuid';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: []
    }
  }

  getTodos() {
    axios.get("https://jsonplaceholder.typicode.com/todos", {dataType:'json'})
      .then(function (response) {
        this.setState({todos: response.data}, function () {
          console.log(this.state);
        })
      }.bind(this))
      .catch(function (err) {
        console.log(err);
      });
  }

  getProjects() {
    this.setState({
      projects: [
        {
          id:uuid.v4(),
          title: "Business website",
          category: "Web Design"
        },
        {
          id:uuid.v4(),
          title: "Social App",
          category: "Mobile Development"
        },
        {
          id:uuid.v4(),
          title: "Ecommerce Shopping Cart",
          category: "Web Development"
        },
      ]});
  }

  componentWillMount() {
    this.getProjects();
    this.getTodos();
  }

  componentDidMount() {
    this.getTodos();
  }

  handleAddProject(project) {
    let projects = this.state.projects;
    projects.push(project);
    this.setState({projects: projects});
  }

  handleDeleteProject(id) {
    let projects = this.state.projects;
    let index = projects.findIndex(x => x.id === id);
    projects.splice(index, 1);
    this.setState({projects: projects});
  }

  render() {
    return (
      <div className="App">
        <AddProject addProject={ this.handleAddProject.bind(this) }/>
        My App
        <Projects projects={ this.state.projects } onDelete={this.handleDeleteProject.bind(this)}/>
        <hr/>
        <Todos todos={this.state.todos}/>
      </div>
    );
  }
}

export default App;
