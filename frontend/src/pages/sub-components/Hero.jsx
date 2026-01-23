import { Button } from '@/components/ui/button';
import axios from 'axios';
import { ExternalLink, Facebook, Github, Instagram, Linkedin, Mail, Phone, Twitter } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Typewriter } from "react-simple-typewriter"
import me from "../../../public/Me2.jpeg"

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
        <section className="relative w-full min-h-screen flex items-center bg-[#050B1E] text-white px-6 sm:px-10 lg:px-24 overflow-hidden">

            {/* BACKGROUND DECORATION EFFECTS */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full"></div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">

                {/* LEFT CONTENT */}
                <div className="max-w-2xl">
                    <div className="flex items-center gap-2 mb-5">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                        <p className="text-sm tracking-wide text-slate-400">
                            Available for work
                        </p>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-5xl font-semibold leading-tight mb-6">
                        Hey, I’m{" "}
                        <span className="text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">{user.fullName}</span>
                    </h1>

                    <h2 className="text-lg sm:text-xl md:text-2xl text-slate-300 tracking-[0.15em] mb-8 h-8">
                        <Typewriter
                            words={[
                                "MERN Stack Developer",
                                "Computer Science Student",
                                "Building Real-World Apps",
                                "Open to Full-Time Roles",
                                "Turning Ideas into Code",
                            ]}
                            loop={50}
                            cursor
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1200}
                        />
                    </h2>

                    {/* SOCIAL LINKS */}
                    <div className="inline-flex px-6 py-3 bg-[#0B132E]/80 backdrop-blur border border-[#1E2A4A] rounded-full gap-6 items-center shadow-xl">
                        {user.instagramURL && (
                            <a href={user.instagramURL} target="_blank" rel="noopener noreferrer">
                                <Instagram className="w-5 h-5 text-pink-500 hover:scale-125 transition-transform" />
                            </a>
                        )}
                        {user.facebookURL && (
                            <a href={user.facebookURL} target="_blank" rel="noopener noreferrer">
                                <Facebook className="w-5 h-5 text-blue-500 hover:scale-125 transition-transform" />
                            </a>
                        )}
                        {user.linkedInURL && (
                            <a href={user.linkedInURL} target="_blank" rel="noopener noreferrer">
                                <Linkedin className="w-5 h-5 text-sky-400 hover:scale-125 transition-transform" />
                            </a>
                        )}
                        {user.twitterURL && (
                            <a href={user.twitterURL} target="_blank" rel="noopener noreferrer">
                                <Twitter className="w-5 h-5 text-blue-400 hover:scale-125 transition-transform" />
                            </a>
                        )}
                    </div>

                    {/* BUTTONS */}
                    <div className="mt-12 flex flex-wrap gap-4">
                        <a href={user.githubURL} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" className="rounded-full  text-white  hover:text-emerald-400  px-7 py-5 flex gap-2 font-medium transition-all duration-300">
                                <Github size={20} /> Github
                            </Button>
                        </a>
                        <a href={user.resume?.url} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" className="rounded-full text-white  hover:text-emerald-400 px-7 py-5 flex gap-2 font-medium transition-all">
                                <ExternalLink size={20} /> Resume
                            </Button>
                        </a>
                        {/* Email */}
                        <a href={`mailto:${user.email || 'acharyyas735@gmail.com'}`}>
                            <Button variant="outline" className="rounded-full   px-7 py-5 flex gap-2 font-medium hovetext-white  hover:text-emerald-400 transition-all duration-300">
                                <Mail size={20} /> {user.email || "acharyyas735@gmail.com"}
                            </Button>
                        </a>

                        {/* Phone */}
                        <a href={`tel:${user.phone || '+919832243680'}`}>
                            <Button variant="outline" className="rounded-full   px-7 py-5 flex gap-2 font-medium text-white  hover:text-emerald-400 transition-all duration-300">
                                <Phone size={20} /> {user.phone || "+91 9832243680"}
                            </Button>
                        </a>
                    </div>

                    <p className="mt-12 text-slate-400 leading-relaxed text-lg max-w-xl">
                        {user.aboutMe}.
                    </p>
                </div>

                {/* RIGHT IMAGE SECTION WITH EFFECTS */}
                <div className="flex justify-center lg:justify-end relative">
                    {/* 1. Large Background Glow behind the photo */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-500/20 blur-[100px] rounded-full"></div>

                    {/* 2. Rotating Gradient Border Container */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

                        <div className="relative w-[300px] sm:w-[360px] md:w-[420px] aspect-square rounded-full overflow-hidden border-2 border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                            <img
                                src={me}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                            {/* Inner Overlay Glow */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050B1E]/40 to-transparent"></div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Hero;