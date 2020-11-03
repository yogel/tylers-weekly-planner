import React from 'react';
import { useDrop } from 'react-dnd';

const DragWrapper = ({ onDrop, children, status }) => {
    const [{ isOver }, drop] = useDrop({
        accept: 'ITEM',
        canDrop: (item, monitor) => {
            // Right now we need to let them drop all the time
            return true;
        },
        drop: (item, monitor) => {
            onDrop(item, monitor, status);
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
            {/* {React.cloneElement(children, { isOver })} */}
            {children}
        </div>
    );
}

export default DragWrapper;