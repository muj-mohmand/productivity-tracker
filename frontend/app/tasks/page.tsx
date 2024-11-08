"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector, useAppStore } from "../../lib/hooks";
import {
  isLoggedIn,
  setStateUserInfo,
} from "../../lib/features/user/userSlice";

interface UserInfo {
  name: string | null;
  email: string | null;
}

interface Task {
  id: number | null;
  userId: string;
  isComplete: boolean;
  description: string;
  createdAt: string;
}
export default function TasksPage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const [taskItems, setTaskItems] = useState<Task[]>([]);
  console.log(`The user state info is : `, user);

  // Use HTTP for local development to avoid certificate issues
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5169";

  async function fetchUserData() {
    console.log("fetchUserData called");
    try {
      const response = await fetch(`${apiBaseUrl}/auth/user`, {
        method: "GET",
        credentials: "include",
        mode: "cors",
      });

      const data = await response.json();

      console.log("Auth response status:", data);

      // //set user data in store
      if (response.ok) {
        dispatch(setStateUserInfo(data));
        setUserInfo(data);
        console.log("response data", data);
        console.log("response userInfo", userInfo);
        getTasks(data);
      }

      setError(null);
    } catch (error) {
      console.error("Detailed error:", error);
      setError("Connection failed. Please ensure the API server is running.");
      // Don't redirect immediately on error to show the error message
    } finally {
      setLoading(false);
    }
  }
  const getTasks = async (user: UserInfo | null) => {
    console.log("Get tasks", user);
    if (user?.email) {
      const params = new URLSearchParams({ email: user.email });
      const response = await fetch(`${apiBaseUrl}/api/TaskItems?${params}`, {
        method: "GET",
        credentials: "include",
        mode: "cors",
      });
      const data = await response.json();
      console.log(data);
      setTaskItems(data);
    }
  };
  useEffect(() => {
    console.log("start use effect");
    console.log(user);
    if (!user.userInfo || !user.isGuest) {
      console.log("fetching user info");
      fetchUserData();
    } else {
      setUserInfo(user.userInfo);
      setLoading(false);
    }
  }, []);

  const displayTasks = () => {
    if (!taskItems.length) {
      return (
        <tbody>
          <tr>
            <th className="w-0 px-10"></th>
            <td>
              No tasks to display
              <br />
            </td>
          </tr>
        </tbody>
      );
    }
    return (
      <tbody>
        {taskItems.map((task, index) => (
          <tr key={index}>
            <th className="w-0 px-10">
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <td>
              {task.description}
              <br />
              <span className="badge badge-ghost badge-sm">
                {task.isComplete ? "Completed" : "In Progress"}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-red-500 mb-2">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  if (!userInfo) {
    return null;
  }

  return (
    <div className="container  mx-auto p-4 m-2">
      <div className="bg-white rounded-lg shadow p-6 ">
        <div className="place-content-center">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Tasks for {userInfo.name}
          </h1>
          <div>
            <h2 className="text-center">Tasks Page Content</h2>
          </div>
        </div>
        <div className="overflow-x-auto ">
          <table className="table table-md table-fixed w-3/4 mx-auto">
            {/* head */}
            <thead>
              <tr>
                <th className="w-0 px-10">
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Task</th>
                <th>Actions</th>
              </tr>
            </thead>

            {displayTasks()}
          </table>
        </div>
      </div>
    </div>
  );
}
