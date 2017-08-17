import React, { Component } from "react"
import { Route } from "react-router-dom"
import { withRouter } from "react-router-dom"
import logo from "../logo.svg"
import PostList from "./PostList"
import PostDetails from "./PostDetails"
import PostForm from "./PostForm"
import CategoryList from "./CategoryList"
import { connect } from "react-redux"
import { fetchPosts, addPost, editPost } from "../actions/post_actions"
import { fetchComments } from "../actions/comment_actions"
import { fetchCategories } from "../actions/category_actions"
import { appLoaded } from "../actions/settings_actions"
import Loading from "react-loading"
import "./App.css"

class App extends Component {
  async componentDidMount() {
    const postsArray = await this.props.fetchPosts()
    await Promise.all(
      postsArray.posts.map(async post => {
        await this.props.fetchComments(post.id)
        return post
      })
    )
    await this.props.fetchCategories()

    this.props.appLoaded()
  }

  render() {
    if (this.props.appIsLoaded) {
      return (
        <div className="App">
          <Route exact path="/posts/new_post" component={PostForm} />
          <Route exact path="/posts/:postId/edit_post" component={PostForm} />
          <Route exact path="/:category/:postId" component={PostDetails} />
          <Route exact path="/:category" component={PostList} />
          <Route
            exact
            path="/"
            render={({ history }) =>
              <div>
                <div className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <h2 className="App-name">Welcome to Readable Project</h2>
                </div>
                <div>
                  <CategoryList history={history} />
                  <PostList history={history} category="all" />
                </div>
              </div>}
          />
        </div>
      )
    } else {
      return (
        <div className="App">
          <Loading delay={200} type="spin" color="#222" className="loading" />
        </div>
      )
    }
  }
}

function mapStateToProps({ posts, settings }) {
  return {
    posts: Object.keys(posts)
      .reduce((postsArray, postId) => {
        postsArray = postsArray.concat([posts[postId]])
        return postsArray
      }, [])
      .filter(post => !post.deleted),
    appIsLoaded: settings.appLoaded
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appLoaded: () => dispatch(appLoaded()),
    fetchPosts: () => dispatch(fetchPosts()),
    fetchComments: data => dispatch(fetchComments(data)),
    fetchCategories: () => dispatch(fetchCategories()),
    addPost: data => dispatch(addPost(data)),
    editPost: data => dispatch(editPost(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
