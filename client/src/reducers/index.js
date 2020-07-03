import { combineReducers } from "redux";
import survey from "./surveyReducer";
import question from "./questionReducer";
import filiere from "./filiereReducer";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  surveyData: survey,
  questionData: question,
  filiereData: filiere,
  form: formReducer,
});
