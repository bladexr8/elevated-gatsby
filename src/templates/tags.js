import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout/Layout";
import TagList from "../components/blog-posts/TagList";
export default function Tags({ pageContext, data }) {
  const { tag } = pageContext;
  const {
    blogposts: { nodes },
  } = data;
  return (
    <Layout>
      <div>
        <p>Posts tagged with "{tag}"</p>
        {nodes.map(
          ({ frontmatter: { date, tags, title, desc },
             fields: { slug } }) => (
            <div>
              <Link to={'/blog${slug}'}>
                <h2>{title}</h2>
                <div>
                  <p>{date.split("T")[0]}</p>
                  <TagList tags={tags} />
                </div>
                <p>{desc}</p>
              </Link>
            </div>
          )
        )}
      </div>
    </Layout>
  );
}


export const pageQuery = graphql`
query($tag: String) {
  blogposts: allMarkdownRemark(
    sort: { fields: [frontmatter___date], order:
      DESC }
    filter: { frontmatter: { tags: { in: [$tag] },
      type: { eq: "Blog" } } }
  ) {
    totalCount
    nodes {
      frontmatter {
        date
        title
        tags
        desc
      }
      fields {
        slug
      }
    }
  }
}
`;