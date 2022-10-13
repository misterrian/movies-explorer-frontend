import {useLayoutEffect, useState} from "react";

export default function useWindowSize() {
    const [size, setSize] = useState({
        width: 0,
        height: 0,
    });

    function updateSize() {
        setSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }

    useLayoutEffect(() => {
        let timerId = null;

        function resizeListener() {
            if (timerId) {
                clearTimeout(timerId);
            }
            timerId = setTimeout(updateSize, 300);
        }

        window.addEventListener('resize', resizeListener);
        updateSize();

        return () => window.removeEventListener('resize', resizeListener);
    }, []);

    return size;
}
