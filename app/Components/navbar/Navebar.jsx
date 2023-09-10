"use client"
// import React, { useState } from 'react';
// import Link from 'next/link';
// import { BsSearch } from 'react-icons/Bs';
// import styles from './Navbar.module.css';// Create a CSS module for styling

// const Navbar = () => {
//   return (
//     <nav className={styles.navbar}>
//       <div className={styles.logo}>
//         <Link href="/Components/Blogss/MyBlogs">
//           <p>My Blogs</p>
//         </Link>
//       </div>
//       <ul className={styles.navLinks}>
//         <li>
//         <div className="search-bar">
//       <input
//         type="text"
//         placeholder="Search..."
//         className="search-input"
//       />
     
//     </div>
//         </li>
        
//         <li>
//           <button className=" hover:bg-green-700 text-green-500 border-2 border-green-600 p-1 rounded"

            
//           >LogOut</button>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = ({ Blogss, setFilteredBlogs }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    const filteredBlogs = Blogss.filter(Blogss =>
      Blogss.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBlogs(filteredBlogss);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/Components/Blogss/MyBlogs">
          <p>My Blogs</p>
        </Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </li>
        <li>
          <button className="hover:bg-green-700 text-green-500 border-2 border-green-600 p-1 rounded">
            LogOut
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
