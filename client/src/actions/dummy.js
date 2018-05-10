import axios from 'axios';

import { AXIOS_CONFIGS } from './settings';

export const INCREASE_DUMMY_NUMBER = 'INCREASE DUMMY NUMBER';

export function increaseDummyNumber() {
    const request = axios.get('https://gmat-api.herokuapp.com/api/classrooms', AXIOS_CONFIGS);

    return {
        type: INCREASE_DUMMY_NUMBER,
        payload: request
    };
};