import React, { Fragment } from 'react';
import './App.css';

const tasks = [{ content: 'item1', completed: false, edit: false }];

class App extends React.Component {
  state = {
    tasks,
    newTask: '',
    editTask: '',
    edition: true
  };
  handleChange = e => {
    this.setState({
      newTask: e.target.value
    });
  };
  handleEdit = e => {
    this.setState({
      editTask: e.target.value
    });
  };
  handleClick = content => {
    if (this.state.tasks)
      this.setState({
        tasks: [
          ...this.state.tasks,
          { content, completed: false, edit: false }
        ],
        newTask: ''
      });
  };
  deleteTask = i => {
    this.setState({
      tasks: this.state.tasks.filter((el, index) => index !== i)
    });
  };
  completeTask = i => {
    this.setState({
      tasks: this.state.tasks.map((el, index) => {
        if (index === i) {
          el.completed = !el.completed;
          return el;
        } else return el;
      })
    });
  };
  editTask = i => {
    this.setState({
      tasks: this.state.tasks.map((el, index) => {
        if (index === i) {
          el.edit = !el.edit;
          this.setState({
            editTask: el.content
          });
          el.content = this.state.editTask;
          return el;
        } else return el;
      })
    });
  };
  render() {
    return (
      <Fragment>
        <section className="todo-header">
          <h1>To-Do App!</h1>
          <h3>Add New To-Do</h3>
          <input
            type="text"
            placeholder="Enter new task"
            className="new-task"
            onChange={this.handleChange}
            value={this.state.newTask}
          />
          <input
            type="button"
            value="Add"
            className="add-button"
            onClick={() => this.handleClick(this.state.newTask)}
          />
        </section>
        <section className="display-tasks">
          <h2>Let's get some work done!</h2>
          <hr />
          <ul className="tasks-list">
            {this.state.tasks.map((el, i) =>
              el.edit ? (
                <Fragment key={i}>
                  <input
                    type="button"
                    value="Done"
                    className="task-button"
                    onClick={() => {
                      this.editTask(i);
                      this.setState({
                        edition: true
                      });
                    }}
                  />
                  <input
                    type="text"
                    name='edit'
                    value={this.state.editTask}
                    onChange={this.handleEdit}
                  />
                </Fragment>
              ) : (
                <li key={i}>
                  <input
                    type="button"
                    value="Complete"
                    className="task-button"
                    onClick={() => this.completeTask(i)}
                  />
                  <input
                    type="button"
                    value="Delete"
                    className="task-button"
                    onClick={() => this.deleteTask(i)}
                  />
                  <input
                    type="button"
                    value="Edit"
                    className="task-button"
                    onClick={() => {
                      this.state.edition && this.editTask(i);
                      this.setState({
                        edition: false
                      });
                    }}
                  />
                  <span className={`task ${el.completed && 'completed-task'}`}>
                    {el.content}
                  </span>
                </li>
              )
            )}
          </ul>
        </section>
      </Fragment>
    );
  }
}

export default App;
