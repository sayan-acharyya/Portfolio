import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const getMySkills = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/skill/getall",
          { withCredentials: true }
        );
        setSkills(data.skill);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };
    getMySkills();
  }, []);

  return (
    <section className="w-full   px-6 sm:px-10 lg:px-24 bg-[#050B1E]">
      <div className="max-w-7xl mx-auto">
        
        {/* SECTION HEADING */}
        <div className="relative mb-20 flex flex-col items-center">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-center uppercase opacity-5 select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
            ABILITIES
          </h1>
          <h2 className="relative z-10 text-3xl sm:text-5xl font-bold tracking-[10px] text-white uppercase">
            My <span className="text-emerald-400">Skills</span>
          </h2>
          <div className="w-16 h-1.5 bg-emerald-400 mt-4 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.5)]"></div>
        </div>

        {/* SKILLS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 sm:gap-8">
          {skills && skills.map((element) => (
            <Card
              key={element._id}
              className="group relative overflow-hidden bg-[#0B132E]/50 border-slate-800 hover:border-emerald-400/50 transition-all duration-500 p-8 flex flex-col justify-center items-center gap-4 backdrop-blur-sm shadow-xl hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]"
            >
              {/* Animated Background Gradient on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Skill Icon Container */}
              <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                <img
                  src={element.svg && element.svg.url}
                  alt={element.title}
                  className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500 drop-shadow-2xl"
                />
              </div>

              {/* Skill Title */}
              <p className="relative z-10 text-slate-400 group-hover:text-white font-medium text-sm sm:text-base tracking-wide transition-colors duration-300">
                {element.title}
              </p>

              {/* Bottom Glow Bar */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-emerald-400 group-hover:w-full transition-all duration-500 rounded-t-full"></div>
            </Card>
          ))}
        </div>

        {/* BOTTOM DECORATION */}
        <div className="mt-20 flex justify-center opacity-20">
          <p className="text-slate-500 text-xs tracking-[5px] uppercase">
            Continuously learning and evolving
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;