"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import Threadify from "utils/threadify";
import { externalLinks } from "utils/app-list";

export default function Custom404() {
  const router = useRouter()
  const [show404, set404] = useState(false);

  useEffect(() => {
    const target = externalLinks.find((i) => i.link === location.pathname)
    if (target) {
      router.push(target.out);
    }
    else {
      set404(true);
    }
  }, []);

  if (!show404) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center align-center h-screen">
      <Threadify text="404" speed={10} className="m-1" />
      <div className="text-hackergreen text-center uppercase">
        You were never supposed to be here.
      </div>
    </div>
  );
}
