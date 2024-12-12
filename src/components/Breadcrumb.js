import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../assets/styles/Breadcrumb.css";

const apiUrl = "http://localhost:8080";

const Breadcrumb = ({ customName }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const [dynamicName, setDynamicName] = useState(null);

  useEffect(() => {
    // Fetch item name dynamically if route matches `/view-item/:id` and no customName is provided
    const fetchItemName = async () => {
      if (pathnames[0] === "view-item" && pathnames[1] && !customName) {
        try {
          const response = await fetch(`${apiUrl}/api/items/${pathnames[1]}`);
          if (response.ok) {
            const data = await response.json();
            setDynamicName(data.name);
          } else {
            console.error("Error fetching item name");
          }
        } catch (error) {
          console.error("Error fetching item name:", error);
        }
      }
    };

    fetchItemName();
  }, [pathnames, customName]);

  useEffect(() => {
    // Adjust content margin dynamically
    const breadcrumb = document.querySelector(".breadcrumb");
    const pageContent = document.querySelector(".page-content");
    if (breadcrumb && pageContent) {
      const breadcrumbHeight = breadcrumb.offsetHeight;
      pageContent.style.marginTop = `${breadcrumbHeight + 20}px`; // Add extra spacing for visual comfort
    }
  }, []);

  return (
    <nav className="breadcrumb">
      <Link to="/">Home</Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return (
          <span key={to}>
            {" / "}
            {isLast && (customName || dynamicName) ? (
              <span>{customName || dynamicName}</span>
            ) : (
              <Link to={to}>
                {value.replace(/-/g, " ").charAt(0).toUpperCase() + value.slice(1)}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
