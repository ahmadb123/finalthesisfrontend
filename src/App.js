import React from "react";
import AppRoutes from "./routes";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../src/assets/styles/main.css"; // Ensure this import is present
// import HomePage from "./pages/HomePage";

const App = () => {
    return(
        <div className="App">
            {/* <HomePage /> */}
            <AppRoutes />
        </div>
    );
};

export default App;