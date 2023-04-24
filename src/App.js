import Navbar from "./Navbar";                                /* Navbar */
import NewPost from "./NewPost";                              /* Create a New Post */
import Posts from "./Posts";                                  /* Show all the Posts */
import SinglePostPage from "./SinglePostPage";                /* Show an individual Post */
import NotFound from "./NotFound";                            /* If the page is not found */
import About from './About';                                  /* About */
import Footer from "./Footer";                                /* Footer */
import { Routes, Route } from "react-router-dom";             /* CSS File */
import './App.css';                                           /* Route imports */
import postsapi from './api/postsapi';
import { useEffect, useState } from "react";
import useWindowResize from "./hooks/useWindowResize";
import { useNavigate } from 'react-router-dom';
import format from 'date-fns/format';
import EditPost from "./EditPost";


function App() {

    const[search, setSearch] = useState("");
    const[searchResults, setSearchResults] = useState([]);
    const [posts, setPosts] = useState([]);
    const[postTitle, setPostTitle] = useState("");
    const[postBody, setPostBody] = useState("");
    const[editTitle, setEditTitle] = useState("");
    const[editBody, setEditBody] = useState("");
    const { width } = useWindowResize();            // Custom hook
    const navigate = useNavigate();


    // This useEffect will run at the mount to fetch the data from db.json
    useEffect(() => {

        const fetchData = async () => {

            try {

              // The benefit of using axios is we dont need to handle that !response.ok part, it will automatically handle it, also we don't need to convert the readable stream to json, that too will be handled by axios 
              const response = await postsapi.get("/posts");
              setPosts(response.data);

            } catch (err) {

              if(err.response) {
                
                // If error is not in the 200 response range
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
              
              } else {

                // If we didn't got the response
                console.log(`Error: ${err.message}`);
              } 
            }
        }

        fetchData();

    }, []);

    // This useEffect which will execute when the search input and posts changes
    useEffect(() => {

      const filteredResults = posts.filter((eachPost) => 

          // Check whether search string matches either in body or in the title
          ((eachPost.body).toLowerCase()).includes((search.toLocaleLowerCase())) 
          ||
          ((eachPost.title).toLowerCase()).includes((search.toLowerCase()))

      );

      // Latest post will be at the top
      setSearchResults(filteredResults.reverse());

    }, [posts, search]);

    // Handle Search:
    const handleSearchBox = (event) => {

      const searchedValue = event.target.value;
      setSearch(searchedValue);
    };


    // Handle Submit of Newpost
    const handleSubmit = async (event) => {

      event.preventDefault();

      // Set ID
      const id = (posts.length) ? posts[posts.length - 1].id + 1 : 1;
      const datetime = format(new Date(), 'MMMM dd, yyyy pp');    // Get current date time
      const newPost = {
          id,
          title: postTitle,
          datetime,
          body: postBody
      };

      try {

        // Will get appended in the db.json
        const response = await postsapi.post("/posts", newPost);

        // Insert the new post into existing array
        const newPostsArray = [...posts, response.data]   // response.data is because, response stores the updated json
        setPosts(newPostsArray);
        setPostTitle("");
        setPostBody("");

        // Take user back to HOME page
        navigate("/");
      
      } catch (err) {

        console.log(`Error: ${err.message}`);
      }
    };


    // Edit the post:
    const handleEdit = async(id) => {

      const dateTime = format(new Date(), 'MMMM dd, yyyy pp');
      const updatedPost = {
        id,
        title: editTitle,
        dateTime,
        body: editBody
      };

      try {

        // If we wanted to edit sepcific field, we use patch, but if we need to edit the entire post we will use put
        const response = await postsapi.put(`/posts/${id}`, updatedPost);
        
        // Update the json file
        const updatedPostsArr = posts.map((eachPost) => ((eachPost.id) === id) ? {...response.data} : eachPost);
        setPosts(updatedPostsArr);

        // Reset title and body
        setEditTitle("");
        setEditBody("");

        navigate("/");

      } catch (err) {

        console.log(`Error: ${err.message}`);
      }

    };

    return (

      <div className="App">

        {/* Navbar and Footer we want on each and everypage so that won't go into the route element */}
        <Navbar width={width} search={search} setSearch={setSearch} searchResults={searchResults} setSearchResults={setSearchResults} handleSearchBox={handleSearchBox}/>

        {/* Here is were we will be switching between the pages so we need routing out here */}
        <Routes>
          <Route path="/" element={ <Posts posts={searchResults} /> } />
          <Route path="/posts/newpost" element={ <NewPost posts={posts} setPosts={setPosts} handleSubmit={handleSubmit} 
          postTitle={postTitle} postBody={postBody} setPostTitle={setPostTitle} setPostBody={setPostBody} /> } />
          <Route path="/posts/post/:id" element={ <SinglePostPage posts={posts} setPosts={setPosts} /> } />
          <Route path="/about" element={ <About /> } />
          <Route path="/posts/post/edit/:id" element={< EditPost posts={posts} editTitle={editTitle} setEditTitle={setEditTitle} editBody={editBody} setEditBody={setEditBody} handleEdit={handleEdit} />} />
          <Route path="*" element={ <NotFound />} />
        </Routes>


        <Footer />
      </div>
    );
}

export default App;
