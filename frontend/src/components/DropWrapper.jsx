import React from 'react';
import { useDrop } from 'react-dnd';

const DragWrapper = ({ onDrop, children, list }) => {
    const [{ isOver }, drop] = useDrop({
        accept: 'ITEM',
        canDrop: (item, monitor) => {
            // Right now we need to let them drop all the time
            return true;
        },
        drop: (item, monitor) => {
            onDrop(item, monitor, list);
        },
        collect: monitor =>({
            isOver: monitor.isOver(),
        })
    });

    return (
        <div
            ref={drop}
            className="todoqueue-list"
        >

            {console.log(children)}
            {children ? children.map(child => child ? React.cloneElement(child, { isOver }) : '') : ''}
            {/* {React.cloneElement(children, { isOver })} */}
            {/* {children} */}
        </div>
    );
}

export default DragWrapper;