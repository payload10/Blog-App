import { useEffect, useState } from "react";

const useWindowResize = () => {

    // Storing an object in windowSize
    const[windowSize, setWindowSize] = useState({

        width: undefined,
        height: undefined
    });

    // useEffect will only run at initial load time
    useEffect(() => {

        const getWindowSize = () => {

            setWindowSize({

                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        getWindowSize();

        // Will set event listener at load
        window.addEventListener("resize", getWindowSize, false);

        // clean up
        const cleanUp = () => {

            console.log("Runs if a useEffect dependecy changes");
            window.removeEventListener("resize", getWindowSize);
        };

        return cleanUp;

    }, []);

    return windowSize;
};

export default useWindowResize;