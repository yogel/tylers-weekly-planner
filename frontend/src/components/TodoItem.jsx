import React, {useState, useRef, Fragment} from 'react';
import { useDrag, useDrop } from 'react-dnd';

const TodoItem = ({ item, index, moveItem, status }) => {
    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: 'ITEM',
        hover(item, monitor) {
            if (!ref.current) {
                return
            }

            const dragIndex = index.item;

            // Whatever we are hovering over
            const hoverIndex = index;

            // If we are hovering over the same thing we are coming from we don't need to do anything
            if (dragIndex === hoverIndex) {
                return;
            }

            const hoveredReact = ref.current.getBoundingClientReact();
            const hoverMiddleY = (hoveredReact.bottom - hoveredReact.top) / 2;
            const mousePosition = monitor.getClientOffset();
            const hoverClientY = mousePosition.y- hoveredReact.top;

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

    // const [show, setShow] = useState(false);

    // const onOpen = () => setShow(true);
    // const onClose = () => setShow(false);

    drag(drop(ref));

    return (
        <Fragment>
            <div
                ref={ref}
                style={{ opacity: isDragging ? 0 : 1}}
                className="item"
            >
                <p>{item.text}</p>
            </div>
        </Fragment>
    )
}

export default TodoItem;