import { ResizableBox, ResizableBoxProps } from "react-resizable";
import './resizable.css';
import { useEffect, useState } from "react";

interface ResizableProps {
    direction: "horizontal" | "vertical";
    children?: React.ReactNode;
    /* onResizing: (resizing: boolean) => void; */
}

const Resizable: React.FC<ResizableProps> = ({ direction, children, /* onResizing */ }) => {
    const [Wheight, setWheight] = useState(window.innerHeight);
    const [Wwidth, setWwidth] = useState(window.innerWidth);
    const [width, setWidth] = useState(window.innerWidth * 0.65);

    useEffect(() => {
        let timer: any;
        const listener = () => {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                setWheight(window.innerHeight);
                setWwidth(window.innerWidth);
                //console.log(window.innerWidth * 0.85, width);
                if (window.innerWidth * 0.65 < width) {
                    setWidth(window.innerWidth * 0.65);
                }
            }, 80);

        };
        window.addEventListener('resize', listener);

        return () => {
            window.removeEventListener('resize', listener);
        }
    }, [width]);

    let resizableProps: ResizableBoxProps;

    if (direction === 'horizontal') {
        resizableProps = {
            className: 'resize-horizontal',
            height: Infinity,
            width: width,
            resizeHandles: ['e'],
            minConstraints: [Wwidth * 0.25, Infinity],
            maxConstraints: [Wwidth * 0.75, Infinity],
            onResizeStop: (_event, data) => {
                setWidth(data.size.width);
            }
        }
    } else {
        resizableProps = {
            height: 300,
            width: Infinity,
            resizeHandles: ['s'],
            minConstraints: [Infinity, 80],
            maxConstraints: [Infinity, Wheight * 0.9]
        }
    }
    return (
        <ResizableBox
            {...resizableProps}
        /* onResizeStart={() => onResizing(true)}
        onResizeStop={() => onResizing(false)} */
        >
            {children}
        </ResizableBox>

    );
}

export default Resizable;