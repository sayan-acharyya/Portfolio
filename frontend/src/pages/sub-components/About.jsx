import React, { useEffect, useState } from 'react';
import axios from 'axios';
import me3 from "../../../public/Me3.png";

const About = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getMyProfile = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/v1/user/me/portfolio", { withCredentials: true });
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    getMyProfile();
  }, []);

  return (
    <section className="w-full min-h-screen py-12 px-6 sm:px-10 lg:px-24 bg-[#050B1E] text-white overflow-hidden">
      
      {/* SECTION HEADING */}
      <div className="relative mb-16 flex flex-col items-center">
        <h1 className="relative z-10 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[10px] sm:tracking-[20px] text-center uppercase opacity-20 select-none">
          ABOUT <span className="text-emerald-400">ME</span>
        </h1>
        <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-2xl sm:text-4xl font-bold whitespace-nowrap tracking-widest text-white">
          SAYAN <span className="text-emerald-400">ACHARYYA</span>
        </h2>
        <div className="w-24 h-1 bg-emerald-400 mt-4 rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT: IMAGE BOX */}
          <div className="relative flex justify-center items-center group">
            {/* Background Glow behind image */}
            <div className="absolute w-64 h-64 bg-emerald-500/20 blur-[80px] rounded-full"></div>
            
            <div className="relative p-3 bg-slate-800/40 border border-slate-700/50 rounded-2xl backdrop-blur-sm rotate-6 group-hover:rotate-0 transition-all duration-500 ease-in-out shadow-2xl">
              <img
                src={me3}
                alt="Profile"
                className="rounded-xl w-full max-w-[300px] lg:max-w-[400px] grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>

          {/* RIGHT: TEXT CONTENT */}
          <div className="flex flex-col gap-6">
            <div className="inline-block w-fit px-4 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-sm font-medium">
              Introduction
            </div>
            
            <div className="space-y-5 text-slate-300 leading-relaxed text-sm sm:text-base lg:text-lg">
              <p>
                I am <span className="text-white font-semibold">Sayan Acharyya</span>, a B.Tech Information Technology student at Bengal College of Engineering and Technology. I have a deep-seated passion for web development and specialize in building scalable <span className="text-emerald-400">MERN stack</span> applications.
              </p>

              <p>
                My technical toolkit includes <span className="text-white border-b border-emerald-400/30">C, C++, Python, and Java</span>. I have a solid foundation in Computer Science core subjects like OOP, DBMS, and Data Structures & Algorithms, which I apply to solve real-world problems.
              </p>

              <p>
                Whether it's developing a <span className="text-white italic">Job Portal</span> or an <span className="text-white italic">LMS System</span>, I focus on writing clean, efficient code. Beyond the screen, you’ll likely find me on the cricket field, where I recharge my competitive spirit.
              </p>
            </div>

            {/* QUICK STATS */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="p-4 rounded-xl bg-[#0B132E] border border-slate-800">
                <h4 className="text-emerald-400 font-bold text-xl">10+</h4>
                <p className="text-slate-400 text-xs uppercase tracking-widest">Projects Completed</p>
              </div>
              <div className="p-4 rounded-xl bg-[#0B132E] border border-slate-800">
                <h4 className="text-emerald-400 font-bold text-xl">Final</h4>
                <p className="text-slate-400 text-xs uppercase tracking-widest">Year IT Student</p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM MOTIVATION QUOTE */}
        <div className="mt-20 p-8 rounded-3xl bg-gradient-to-r from-emerald-500/5 to-blue-500/5 border border-slate-800 text-center">
          <p className="text-slate-400 italic text-base sm:text-lg lg:text-xl max-w-3xl mx-auto">
            "I am dedicated and consistent in my work, always aiming to complete tasks on time. I am willing to face challenges, learn from them, and improve myself continuously."
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;