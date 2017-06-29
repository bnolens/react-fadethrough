import React, { Component, Children } from 'react'
import FadeThroughComponent from './FadeThroughComponent'

export default class FadeThroughContainer extends Component {

  constructor(props) {
    super(props)
    this.state = { activeIndex: 0 }
  }

  componentDidMount() {
    this.startTimer()
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  componentWillReceiveProps(nextProps) {
    const oldCount = Children.count(this.props.children)
    const newCount = Children.count(nextProps.children)
    if (oldCount !== newCount) {
      this.reset()
    }
  }

  startTimer() {
    this.interval = setInterval(
      this.next(),
      this.props.delay
    )
  }

  next() {
    return () => {
      this.setState({ activeIndex: this.state.activeIndex + 1 })
      if (this.state.activeIndex === this.props.children.length)
        this.setState({ activeIndex: 0 })
    }
  }

  reset() {
    this.setState({
      activeIndex: 0
    })

    clearInterval(this.interval)
    this.startTimer()
  }

  render() {
    const style = {
      width: this.props.width,
      height: this.props.height,
      display: 'flex',
      flex: 1
    }
    return (
      <div style={ style }>
        <FadeThroughComponent
          activeIndex={ this.state.activeIndex }
          delay={ this.props.delay }
        >
          { this.props.children }
        </FadeThroughComponent>
      </div>
    )
  }
}

FadeThroughContainer.propTypes = {
  width: React.PropTypes.string.isRequired,
  height: React.PropTypes.string.isRequired,
  delay: React.PropTypes.number.isRequired,
  reset: React.PropTypes.func
}
