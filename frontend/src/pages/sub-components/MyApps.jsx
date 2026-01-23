import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";

const MyApps = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const getMyApps = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/softwareapplication/getall",
          { withCredentials: true }
        );
        setApps(data.application);
      } catch (error) {
        console.error("Error fetching apps:", error);
      }
    };
    getMyApps();
  }, []);

  return (
    <section className="w-full py-16 px-6 sm:px-10 lg:px-24 bg-[#050B1E] mt-15">
      <div className="max-w-7xl mx-auto">
        
        {/* SECTION HEADING */}
        <div className="relative mb-20 flex flex-col items-center">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-center uppercase opacity-5 select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
            WORKBENCH
          </h1>
          <h2 className="relative z-10 text-2xl sm:text-4xl font-bold tracking-[10px] text-white uppercase text-center">
            Software <span className="text-emerald-400">Applications</span>
          </h2>
          <div className="w-12 h-1 bg-emerald-400 mt-4 rounded-full shadow-[0_0_15px_#34d399]"></div>
        </div>

        {/* APPLICATIONS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {apps && apps.map((element) => (
            <Card 
              key={element._id} 
              className="group relative h-fit p-8 flex flex-col justify-center items-center gap-4 bg-[#0B132E]/40 border-slate-800 hover:border-emerald-400/30 transition-all duration-500 backdrop-blur-md hover:-translate-y-2 overflow-hidden"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-emerald-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* App Icon */}
              <div className="relative z-10 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
                <img
                  src={element.svg && element.svg.url}
                  alt={element.name}
                  className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_#34d399] transition-all duration-500"
                />
              </div>

              {/* App Name */}
              <p className="relative z-10 text-slate-400 group-hover:text-white font-medium text-xs sm:text-sm tracking-widest uppercase transition-colors">
                {element.name}
              </p>

              {/* Decorative Corner Light */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-emerald-400/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Card>
          ))}
        </div>

        {/* FOOTER NOTE */}
        <div className="mt-16 text-center">
          <p className="text-slate-600 text-[10px] tracking-[4px] uppercase italic">
            Tools that power my workflow
          </p>
        </div>
      </div>
    </section>
  );
};

export default MyApps;