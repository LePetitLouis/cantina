import React from 'react';

export default React.createContext({
    title: undefined,
    level: undefined,
    numberPerson: undefined,
    preparationTime: undefined,
    updateFilter: filter => {}
})