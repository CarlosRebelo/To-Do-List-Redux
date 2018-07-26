import React from 'react'
import { Provider, connect } from 'react-redux'
import { createStore, combineReducers } from 'redux'

const Tasks = (state = [], action) => {
    switch (action.type) {
        case 'ADDTASK':
            const task = {
                id: Date.now().toString(),
                complete: false,
                task: action.text
            }
            return [].concat(task, state)
        case 'COMPLETEDTASK':
            const newState = [].concat(state)
            const taskToComplete = newState.find(task => action.id === task.id)
            taskToComplete.complete = true
            return newState
        default:
            return state;
    }
}


const onSubmit = (event, dispatch) => {
    event.preventDefault()
    const text = event.target.elements.name.value;
    dispatch({
        type: 'ADDTASK',
        text: text,
    })
}

const onClick = (event, dispatch, id) => {
    dispatch({
        type: 'COMPLETEDTASK',
        id: id
    })
}

const Submit = (props) => (
    <div>
        <form onSubmit={(event) => onSubmit(event, props.dispatch)}>
            Task: <input type="text" name="name" />
            <input type="submit" value="Insert" />
        </form>
        <ul>
            {
                props.TaskSubmited.map(task => (
                    <li>
                        {
                            task.complete ?
                                <strike>{task.task}</strike> : (
                                    <div>
                                        <p>{task.task}</p>
                                        <button onClick={(event) => onClick(event, props.dispatch, task.id)}>CONCLUIDO</button>
                                    </div>
                                )
                        }
                    </li>
                ))
            }
        </ul>
    </div>
)

const getActualState = (actualState => {
    return {
        TaskSubmited: actualState.Tasks,
    }
})

const ToDoList = connect(getActualState)(Submit)

const store = createStore(combineReducers({
    Tasks: Tasks
}))

export default () => (
    <Provider store={store}>
        <ToDoList />
    </Provider>
)