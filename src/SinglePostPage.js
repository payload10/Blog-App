import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import postsapi from './api/postsapi';
import './style.css'

const SinglePostPage = ({ posts, setPosts }) => {

    // useNavigate is used to navigate to a different page
    const navigate = useNavigate();

    // Grab the ID from the URL which is unique for each and every post
    const {id} = useParams();

    // We will get the first result that matches
    const post = posts.find((eachPost) => ((eachPost.id).toString()) === id);

    // Handle Delete:
    const handleDelete = async (id) => {

        try {

            await postsapi.delete(`/posts/${id}`);
            const deletedPostsArr = posts.filter((eachPost) => ((eachPost.id) !== id));
            setPosts(deletedPostsArr);

            // After deletion and setting the new array navigate user back to the HOME page
            navigate("/")
        
        } catch (err) {

            console.log(`Error: ${err.message}`);
        }
    };
    

    return (

        <main className='singlePostDisplay'>
            <article className='singlePost'>
                {
                    /* If the post is present */
                    post && 
                    <>
                        <h1 className='postTitle'>{post.title}</h1>
                        <h6 className='postDate'>{post.datetime}</h6>
                        <p className='postBody'>{post.body}</p>
                        <div className='buttons'>
                            <button className='postDeleteButton' onClick={(e) => handleDelete(post.id)}>Delete Post</button>
                            <Link to={`/posts/post/edit/${post.id}`} className='postEditButton'>Edit Post</Link>
                        </div>
                    </>
                }

                {
                    /* If the post is not present, we will get undefined stored in post and negation of undefines is true */
                    !post &&
                    <>
                        <div className='notfound'>
                            <h1 className='notfoundh1'>Post not found!</h1>
                            <p className='notfoundp'>Well, that's disappointing.</p>
                            <p>
                                <Link className='notfoundlink' to="/">Visit our Homepage</Link>
                            </p>
                        </div>
                    </>
                }
            </article>
        </main>
    )
}

export default SinglePostPage