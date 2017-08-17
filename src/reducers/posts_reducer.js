import {
  RETRIEVE_POSTS,
  RETRIEVE_POST,
  ADD_POST,
  EDIT_POST,
  REMOVE_POST,
  UPVOTE_POST,
  DOWNVOTE_POST
} from "../actions/post_actions"
import {
  RETRIEVE_COMMENTS,
  ADD_COMMENT,
  REMOVE_COMMENT
} from "../actions/comment_actions"

function posts(state = {}, action) {
  const { post } = action
  switch (action.type) {
    case RETRIEVE_POSTS:
      return action.posts.reduce((posts, post) => {
        posts[post.id] = post
        posts[post.id].comments = []
        return posts
      }, {})
    case RETRIEVE_POST:
      post.comments = []
      return {
        ...state,
        [post.id]: post
      }
    case RETRIEVE_COMMENTS:
      var newState = state
      action.comments.map(comment => {
        return (newState[comment.parentId].comments = newState[
          comment.parentId
        ].comments.concat([comment.id]))
      })
      return newState
    case ADD_POST:
      post.comments = []
      return {
        ...state,
        [post.id]: post
      }
    case ADD_COMMENT:
      return {
        ...state,
        [action.comment.parentId]: {
          ...state[action.comment.parentId],
          comments: state[action.comment.parentId].comments.concat([
            action.comment.id
          ])
        }
      }
    case EDIT_POST:
      post.comments = state[post.id].comments
      return {
        ...state,
        [post.id]: post
      }
    case REMOVE_POST:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          deleted: true
        }
      }
    case REMOVE_COMMENT:
      console.log("action content ", action)
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          comments: state[action.postId].comments.filter(
            commentId => commentId !== action.id
          )
        }
      }
    case UPVOTE_POST:
      return {
        ...state,
        [post.id]: {
          ...state[post.id],
          voteScore: state[post.id].voteScore + 1
        }
      }
    case DOWNVOTE_POST:
      return {
        ...state,
        [post.id]: {
          ...state[post.id],
          voteScore: state[post.id].voteScore - 1
        }
      }
    default:
      return state
  }
}

export default posts
