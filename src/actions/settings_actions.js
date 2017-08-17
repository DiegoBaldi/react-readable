export const APP_LOADED = "APP_LOADED"
export const CYCLE_POSTS_ORDER_BY_TYPES = "CYCLE_POSTS_ORDER_BY_TYPES"
export const CYCLE_COMMENTS_ORDER_BY_TYPES = "CYCLE_COMMENTS_ORDER_BY_TYPES"
export const CHANGE_COMMENT_MODAL_STATE = "CHANGE_COMMENT_MODAL_STATE"

export function appLoaded() {
  return {
    type: APP_LOADED,
  }
}

export function cyclePostsOrderBySettings() {
  return {
    type: CYCLE_POSTS_ORDER_BY_TYPES
  }
}

export function cycleCommentsOrderBySettings() {
  return {
    type: CYCLE_COMMENTS_ORDER_BY_TYPES
  }
}

export function changeCommentModalState(newCommentModal) {
  return {
    type: CHANGE_COMMENT_MODAL_STATE,
    commentModal: newCommentModal
  }
}