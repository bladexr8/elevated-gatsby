// code to run during site building process

/**
 * Create Blog Post Pages Dynamically
 */
const path = require('path');
exports.createPages = async ({ actions, graphql, reporter}) => {
    const { createPage } = actions;
    const BlogPostTemplate = path.resolve('./src/templates/blog-page.js');
    const BlogPostQuery = await graphql(`    
        {
            allMarkdownRemark(filter: { frontmatter: { type: { eq: "Blog" }}}) {
                nodes {
                    fields {
                        slug
                    }
                }
            }
        }
    `);
    if (BlogPostQuery.errors) {
        reporter.panicOnBuild('Error while running Blog Post GraphQL query.');
        return;
    }
    BlogPostQuery.data.allMarkdownRemark.nodes.forEach(({ fields: { slug }}) => {
        createPage({
            path: `blog${slug}`,
            component: BlogPostTemplate,
            context: {
                slug: slug
            }
        });
    });
}


/**
 * Called whenever a new node is created.
 * Add a slug field if the node is of the MarkdownRemark type. 
 * A slug is an address for a specific page on our site, so in 
 * the case of our blog page, we want every blog post to have 
 * a unique slug where it will render on the site.
 */
const { createFilePath } = require('gatsby-source-filesystem')
exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;
    if (node.internal.type === 'MarkdownRemark') {
        const slug = createFilePath({
            node,
            getNode,
            basePath: 'pages'
        });
        createNodeField({
            node,
            name: 'slug',
            value: slug
        });
    }
}