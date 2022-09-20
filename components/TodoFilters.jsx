import React from "react";
import PropTypes from "prop-types";

const TodoFilters = ({ filter, onFilter }) => {
  return (
    <div className="status">
      <button
        onClick={() => onFilter("all")}
        className={`status-item ${filter === "all" ? "active" : ""}`}
      >
        All
      </button>
      <button
        onClick={() => onFilter("active")}
        className={`status-item ${filter === "active" ? "active" : ""}`}
      >
        Active
      </button>
      <button
        onClick={() => onFilter("completed")}
        className={`status-item ${filter === "completed" ? "active" : ""}`}
      >
        Completed
      </button>
    </div>
  );
};

TodoFilters.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default TodoFilters;
