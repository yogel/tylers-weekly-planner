import React, {useRef, Fragment} from 'react';
import { useDrag, useDrop } from 'react-dnd';

const TodoItem = ({ item, index, moveItem, list }) => {
    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: 'ITEM',
        hover(item, monitor) {
            if (!ref.current) {
                return
            }

            console.log('USEDROP');
            console.log(index);

            const dragIndex = item.index;

            // Whatever we are hovering over
            const hoverIndex = index;

            // If we are hovering over the same thing we are coming from we don't need to do anything
            if (dragIndex === hoverIndex) {
                return;
            }

            const hoveredRect = ref.current.getBoundingClientRect();
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
                <p>{item.title}</p>
            </div>
        </Fragment>
    )
}

export default TodoItem;