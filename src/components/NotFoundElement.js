import React, { Component } from "react"

class NotFoundElement extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <h3>Sorry, Element not found!</h3>
      </div>
    )
  }
}

export default NotFoundElement
