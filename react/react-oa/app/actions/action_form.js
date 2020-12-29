
export const select = com => ({
    type: 'RECEIVE_COMPONENT',
    com
})

export const drop = field => ({
    type: 'DROP_COMPONENT',
    field
})