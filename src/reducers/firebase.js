import {
    ADD_IMG_TO_STORAGE
} from '../actions/firebase';

const INITIAL_STATE = {
    images: []
};

const firebase = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_IMG_TO_STORAGE:
            return {
                ...state,
                images: action.images
            };
        default:
            return state;
    }
};

const images = (state,action)

export default firebase;
