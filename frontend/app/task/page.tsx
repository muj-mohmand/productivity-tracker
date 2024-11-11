"use client";
import React, { useState, useRef, useEffect } from "react";
import Modal from "../components/Modal";
import { useAppSelector } from "@/lib/hooks";
import { apiBaseUrl } from "next-auth/client/_utils";
import { json } from "stream/consumers";

export default function AddTaskPage() {
  const [taskData, setTaskData] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [countOfEntries, setCountOfEntries] = useState(0);
  const currentUserId = useAppSelector(state => state.user.userInfo.email);
  const isUserGuest = useAppSelector(state => state.user.isGuest);
  let guestTaskList = localStorage.getItem("guestTaskList");
  console.log(currentUserId);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5169";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isUserGuest) {
      try {
        const taskObject = {
          id: countOfEntries,
          UserId: currentUserId,
          IsComplete: false,
          description: taskData,
          CreatedAt: new Date().toISOString(),
        };
        if (!guestTaskList) {
          localStorage.setItem("guestTaskList", JSON.stringify([taskObject]));
        } else {
          let list = JSON.parse(guestTaskList);
          taskObject.id = list.length;
          list.push(taskObject);
          localStorage.setItem("guestTaskList", JSON.stringify(list));
        }
        //modal pop up for guest successfull add
        setTaskData("");
        setCountOfEntries(countOfEntries + 1);
        setIsModalVisible(true);
      } catch {
        console.log("Error in submission");
      } // end of guest submission logic
    } else {
      try {
        // Asynchronous POST request
        const response = await fetch(`${apiBaseUrl}/api/TaskItems`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            UserId: currentUserId,
            IsComplete: false,
            Description: taskData,
            CreatedAt: new Date().toISOString(),
          }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Success:", result); // Log the full success response
          setTaskData("");
          setCountOfEntries(countOfEntries + 1);
          setIsModalVisible(true);
        } else {
          console.error(`Error: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(`Error: ${error.message}`);
        } else {
          console.log("An unknown error occured.");
        }
      }
    }
  };

  const handleClear = () => {
    setTaskData("");
  };

  return (
    <>
      <div
        className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
        data-theme="cupcake"
      >
        <div className="pl-4 pb-4">
          <h2 className="text-lg font-bold">Create New Task</h2>
          <div className="flow-root">
            <div className="label">
              <span className="label-text">What is the task?</span>
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Type here"
                value={taskData}
                className="input input-bordered w-full max-w-xs"
                onChange={e => setTaskData(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleSubmit}>
                Add
              </button>
              <button className="btn btn-secondary" onClick={handleClear}>
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
      {isModalVisible && (
        <Modal key={countOfEntries} text={"Task successfully added."} />
      )}
    </>
  );
}
