import { Link } from 'react-router-dom'
import { FaTabletAlt, FaLaptop, FaMobileAlt } from 'react-icons/fa';

const Navbar = ({ width, search, handleSearchBox}) => {

    return (

        <div className='head'>
            <header className='header'>
                <section className='header__section'>Blog Everyday</section>
                <section className='header__icon'>
                    {
                        width < 768 ? <FaMobileAlt className='icon'/> :
                        width < 992 ? <FaTabletAlt className='icon'/> :
                        <FaLaptop className='icon'/>
                    }
                </section>
            </header>

        <form className='navbar'>
            <section className='navbar__section'>
                <div className='searchbox'>
                    <input type="text" placeholder='Search Posts' value={search} onChange={handleSearchBox} required/>
                </div>
                <div className='navlink'>
                    <Link className='navlinks' to="/" >Home</Link>
                    <Link className='navlinks' to="/posts/newpost" >New Post</Link>
                    <Link className='navlinks' to="/about" >About</Link>
                </div>
            </section>
        </form>
        </div>
    )
}

export default Navbar