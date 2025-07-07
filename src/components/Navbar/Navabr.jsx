import React from "react";

const Navbar = ({ searchTerm, setSearchTerm }) => {
  return (
    <nav className="bg-slate-700 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <div className="text-xl font-semibold">
        Contact Manager
      </div>


      <div>
        <input
          type="text"
          placeholder="Search  by name or email.."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded text-black w-64"
        />
      </div>
    </nav>
  );
};

export default Navbar;
