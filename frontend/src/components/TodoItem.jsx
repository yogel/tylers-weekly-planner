import React, {useRef, Fragment, useState} from 'react';
import { useDrag, useDrop } from 'react-dnd';

const TodoItem = ({ item, index, moveItem, onItemChanged, onDeleteItem, list }) => {
    const itemContainerRef = useRef(null);
    const editItemTextInput = useRef(null);
    const [isDone, setIsDone] = useState(item.isDone);
    const [inEditMode, setInEditMode] = useState(false);
    const [taskTitle, setTaskTitle] = useState(item.title);
    const [reservedTitle, setReservedTitle] = useState(item.title);

    const handleCheckboxChange = () => {
        setIsDone(!isDone);
        // Propagate the event upwards
        item.isDone = !isDone;
        onItemChanged(item);
    }

    const handleOnEditClick = () => {
        // Save old title just in case we want to cancel the edit
        setReservedTitle(taskTitle);

        console.log(reservedTitle);
        // Add in input with state
        setInEditMode(true);
    }

    const handleOnCancelEditClick = () => {
        console.log(reservedTitle);
        // Revert back to old title
        setTaskTitle(reservedTitle);
        // Set back into non-edit mode
        setInEditMode(false);
    }

    const handleSaveEditClick = () => {
        // Propagate the event upwards
        onItemChanged(item);
        // Set state back to non-edit mode
        setInEditMode(false);
    }

    const handleDeleteTask = () => {
        onDeleteItem(item);
    }

    const handleEditOnChange = event => {
        setTaskTitle(event.target.value);
    }

    // All the drage and drop logic below
    const [, drop] = useDrop({
        accept: 'ITEM',
        hover(item, monitor) {
            if (!itemContainerRef.current) {
                return
            }

            const dragIndex = item.index;

            // Whatever we are hovering over
            const hoverIndex = index;

            // If we are hovering over the same thing we are coming from we don't need to do anything
            if (dragIndex === hoverIndex) {
                return;
            }

            const hoveredRect = itemContainerRef.current.getBoundingClientRect();
            const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
            const mousePosition = monitor.getClientOffset();
            const hoverClientY = mousePosition.y- hoveredRect.top;

            // This means we don't need to sort it down since it's still where it started
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            // This means we don't need to sort it up since it's still where it started
            if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            moveItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    });

    const [{ isDragging }, drag] = useDrag({
        item: {
            type: 'ITEM',
            ...item,
            index,
        },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        }),
    });

    drag(drop(itemContainerRef));

    return (
        <Fragment>
            <div
                ref={itemContainerRef}
                style={{ opacity: isDragging ? 0 : 1}}
                className="item"
            >
                <div className="checkbox-and-title">
                    <input
                        type="checkbox"
                        checked={isDone}
                        onChange={handleCheckboxChange}
                    />
                    {inEditMode ?
                        <input
                            type="text"
                            ref={editItemTextInput}
                            value={taskTitle}
                            onChange={handleEditOnChange}
                        />
                    :
                        <p>{taskTitle}</p>
                    }
                </div>
                {inEditMode ?
                    (
                        <div className="edit-and-delete">
                            <button
                                onClick={handleOnCancelEditClick}
                            >
                                ❌
                            </button>
                            <button
                                onClick={handleSaveEditClick}
                            >
                                ✅
                            </button>
                        </div>
                    )
                :
                    (
                        <div className="edit-and-delete">
                            <button
                                onClick={handleOnEditClick}
                            >
                                ✏️
                            </button>
                            <button
                                onClick={handleDeleteTask}
                            >
                                🗑️
                            </button>
                        </div>
                    )
                }
            </div>
        </Fragment>
    )
}

export default TodoItem;