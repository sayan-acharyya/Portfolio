import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const { projects } = useSelector((state) => state.project);
  const { skills } = useSelector((state) => state.skill);

  return (
    <div className="min-h-screen bg-muted/40 p-4 sm:p-6 lg:p-8">
      <main className="grid gap-6 lg:grid-cols-2 xl:grid-cols-2">
        <div className="grid auto-rows-max gap-6 lg:col-span-2">
          {/* TOP CARDS */}
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {/* ABOUT ME */}
            <Card className="sm:col-span-2 shadow-sm ml-10">
              <CardHeader className="space-y-2">
                <CardTitle className="text-lg">About Me</CardTitle>
                <CardDescription className="max-w-lg leading-relaxed line-clamp-4">
                  {user?.aboutMe || "No description added yet."}
                </CardDescription>
              </CardHeader>

              <CardFooter className="justify-end">
                {user?.portfolioURL && (
                  <Link to={user.portfolioURL}>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Visit Portfolio
                    </Button>
                  </Link>
                )}
              </CardFooter>
            </Card>

            {/* PROJECTS COUNT */}
            <Card className="flex flex-col justify-between shadow-sm hover:shadow-md transition">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">
                  Projects Completed
                </CardTitle>
                <div className="text-5xl font-bold">
                  {projects?.length || 0}
                </div>
              </CardHeader>

              <CardFooter>
                <Link to="/manage/projects" className="w-full">
                  <Button variant="outline" className="w-full ">
                    Manage Projects
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* SKILLS COUNT */}
            <Card className="flex flex-col justify-between shadow-sm hover:shadow-md transition">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">
                  Skills
                </CardTitle>
                <div className="text-5xl font-bold">
                  {skills?.length || 0}
                </div>
              </CardHeader>

              <CardFooter>
                <Link to="/manage/skills" className="w-full">
                  <Button variant="outline" className="w-full">
                    Manage Skills
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          {/* PROJECTS TABLE */}
          <Tabs defaultValue="projects">
            <TabsContent value="projects">
              <Card className="shadow-sm">
                <CardHeader className="px-6">
                  <CardTitle className="text-lg">Projects</CardTitle>
                </CardHeader>

                <CardContent className="px-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Stack
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Deployed
                        </TableHead>
                        <TableHead>Update</TableHead>
                        <TableHead className="text-right">Visit</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {projects?.length > 0 ? (
                        projects.map((project) => (
                          <TableRow
                            key={project._id}
                            className="hover:bg-muted transition"
                          >
                            <TableCell className="font-medium">
                              {project.title}
                            </TableCell>

                            <TableCell className="hidden md:table-cell text-muted-foreground">
                              {project.stack}
                            </TableCell>

                            <TableCell className="hidden md:table-cell">
                              <span
                                className={`px-2 py-1 rounded text-xs font-medium ${
                                  project.deployed
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {project.deployed ? "Yes" : "No"}
                              </span>
                            </TableCell>

                            <TableCell>
                              <Link to={`/update/project/${project._id}`}>
                                <Button size="sm" variant="outline">
                                  Update
                                </Button>
                              </Link>
                            </TableCell>

                            <TableCell className="text-right">
                              {project.projectLink && (
                                <Link to={project.projectLink}>
                                  <Button size="sm">Visit</Button>
                                </Link>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={5}
                            className="text-center text-muted-foreground py-10"
                          >
                            No projects added yet
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
