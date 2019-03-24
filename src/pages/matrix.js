import React, { useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"
import sample from "lodash.sample"
import letters from "../letters"
import "normalize.css"

const matrixGreen = ["#00FF41", "#008F11", "#003B00"]

const Wrapper = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  background: #272727;
`
const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20px, 1fr));
  height: 100%;
  padding: 0;
  margin: 0;
`
const Letters = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    opacity: 0;
    padding: 0;
    margin: 0;
    color: ${matrixGreen[0]};
    font-size: 2rem;
  }
`

const fade = keyframes`
  0% {
    opacity: 0;
  }
  2% {
    opacity: 1;
  }

  100% {
    opacity: 1;
  }
`
const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }

  100% {
    opacity: 0;
  }
`

const Letter = styled.p`
  animation: ${fade} infinite, ${fadeOut} infinite;
  animation-delay: ${props => props.delay * 0.1}s;
  animation-fill-mode: forwards;
  animation-duration: 5s, 9s;
`

export default class matrix extends React.Component {
  state = {
    widthRem: 0,
    heightRem: 0,
  }
  componentDidMount() {
    this.setState({
      widthRem: window.screen.width / 32,
      heightRem: window.screen.height / 36.8,
    })
  }
  render() {
    if (this.state.widthRem === 0 || this.state.heightRem === 0) {
      return null
    }

    const lengthLetters = Array.from(
      { length: this.state.heightRem + 1 },
      (_, i) => i
    )
    const columnLength = Array.from(
      { length: this.state.widthRem },
      (_, i) => i
    )

    return (
      <Wrapper>
        <Columns>
          {columnLength.map(col => (
            <Letters>
              <PrintLetters
                lengthLetters={lengthLetters}
                widthRem={this.state.widthRem}
              />
            </Letters>
          ))}
        </Columns>
      </Wrapper>
    )
  }
}

class PrintLetters extends React.Component {
  state = {
    show: false,
  }

  componentDidMount() {
    const randomNumber = Math.random() * Math.floor(this.props.widthRem) * 1000
    setTimeout(() => {
      this.setState({
        show: true,
      })
    }, randomNumber)
  }

  render() {
    if (this.state.show) {
      return this.props.lengthLetters.map((letz, i) => (
        <Letter key={i} delay={i}>
          {sample(letters)}
        </Letter>
      ))
    }

    return null
  }
}
