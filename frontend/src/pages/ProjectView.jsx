import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Github, Globe, Layers, Rocket, ArrowLeft, Terminal } from 'lucide-react';

const ProjectView = () => {
  const [project, setProject] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getProject = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/project/get/${id}`,
          { withCredentials: true }
        );
        setProject(data.project);
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to load project');
      }
    };
    getProject();
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#050B1E] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-400"></div>
      </div>
    );
  }

  const descriptionList = project.description ? project.description.split('. ') : [];
  const techList = project.technologies ? project.technologies.split(', ') : [];

  return (
    <div className="min-h-screen bg-[#050B1E] text-white p-4 sm:p-10 lg:px-24">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* BACK BUTTON */}
        <div className="flex justify-start">
          <Button 
            onClick={() => navigate('/')} 
            className="group flex items-center gap-2 bg-white/5 hover:bg-emerald-400 hover:text-black text-white border border-white/10 rounded-full transition-all duration-300 px-6 py-2 h-auto"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Button>
        </div>

        {/* HERO HEADER CARD */}
        <Card className="overflow-hidden bg-[#0B132E]/50 border-slate-800 rounded-3xl shadow-2xl backdrop-blur-md">
          <div className="relative group">
            <img
              src={project.projectBanner?.url || '/avatarHolder.jpg'}
              alt={project.title}
              className="w-full h-[300px] md:h-[450px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B132E] to-transparent opacity-80"></div>
          </div>
          <div className="relative -mt-24 px-8 pb-10">
            <div className="bg-emerald-400 w-16 h-1.5 rounded-full mb-4 shadow-[0_0_10px_#34d399]"></div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
              {project.title}
            </h1>
          </div>
        </Card>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: DESCRIPTION */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-[#0B132E]/30 border-slate-800 rounded-3xl p-4 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-bold text-emerald-400">
                  <Terminal size={20} /> Project Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-slate-400">
                  {descriptionList.map((item, i) => (
                    <li key={i} className="flex gap-3 items-start leading-relaxed">
                      <span className="min-w-[6px] h-[6px] bg-emerald-400 rounded-full mt-2.5 shadow-[0_0_5px_#34d399]"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT: METADATA & LINKS */}
          <div className="space-y-6">
            
            {/* STACK & DEPLOYED INFO CARD */}
            <Card className="bg-[#0B132E]/30 border-slate-800 rounded-3xl shadow-xl p-4">
              <CardContent className="space-y-6 pt-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-400/10 rounded-xl text-emerald-400">
                    <Layers size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Stack</p>
                    <p className="text-white font-medium">{project.stack}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-400/10 rounded-xl text-emerald-400">
                    <Rocket size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Deployed</p>
                    <p className="text-white font-medium">{project.deployed}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* TECHNOLOGIES TAGS */}
            <Card className="bg-[#0B132E]/30 border-slate-800 rounded-3xl shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-white">Technologies</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {techList.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest"
                  >
                    {tech}
                  </span>
                ))}
              </CardContent>
            </Card>

            {/* ACTION BUTTONS */}
            <div className="grid grid-cols-1 gap-4 pt-2">
              <a href={project.gitRepoLink} target="_blank" rel="noreferrer" className="w-full">
                <Button className="w-full bg-white text-black hover:bg-emerald-400 hover:text-white rounded-2xl py-7 font-bold flex gap-2 transition-all duration-300">
                  <Github size={20} /> Source Code
                </Button>
              </a>
              <a href={project.projectLink} target="_blank" rel="noreferrer" className="w-full">
                <Button variant="outline" className="w-full border-slate-700 text-white hover:border-emerald-400 hover:text-emerald-400 rounded-2xl py-7 font-bold flex gap-2 transition-all duration-300">
                  <Globe size={20} /> Live Preview
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectView;