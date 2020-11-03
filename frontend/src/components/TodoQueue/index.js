import React, { useState } from 'react';
import AddToDo from '../AddToDo';
import TodoItem from '../TodoItem';
import DropWrapper from '../DropWrapper';

// Import lists constants
import LISTS from '../../constants/lists';

// Add in Styles
import './styles.scss';

const TodoQueue = () => {
    // Add in some dummy data for now
    const [items, setItems] = useState([
        {
            id: 0,
            list: 'QUEUE',
            isDone: false,
            title: 'First task',
            checkList: [],
            description: '',
            resources: [],
            images: [], 
        },
        {
            id: 1,
            list: 'QUEUE',
            isDone: false,
            title: 'Second task',
            checkList: [],
            description: '',
            resources: [],
            images: [], 
        },
        {
            id: 2,
            list: 'QUEUE',
            isDone: false,
            title: 'Third task',
            checkList: [],
            description: '',
            resources: [],
            images: [], 
        },
        {
            id: 3,
            list: 'QUEUE',
            isDone: false,
            title: 'Fourth task',
            checkList: [],
            description: '',
            resources: [],
            images: [], 
        },
    ]);

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
                    <DropWrapper key={list} onDrop={onDrop} className="todoqueue-list">
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