import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Github, Globe, Layers, Rocket } from 'lucide-react';

const ViewProject = () => {
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

  if (!project) return null;

  const descriptionList = project.description?.split('. ');
  const techList = project.technologies?.split(', ');

  return (
    <div className="min-h-screen bg-muted/40 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-end">
          <Button onClick={() => navigate('/')} className={"bg-blue-600 hover:bg-blue-700"}>Return to Dashboard</Button>
        </div>

        {/* Banner Card */}
        <Card className="overflow-hidden shadow-xl rounded-2xl">
          <img
            src={project.projectBanner?.url || '/avatarHolder.jpg'}
            alt="project banner"
            className="w-full h-[320px] object-cover"
          />
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{project.title}</CardTitle>
          </CardHeader>
        </Card>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="rounded-2xl shadow-md">
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc ml-5 space-y-1 text-muted-foreground">
                {descriptionList.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md">
            <CardHeader>
              <CardTitle>Technologies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {techList.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-accent text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Meta Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="rounded-2xl shadow-md">
            <CardContent className="flex items-center gap-3 pt-6">
              <Layers className="text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Stack</p>
                <p className="font-medium">{project.stack}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md">
            <CardContent className="flex items-center gap-3 pt-6">
              <Rocket className="text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Deployed</p>
                <p className="font-medium">{project.deployed}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-md">
            <CardContent className="flex flex-col gap-3 pt-6">
              <Link
                to={project.gitRepoLink}
                target="_blank"
                className="flex items-center gap-2 text-sky-600 hover:underline"
              >
                <Github size={18} /> GitHub Repository
              </Link>
              <Link
                to={project.projectLink}
                target="_blank"
                className="flex items-center gap-2 text-sky-600 hover:underline"
              >
                <Globe size={18} /> Live Project
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ViewProject;