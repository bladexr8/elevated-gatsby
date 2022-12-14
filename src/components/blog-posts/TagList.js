import React, { Fragment } from "react"

/**
 * 
 * map over array of tags and returned a styled div for that tag
 * Fragment avoids enforcing ordering and positioning of tags and
 * allows Parent to decide
 * 
 */
const TagList = ({ tags }) => {
    return (
        <Fragment>
            {tags.map((tag) => (
                <div
                    key={tag}
                    className="rounded-full px-2 py-1 uppercase text-xs bg-blue-600 text-white">
                        <p>{tag}</p>
                    </div>
            ))}
        </Fragment>
    )
}

export default TagList