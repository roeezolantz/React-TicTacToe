export default function reducer(
    state={
        X:0, 
        O:0, 
        gameIsRunning: true, 
        clearTheBoard: false
    }, action) {    
    switch (action.type) {
        case 'X' :
            return {
                ...state,
                X: state.X + 1,
                gameIsRunning: false
            };
        case 'O' :
            return {
                ...state,
                O: state.O + 1,
                gameIsRunning: false
            };
        default :
            return state;
    }
}