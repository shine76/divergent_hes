/* import { CREATE_THEME, FETCH_THEMES } from "./types";
import { themes } from "../apis/apiAdresses";
import axios from "axios";
import { toast } from "react-toastify";
import history from "../history";

export const fetchThemes = () => {
  return async (dispatch) => {
    const response = await axios.get(`${themes}/`);
    dispatch({
      type: FETCH_THEMES,
      payload: response.data,
    });
  };
};

export const createTheme = (formData) => {
  return async (dispatch) => {
    const response = await axios.post(`${themes}`, formData);
    dispatch({
      type: CREATE_THEME,
      payload: response.data,
    });
    toast.info("Thème bien crée");
    history.push(`/admin/themes`);
  };
};
 */
