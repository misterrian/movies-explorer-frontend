import React from "react";

export const defaultCurrentUser = {
    _id: '',
    name: '',
    email: '',
};

export const CurrentUserContext = React.createContext(defaultCurrentUser);
