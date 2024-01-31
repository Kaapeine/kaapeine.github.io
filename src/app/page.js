"use client";
import { homePageSketch } from "@/components/homePageSketch/homePageSketch";
import { NextReactP5Wrapper } from "@p5-wrapper/next";

export default function Home() {
  return (
    <main className="flex w-screen h-screen items-center justify-between bg-black">
      <div className="flex flex-col w-3/12 h-full justify-start items-center">
        <div className="p-5 text-3xl">Entirely Different Matters</div>
        <div className="p-5 text-2xl">
          <p>
            {
              "Hi, I'm Vathsa. This is my personal website. I make music, I code, I also write sometimes."
            }
          </p>
        </div>

        <div className="flex flex-col p-5 w-full pl-10">
          <ul>
            <li>
              <a
                className="text-2xl text-blue-700 hover:text-white"
                href={"/planets"}
              >
                Planets
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-slate-300 w-full h-full" id="p5div">
        <NextReactP5Wrapper sketch={homePageSketch} />
      </div>
    </main>
  );
}
