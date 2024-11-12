import React from "react";
import AppRoutes from "./routes";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Add Font Awesome here
import '../src/assets/styles/main.css';
const App = () => {
    return(
        <div className="App">
            <AppRoutes />
        </div>
    );
};


export default App;