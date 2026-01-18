import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";
import {
  clearAllProjectErrors,
  getAllProjects,
  resetProjectSlice,
  updateProject,
} from "@/store/slices/projectSlice";

const UpdateProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [projectBannerPreview, setProjectBannerPreview] = useState("");

  const { error, message, loading } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { id } = useParams();

  const handleProjectBanner = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      setProjectBannerPreview(reader.result);
      setProjectBanner(file);
    };
  };

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/v1/project/get/${id}`,
          { withCredentials: true }
        );

        const { project } = res.data;

        setTitle(project.title);
        setDescription(project.description);
        setStack(project.stack);
        setDeployed(project.deployed);
        setTechnologies(project.technologies);
        setGitRepoLink(project.gitRepoLink);
        setProjectLink(project.projectLink);
        setProjectBanner(project.projectBanner?.url);
        setProjectBannerPreview(project.projectBanner?.url);
      } catch (err) {
        toast.error(err.response?.data?.message);
      }
    };

    getProject();

    if (error) {
      toast.error(error);
      dispatch(clearAllProjectErrors());
    }

    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
    }
  }, [id, error, message, dispatch]);

  const handleUpdateProject = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("deployed", deployed);
    formData.append("stack", stack);
    formData.append("technologies", technologies);
    formData.append("gitRepoLink", gitRepoLink);
    formData.append("projectLink", projectLink);
    formData.append("projectBanner", projectBanner);

    dispatch(updateProject(id, formData));
  };

  return (
    <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:py-4">
      <form
        onSubmit={handleUpdateProject}
        className="w-full px-5 md:w-[1000px] pb-5"
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-3xl font-semibold text-gray-900">
                UPDATE PROJECT
              </h2>
              <Button onClick={() => navigateTo("/")} className={"bg-blue-600 hover:bg-blue-700"}>
                Return to Dashboard
              </Button>
            </div>

            <div className="mt-10 flex flex-col gap-5">
              <img
                src={projectBannerPreview || "/avatarHolder.jpg"}
                alt="projectBanner"
                className="w-full h-auto"
              />

              <input
                type="file"
                onChange={handleProjectBanner}
                className="avatar-update-btn mt-4 w-full"
              />

              <input
                type="text"
                placeholder="Project Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-style"
              />

              <Textarea
                placeholder="Project Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <Textarea
                placeholder="Technologies Used"
                value={technologies}
                onChange={(e) => setTechnologies(e.target.value)}
              />

              <Select value={stack} onValueChange={setStack}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Stack" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full Stack">Full Stack</SelectItem>
                  <SelectItem value="Mern">MERN</SelectItem>
                  <SelectItem value="Mean">MEAN</SelectItem>
                  <SelectItem value="Next.JS">NEXT.JS</SelectItem>
                  <SelectItem value="React.JS">REACT.JS</SelectItem>
                </SelectContent>
              </Select>

              <Select value={deployed} onValueChange={setDeployed}>
                <SelectTrigger>
                  <SelectValue placeholder="Is project deployed?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>

              <input
                type="text"
                placeholder="GitHub Repository Link"
                value={gitRepoLink}
                onChange={(e) => setGitRepoLink(e.target.value)}
                className="input-style"
              />

              <input
                type="text"
                placeholder="Live Project Link"
                value={projectLink}
                onChange={(e) => setProjectLink(e.target.value)}
                className="input-style"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          {loading ? (
            <SpecialLoadingButton content="Updating" width="w-52" />
          ) : (
            <button
              type="submit"
              className="w-52 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Update
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdateProject;
