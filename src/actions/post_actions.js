import * as ReadableAPI from '../utils/readable_api';

export const RETRIEVE_POSTS = "RETRIEVE_POSTS"
export const RETRIEVE_POST = "RETRIEVE_POST"
export const RETRIEVE_CATEGORY_POSTS = "RETRIEVE_CATEGORY_POSTS"
export const ADD_POST = "ADD_POST"
export const EDIT_POST = "EDIT_POST"
export const REMOVE_POST = "REMOVE_POST"
export const UPVOTE_POST = "UPVOTE_POST"
export const DOWNVOTE_POST = "DOWNVOTE_POST"

export function retrievePosts(posts) {
  return {
    type: RETRIEVE_POSTS,
    posts
  }
}

export const fetchPosts = () => dispatch => (
  ReadableAPI
      .getAllPosts()
      .then(posts => dispatch(retrievePosts(posts)))
)

export function retrieveCategoryPosts(posts) {
  return {
    type: RETRIEVE_CATEGORY_POSTS,
    posts
  }
}

export const fetchCategoryPosts = (category) => dispatch => (
  ReadableAPI
      .getCategoryPosts(category)
      .then(posts => dispatch(retrieveCategoryPosts(posts)))
)

export function retrievePost(post) {
  return {
    type: RETRIEVE_POST,
    post
  }
}

export const fetchPost = (id) => dispatch => (
  ReadableAPI
      .getPost(id)
      .then(post => dispatch(retrievePost(post)))
)

export function addedPost(post) {
  return {
    type: ADD_POST,
    post
  }
}

export const addPost = (post) => dispatch => (
  ReadableAPI
      .createPost(post)
      .then(post => dispatch(addedPost(post)))
)

export function editedPost(post) {
  return {
    type: EDIT_POST,
    post
  }
}

export const editPost = (post) => dispatch => (
  ReadableAPI
      .modifyPost(post)
      .then(post => dispatch(editedPost(post)))
)

export function removedPost(id, comments) {
  return {
    type: REMOVE_POST,
    id,
    comments
  }
}

export const removePost = (id, comments) => dispatch => (
  ReadableAPI
      .deletePost(id)
      .then(() => {dispatch(removedPost(id, comments))})
)

export function upvotedPost(post) {
  return {
    type: UPVOTE_POST,
    post
  }
}

export const upvotePost = (id) => dispatch => (
  ReadableAPI
      .votePost(id, {option:"upVote"})
      .then(post => dispatch(upvotedPost(post)))
)

export function downvotedPost(post) {
  return {
    type: DOWNVOTE_POST,
    post
  }
}

export const downvotePost = (id) => dispatch => (
  ReadableAPI
      .votePost(id, {option:"downVote"})
      .then(post => dispatch(downvotedPost(post)))
)
