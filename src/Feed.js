import React from 'react';
import PostPage from './PostPage';

const Feed = ({ posts }) => {

    return (
        
        /* HTML Fragment */
        <>
            { 
                posts.map((eachPost) => (

                    <PostPage key={eachPost.id} eachPost={eachPost} />
                ))
            }
        </>
    )
}

export default Feed