import { clearAllProjectErrors, deleteProject, getAllProjects, resetProjectSlice } from '@/store/slices/projectSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Eye, Pen, Trash2, LayoutDashboard, Trash } from "lucide-react";

const ManageProjects = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { projects, loading, error, message } = useSelector(
    (state) => state.project
  );

  const handleProjectDelete = (id) => {
    dispatch(deleteProject(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProjectErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
    }
  }, [dispatch, error, message]);

  return (
    <div className="min-h-screen bg-muted/40 p-6">
      <Tabs defaultValue="projects" className="max-w-7xl mx-auto">
        <TabsContent value="projects">
          <Card className="shadow-lg rounded-2xl">
            <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-2xl">Manage Projects</CardTitle>
                <CardDescription>
                  View, edit, or remove your portfolio projects
                </CardDescription>
              </div>
              <Button onClick={() => navigate('/')} className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                <LayoutDashboard size={18} /> Dashboard
              </Button>
            </CardHeader>

            <CardContent>
              <div className="overflow-x-auto rounded-xl border">
                <Table>
                  <TableHeader className="bg-muted">
                    <TableRow>
                      <TableHead>Banner</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead className="hidden md:table-cell">Stack</TableHead>
                      <TableHead className="hidden md:table-cell">Deployed</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {projects && projects.length > 0 ? (
                      projects.map((project) => (
                        <TableRow key={project._id} className="hover:bg-accent/50 transition">
                          <TableCell>
                            <img
                              src={project.projectBanner?.url}
                              alt={project.title}
                              className="h-14 w-14 rounded-lg object-cover border"
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            {project.title}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {project.stack}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {project.deployed}
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-center gap-3">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Link to={`/view/project/${project._id}`}>
                                      <Button size="icon" variant="outline" className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white">
                                        <Eye size={18} />
                                      </Button>
                                    </Link>
                                  </TooltipTrigger>
                                  <TooltipContent>View</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>

                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Link to={`/update/project/${project._id}`}>
                                      <Button size="icon" variant="outline" className="text-yellow-500 border-yellow-400 hover:bg-yellow-400 hover:text-black">
                                        <Pen size={18} />
                                      </Button>
                                    </Link>
                                  </TooltipTrigger>
                                  <TooltipContent>Edit</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>

                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      size="icon"
                                      variant="outline"
                                      className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                                      onClick={() => handleProjectDelete(project._id)}
                                    >
                                      <Trash2 size={18} />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>Delete</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                          No projects found. Start by adding one ✨
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageProjects;