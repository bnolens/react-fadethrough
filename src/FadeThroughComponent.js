import React, { Component } from 'react'
import FadeThroughChild from './FadeThroughChild'

export default class FadeThroughComponent extends Component {

  render() {
    const inactiveStyle = {
      position: 'absolute',
      transition: 'opacity 3s',
      opacity: '0',
      display: 'flex',
      flex: 1,
      width: '100%',
      height: '100%'
    }

    const activeStyle = {
      position: 'absolute',
      transition: 'opacity 3s',
      opacity: '1',
      display: 'flex',
      flex: 1,
      width: '100%',
      height: '100%'
    }

    const style = {
        display: 'flex',
        flex: 1
     }

    return (
      <div style={style}>
      { this.props.children.map((child, index) => (
        <FadeThroughChild
          key={ 'fade-through-child' + index }
          style={ index === this.props.activeIndex ? activeStyle : inactiveStyle }
        >
          { child }
        </FadeThroughChild>
      )) }
      </div>
    )
  }
}

FadeThroughComponent.defaultProps = {
  activeIndex: 0
}
