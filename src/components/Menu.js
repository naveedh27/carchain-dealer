import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'

import { NavLink } from 'react-router-dom'

export default class TopMenu extends Component {
  state = { counter: 10 }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  componentDidMount() {

  }


  render() {

    return (
      <div style={{ marginBottom:`20px`}}>
        {/* <Segment > */}
          <Menu inverted pointing compact>
            <Menu.Item
              name='Add Car'
              as={NavLink}
              exact
              to="/"
              onClick={this.handleItemClick} />
          <Menu.Item
              name='Market Place'
              as={NavLink}
              exact
              to="/market"
              onClick={this.handleItemClick} />
          </Menu>
        {/* </Segment> */}
      </div>
    )
  }
}