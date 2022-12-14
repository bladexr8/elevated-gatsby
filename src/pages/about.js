import { navigate, graphql } from "gatsby"
import React from "react"
import Layout from "../components/layout/Layout"

// alternate programmatic navigation

const About = ({ data }) => {
  const triggerNavigation = () => {
    navigate('/')
  }

  // bio content from data prop
  const {
    markdownRemark: { html },
  } = data

  return (
    <Layout>
      <div className="max-w-5xl mx-auto py-16 lg:py-24 text-center">
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
        <button className="btn" onClick={() => triggerNavigation()}>
          Return to Home Page
        </button>
      </div>
    </Layout>
  )
}

export default About

// graphql query to populate data prop
export const query = graphql`
  {
    markdownRemark(frontmatter: { type: { eq: "bio" }}) {
      html
    }
  }
`