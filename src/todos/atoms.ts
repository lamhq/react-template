import { atom } from 'jotai';

// Atom to store the current page for todo list pagination
export const todoListPageAtom = atom<number>(1);
