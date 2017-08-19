import React, { Component } from "react"
import { FlatButton } from "material-ui"
import { addPost, editPost } from "../actions/post_actions"
import uuidv4 from "../utils/uuid_gen"
import { connect } from "react-redux"
import ReactMaterialSelect from "react-material-select"
import "react-material-select/lib/css/reactMaterialSelect.css"
import "./PostForm.css"

class PostForm extends Component {
  componentDidMount() {
    window.componentHandler.upgradeDom()
  }

  componentDidUpdate() {
    setTimeout(function() {
      window.componentHandler.upgradeDom()
    }, 0)
  }

  savePost = post => {
    console.log(post)

    if (!post.author || !post.title || !post.body || post.category === "") {
      return
    }

    if (!post.id) {
      this.props.addPost({
        id: uuidv4(),
        author: post.author,
        title: post.title,
        category: post.category,
        timestamp: Date.now(),
        body: post.body
      })
    } else {
      this.props.editPost(post)
    }

    this.props.history.push("/")
  }

  render() {
    const { post, categories } = this.props
    return (
      <div className="text-center post-form" style={{ padding: "20px" }}>
        <h3 className="subheader">
          {post == null ? "Add post" : "Edit post"}
        </h3>
        <div className="mdl-textfield mdl-js-textfield block">
          <input
            className="mdl-textfield__input"
            type="text"
            id="author"
            defaultValue={post ? post.author : ""}
            ref={input => (this.author = input)}
          />
          <label className="mdl-textfield__label" htmlFor="author">
            Author*
          </label>
        </div>
        <div className="mdl-textfield mdl-js-textfield block">
          <input
            className="mdl-textfield__input"
            type="text"
            id="title"
            defaultValue={post ? post.title : ""}
            ref={input => (this.title = input)}
          />
          <label className="mdl-textfield__label" htmlFor="title">
            Title*
          </label>
        </div>
        <div className="mdl-textfield mdl-js-textfield block">
          <textarea
            className="mdl-textfield__input"
            type="text"
            rows="3"
            id="body"
            defaultValue={post ? post.body : ""}
            ref={input => (this.body = input)}
          />
          <label className="mdl-textfield__label" htmlFor="body">
            Body*
          </label>
        </div>
        <ReactMaterialSelect
          defaultValue={post ? post.category : ""}
          label="Category"
          ref="category"
        >
          {categories.map(category =>
            <option dataValue={category.name} key={category.name}>
              {category.name}
            </option>
          )}
        </ReactMaterialSelect>
        <FlatButton
          label="Save"
          icon={<i className="material-icons">save</i>}
          onClick={e =>
            this.savePost({
              id: post ? post.id : null,
              author: this.author.value,
              title: this.title.value,
              body: this.body.value,
              category: this.refs.category.getValue()
            })}
        />
      </div>
    )
  }
}

function mapStateToProps({ posts, categories }, ownProps) {
  var post = null
  if (ownProps.match && ownProps.match.params.postId) {
    post = posts[ownProps.match.params.postId]
  }
  return {
    post: post,
    categories: Object.keys(
      categories
    ).reduce((categoriesArray, categoriesPath) => {
      categoriesArray = categoriesArray.concat([categories[categoriesPath]])
      return categoriesArray
    }, [])
  }
}

export default connect(mapStateToProps, { addPost, editPost })(PostForm)
