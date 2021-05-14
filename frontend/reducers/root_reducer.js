import entities from "./entities/entities_reducer";
import session from "./session/session_reducer";
import errors from "./errors/errors_reducer";
import ui from "./ui/ui_reducer";
import { combineReducers } from 'redux';

export default combineReducers({
    entities,
    session,
    ui,
    errors,
});