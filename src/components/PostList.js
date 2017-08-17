import React, { Component } from "react"
import ReadableCard from "./ReadableCard"
import { AppBar, FlatButton } from "material-ui"
import { Box } from "grid-styled"
import { connect } from "react-redux"
import { fetchPosts, addPost, editPost } from "../actions/post_actions"
import { cyclePostsOrderBySettings } from "../actions/settings_actions"
import { fetchCategories } from "../actions/category_actions"
import sortBy from 'sort-by';

class PostList extends Component {

  cyclePostOrderBy = () => {
    this.props.cyclePostOrderBy();
  }

  render() {
    const { posts, orderBySettings, history } = this.props
    const orderByObj = orderBySettings.orderByTypes[orderBySettings.actualIndex]

    return (
      <div>
        <AppBar
          title="Posts List"
          style={{ zIndex: 3 }}
          iconElementLeft={
            <FlatButton
              style={{ width: "142px", color: "white", margin: "7px 0px 0px 0px" }}
              label={orderByObj.name}
              icon={<i className="material-icons">sort</i>}
              onClick={() => this.cyclePostOrderBy()}
            />
          }
        />
        <div
          style={{ display: "flex", flexWrap: "wrap", marginBottom: "64px" }}
        >
          {posts.sort(sortBy(orderByObj.command)).map(post =>
            <Box w={[1, 1 / 2, 1 / 3, 1 / 4]} key={post.id}>
              <ReadableCard
                element={post}
                history={history}
                cardType="post"
              />
            </Box>
          )}
        </div>
        <button
          className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
          onClick={() => history.push("/posts/new_post")}
        >
          <i className="material-icons">add</i>
        </button>
      </div>
    )
  }
}

function mapStateToProps({ posts, categories, settings }, ownProps) {
  return {
    posts: Object.keys(posts)
      .reduce((postsArray, postId) => {
        postsArray = postsArray.concat([posts[postId]])
        return postsArray
      }, [])
      .filter(post => !post.deleted && ( (ownProps.match && ownProps.match.params.category) ? post.category === categories[ownProps.match.params.category].name : true)),
    orderBySettings: settings.postsSort  
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    fetchCategories: () => dispatch(fetchCategories()),
    addPost: data => dispatch(addPost(data)),
    editPost: data => dispatch(editPost(data)),
    cyclePostOrderBy: () => dispatch(cyclePostsOrderBySettings())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)
