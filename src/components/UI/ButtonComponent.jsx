import React from "react";
import { useNavigate } from "react-router-dom";
import { BiLoaderCircle } from "react-icons/bi";
import "../../styles/components/UI/Button.css";

const ButtonComponent = ({
  label,
  route,
  onClick,
  disabled = false,
  loading = false,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (route) {
      navigate(route);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`btn ${disabled ? "disabled" : ""}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {loading ? <BiLoaderCircle className="loading-icon" /> : label}
    </button>
  );
};

export default ButtonComponent;
