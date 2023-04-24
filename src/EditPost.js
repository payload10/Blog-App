import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';

const EditPost = ({ posts, editTitle, editBody, setEditTitle, setEditBody, handleEdit}) => {

    // Find the post to be edited:
    const {id} = useParams();
    // When the id comes from params it is a string so we have converted out json id also to string
    const editPost = posts.find((eachPost) => ((eachPost.id).toString()) === id);

    // Handle edit title:
    const handleEditTitle = (event) => {

        const title = event.target.value;
        setEditTitle(title);
    };

    // Handle Edit body:
    const handleEditBody = (event) => {

        const body = event.target.value;
        setEditBody(body);
    };

    // useEffect
    useEffect(() => {

        if(editPost) {

            setEditTitle(editPost.title);
            setEditBody(editPost.body);
        }

    },[editPost, setEditTitle, setEditBody]);
    

    return (

        <main>
            {
                editPost && 
                <>
                    <form action="" className='newpostform' onSubmit={(e) => e.preventDefault()}>
                        <div className='form'>
                            <h1 className='newpost'>Edit Post</h1>
                            <label htmlFor="title">Title:</label>
                            <input type="text" className='title' placeholder='Title' value={editTitle} onChange={handleEditTitle} required/>
                            
                            <label htmlFor="post" className='postlabel'>Post:</label>
                            <textarea type="text" className='body' placeholder='Description' value={editBody} onChange={handleEditBody} required/>
                            <button className='submitnewpost' onClick={() => handleEdit(editPost.id)}>Done</button>
                        </div>
                    </form>
                </>
            }

            {
                /* If the post is not present, we will get undefined stored in post and negation of undefines is true */
                !editPost &&
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
        </main>
    )
}

export default EditPost