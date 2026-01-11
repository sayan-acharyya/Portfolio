import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import Profile from './Profile';
import SpecialLoadingButton from './SpecialLoadingButton';
import { Trash } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { clearAllMessageErrors, deleteMessage, getAllMessages, resetMessagesSlice } from '@/store/slices/messagesSlice';
import { toast } from 'react-toastify';

const Messages = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const handleReturnToDashboard = () => {
    navigateTo("/");
  }
  const { loading, messages, error, message } = useSelector(state => state.messages);

  const [messageId, setMessageId] = useState("");

  const handleMessageDelete = (id) => {
    setMessageId(id);
    dispatch(deleteMessage(id));
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllMessageErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetMessagesSlice());
      dispatch(getAllMessages());
    }
  }, [dispatch, error, loading, message])
  return (
    <>
      <div className="min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-20">
        <Tabs defaultValue="messages">
          <TabsContent value="messages">
            <Card>
              <CardHeader className={"flex gap-4 sm:justify-between sm:flex-row sm:items-center"}>
                <CardTitle className={"text-2xl font-bold"}>Messages</CardTitle>

                 
              </CardHeader>
              <CardContent className={"grid sm:grid-cols-2 gap-4 "}>
                {
                  messages && messages.length > 0 ? (
                    messages.map(element => {
                      return (
                        <Card key={element._id} className={"grid gap-2"}>
                          <CardDescription className={"text-slate-950"}>
                            <span className='font-bold mr-2 ml-3 '>
                              Sender Name:
                            </span>
                            {element.senderName}
                          </CardDescription>
                          <CardDescription className={"text-slate-950"}>
                            <span className='font-bold mr-2 ml-3 '>
                              Subject:
                            </span>
                            {element.subject}
                          </CardDescription>
                          <CardDescription className={"text-slate-950"}>
                            <span className='font-bold mr-2 ml-3 '>
                              Message:
                            </span>
                            {element.message}
                          </CardDescription>
                          <CardFooter className={"justify-end"}>
                            {
                              loading && (messageId === element._id) ? (
                                <SpecialLoadingButton width={"w-32 "} content={"Deleting"} />
                              ) : (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button onClick={() => handleMessageDelete(element._id)} className="bg-red-600 rounded-full h-9 w-9 hover:bg-red-700">
                                        <Trash />
                                      </Button>
                                    </TooltipTrigger>

                                    <TooltipContent  >
                                      <p>Delete</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )
                            }
                          </CardFooter>
                        </Card>
                      )
                    })
                  ) : <CardHeader>No Messages Found!</CardHeader>
                }
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

    </>
  )
}

export default Messages