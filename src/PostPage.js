import React from 'react';
import { Link } from 'react-router-dom';
import './style.css'

const PostPage = ({ eachPost }) => {

    /* console.log(eachPost) */
    return (

        <article className='post'>
            <Link className='links' to={`/posts/post/${eachPost.id}`}>
                <h1 className='titlePostPage'>{eachPost.title}</h1>
                <p className='datetime'>{eachPost.datetime}</p>
            </Link>
            <p className='postBody'>
                {
                    (eachPost.body).length <= 20 ? (eachPost.body) : `${(eachPost.body).slice(0,21)}...`
                }
            </p>
        </article>
        
    )
}

export default PostPage