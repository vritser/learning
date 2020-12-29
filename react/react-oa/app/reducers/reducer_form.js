const initState = {
    curr: null,
    fields: []
}

const form = (state = initState, action) => {
    switch (action.type) {
        case 'RECEIVE_COMPONENT':
            return {...state, curr: action.com }
        case 'DROP_COMPONENT':
            return {...state, fields: [...state.fields, action.field] }
        default:
            return state;
    }
}

export default form;