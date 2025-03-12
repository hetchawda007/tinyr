"use client"
import { Button } from "@/components/ui/button";
import { poppinsregular } from "@/fonts/fonts";
import React, { useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { Input } from "@/components/ui/input";

export default function Home() {

  const [url, setUrl] = useState<string>("");
  const [shorturl, setShortUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log(url);
    setUrl("");
  }

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  }

  return (
    <>
      <div className={`container text-center items-center flex flex-col ${poppinsregular.className}`}>

        <div className="flex flex-col items-center mt-10 gap-5 justify-center">
          <p className="text-lg dark:text-neutral-400">
            Transform long URLs into powerful, shareable links in seconds
          </p>
          <h1 className="text-4xl font-bold w-[60%] leading-12">
            Simplify Your Links, Amplify Your Reach with a Custom URL Shortener
          </h1>
        </div>

        <form onSubmit={handlesubmit} className="flex items-center mt-10 gap-5 justify-center p-5 rounded-lg">
          <Input value={url} onChange={handlechange} autoComplete="off" required className="w-72 h-10" type="text" placeholder="Enter Url" />
          {!loading ? <Button type="submit" className="cursor-pointer hover:bg-red-600 bg-red-500 text-white font-semibold">Generate now</Button>
            :
            <Button className="cursor-pointer hover:bg-red-600 bg-red-500 text-white font-semibold">Generating
              <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
              </svg>
            </Button>
          }
        </form>

          <div className="">
            <MdContentCopy className="cursor-pointer" />
          </div>

      </div>
    </>
  );
}
