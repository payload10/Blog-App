const NewPost = ({ postTitle, setPostTitle, postBody, setPostBody, handleSubmit }) => {


    // Handle Title input
    const handleTitle = (event) => {

        const title = event.target.value;
        setPostTitle(title);
    };

    // Handle Body input
    const handleBody = (event) => {

        const body = event.target.value;
        setPostBody(body);
    };



    return (

        <main>
            <form action="" className='newpostform' onSubmit={handleSubmit}>
                <div className='form'>
                    <h1 className='newpost'>New Post</h1>
                    <label htmlFor="title">Title:</label>
                    <input type="text" className='title' placeholder='Title' value={postTitle} onChange={handleTitle} required/>
                    
                    <label htmlFor="post" className='postlabel'>Post:</label>
                    <textarea type="text" className='body' placeholder='Description' value={postBody} onChange={handleBody} required/>
                    <button className='submitnewpost'>Submit</button>
                </div>
            </form>
        </main>
    )
}

export default NewPost