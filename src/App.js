import React, { useState, useEffect, useRef } from 'react'
import axios from "axios"
import vdo from "./Assets/8cdc944519197e0de0cb153cb75f7935.mp4"
import vdo1 from "./Assets/1d113b01451c0f9890adbf89748110d5.mp4"
import vdo2 from "./Assets/f3b0243b47b4a2ae6e48c3821060ddc0.mp4"
import vdo3 from "./Assets/9f50bfac3ac2ca6839865bf5cd23e5f5.mp4"

const App = () => {

  console.log("Loading...")

  const [data, setData] = useState()
  const [textData, setTextData] = useState()

  const videoEl = useRef(null);

  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch(error => {
        console.error("Error attempting to play", error);
      });
  };

  useEffect(() => {
    attemptPlay();
  }, []);

  const generate = async () => {

    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBLsMpT0bpSGbFsvk7SfJ5XX8qTrb7Ym28",
      method: "post",
      data: {
        contents: [{ parts: [{ "text": textData }] }],
      },
    });

    // console.log(response)

    console.log(response['data']['candidates'][0]['content']['parts'][0]['text'])
    setData(response['data']['candidates'][0]['content']['parts'][0]['text'])
    // alert("hyy")
  }
  return (
    <div className=" h-screen overflow-y-auto w-screen flex-col justify-center items-center flex bg-black">
      <div className="h-auto lg:h-screen bg-black w-screen justify-center flex flex-col lg:gap-36 lg:-mt-10 items-center bg-red-000">
        <video className=" z-10 absolute -rotate-90 h-[100vw] w-[100vh]"
          playsInline
          loop
          muted
          // controls
          alt="All the devices"
          src={vdo3}
          ref={videoEl}
        />

        <h1 className=" text-4xl text-white lg:flex hidden z-[100]">Pearl.ai</h1>

        <div className=" z-[100] lg:absolute p-10 h-auto w-screen flex flex-col lg:gap-0  lg:px-20 lg:flex-row px-10 justify-center lg:justify-between items-center">
          <div className=" justify-center items-center flex flex-col gap-4">
            <textarea
              onChange={(e) => {
                setTextData(e.target.value)
              }}

              placeholder="Ask Some.."

              className=" text-sm lg:mt-0 mt-20 bg-black/20 text-white shadow-sky-50 h-52 w-[30rem] border-2 outline-none rounded-2xl p-2" name="" id=""></textarea>
            <div className=" flex flex-row justify-center items-center">
              <button onClick={generate} className=" h-auto w-auto px-10 text-lg py-2 rounded shadow-lg bg-black border-2 border-white hover:bg-sky-950 text-white font-semibold">Generate</button>
              <h1 className=" lg-hidden flex text-md text-white z-[100]"><span className=" opacity-0">p</span>by Pearl.ai</h1>
              </div>
          </div>

          <div className=" lg:mt-0 mt-10 border-2 border-sky-900 overflow-y-scroll no-scrollbar max-h-[40vh] lg:h-96 overflow-auto w-[30rem] rounded-lg shadow-xl hover:shadow-sky-600/30 transition-all duration-300 bg-black/55 text-slate-300">
            <p className="  p-10 leading-7 h-auto bg-transparent w-[30rem] whitespace-normal ">
              {`${data}`}
            </p>
          </div>
        </div>
      </div>
      <div className=" h-auto w-auto px-10 py-5 bg-black text-white">
        Created By Subham Patnaik
      </div>
    </div>
  )
}

export default App
