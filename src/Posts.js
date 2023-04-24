import React from 'react';
import Feed from './Feed';

const Posts = ({ posts }) => {
    
    /* console.log(posts.length) */
    return (
        
        <main>
            {   
                (posts.length) ? <Feed posts={posts} /> : <p style={{textAlign:"center", width:"100%",marginTop: "2em", marginLeft:"1em", marginRight:"1em", fontSize:"24px", fontWeight:"bold"}}>Sorry, no Posts to Display!</p> 
            }
        </main>
        
    )
}

export default Posts