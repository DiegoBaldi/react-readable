import posts from "./posts_reducer"
import comments from "./comments_reducer"
import categories from "./categories_reducer"
import settings from "./settings_reducer"
import { combineReducers } from "redux"


export default combineReducers({
    posts,
    comments,
    categories,
    settings
})