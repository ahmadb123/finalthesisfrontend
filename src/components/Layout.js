import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";

const Layout = () => {
  const location = useLocation();

  let customName = null;

  if (location.pathname.startsWith("/view-item/")) {
    // Use state or props to pass customName
    const itemData = JSON.parse(sessionStorage.getItem("currentItem")) || null;
    customName = itemData?.name; // Dynamically fetch customName
  }

  useEffect(() => {
    // Dynamically adjust the margin of the content below the breadcrumb
    const breadcrumb = document.querySelector(".breadcrumb");
    const pageContent = document.querySelector(".page-content");

    if (breadcrumb && pageContent) {
      const breadcrumbHeight = breadcrumb.offsetHeight;
      pageContent.style.marginTop = `${breadcrumbHeight + 10}px`; // Add 10px for spacing
    }
  }, [location]); // Runs when location changes

  return (
    <div>
      <Breadcrumb customName={customName} />
      <div className="page-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
