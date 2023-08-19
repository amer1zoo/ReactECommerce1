import React from "react";
import { Route, Redirect } from "react-router-dom";

const Protected = ({ user, role, children, ...rest }) => (
    <Route
        {...rest}
        render={({ location }) =>
            user && role.includes(user.role) ? (
                children
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: location }
                    }}
                />
            )
        }
    />
);

export default Protected;
