import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {  Trash } from "lucide-react";
import { clearAllSoftwareAppErrors, deleteSoftwareApplication, getAllSoftwareApplications, resetSoftwareApplicationSlice } from "@/store/slices/softwareApplications";
import { toast } from "react-toastify";
import { clearAllTimelineErrors } from "@/store/slices/timeline";
import { clearAllProjectErrors } from "@/store/slices/projectSlice";
import { clearAllSkillErrors } from "@/store/slices/skillSlice";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const {
    skills,
    loading: skillLoading,
    error: skillError,
    message: skillMessage,
  } = useSelector((state) => state.skill);
  const {
    softwareApplications,
    loading: appLoading,
    error: appError,
    message: appMessage,
  } = useSelector((state) => state.softwareApplications);
  const {
    timeline,
    loading: timelineLoading,
    error: timelineError,
    message: timelineMessage,
  } = useSelector((state) => state.timeline);
  const { projects, error: projectError } = useSelector(
    (state) => state.project
  );

  const [appId, setAppId] = useState(null);
  const handleDeleteSoftwareApp = (id) => {
    setAppId(id);
    dispatch(deleteSoftwareApplication(id));
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (skillError) {
      toast.error(skillError);
      dispatch(clearAllSkillErrors());
    }
    if (appError) {
      toast.error(appError);
      dispatch(clearAllSoftwareAppErrors());
    }
    if (projectError) {
      toast.error(projectError);
      dispatch(clearAllProjectErrors());
    }
    if (appMessage) {
      toast.success(appMessage);
      setAppId(null);
      dispatch(resetSoftwareApplicationSlice());
      dispatch(getAllSoftwareApplications());
    }
    if (timelineError) {
      toast.error(timelineError);
      dispatch(clearAllTimelineErrors());
    }
  }, [
    dispatch,
    skillLoading,
    skillError,
    skillMessage,
    appLoading,
    appError,
    appMessage,
    timelineError,
    timelineLoading,
    timelineMessage,
  ]);



  return (
    <div className="min-h-screen bg-muted/40 p-4 sm:p-6 lg:p-8 ">
      <main className="grid gap-6 lg:grid-cols-2 xl:grid-cols-2">
        <div className="grid auto-rows-max gap-6 lg:col-span-2">
          {/* TOP CARDS */}
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {/* ABOUT ME */}
            <Card className="sm:col-span-2 shadow-sm ml-10">
              <CardHeader className="space-y-2">
                <CardTitle className="text-lg">About Me</CardTitle>
                <CardDescription className="max-w-lg leading-relaxed line-clamp-4 text-gray-800">
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
                <CardTitle className="text-lg text-gray-900 font-semibold">
                  Projects Completed
                </CardTitle>
                <div className="text-5xl font-bold">
                  {projects?.length || 0}
                </div>
              </CardHeader>

              <CardFooter>
                <Link to="/manage/projects" className="w-full">
                  <Button variant="outline" className="w-full bg-blue-600 text-white font-semibold ">
                    Manage Projects
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* SKILLS COUNT */}
            <Card className="flex flex-col justify-between shadow-sm hover:shadow-md transition">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-gray-900 font-semibold">
                  Skills
                </CardTitle>
                <div className="text-5xl font-bold">
                  {skills?.length || 0}
                </div>
              </CardHeader>

              <CardFooter>
                <Link to="/manage/skills" className="w-full">
                  <Button variant="outline" className="w-full bg-blue-600 text-white font-semibold">
                    Manage Skills
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          {/* PROJECTS TABLE */}
          <Tabs defaultValue="projects">
            <TabsContent value="projects">
              <Card className="shadow-sm ml-10">
                <CardHeader className="px-8">
                  <CardTitle className="text-2xl">Projects</CardTitle>
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
                                className={`px-2 py-1 rounded text-xs font-medium ${project.deployed
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
                                  <Button size="sm" className={"bg-blue-600 text-white hover:bg-blue-700"}>Visit</Button>
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

          {/* SKILLS TABLE */}
          <Tabs defaultValue="skills" className="w-full">
            <TabsContent value="skills" className="mt-6">
              <Card className="w-full shadow-sm ml-10">
                <CardHeader className="px-8 pb-2">
                  <CardTitle className="text-2xl font-bold">
                    Skills & Proficiency
                  </CardTitle>
                </CardHeader>

                <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 px-8 pb-8">
                  {skills && skills.length > 0 ? (
                    skills.map((element) => (
                      <Card
                        key={element._id}
                        className="p-5 rounded-xl border hover:shadow-md transition"
                      >
                        {/* Title + Percentage */}
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-lg font-semibold">
                            {element.title}
                          </h3>
                          <span className="text-sm font-medium text-blue-600">
                            {element.proficiency}%
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <Progress
                          value={element.proficiency}
                          className="h-2 [&>div]:bg-blue-600"
                        />
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <p className="text-xl text-muted-foreground">
                        You haven’t added any skills yet.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Tabs defaultValue="software">
            <TabsContent
              value="software"
              className="grid min-[1050px]:grid-cols-2 gap-4"
            >
              <Card className={"ml-10"}>
                <CardHeader className="px-7">
                  <CardTitle className={"text-2xl font-semibold"}>Software Applications</CardTitle>
                </CardHeader>

                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Icon</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {softwareApplications && softwareApplications.length > 0 ? (
                        softwareApplications.map((element) => (
                          <TableRow key={element._id}>
                            <TableCell>{element.name}</TableCell>
                            <TableCell>
                              <img
                                src={element.svg?.url}
                                alt={element.name}
                                className="w-12 h-10"
                              />
                            </TableCell>
                            <TableCell>
                              <Button
                                onClick={() => dispatch(deleteSoftwareApplication(element._id))}
                                className="bg-red-600 h-10 w-10 rounded-full hover:bg-red-700"
                              >
                                <Trash />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center text-xl">
                            You have not added any software.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>

                </CardContent>
              </Card>

              <Card>
                <CardHeader className={"px-7 flex items-center justify-between flex-row"}>
                  <CardTitle className={"text-2xl font-semibold"}>Timeline</CardTitle>
                  <Link to={"/manage/timeline"}>
                    <Button className={"bg-blue-600 hover:bg-blue-700 text-white font-semibold"}> Manage Timeline</Button>
                  </Link>
                </CardHeader>

                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>From</TableHead>
                        <TableHead>To</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {
                        timeline && timeline.length > 0 ? (
                          timeline.map((element) => (
                            <TableRow key={element._id} className={"bg-accent"}>
                              <TableCell className={"font-medium "}>{element.title}</TableCell>
                              <TableCell className={"md:table-cell "}>{element.timeline.from}</TableCell>
                              <TableCell className={"md:table-cell  text-right"}>{element.timeline.to ? `${element.timeline.to}` : "Present"}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={3}
                              className="text-3xl text-center overflow-y-hidden"
                            >
                              You have not added any timeline.
                            </TableCell>
                          </TableRow>
                        )
                      }

                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>



        </div>
      </main >
    </div >
  );
};

export default Dashboard;
