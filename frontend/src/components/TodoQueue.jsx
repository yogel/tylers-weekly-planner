import React, { useState } from 'react';
import AddToDo from './AddToDo';
import TodoItem from './TodoItem';
import DropWrapper from './DropWrapper';

// Import lists constants
import LISTS from '../constants/lists';

// Add in Styles
import '../styles/todoQueueStyles.scss';

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

    // Add this in if we need to change the "upper state" in this component
    const itemChanged = newItem => {
        // setItems(prevState => {
        //     const itemId = newItem.id;
        //     // Find the index of the item that should be changed
        //     let indexOfChangedItem = -1;

        //     prevState.forEach((item, index) => {
        //         if (item.id === itemId) {
        //             indexOfChangedItem = index
        //         }
        //     });

        //     // Set the new item based off the index
        //     prevState[indexOfChangedItem] = newItem;

        //     return prevState;
        // });
    }

    const deleteItem = item => {
        setItems(prevState => {
            const indexOfItemBeingDeleted = prevState.indexOf(item);

            // Just make sure the item is found
            if (indexOfItemBeingDeleted > -1) {
                prevState.splice(indexOfItemBeingDeleted, 1);
            }

            return [ ...prevState ];
        });
    }

    // Drag and drop functionality below
    const onDrop = (item, monitor, list) => {
        setItems(prevState => {
            const newItems = prevState
                .filter(i => i.id !== item.id)
                .concat({...item, list});

                return [ ...newItems ]
        });
    };

    const moveItem = (dragIndex, hoverIndex) => {
        const item = items[dragIndex];

        setItems(prevState => {
            const newItems = prevState.filter((i, index) => index !== dragIndex);

            newItems.splice(hoverIndex, 0, item);

            return [ ...newItems ];
        });
    };

    const addTodoItem = newItem => {
        setItems(prevState => {
            return [ ...prevState, newItem];
        });
    }

    return (
        <div className="todoqueue">
            <h3>Hello, this is the queue</h3>
            {/* List the to do items in the queue */}
            {LISTS.map(list => {
                return (
                    <div key={list}>
                        <h2>{list}</h2>
                        <DropWrapper
                            onDrop={onDrop}
                            list={list}
                            className="todoqueue-list"
                        >
                            {
                            items
                                .filter(i => i.list === list)
                                .map((item, index) =>(
                                    <TodoItem
                                        key={item.id}
                                        item={item}
                                        index={index}
                                        moveItem={moveItem}
                                        list={list}
                                        onItemChanged={itemChanged}
                                        onDeleteItem={deleteItem}
                                    />
                                ))
                            }
                        </DropWrapper>
                    </div>
                );
            })}
            {/* Add a way to add in to do items */}
            <AddToDo onAddTodoItem={addTodoItem} />
        </div>
    );
}

export default TodoQueue;