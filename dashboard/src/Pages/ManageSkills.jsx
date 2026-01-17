import { clearAllSkillErrors, getAllSkills, resetSkillSlice, deleteSkill, updateSkill } from '@/store/slices/skillSlice';
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { Link } from 'react-router-dom';

const ManageSkills = () => {
  const { loading, skills, error, message } = useSelector(state => state.skill);
  const dispatch = useDispatch();
  const [newProficiency, setNewProficiency] = useState(1);

  const handleInputChange = (proficiency) => {
    setNewProficiency(proficiency);
  }

  const handleDeleteSkill = (id) => {
    dispatch(deleteSkill(id));
  };

  const handleUpdateSkill = (id) => {
    dispatch(updateSkill(id, newProficiency));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSkillErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetSkillSlice());
      dispatch(getAllSkills());
    }
  }, [dispatch, loading, error, message]);

  return (
    <div className="min-h-screen bg-muted/40 p-4 sm:p-6 lg:p-8">
      <Tabs defaultValue="week">
        <TabsContent value="week">
          <Card className="shadow-lg rounded-xl">
            <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <CardTitle className="text-2xl font-semibold">Manage Your Skills</CardTitle>
              <Link to="/">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Return to Dashboard
                </Button>
              </Link>
            </CardHeader>

            <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {skills && skills.length > 0 ? (
                skills.map((element) => (
                  <Card key={element._id} className="border rounded-xl p-4 hover:shadow-md transition relative">
                    <CardHeader className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold">{element.title}</h3>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => handleDeleteSkill(element._id)}
                              className="text-muted-foreground hover:text-red-600 transition"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent side="left">
                            Delete Skill
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardHeader>

                    <CardFooter className="flex flex-col gap-2 p-0">
                      <Label className="text-sm text-muted-foreground">Proficiency (%)</Label>
                      <Input
                        type="number"
                        min={1}
                        max={100}
                        defaultValue={element.proficiency}
                        onChange={(e) => handleInputChange(e.target.value)}
                        className="text-center font-medium"
                        onBlur={() => handleUpdateSkill(element._id)}
                      />
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-14 text-xl text-muted-foreground">
                  You haven’t added any skills yet.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageSkills;
