import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../models/Todo";
import { v4 as randomId } from "uuid";

const initialState = [] as Todo[];

const todoSlice = createSlice({
    name:'todos',
    initialState,
    reducers:{
        addTodo:{
            reducer:(state,action:PayloadAction<Todo>) =>{
                state.push(action.payload);
            },
            prepare:(task:string) =>({
                payload:{
                    id:randomId(),
                    task,
                    completed:false,
                }as Todo,
            }),
        },
        removeTodo:(state,action:PayloadAction<string>) =>{
            const index = state.findIndex((todo)=> todo.id=== action.payload);
            state.splice(index, 1);
        },
        setTodoStatus:(state, action:PayloadAction<string>) =>{
            const index = state.findIndex((todo)=> todo.id=== action.payload);
            state[index].completed  = !state[index].completed;

        },
    },
})


export const  {addTodo, removeTodo, setTodoStatus} = todoSlice.actions;
export default todoSlice.reducer;