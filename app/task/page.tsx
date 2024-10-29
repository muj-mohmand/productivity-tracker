import React from "react";

export const AddTaskPage = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="pl-4">
        <h2 className="text-lg font-bold">Create New Task</h2>
        <div className="flow-root">
          <div className="label">
            <span className="label-text">What is the task?</span>
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
            <button className="btn">Add</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTaskPage;
