import { navigate, graphql } from "gatsby"
import React from "react"
import Layout from "../components/layout/Layout"
import { MDXRenderer } from "gatsby-plugin-mdx"

// alternate programmatic navigation

const About = ({ data }) => {
  const triggerNavigation = () => {
    navigate('/')
  }

  // bio content from data prop
  const {
    mdx: { body },
    graphCmsIcebreaker: { hobbies },
  } = data

  return (
    <Layout>
      <div className="max-w-5xl mx-auto py-16 lg:py-24 text-center">
        <MDXRenderer>{body}</MDXRenderer>
        <h2>Hobbies</h2>
        {hobbies.join(", ")}
        <br />
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
    mdx(frontmatter: { type: { eq: "bio" }}) {
      body
    }
    graphCmsIcebreaker {
      hobbies
    }
  }
`