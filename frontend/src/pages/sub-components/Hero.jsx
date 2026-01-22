import { Button } from '@/components/ui/button';
import axios from 'axios';
import { ExternalLink, Facebook, Github, Instagram, Linkedin, Twitter } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Typewriter } from "react-simple-typewriter"
const Hero = () => {
    const [user, setUser] = useState({});
    useEffect(() => {
        const getMyProfile = async () => {
            const { data } = await axios.get("http://localhost:4000/api/v1/user/me/portfolio", { withCredentials: true });
            setUser(data.user);
        }
        getMyProfile();
    }, []);


    return (
        <div className='w-full'>
            <div className='flex items-center gap-2 mb-2'>
                <span className='bg-green-400 rounded-full h-2 w-2'></span>
                <p>online</p>
            </div>
            <h1 className='overflow-x-hidden text-[1.3rem] sm:text-[1.7rem] md:text-[2.2rem]  
           lg:text-[2.8rem] tracking-[2px] mb-4 '>
                Hey, I'm {user.fullName}
            </h1>

            <h1 className='text-tubeLight-effect overflow-x-hidden text-[1.3rem] sm:text-[1.7rem] md:text-[2.2rem]  
           lg:text-[2.8rem] tracking-[15px]'>
                <Typewriter words={
                    [
                        "MERN Stack Developer",
                        "Computer Science Student",
                        "Building Real-World Apps",
                        "Open to Full-Time Roles",
                        "Turning Ideas into Code"
                    ]

                }
                    loop={50}
                    cursor
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1200}
                />
            </h1>
            <div className="w-fit px-5 py-2 bg-slate-50 rounded-[20px] 
flex gap-5 items-center mt-4 md:mt-8 lg:mt-10">

                {user.instagramURL && (
                    <a
                        href={user.instagramURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="transition-transform hover:scale-110"
                    >
                        <Instagram className="text-pink-500 w-7 h-7" />
                    </a>
                )}

                {user.facebookURL && (
                    <a
                        href={user.facebookURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        className="transition-transform hover:scale-110"
                    >
                        <Facebook className="text-blue-700 w-7 h-7" />
                    </a>
                )}

                {user.linkedInURL && (
                    <a
                        href={user.linkedInURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="transition-transform hover:scale-110"
                    >
                        <Linkedin className="text-sky-500 w-7 h-7" />
                    </a>
                )}

                {user.twitterURL && (
                    <a
                        href={user.twitterURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter"
                        className="transition-transform hover:scale-110"
                    >
                        <Twitter className="text-blue-600 w-7 h-7" />
                    </a>
                )}


            </div>
            <div className='mt-4 md:mt-8 lg:mt-10 flex gap-3'>
                <a href={user.githubURL}
                    target="_blank"
                    rel="noopener noreferrer">
                    <Button className={"rounded-[30px] flex items-center gap-2 flex-row bg-white"}>
                        <span>
                            <Github />
                        </span>
                        <span>
                            Github
                        </span>
                    </Button>
                </a>
                <a href={user.resume && user.resume.url}
                    target="_blank"
                    rel="noopener noreferrer">
                    <Button className={"rounded-[30px] flex items-center gap-2 flex-row bg-white"}>
                        <span>
                            <ExternalLink />
                        </span>
                        <span>
                            Resume
                        </span>
                    </Button>
                </a>
            </div>
             
        </div>
    )
}

export default Hero   