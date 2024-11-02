import Image from "next/image";

export default function Home() {
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
            <button className="btn btn-primary w-full text-lg py-3">
              Sign In
            </button>
            <button className="btn btn-secondary w-full text-lg py-3">
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
