"use client";
import Image from "next/image";
import GoogleIcon from "@mui/icons-material/Google";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  clearUserInfo,
  isLoggedIn,
  setIsGuest,
  setStateUserInfo,
} from "@/lib/features/user/userSlice";

export default function Home() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5169";
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);

  const handleGoogleLogin = () => {
    try {
      window.location.href = `${apiBaseUrl}/auth/login`;
    } catch (error) {
      console.error("Error during Google login:", error);
      // Handle the error appropriately
    }
  };

  const handleSignInAsGuest = () => {
    console.log("handleSignInAsGuest called");
    try {
      if (user.loggedIn) {
        //logout current user
        const logoutResponse = async () => {
          const response = await fetch(`${apiBaseUrl}/auth/logout`, {
            method: "POST",
          });
          const data = await response.json();

          console.log(`logoutoutResponse`, data);
          if (response.ok) {
            console.log("Logged out succesfully.");
          }
        };
        logoutResponse();
      }
      dispatch(clearUserInfo()); // clears info and logs out user
      dispatch(setStateUserInfo({ name: "guest", email: "guest" }));
      dispatch(setIsGuest(true));
      console.log("sign in a guest");
      console.log("user", user);

      router.push("/tasks");
    } catch (error) {
      console.log("Logout failed.", error);
      router.push("/");
    }
  };

  return (
    <div data-theme="cupcake">
      <div className="container mx-auto m-60">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl place-content-center ">
          <div className="md:flex">
            <div className="md:shrink-0">
              <Image
                className=""
                src="/images/homepage_picture.jpg"
                alt="To do List"
                width={250}
                height={500}
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-lg text-indigo-500 font-semibold">
                PRODUCTIVITY TRACKER
              </div>
              <a
                href="#"
                className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
              >
                To do list and timer
              </a>
              <p className="mt-2 text-slate-500">
                This web app will allow you to keep track of yours tasks. Add
                tasks and complete tasks. The app has a built in timer with
                based on set intervals to help you focus. You can set the time
                interval as you like, we recommend 25 minutes based on the
                pomodoro method.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 p-8">
            <div>
              <button
                className="btn  w-full text-sm py-3"
                onClick={handleGoogleLogin}
              >
                <span>
                  <GoogleIcon color="primary" />
                  <span className="pl-1">Sign In With Google</span>
                </span>
              </button>
            </div>
            <button
              className="btn btn-secondary w-full text-lg py-3"
              onClick={handleSignInAsGuest}
            >
              Sign In As Guest
            </button>
            <button className="btn btn-neutral w-full text-lg py-3">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
