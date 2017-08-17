import { RETRIEVE_CATEGORIES } from "../actions/category_actions"


function categories(state = [], action) {
  const { categories } = action
  switch (action.type) {
    case RETRIEVE_CATEGORIES:
      return categories.reduce((categories, category) => {
        categories[category.path] = category
        return categories
      }, {})
    default:
      return state
  }
}

export default categories
