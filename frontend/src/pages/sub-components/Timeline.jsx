import axios from "axios";
import React, { useEffect, useState } from "react";

const Timeline = () => {
  const [timeline, setTimeline] = useState([]); // ✅ should be array

  useEffect(() => {
    const getMyTimeline = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/timeline/getall",
          { withCredentials: true }
        );
        setTimeline(data.timeline);
      } catch (error) {
        console.error(error);
      }
    };

    getMyTimeline();
  }, []);

  return (
    <div>
    <h1 className="overflow-x-hidden text-[2rem] sm:text-[1.75rem] md:text-[2.2rem] lg:text-[2.8rem] mb-4 font-extrabold">Timeline</h1>
      <ol className="relative border-s border-default">
        {Array.isArray(timeline) &&
          timeline.map((element, index) => (
            <li key={index} className="mb-10 ms-6">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-brand-softer rounded-full -start-3 ring-8 ring-buffer">
                <svg
                  className="w-3 h-3 text-fg-brand-strong"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                  />
                </svg>
              </span>

              <time className="bg-neutral-secondary-medium border border-default-medium text-heading text-xs font-medium px-1.5 py-0.5 rounded">
                {element.timeline.from} - {element.timeline.to || "Prersent"}
              </time>

              <h3 className="my-2 text-lg font-semibold text-heading">
                {element.title}
              </h3>

              <p className="text-body">{element.description}</p>
            </li>
          ))}
      </ol>
    </div>
  );
};

export default Timeline;
