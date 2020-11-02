import React, { useState } from 'react';
import AddToDo from '../AddToDo';
import TodoItem from '../TodoItem';
import DropWrapper from '../DropWrapper';

// Import lists constants
import LISTS from '../../constants/lists';

// Add in Styles
import './styles.scss';

const TodoQueue = () => {
    const [items, setItems] = useState([]);

    const addTodoItem = newItem => {
        setItems(prevState => {
            return [ ...prevState, newItem];
        });
    }

    const onDrop = () => {

    }

    return (
        <div className="todoqueue">
            <h3>Hello, this is the queue</h3>
            {/* List the to do items in the queue */}
            {LISTS.map(list => {
                return (
                    <DropWrapper onDrop={onDrop} className="todoqueue-list">
                        {(items || []).map((item, index) => {
                            return item.list === list ? <TodoItem key={index} item={item}></TodoItem> : '';
                        })}
                    </DropWrapper>
                )
            })}
            {/* Add a way to add in to do items */}
            <AddToDo onAddTodoItem={addTodoItem} />
        </div>
    );
}

export default TodoQueue;