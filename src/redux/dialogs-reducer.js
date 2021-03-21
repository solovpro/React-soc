const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
    dialogs: [
        {id: 1, name: 'Dima'},
        {id: 2, name: 'Sergey'},
        {id: 3, name: 'Nikita'},
        {id: 4, name: 'Andrey'},
        {id: 5, name: 'Pasha'},
        {id: 6, name: 'Daniil'}
    ],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Hello'},
        {id: 3, message: 'Hey'},
        {id: 4, message: 'Hey'},
        {id: 5, message: 'Hey'}
    ]
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
			let body = action.newMessageBody;
			return {
                ...state,
				messages: [...state.messages, {id: 7, message: body}]
            };
        default:
            return state;
    }
}


export const sendMessageCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody})

export default dialogsReducer;