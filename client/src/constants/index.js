export const QUESTION_DIFFICULTIES = [
  {
    value: 0,
    text: "Easy"
  },
  {
    value: 1,
    text: "Medium"
  },
  {
    value: 2,
    text: "Hard"
  },
  {
    value: 3,
    text: "Very hard"
  },
]

export const CHOICE_LETTERS = [
  "A", "B", "C", "D", "E"
]

export const ROLE_LECTURER = "lecture";
export const ROLE_STUDENT = "student";

export { ROUTER_LECTURER, ROUTER_STUDENT } from './urls';
export { ROUTER_PACK, ROUTER_PACK_PARAM_ID } from './urls';
export { ROUTER_QUESTION_PACK, ROUTER_QUESTION_PACK_EDIT_OR_ADD, ROUTER_QUESTION_PACK_EDIT } from './urls';
export { ROUTER_QUESTION, ROUTER_QUESTION_EDIT_OR_ADD } from './urls';
export { ROUTER_RESULT } from './urls';

export { API_QUESTION_PACKS, API_QUESTIONS } from './urls';