"use client";
import React, { useState } from "react";

export default function AddTaskPage() {
  const [taskData, setTaskData] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // public class TaskItem
    // {
    //     public long Id { get; set; }
    //     public string? UserId { get; set; }
    //     public bool IsComplete { get; set; }
    //     public required string Description { get; set; }
    //     public DateTime? CreatedAt { get; set; }

    // }
    try {
      // Asynchronous POST request
      const response = await fetch("https://localhost:7149/api/TaskItems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserId: "guest",
          IsComplete: false,
          Description: taskData,
          CreatedAt: new Date().toISOString(),
        }),
      });
      console.log(response);

      // Check if response is successful
      if (!response.ok) {
        console.log(response); // Log the response *before* throwing the error
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse JSON response
      const result = await response.json();
      console.log(await response.json()); // await the json parsing
      console.log(`Success: ${result.message}`);
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error: ${error.message}`);
      } else {
        console.log("An unknown error occured.");
      }
    }
  };

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
              onChange={e => setTaskData(e.target.value)}
            />
            <button className="btn" onClick={handleSubmit}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
