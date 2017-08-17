import React, { Component } from "react"
import ReadableCard from "./ReadableCard"
import { Box } from "grid-styled"
import ModalComment from "./ModalComment"
import { connect } from "react-redux"
import { addComment, editComment } from "../actions/comment_actions"
import { changeCommentModalState, cycleCommentsOrderBySettings } from "../actions/settings_actions"
import uuidv4 from "../utils/uuid_gen"
import sortBy from 'sort-by';
import { FlatButton } from "material-ui"

class CommentList extends Component {

  cycleCommentOrderBy = () => {
    this.props.cycleCommentOrderBy();
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
      <div style={{ padding: "24px" }}>
        <ModalComment
          isOpen={commentModal.isOpen}
          onRequestClose={this.closeCommentModal}
          contentLabel="Modal"
          saveComment={this.saveComment}
          title={commentModal.title}
          comment={commentModal.comment}
        />
        <h6>
          <strong>Comments</strong>
        </h6>
        <FlatButton
          style={{ width: "142px", color: "#00bcd4", margin: "7px 0px 0px 0px" }}
          label={orderByObj.name}
          icon={<i className="material-icons">sort</i>}
          onClick={() => this.cycleCommentOrderBy()}
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
        <button
          className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
          onClick={() => this.openCommentModal(null)}
        >
          <i className="material-icons">add</i>
        </button>
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

function mapDispatchToProps(dispatch) {
  return {
    addComment: data => dispatch(addComment(data)),
    editComment: data => dispatch(editComment(data)),
    changeModalState: data => dispatch(changeCommentModalState(data)),
    cycleCommentOrderBy: () => dispatch(cycleCommentsOrderBySettings())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList)
