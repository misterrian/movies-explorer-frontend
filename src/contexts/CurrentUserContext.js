import React from "react";

export const defaultCurrentUser = {
    _id: '',
    name: 'Кто-то неизвестный',
    email: '',
};

export const CurrentUserContext = React.createContext(defaultCurrentUser);
