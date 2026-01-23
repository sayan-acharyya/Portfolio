import React, { useEffect, useState } from 'react'
import me from "../../../public/Me.jpeg"
import me2 from "../../../public/Me2.jpeg"
import axios from 'axios';
const About = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const getMyProfile = async () => {
      const { data } = await axios.get("http://localhost:4000/api/v1/user/me/portfolio", { withCredentials: true });
      setUser(data.user);
    }
    getMyProfile();
  }, []);
  return (
    <div className='w-full flex flex-col overflow-x-hidden'>
      <div className='relative'>
        <h1
          className="flex gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] 
          lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}>
          ABOUT <span className="text-tubeLight-effect font-extrabold">ME</span>
        </h1>
        <span className='absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] 
        bg-slate-200 '></span>
      </div>
      <div className="text-center">
        <p className="uppercase text-xl text-slate-400">
          Allow me to introduce myself,
        </p>
      </div>
      <div>
        <div className="grid md:grid-cols-2 my-8 sm:my-20 gap-14">
          <div className="flex justify-center items-center">
            <img
              src={me2}
              alt="Profile"
              className="
          bg-gray-500
          border border-neutral-700
          p-2 sm:p-3
          rounded-xl
          rotate-[18deg]
          h-[240px] sm:h-[340px] md:h-[350px] lg:h-[450px]
          shadow-lg
          transition-all duration-500 ease-out
          hover:rotate-0 hover:scale-105
        "
            />
          </div>
          <div className="flex justify-center flex-col tracking-[1px] text-xl gap-5">

            <p>
              I am Sayan Acharyya, a B.Tech Information Technology student at Bengal College
              of Engineering and Technology, with a strong passion for web development and
              hands-on experience in MERN stack applications.
            </p>

            <p>
              I have good proficiency in C, C++, Python, and Java, along with strong
              fundamentals in OOP, DBMS, Operating Systems, Computer Networks, and Data
              Structures & Algorithms. I have developed multiple real-world projects,
              including a job portal application , LMS System and other full-stack Projects.
            </p>

            <p>
              Beyond academics and development, I enjoy playing cricket. I am driven,
              consistent, and always eager to learn and apply new technologies in practical
              projects.
            </p>

          </div>
        </div>
        <p className="tracking-[1px] text-xl">
          I am dedicated and consistent in my work, always aiming to complete tasks on
          time. I am willing to face challenges, learn from them, and improve myself
          continuously.
        </p>

      </div>
    </div>
  )
}

export default About