import React, { Component } from "react"
import { AppBar } from "material-ui"
import CommentList from "./CommentList"
import { connect } from "react-redux"
import uuidv4 from "../utils/uuid_gen"
import { withRouter } from "react-router-dom"
import moment from "moment"
import { upvotePost, downvotePost, removePost } from "../actions/post_actions"
import "./PostDetails.css"

class PostDetails extends Component {
  openPostModal = post => {
    this.setState(() => ({
      postModalOpen: true,
      modalPost: post
    }))
  }

  closePostModal = () => {
    this.setState(() => ({
      postModalOpen: false,
      modalPost: null
    }))
  }

  savePost = post => {
    if (!post.author && !post.title && !post.body) {
      return
    }

    if (!post.id) {
      this.props.addPost({
        id: uuidv4(),
        author: post.author,
        title: post.title,
        category: "redux",
        timestamp: Date.now(),
        body: post.body
      })
    } else {
      this.props.editPost(post)
    }

    this.closePostModal()
  }

  render() {
    const { post, history, upVote, downVote, remove } = this.props

    if (post) {
      return (
        <div>
          <AppBar
            title={post.title}
            className="text-center"
            style={{ zIndex: 3 }}
            iconElementLeft={
              <button
                style={{ margin:"8px", color:"white"}}
                className="mdl-button mdl-js-button mdl-button--icon"
                onClick={e => history.goBack()}
              >
                <i className="material-icons action">arrow_back</i>
              </button>
            }
            iconElementRight={
              <div style={{ padding: "8px", color: "white" }}>
                <button
                  className="mdl-button mdl-js-button mdl-button--icon"
                  onClick={() => {
                    this.props.history.push("/posts/" + post.id + "/edit_post")
                  }}
                >
                  <i className="material-icons action">mode_edit</i>
                </button>
                <button
                  className="mdl-button mdl-js-button mdl-button--icon"
                  onClick={e => {
                    remove(post.id, post.comments)
                    history.push("/")
                  }}
                >
                  <i className="material-icons action">delete</i>
                </button>
              </div>
            }
          />

          <div className="p-def">
            <p>
              {post.body}
            </p>
            <div>
              <p>
                By <strong>{post.author}</strong>,{" "}
                {moment
                  .unix(post.timestamp / 1000)
                  .format("MM/DD/YYYY HH:mm")}{" "}
              </p>
            </div>
            <button
              className="mdl-button mdl-js-button mdl-button--icon"
              onClick={e => {
                e.stopPropagation()
                downVote(post.id)
              }}
            >
              <i className="material-icons downvote action">
                keyboard_arrow_left
              </i>
            </button>
            <span className="score">
              Score: {post.voteScore}
            </span>
            <button
              className="mdl-button mdl-js-button mdl-button--icon"
              onClick={e => {
                e.stopPropagation()
                upVote(post.id)
              }}
            >
              <i className="material-icons upvote action">
                keyboard_arrow_right
              </i>
            </button>
          </div>
          <CommentList history={history} postId={post.id} />
        </div>
      )
    } else {
      return <div />
    }
  }
}

function mapStateToProps({ posts }, ownProps) {
  return {
    post: posts[ownProps.match.params.postId]
  }
}

function mapDispatchToProps(dispatch) {
  return {
    upVote: data => dispatch(upvotePost(data)),
    downVote: data => dispatch(downvotePost(data)),
    remove: (id, comments) => dispatch(removePost(id, comments))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostDetails)
)
