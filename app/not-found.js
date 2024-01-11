"use client";
import Threadify from "utils/threadify";

export default function Custom404() {
  return (
    <div className="flex flex-col justify-center align-center h-screen">
      <Threadify text="404" speed={10} className="m-1" />
      <div className="text-bleedred text-center uppercase">
        You were never supposed to be here.
      </div>
    </div>
  );
}
