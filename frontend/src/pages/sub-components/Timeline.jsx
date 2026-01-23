import axios from "axios";
import React, { useEffect, useState } from "react";
import { Calendar } from "lucide-react";

const Timeline = () => {
  const [timeline, setTimeline] = useState([]);

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
    <div className="w-full py-16 px-6 sm:px-10 lg:px-24 bg-[#050B1E]">
      <div className="max-w-4xl mx-auto">
        
        {/* SECTION HEADING - Refined size */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
            Education 
          </h2>
          <div className="w-12 h-1 bg-emerald-400 rounded-full"></div>
        </div>

        {/* TIMELINE LIST */}
        <ol className="relative border-s border-slate-800 ml-2">
          {Array.isArray(timeline) &&
            timeline.map((element, index) => (
              <li key={index} className="mb-10 ms-7 group">
                
                {/* ICON / DOT - Slightly smaller */}
                <span className="absolute flex items-center justify-center w-8 h-8 bg-[#0B132E] border border-slate-700 rounded-full -start-[17px] group-hover:border-emerald-400 transition-colors duration-300 shadow-lg">
                  <Calendar className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                </span>

                {/* CONTENT CARD */}
                <div className="p-5 rounded-xl bg-[#0B132E]/40 border border-slate-800/50 backdrop-blur-sm hover:border-emerald-400/20 transition-all duration-300 group-hover:bg-[#0B132E]/60">
                  
                  {/* DATE BADGE - Extra small & clean */}
                  <span className="inline-block px-2 py-0.5 mb-2 text-[10px] font-bold tracking-widest uppercase bg-emerald-400/5 text-emerald-400/80 border border-emerald-400/10 rounded">
                    {element.timeline.from} — {element.timeline.to ? element.timeline.to : "Present"}
                  </span>

                  {/* TITLE - Reduced to text-lg */}
                  <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                    {element.title}
                  </h3>

                  {/* DESCRIPTION - Small text (text-sm) for a cleaner look */}
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {element.description}
                  </p>
                </div>
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
};

export default Timeline;