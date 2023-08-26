import React, { useState, createContext } from "react";

const AuthCtx = createContext();

const doLogin = (status, email, tokendatga, role) =>
    new Promise((resolve, reject) => {
        if (status) {
            resolve({ name: email, token: tokendatga, role: role });
        } else {
            reject('You can not login to the system without the correct data! Please register first if you do not have an account.');
        }
    });

const useAuthentication = (history, location) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [error, setError] = useState(null);

    const login = (status, email, token, role1) =>
        doLogin(status, email, token, role1)
            .then(user => {
                setUser(user);
                setRole(role1);
                setError(null);
            })
            .catch(error => setError(error));

    const logOut = () => {
        setUser(null);
        setError(null);
    };

    return {
        AuthCtx,
        AuthProvider: ({ children }) => (
            <AuthCtx.Provider value={{ error, user, login, logOut}}>
                {children}
            </AuthCtx.Provider>
        )
    };
};

export default useAuthentication;