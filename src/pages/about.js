import { navigate } from "gatsby"
import React from "react"

// alternate programmatic navigation

const About = () => {
  const triggerNavigation = () => {
    navigate('/')
  }
  return (
    <div>
      <h1>My About Page</h1>
      <p>This is my about page</p>
      <button onClick={() => triggerNavigation()}>
        Return to Home Page
      </button>
    </div>
  )
}

export default About