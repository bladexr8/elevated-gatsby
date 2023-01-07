// code to run during site building process

/**
 * Create Blog Post Pages Dynamically
 */
const path = require('path');
const _ = require('lodash');
exports.createPages = async ({ actions, graphql, reporter}) => {
    const { createPage } = actions;
    const BlogPostTemplate = path.resolve('./src/templates/blog-page.js');
    const BlogPreviewTemplate = path.resolve('./src/templates/blog-preview.js');
    const TagsTemplate = path.resolve('./src/templates/tags.js');
    
    // generate blog post pages
    console.log('Generating Blog Post Pages...');
    const BlogPostQuery = await graphql(`    
        {
            allMarkdownRemark(filter: { frontmatter: { type: { eq: "Blog" }}}) {
                nodes {
                    fields {
                        slug
                    }
                }
            }

            tagsGroup: allMarkdownRemark(filter: { frontmatter: { type: { eq: "Blog" }}}) {
                group(field: frontmatter___tags) {
                    tag: fieldValue
                }
            } 
        }
    `);
    if (BlogPostQuery.errors) {
        reporter.panicOnBuild('Error while running Blog Post GraphQL query.');
        return;
    }
    BlogPostQuery.data.allMarkdownRemark.nodes.forEach(({ fields: { slug }}) => {
        console.log(`-> Generating ${slug}...`);
        createPage({
            path: `blog${slug}`,
            component: BlogPostTemplate,
            context: {
                slug: slug
            }
        });
    });

    // generate blog post preview pages
    console.log('Generating Blog Post Preview Pages...');
    const BlogPosts = BlogPostQuery.data.allMarkdownRemark.nodes;
    const postsPerPage = 6;
    const numPages = Math.ceil(BlogPosts.length / postsPerPage);
    Array.from({ length: numPages}).forEach((_, i) => {
        console.log(`-> Generating ${i === 0 ? '/blog' : `/blog/${i + 1}`}...`);
        createPage({
            path: i === 0 ? '/blog' : `/blog/${i + 1}`,
            component: BlogPreviewTemplate,
            context: {
                limit:  postsPerPage,
                skip: i * postsPerPage,
                numPages,
                currentPage: i + 1,
                slug: i === 0 ? '/blog' : `/blog/${i + 1}`,
            }
        });
    });

    // create tag group pages
    console.log('Generating Blog Post Tag Group Pages...');
    BlogPostQuery.data.tagsGroup.group.forEach((group) => {
        console.log(`-> Generating tags/${_.kebabCase(group.tag)}/...`);
        createPage({
            path: `tags/${_.kebabCase(group.tag)}/`,
            component: TagsTemplate,
            context: {
                tag: group.tag
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