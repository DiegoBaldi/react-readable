import {
  APP_LOADED,
  CYCLE_POSTS_ORDER_BY_TYPES,
  CYCLE_COMMENTS_ORDER_BY_TYPES,
  CHANGE_COMMENT_MODAL_STATE
} from "../actions/settings_actions"

function categories(
  state = {
    postsSort: {
      actualIndex: 0,
      orderByTypes: [{name: "score", command: "-voteScore"}, { name: "comments", command: "-comments"}, { name: "date", command: "-timestamp"}]
    },

    commentsSort: {
      actualIndex: 0,
      orderByTypes: [{name: "score", command: "-voteScore"}, { name: "date", command: "-timestamp"}]
    },
    
    appLoaded: false,
    commentModal: {
      isOpen: false,
      title: "Add a Comment!",
      comment: null
    }
  },
  action
) {
  switch (action.type) {
    case APP_LOADED:
      return {
        ...state,
        appLoaded: true
      }
    case CYCLE_POSTS_ORDER_BY_TYPES:
      var newPostIndex =(state.postsSort.actualIndex+1) % state.postsSort.orderByTypes.length
      return {
        ...state,
        postsSort: {
          ...state.postsSort,
          actualIndex: newPostIndex
        }
      }
    case CYCLE_COMMENTS_ORDER_BY_TYPES:
      var newCommentIndex = (state.commentsSort.actualIndex+1) % state.commentsSort.orderByTypes.length
      return {
        ...state,
        commentsSort: {
          ...state.commentsSort,
          actualIndex: newCommentIndex
        }
      }
    case CHANGE_COMMENT_MODAL_STATE:
      return {
        ...state,
        commentModal: action.commentModal
      }
    default:
      return state
  }
}

export default categories
