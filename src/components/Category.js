import React, { Component } from "react"
import "./Category.css"
import reactLogo from "../assets/img/react-logo.svg"
import reduxLogo from "../assets/img/redux-logo.png"
import udacityLogo from "../assets/img/udacity-logo.jpg"

const UDACITY = "udacity"
const REACT = "react"
const REDUX = "redux"

class Category extends Component {
  getCategoryImg = categoryName => {
    switch (categoryName) {
      case UDACITY:
        return `url('${udacityLogo}') center / cover`
      case REACT:
        return `url('${reactLogo}') center / cover`
      case REDUX:
        return `url('${reduxLogo}') center / cover`
      default:
        return `url('${reactLogo}') center / cover`
    }
  }

  render() {
    const { category } = this.props
    return (
      <div
        className="category-card-image mdl-card mdl-shadow--2dp"
        style={{
          background: this.getCategoryImg(category.name),
          cursor: "pointer"
        }}
        onClick={() => this.props.history.push("/" + category.path)}
      >
        <div className="mdl-card__title mdl-card--expand" />
        <div className="mdl-card__actions">
          <span className="category-card-image__filename">
            {category.name}
          </span>
        </div>
      </div>
    )
  }
}

export default Category
