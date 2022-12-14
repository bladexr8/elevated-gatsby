import { navigate } from "gatsby"
import React from "react"
import Layout from "../components/layout/Layout"

// alternate programmatic navigation

const About = () => {
  const triggerNavigation = () => {
    navigate('/')
  }
  return (
    <Layout>
      <h1>My About Page</h1>
      <p>This is my about page</p>
      <button onClick={() => triggerNavigation()}>
        Return to Home Page
      </button>
    </Layout>
  )
}

export default About