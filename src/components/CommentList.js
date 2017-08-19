import React, { Component } from "react"
import ReadableCard from "./ReadableCard"
import { Box } from "grid-styled"
import ModalComment from "./ModalComment"
import { connect } from "react-redux"
import { addComment, editComment } from "../actions/comment_actions"
import {
  changeCommentModalState,
  cycleCommentsOrderBySettings
} from "../actions/settings_actions"
import uuidv4 from "../utils/uuid_gen"
import sortBy from "sort-by"
import { AppBar, FlatButton } from "material-ui"

class CommentList extends Component {
  cycleCommentOrderBy = () => {
    this.props.cycleCommentOrderBy()
  }

  openCommentModal = comment => {
    this.props.changeModalState({
      isOpen: true,
      comment: comment,
      title: comment !== null ? "Edit Comment" : "Add a Comment!"
    })
  }

  closeCommentModal = () => {
    this.props.changeModalState({
      isOpen: false,
      comment: null,
      title: "Add a Comment!"
    })
  }

  saveComment = comment => {
    if (!comment.author && !comment.body) {
      return
    }

    if (!comment.id) {
      this.props.addComment({
        id: uuidv4(),
        author: comment.author,
        timestamp: Date.now(),
        body: comment.body,
        parentId: this.props.postId
      })
    } else {
      this.props.editComment(comment)
    }

    this.closeCommentModal()
  }

  render() {
    const { comments, commentModal, orderBySettings } = this.props
    const orderByObj = orderBySettings.orderByTypes[orderBySettings.actualIndex]
    return (
      <div>
        <ModalComment
          isOpen={commentModal.isOpen}
          onRequestClose={this.closeCommentModal}
          contentLabel="Modal"
          saveComment={this.saveComment}
          title={commentModal.title}
          comment={commentModal.comment}
        />
        <AppBar
          title="Comments"
          style={{ zIndex: 3 }}
          iconElementLeft={
            <FlatButton
              style={{
                width: "142px",
                color: "white",
                margin: "7px 0px 0px 0px"
              }}
              label={orderByObj.name}
              icon={<i className="material-icons">sort</i>}
              onClick={() => this.cycleCommentOrderBy()}
            />
          }
          iconElementRight={
            <div style={{ padding: "8px", color: "white" }}>
              <button
                className="mdl-button mdl-js-button mdl-button--icon"
                onClick={() => this.openCommentModal(null)}
              >
                <i className="material-icons action">add</i>
              </button>
            </div>
          }
        />
        <div
          style={{ display: "flex", flexWrap: "wrap", marginBottom: "64px" }}
        >
          {comments.sort(sortBy(orderByObj.command)).map(comment =>
            <Box w={[1, 1 / 2, 1 / 3, 1 / 4]} key={comment.id}>
              <ReadableCard
                element={comment}
                history={this.props.history}
                edit={this.openCommentModal}
                cardType="comment"
              />
            </Box>
          )}
        </div>
      </div>
    )
  }
}

function mapStateToProps({ comments, settings }, ownProps) {
  return {
    comments: Object.keys(comments)
      .reduce((commentsArray, commentId) => {
        commentsArray = commentsArray.concat([comments[commentId]])
        return commentsArray
      }, [])
      .filter(
        comment => !comment.deleted && comment.parentId === ownProps.postId
      ),

    commentModal: settings.commentModal,
    orderBySettings: settings.commentsSort
  }
}

export default connect(mapStateToProps, {addComment, editComment, changeModalState: changeCommentModalState, cycleCommentOrderBy: cycleCommentsOrderBySettings})(CommentList)
