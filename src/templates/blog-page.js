import React from "react"
import Layout from "../components/layout/Layout"
import TagList from "../components/blog-posts/TagList"

const BlogPage = () => {
    return (
        <Layout>
            <div className="max-w-5xl space-y-4 mx-auto py-6 md:py-12 overflow-x-hidden lg:overflow-x-visible">
                <h1 className="text-4xl font-bold">Blog Title</h1>
                <div className="flex items-center space-x-2">
                    <p className="text-lg opacity-50">Date</p>
                    <TagList tags={["ux"]} />
                </div>
                <div>
                    Article Body
                </div>
            </div>
        </Layout>
    )
}

export default BlogPage