import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout/Layout"

const Index = () => {
  return (
    <Layout>
      <h1>My Landing Page</h1>
      <p>This is my landing page</p>
      <Link to="/about">About Me</Link>
    </Layout>
  )
}

export default Index