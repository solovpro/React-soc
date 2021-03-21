/*import profileReducer from './profile-reducer.js';
import dialogsReducer from './dialogs-reducer.js';
import sidebarReducer from './sidebar-reducer.js';

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';

let store = {
	_state: {
		profilePage: {
			posts: [
		   	{id: 1, message: 'Я - гуль', countLike: 200},
		   	{id: 2, message: 'Hi, how are you?', countLike: 15},
		   	{id: 3, message: 'It\'s my first post', countLike: 20}
			],
			newPostText: ''
		},
		dialogsPage: {
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
			],
			newMessageBody: ''
		},
		sidebar {}
	},
	_callSubscriber(state) {},


	getState() {
		return this._state;
	},
	subscribe(observer) {
		this._callSubscriber = observer;
	},


	dispatch(action) {

		this._state.profilePage = profileReducer(this._state.profilePage, action);
		this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
		this._state.sidebar = sidebarReducer(this._state.sidebar, action);

		this._callSubscriber(this._state);
	}
}


window.store = store;
export default store;*/
