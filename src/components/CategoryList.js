import React, { Component } from "react"
import { Box } from "grid-styled"
import Category from "./Category"
import { connect } from "react-redux"

class CategoryList extends Component {

  render() {
    const { categories } = this.props
    return (
      <div>
        <div style={{ display: "flex", flexWrap: "wrap", margin: "20px" }}>
          <Box w={[1, 1, 1, 1 / 4]} className="text-center">
            <h4>Categories:</h4>
          </Box>
          {categories.map(category =>
            <Box w={[1, 1 / 2, 1 / 3, 1 / 4]} key={category.path}>
              <Category category={category} history={this.props.history} />
            </Box>
          )}
        </div>
      </div>
    )
  }
}

function mapStateToProps({ categories }) {
  return {
    categories : Object.keys(categories)
      .reduce((categoriesArray, categoriesPath) => {
        categoriesArray = categoriesArray.concat([categories[categoriesPath]])
        return categoriesArray
      }, [])
  }
}

export default connect(mapStateToProps)(CategoryList)
