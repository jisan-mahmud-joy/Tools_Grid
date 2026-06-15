import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-3xl font-bold">🎉 Payment Successful!</h1>
      <p className="text-slate-400 mt-2">You are now Premium</p>

      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-amber-500 text-black rounded-lg"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}