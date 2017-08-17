import {
  RETRIEVE_COMMENTS,
  ADD_COMMENT,
  EDIT_COMMENT,
  REMOVE_COMMENT,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT
} from "../actions/comment_actions"
import { REMOVE_POST } from "../actions/post_actions"

function comments(state = {}, action) {
  const { comment } = action
  switch (action.type) {
    case RETRIEVE_COMMENTS:
      var newCommentsState = state
      action.comments.map(comment => {
        return (newCommentsState[comment.id] = comment)
      })
      return newCommentsState
    case ADD_COMMENT:
      return {
        ...state,
        [comment.id]: comment
      }
    case EDIT_COMMENT:
      return {
        ...state,
        [comment.id]: comment
      }
    case REMOVE_COMMENT:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          deleted: true
        }
      }
    case REMOVE_POST:
      var newRemovePostState = state
      Object.keys(newRemovePostState).map(commentId => {
        if(action.comments.includes(commentId)){
          newRemovePostState[commentId].parentDeleted = true
        }
        return (newRemovePostState[commentId])
      })
      return newRemovePostState
    case UPVOTE_COMMENT:
      return {
        ...state,
        [comment.id]: {
          ...state[comment.id],
          voteScore: state[comment.id].voteScore + 1
        }
      }
    case DOWNVOTE_COMMENT:
      return {
        ...state,
        [comment.id]: {
          ...state[comment.id],
          voteScore: state[comment.id].voteScore - 1
        }
      }
    default:
      return state
  }
}

export default comments
