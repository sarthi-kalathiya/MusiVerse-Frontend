import {createContext} from "react";

const nameContext = createContext({
    name: null,
    setName: (name) => {}
});

export default nameContext;
