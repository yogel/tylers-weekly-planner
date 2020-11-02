import React, { Component } from 'react';
import LISTS from '../../constants/lists';

class AddToDo extends Component {
    constructor(props) {
        super(props);
        this.addTodoText = React.createRef();

        this.state = {
            todoText: '',
        };
    }

    addToDoItem = event => {
        event.preventDefault();

        const newTodoText = this.addTodoText.current.value;

        // Make sure the text field isn't empty
        if (newTodoText.trim() !== '') {
            const newToDoItem = {
                list: LISTS[0],
                text: newTodoText,
            };

            this.props.onAddTodoItem(newToDoItem);
        }

        // Clear the input
        this.addTodoText.current.value = '';
    }

    render() {
        return (
            <form
                onSubmit={this.addToDoItem}
                className="addTodoForm"
            >
                <input type="text" ref={this.addTodoText} />
                <button type="submit">Add Item</button>
            </form>
        );
    }
}

export default AddToDo;