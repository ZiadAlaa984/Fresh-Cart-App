import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";
export let UserContext = createContext(0);
export default function UserContextProvider(props) {
    let [Token, setToken] = useState(null);
    const [user, setUser] = useState('');
    useEffect(() => {
        if (localStorage.getItem('Token')) {
            setToken(localStorage.getItem('Token'))
        }
    }, []);
    return (
        <UserContext.Provider value={{ Token, setToken, setUser, user }}>
            {props.children}
        </UserContext.Provider>
    );

}

