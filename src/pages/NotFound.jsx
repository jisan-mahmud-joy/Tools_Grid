import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">

      <div className="text-center">

        <h1 className="text-8xl font-black text-cyan-400">
          404
        </h1>

        <h2 className="text-3xl font-bold mt-4">
          Page Not Found
        </h2>

        <p className="text-slate-400 mt-4">
          The page you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-xl font-semibold"
        >
          Go Home
        </Link>

      </div>

    </div>
  );
};

export default NotFound;