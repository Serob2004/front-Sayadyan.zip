import React, { useState, useEffect, useRef } from "react";
import "./css/Header.css";

export default function Header() {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const lastScrollY = useRef(0);
  const debounceTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 200) {
        setIsNavVisible(currentScrollY < lastScrollY.current);
      } else {
        setIsNavVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      const event = new CustomEvent("filterPosts", { detail: value });
      window.dispatchEvent(event);
    }, 400);
  };

  return (
    <header className="site-header">
      <div className="header-main-container">
        <div className="header-left">
          <button className="mobile-burger-btn" onClick={toggleMobileMenu}>
            <span className="burger-line"></span>
            <span className="burger-line"></span>
            <span className="burger-line"></span>
          </button>
        </div>

        <div className="header-center">
          <a href="/" className="logo-link">
            <h1 className="logo-text">LOGOTYPE</h1>
          </a>
        </div>

        <div className="header-right">
          <button className="search-button" onClick={toggleSearch}>
            <svg className="search-icon-svg" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          {isSearchOpen && (
            <input
              type="text"
              placeholder="Search posts..."
              className="search-input"
              value={searchText}
              onChange={handleSearchChange}
              autoFocus
            />
          )}
        </div>
      </div>

      <nav className={`desktop-navbar ${!isNavVisible ? "nav-hidden" : ""}`}>
        <ul className="nav-menu-list">
          <li>
            <a href="/">Demos</a>
          </li>
          <li className="has-submenu">
            <a href="/">
              Post <span className="arrow-down"></span>
            </a>
            <ul className="submenu">
              <li>
                <a href="/">Standard Post</a>
              </li>
              <li>
                <a href="/">Video Post</a>
              </li>
              <li>
                <a href="/">Gallery Post</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="/">Features</a>
          </li>
          <li>
            <a href="/">Categories</a>
          </li>
          <li>
            <a href="/">Shop</a>
          </li>
          <li>
            <a href="/">Buy Now</a>
          </li>
        </ul>
      </nav>

      <div
        className={`mobile-overlay ${isMobileMenuOpen ? "active" : ""}`}
        onClick={toggleMobileMenu}
      >
        <aside className="mobile-sidebar" onClick={(e) => e.stopPropagation()}>
          <div className="sidebar-header">
            <div className="logo-text-small">LOGOTYPE</div>
            <button className="close-menu-btn" onClick={toggleMobileMenu}>
              &times;
            </button>
          </div>
          <ul className="mobile-nav-links">
            <li>
              <a href="/">Demos</a>
            </li>
            <li>
              <a href="/">Post</a>
            </li>
            <li>
              <a href="/">Features</a>
            </li>
            <li>
              <a href="/">Categories</a>
            </li>
            <li>
              <a href="/">Shop</a>
            </li>
            <li>
              <a href="/">Buy Now</a>
            </li>
          </ul>
        </aside>
      </div>
    </header>
  );
}
