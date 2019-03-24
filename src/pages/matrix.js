import React, { useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"
import sample from "lodash.sample"
import { TimelineMax, TweenLite } from "gsap"
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
  /* border: 1px solid white; */
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

// const fade = keyframes`
//   0% {
//     opacity: 0;
//   }

//   100% {
//     opacity: 1;
//     /* color: ${matrixGreen[1]}; */
//   }
// `
const fade = keyframes`
  0% {
    opacity: 0;
  }
  2% {
    opacity: 1;
  }

  100% {
    opacity: 1;
    /* color: ${matrixGreen[1]}; */
  }
`
const colorDo = keyframes`

  50% {
    color: ${matrixGreen[0]};
  }

  100% {
    color: ${matrixGreen[1]};
  }
`
const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  28% {
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
  animation-duration: 5s, 7s;
  /* animation: ${fade}, ${colorDo}, ${fadeOut};
  animation-delay: ${props => props.delay * 0.1}s,
    ${props => props.delay * 0.1}s, ${props => props.delay * 0.25}s;
  animation-fill-mode: forwards;
  animation-duration: 0.1s, 2.5s, 0.8s; */
`

export default function matrix() {
  const widthRem = window.screen.width / 32
  const heightRem = window.screen.height / 36.8
  // console.log(widthRem)
  // console.log(heightRem)
  const lengthLetters = Array.from({ length: heightRem + 1 }, (_, i) => i)
  const columnLength = Array.from({ length: widthRem }, (_, i) => i)
  // const columnLength = Array.from({ length: 1 }, (_, i) => i)

  return (
    <Wrapper>
      <Columns>
        {columnLength.map(col => (
          <Letters key={col}>{printLetters(lengthLetters, widthRem)}</Letters>
        ))}
      </Columns>
    </Wrapper>
  )
}

const printLetters = (lengthLetters, widthRem) => {
  const [show, setShow] = useState(false)
  const randomNumber = Math.floor(Math.random() * Math.floor(widthRem)) * 1000

  useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, randomNumber)
  }, [])
  if (show) {
    return lengthLetters.map((letz, i) => (
      <Letter key={i} delay={i}>
        {sample(letters)}
      </Letter>
    ))
  }
  return null
}
