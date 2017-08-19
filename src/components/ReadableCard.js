import React, { Component } from "react"
import { upvotePost, downvotePost, removePost } from "../actions/post_actions"
import {
  upvoteComment,
  downvoteComment,
  removeComment
} from "../actions/comment_actions"
import { connect } from "react-redux"
import moment from "moment"
import "./ReadableCard.css"

class ReadableCard extends Component {
  getHeader = () => {
    const { element } = this.props
    if (this.props.cardType === "post") {
      return (
        <div
          className="mdl-card__title mdl-card--expand"
          onClick={() =>
            this.props.history.push("/" + element.category + "/" + element.id)}
        >
          <h4>
            {element.title} <br />
            <span>by {element.author}</span>
          </h4>
          <p>
            {moment.unix(element.timestamp / 1000).format("MM/DD/YYYY HH:mm")}
          </p>
        </div>
      )
    } else {
      return (
        <div className="mdl-card__title mdl-card--expand">
          <p>
            {element.body} <br />
            <span>by {element.author}</span>
          </p>
          <p>
            {moment.unix(element.timestamp / 1000).format("MM/DD/YYYY HH:mm")}
          </p>
        </div>
      )
    }
  }

  needsComments = () => {
    if (this.props.cardType === "post") {
      return (
        <div className="center-vertically">
          <i className="material-icons comment-icon">comment</i>
          <span className="comment-value">
            {this.props.element.comments.length}
          </span>
        </div>
      )
    }
  }

  upVoteElement = id => {
    if (this.props.cardType === "post") {
      this.props.upvotePost(id)
    } else {
      this.props.upvoteComment(id)
    }
  }

  downVoteElement = id => {
    if (this.props.cardType === "post") {
      this.props.downvotePost(id)
    } else {
      this.props.downvoteComment(id)
    }
  }

  removeElement = id => {
    if (this.props.cardType === "post") {
      this.props.removePost(id, this.props.element.comments)
    } else {
      this.props.removeComment(id, this.props.element.parentId)
    }
  }

  editElement = element => {
    if (this.props.cardType === "post") {
      this.props.history.push("/posts/" + element.id + "/edit_post")
    } else {
      this.props.edit(element)
    }
  }

  render() {
    const { element } = this.props

    return (
      <div className="readable-card mdl-card mdl-shadow--2dp">
        {this.getHeader()}
        <div className="mdl-card__actions mdl-card--border">
          <button
            className="mdl-button mdl-js-button mdl-button--icon"
            onClick={e => this.downVoteElement(element.id)}
          >
            <i className="material-icons downvote action">
              keyboard_arrow_left
            </i>
          </button>
          <span className="score">
            {element.voteScore}
          </span>
          <button
            className="mdl-button mdl-js-button mdl-button--icon"
            onClick={e => this.upVoteElement(element.id)}
          >
            <i className="material-icons upvote action">keyboard_arrow_right</i>
          </button>

          {this.needsComments()}

          <div className="mdl-layout-spacer" />
          <button
            className="mdl-button mdl-js-button mdl-button--icon"
            onClick={e => this.editElement(element)}
          >
            <i className="material-icons action">mode_edit</i>
          </button>
          <button
            className="mdl-button mdl-js-button mdl-button--icon"
            onClick={e => this.removeElement(element.id)}
          >
            <i className="material-icons action">delete</i>
          </button>
        </div>
      </div>
    )
  }
}

export default connect(null, {
  upvotePost,
  downvotePost,
  removePost,
  upvoteComment,
  downvoteComment,
  removeComment
})(ReadableCard)
