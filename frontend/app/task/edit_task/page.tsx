"use client";
import Modal from "@/app/components/Modal";
import React, { useActionState, useState } from "react";
import { useAppSelector } from "@/lib/hooks";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5169";

export default function EditPage() {
  const task = useAppSelector(state => state.task.task);
  const [taskData, setTaskData] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSubmit = async () => {
    console.log("handlesubmit task.id, ", task.id);
    try {
      const response = await fetch(`${apiBaseUrl}/api/TaskItems/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(taskData),
      });
      if (response.ok) {
        setIsModalVisible(true);
      }
    } catch (error) {
      console.log("Error: Task was not updated.", error);
    }
  };

  return (
    <>
      <div
        className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
        data-theme="cupcake"
      >
        <div className="pl-4 pb-4">
          <h2 className="text-lg font-bold">Edit Task</h2>
          <div className="flow-root">
            <div className="label">
              <span className="label-text">{task.description}</span>
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Type here"
                value={taskData}
                className="input input-bordered w-full max-w-xs"
                onChange={e => setTaskData(e.target.value)}
              />
              <button
                className="btn btn-primary"
                onClick={() => handleSubmit()}
              >
                Edit
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setTaskData("")}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
      {isModalVisible && <Modal text={"Task successfully updated."} />}
    </>
  );
}
