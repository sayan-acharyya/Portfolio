import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [viewAll, setViewAll] = useState(false);

  useEffect(() => {
    const getMyProjects = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/project/getall",
          { withCredentials: true }
        );
        setProjects(data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    getMyProjects();
  }, []);

  const visibleProjects = viewAll ? projects : projects.slice(0, 6);

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#050B1E]">
      <div className="max-w-[1200px] mx-auto">
        
        {/* SECTION HEADING - Refined for Consistency */}
        <div className="relative mb-20 flex flex-col items-center">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-center uppercase opacity-5 select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-white">
            PORTFOLIO
          </h1>
          <h2 className="relative z-10 text-2xl sm:text-4xl font-bold tracking-[10px] text-white uppercase text-center">
            My <span className="text-emerald-400">Projects</span>
          </h2>
          <div className="w-16 h-1 bg-emerald-400 mt-4 rounded-full"></div>
        </div>

        {/* PROJECTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.map((element) => (
            <Link to={`/project/${element._id}`} key={element._id} className="group">
              <Card className="relative overflow-hidden rounded-2xl bg-[#0B132E]/50 border-slate-800 p-2 transition-all duration-500 hover:border-emerald-400/50 hover:-translate-y-3 shadow-2xl">
                
                {/* Image Container */}
                <div className="relative h-60 w-full overflow-hidden rounded-xl">
                  <img
                    src={element.projectBanner?.url}
                    alt={element.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                  />
                  
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-[#050B1E] via-[#050B1E]/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <h3 className="text-white text-xl font-bold tracking-wider px-4 text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {element.title}
                    </h3>
                    <span className="mt-3 text-emerald-400 text-xs font-bold tracking-widest uppercase border border-emerald-400/30 px-3 py-1 rounded-full">
                      View Project
                    </span>
                  </div>
                </div>

                {/* Visible Info (Title always visible slightly below if you prefer, or kept hidden for clean look) */}
                <div className="p-4">
                   <h3 className="text-slate-200 font-semibold truncate group-hover:text-emerald-400 transition-colors">
                     {element.title}
                   </h3>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* SHOW MORE BUTTON */}
        {projects.length > 6 && (
          <div className="w-full text-center mt-16">
            <Button 
              variant="outline" 
              className="px-10 py-6 rounded-full border-slate-700 bg-transparent text-white hover:bg-emerald-400 hover:text-white hover:border-emerald-400 transition-all duration-300 font-bold tracking-widest"
              onClick={() => setViewAll(!viewAll)}
            >
              {viewAll ? "SHOW LESS ↑" : "VIEW ALL PROJECTS ↓"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;