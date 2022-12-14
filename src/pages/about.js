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
      <div className="max-w-5xl mx-auto py-16 lg:py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-black pb-4">My About Page</h1>
        <p className="mb-6">This is my about page</p>
        <button className="btn" onClick={() => triggerNavigation()}>
          Return to Home Page
        </button>
      </div>
    </Layout>
  )
}

export default About