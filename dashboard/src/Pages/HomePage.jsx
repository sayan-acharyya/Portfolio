import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Home,
  FolderGit,
  ListPlus,
  LayoutGrid,
  History,
  MessageCircleMore,
  MessageSquareMore,
  User,
  LogOut,
  Package,
  Package2,
  PanelLeft,
  PencilRuler,
} from "lucide-react";

import {
  logout,
  clearAllUsersErrors,
} from "@/store/slices/userSlice";

const HomePage = () => {
  const [active, setActive] = useState("Dashboard");
  const { isAuthenticated, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged Out!");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUsersErrors());
    }
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [error, isAuthenticated, dispatch, navigate]);

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link className="flex h-9 w-9 items-center justify-center rounded-full">
            <Package className="h-4 w-4" />
          </Link>

          <SidebarIcon icon={Home} label="Dashboard" active={active} setActive={setActive} />
          <SidebarIcon icon={FolderGit} label="Add Project" active={active} setActive={setActive} />
          <SidebarIcon icon={ListPlus} label="Add Skill" active={active} setActive={setActive} />
          <SidebarIcon icon={LayoutGrid} label="Add Application" active={active} setActive={setActive} />
          <SidebarIcon icon={History} label="Timeline" active={active} setActive={setActive} />
          <SidebarIcon icon={MessageCircleMore} label="Messages" active={active} setActive={setActive} />
          <SidebarIcon icon={User} label="Account" active={active} setActive={setActive} />
        </nav>

        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleLogout}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">Logout</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>

      {/* ================= MOBILE HEADER + SHEET ================= */}
      <header className="fixed top-0 left-0 z-40 flex w-full items-center border-b bg-background px-4 py-2 sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <PanelLeft className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-64">
            <nav className="grid gap-4 text-lg font-medium">
              <MobileItem icon={Home} label="Dashboard" setActive={setActive} />
              <MobileItem icon={FolderGit} label="Add Project" setActive={setActive} />
              <MobileItem icon={PencilRuler} label="Add Skill" setActive={setActive} />
              <MobileItem icon={LayoutGrid} label="Add Application" setActive={setActive} />
              <MobileItem icon={History} label="Timeline" setActive={setActive} />
              <MobileItem icon={MessageSquareMore} label="Messages" setActive={setActive} />
              <MobileItem icon={User} label="Account" setActive={setActive} />
              <button
                onClick={handleLogout}
                className="flex items-center gap-4 text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </nav>
          </SheetContent>
        </Sheet>
      </header>
    </div>
  );
};

/* ================= REUSABLE COMPONENTS ================= */

const SidebarIcon = ({ icon: Icon, label, active, setActive }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={() => setActive(label)}
          className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors
            ${
              active === label
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
        >
          <Icon className="h-5 w-5" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const MobileItem = ({ icon: Icon, label, setActive }) => (
  <button
    onClick={() => setActive(label)}
    className="flex items-center gap-4 text-muted-foreground hover:text-foreground"
  >
    <Icon className="h-5 w-5" />
    {label}
  </button>
);

export default HomePage;
