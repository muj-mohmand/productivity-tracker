"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector, useAppStore } from "../../lib/hooks";
import { setStateUserInfo } from "../../lib/features/user/userSlice";

interface UserInfo {
  name: string;
  email: string;
  picture: string;
}

export default function TasksPage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const store = useAppStore();

  // Use HTTP for local development to avoid certificate issues
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5169";

  useEffect(() => {
    async function fetchUserData() {
      try {
        console.log("Attempting to fetch from:", `${apiBaseUrl}/auth/user`);

        const response = await fetch(`${apiBaseUrl}/auth/user`, {
          method: "GET",
          credentials: "include",
          mode: "cors",
        });

        console.log("Auth response status:", response.status);

        if (!response.ok) {
          if (response.status === 401) {
            console.log("User not authenticated, redirecting to login...");
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("User data received:", data);

        //set user data in store
        store.dispatch(setStateUserInfo(data));

        setUserInfo(data);
        setError(null);
      } catch (error) {
        console.error("Detailed error:", error);
        setError("Connection failed. Please ensure the API server is running.");
        // Don't redirect immediately on error to show the error message
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [router, apiBaseUrl]);

  const userStateInfo = useAppSelector(state => state.userInfo);
  console.log(`The user state info is : `, userStateInfo);

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
            <tbody>
              {/* row 1 */}
              <tr>
                <th className="w-0 px-10">
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>

                <td>
                  Make task page
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    in progress
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
