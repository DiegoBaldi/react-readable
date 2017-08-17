import * as ReadableAPI from '../utils/readable_api';

export const RETRIEVE_CATEGORIES = "RETRIEVE_CATEGORIES"

export function retrieveCategories(categories) {
  return {
    type: RETRIEVE_CATEGORIES,
    categories
  }
}

export const fetchCategories = () => dispatch => (
  ReadableAPI
      .getCategories()
      .then(categories => dispatch(retrieveCategories(categories)))
)