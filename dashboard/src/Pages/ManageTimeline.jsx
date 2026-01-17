import {
  clearAllTimelineErrors,
  deleteTimeline,
  getAllTimeline,
  resetTimelineSlice,
} from "@/store/slices/timeline";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";

const ManageTimeline = () => {
  const { loading, message, error, timeline } = useSelector(
    (state) => state.timeline
  );

  const dispatch = useDispatch();
  const [timelineId, setTimelineId] = useState("");

  const handleDeleteTimeline = (id) => {
    setTimelineId(id);
    dispatch(deleteTimeline(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllTimelineErrors());
    }

    if (message) {
      toast.success(message);
      dispatch(resetTimelineSlice());
      dispatch(getAllTimeline());
    }
  }, [dispatch, error, message, loading]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 p-4 sm:p-6">
      <Tabs defaultValue="timeline">
        <TabsContent value="timeline">
          <Card className="shadow-md rounded-xl">
            {/* HEADER */}
            <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-2xl font-semibold">
                Manage Your Timeline
              </CardTitle>

              <Link to="/">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Return to Dashboard
                </Button>
              </Link>
            </CardHeader>

            {/* CONTENT */}
            <CardContent className="overflow-x-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[160px]">Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-[120px]">From</TableHead>
                    <TableHead className="w-[120px]">To</TableHead>
                    <TableHead className="w-[80px] text-right">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {timeline && timeline.length > 0 ? (
                    timeline.map((element) => (
                      <TableRow
                        key={element._id}
                        className="bg-accent hover:bg-muted transition"
                      >
                        {/* TITLE */}
                        <TableCell className="font-medium">
                          {element.title}
                        </TableCell>

                        {/* DESCRIPTION (WRAPPED) */}
                        <TableCell className="whitespace-normal break-words max-w-[260px] md:max-w-[420px] text-muted-foreground leading-relaxed">
                          {element.description}
                        </TableCell>

                        {/* FROM */}
                        <TableCell>
                          {element.timeline.from}
                        </TableCell>

                        {/* TO */}
                        <TableCell>
                          {element.timeline.to || "Present"}
                        </TableCell>

                        {/* ACTION */}
                        <TableCell className="text-right">
                          <button
                            onClick={() =>
                              handleDeleteTimeline(element._id)
                            }
                            className="inline-flex items-center justify-center h-9 w-9 rounded-full border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center text-xl text-muted-foreground py-10"
                      >
                        You have not added any timeline.
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
  );
};

export default ManageTimeline;
