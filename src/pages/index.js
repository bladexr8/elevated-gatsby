import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout/Layout"

const Index = ({ data }) => {

  // de-construct site Metadata
  // to use in page
  const {
    site: {
      siteMetadata: { name, role }
    },
  } = data;

  return (
    <Layout>
      <div className="max-w-5xl mx-auto py-16 lg:py-24">
        <h1 className="text-4xl md:text-6xl font-bold text-black pb-4">{name}</h1>
        <p className="mb-4">{role}</p>
        <Link to="/about" className="btn">About me</Link>
      </div>
    </Layout>
  )
}

export default Index

// graphql query to supply data to page
export const query = graphql`
  {
    site {
      siteMetadata {
        name
        role
      }
    }
  }
`