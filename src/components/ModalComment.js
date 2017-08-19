import React, { Component } from "react"
import Modal from "react-modal"
import { FlatButton } from "material-ui"

class ModalComment extends Component {
  componentDidMount() {
    window.componentHandler.upgradeDom()
  }

  componentDidUpdate() {
    setTimeout(function() {
      window.componentHandler.upgradeDom()
    }, 0)
  }

  render() {
    const { isOpen, comment, title } = this.props
    return (
      <div>
        <Modal
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.50)",
              zIndex: 10
            },
            content: {
              left: "50%",
              marginLeft: "-171px",
              maxWidth: "300px",
              maxHeight: "400px",
              bottom: "40px"
            }
          }}
          isOpen={isOpen}
          onRequestClose={this.props.onRequestClose}
          contentLabel="Modal"
        >
          <div>
            <div className="search-container">
              <h3 className="subheader">
                {title}
              </h3>
              <div className="mdl-textfield mdl-js-textfield block">
                <input
                  className="mdl-textfield__input"
                  type="text"
                  id="author"
                  defaultValue={comment ? comment.author : ""}
                  ref={input => (this.author = input)}
                />
                <label className="mdl-textfield__label" htmlFor="author">
                  Author*
                </label>
              </div>
              <div className="mdl-textfield mdl-js-textfield block">
                <textarea
                  className="mdl-textfield__input"
                  type="text"
                  rows="3"
                  id="body"
                  defaultValue={comment ? comment.body : ""}
                  ref={input => (this.body = input)}
                />
                <label className="mdl-textfield__label" htmlFor="body">
                  Body*
                </label>
              </div>
              <FlatButton
                label="Save"
                icon={<i className="material-icons">save</i>}
                onClick={e =>
                  this.props.saveComment({
                    id: comment ? comment.id : null,
                    author: this.author.value,
                    body: this.body.value
                  })}
              />
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default ModalComment
