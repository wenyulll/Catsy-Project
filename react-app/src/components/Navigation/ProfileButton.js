import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './ProfileButton.css'
import { clearCartThunk } from "../../store/shoppingCart";

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(clearCartThunk())
    dispatch(logout());
    setShowMenu(false);
    history.push(`/`);
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <div className="profile-button-container">
        <button className="profile-button" onClick={openMenu}>
          <i className="fas fa-user-circle" />
        </button>
        <div className="dropdown-container">
          <ul className={ulClassName} ref={ulRef}>
            {user ? (
              <div className="loggedin-dropdown-container">
                <ul>{user.username}</ul>
                <ul>{user.email}</ul>
                <ul>
                  <button onClick={handleLogout}>Log Out</button>
                </ul>
              </div>
            ) : (
              <div className="openmodal-buttons">
                <OpenModalButton
                  buttonText="Log In"
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
                <OpenModalButton
                  buttonText="Sign Up"
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </div>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ProfileButton;
