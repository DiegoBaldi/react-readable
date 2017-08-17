import * as ReadableAPI from '../utils/readable_api';

export const RETRIEVE_COMMENTS = "RETRIEVE_COMMENTS"
export const ADD_COMMENT = "ADD_COMMENT"
export const EDIT_COMMENT = "EDIT_COMMENT"
export const REMOVE_COMMENT = "REMOVE_COMMENT"
export const UPVOTE_COMMENT = "UPVOTE_COMMENT"
export const DOWNVOTE_COMMENT = "DOWNVOTE_COMMENT"

export function retrieveComments(comments) {
  return {
    type: RETRIEVE_COMMENTS,
    comments
  }
}

export const fetchComments = (postKey) => dispatch => (
  ReadableAPI
      .getPostComments(postKey)
      .then(comments => dispatch(retrieveComments(comments)))
)

export function addedComment(comment) {
  console.log("action comment",comment)
  return {
    type: ADD_COMMENT,
    comment
  }
}

export const addComment = (comment) => dispatch => (
  ReadableAPI
      .addComment(comment)
      .then(comment => dispatch(addedComment(comment)))
)

export function editedComment(comment) {
  return {
    type: EDIT_COMMENT,
    comment
  }
}

export const editComment = (comment) => dispatch => (
  ReadableAPI
      .modifyComment(comment)
      .then(comment => dispatch(editedComment(comment)))
)

export function removedComment(id, postId) {
  return {
    type: REMOVE_COMMENT,
    id,
    postId
  }
}

export const removeComment = (id, postId) => dispatch => (
  ReadableAPI
      .deleteComment(id)
      .then(() => {dispatch(removedComment(id, postId))})
)

export function upvotedComment(comment) {
  return {
    type: UPVOTE_COMMENT,
    comment
  }
}

export const upvoteComment = (id) => dispatch => (
  ReadableAPI
      .voteComment(id, {option:"upVote"})
      .then(comment => dispatch(upvotedComment(comment)))
)

export function downvotedComment(comment) {
  return {
    type: DOWNVOTE_COMMENT,
    comment
  }
}

export const downvoteComment = (id) => dispatch => (
  ReadableAPI
      .voteComment(id, {option:"downVote"})
      .then(comment => dispatch(downvotedComment(comment)))
)
