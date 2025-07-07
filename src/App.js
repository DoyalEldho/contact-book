import React, { useState } from "react";

import ContactForm from "./components/ContactApp/ContactForm";
import Navbar from "./components/Navbar/Navabr";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ContactForm searchTerm={searchTerm} />
    </div>
  );
};

export default App;
