"use client";
import { menuItems } from "@/util/data";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Bell,
  Search,
  LogOut,
  Settings,
  User as UserIcon,
  ShoppingCart,
  Sun,
  Moon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  const { user } = useUser();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New order received", read: false },
    { id: 2, message: "Payment completed", read: false },
    { id: 3, message: "Inventory updated", read: true },
  ]);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Hydration fix for theme
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Animation variants
  const sidebarVariants = {
    expanded: { width: "260px" },
    collapsed: { width: "80px" },
  };

  const contentVariants = {
    expanded: { marginLeft: "260px" },
    collapsed: { marginLeft: "80px" },
  };

  // Get active menu item for highlighting
  const getIsActive = (url: string) => {
    if (url === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(url);
  };

  // Get initials for avatar fallback
  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Mobile Nav Toggle */}
      <button
        onClick={toggleMobileNav}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-primary text-primary-foreground md:hidden"
        aria-label="Toggle Navigation"
      >
        {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
            className="fixed top-0 left-0 w-[280px] h-full bg-card z-40 p-4 shadow-xl md:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="flex justify-between items-center mb-6 pt-2">
                <h2 className="text-xl font-bold">Dashboard</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMobileNav}
                  className="rounded-full"
                >
                  <X size={20} />
                </Button>
              </div>

              {/* User Info */}
              {user && (
                <div className="flex items-center gap-3 my-6 p-3 bg-muted rounded-lg">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={user.imageUrl}
                      alt={user.fullName || "User"}
                    />
                    <AvatarFallback>
                      {getInitials(user.fullName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">{user.fullName}</span>
                    <span className="text-sm text-muted-foreground">
                      {user.primaryEmailAddress?.emailAddress}
                    </span>
                  </div>
                </div>
              )}

              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-9 pr-4"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Mobile Menu */}
              <div className="flex-1 space-y-1 overflow-y-auto">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.url === "/home" ? "/" : item.url}
                    onClick={toggleMobileNav}
                    className={`flex items-center gap-3 px-3 py-3 rounded-md transition-colors ${
                      getIsActive(item.url)
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    <item.icon size={18} />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>

              {/* Mobile Footer */}
              <div className="mt-6 pt-6 border-t">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={() => {}}
                >
                  <LogOut size={18} />
                  <span>Log Out</span>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile nav */}
      {mobileNavOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={toggleMobileNav}
        />
      )}

      {/* Desktop Sidebar */}
      <motion.div
        variants={sidebarVariants}
        initial={false}
        animate={sidebarExpanded ? "expanded" : "collapsed"}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        className="hidden md:flex fixed top-0 left-0 h-full bg-card z-30 flex-col border-r shadow-sm"
      >
        {/* Sidebar Header */}
        <div
          className={`h-16 px-4 flex items-center justify-between border-b ${sidebarExpanded ? "" : "justify-center"}`}
        >
          {sidebarExpanded && (
            <div className="flex items-center gap-2 font-bold text-xl">
              <ShoppingCart size={24} className="text-primary" />
              <span>YourStore</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="rounded-full hover:bg-muted"
            aria-label="Toggle sidebar"
          >
            {sidebarExpanded ? (
              <ChevronLeft size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
          </Button>
        </div>

        {/* User Profile */}
        {user && (
          <div className={`my-4 px-3 ${sidebarExpanded ? "mx-2" : "mx-0"}`}>
            <div
              className={`flex ${sidebarExpanded ? "items-center gap-3" : "justify-center"} p-2 rounded-lg`}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Avatar className="h-10 w-10 cursor-pointer">
                      <AvatarImage
                        src={user.imageUrl}
                        alt={user.fullName || "User"}
                      />
                      <AvatarFallback>
                        {getInitials(user.fullName)}
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  {!sidebarExpanded && (
                    <TooltipContent side="right">
                      <p>{user.fullName}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>

              {sidebarExpanded && (
                <div className="flex flex-col">
                  <span className="font-medium truncate max-w-[160px]">
                    {user.fullName}
                  </span>
                  <span className="text-xs text-muted-foreground truncate max-w-[160px]">
                    {user.primaryEmailAddress?.emailAddress}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto py-2 px-3">
          {menuItems.map((item) => (
            <TooltipProvider key={item.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.url === "/home" ? "/" : item.url}
                    className={`flex items-center ${
                      sidebarExpanded
                        ? "justify-start px-3"
                        : "justify-center px-0"
                    } py-3.5 mb-1 rounded-md transition-all ${
                      getIsActive(item.url)
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    <item.icon size={18} />
                    {sidebarExpanded && (
                      <span className="ml-3">{item.name}</span>
                    )}
                  </Link>
                </TooltipTrigger>
                {!sidebarExpanded && (
                  <TooltipContent side="right">{item.name}</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div
          className={`mt-auto mb-4 px-3 ${sidebarExpanded ? "" : "flex flex-col items-center"}`}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size={sidebarExpanded ? "default" : "icon"}
                  className={`${sidebarExpanded ? "w-full justify-start gap-2" : "rounded-full"} mb-2`}
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {mounted && theme === "dark" ? (
                    <Sun size={18} />
                  ) : (
                    <Moon size={18} />
                  )}
                  {sidebarExpanded && <span>Toggle Theme</span>}
                </Button>
              </TooltipTrigger>
              {!sidebarExpanded && (
                <TooltipContent side="right">Toggle Theme</TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size={sidebarExpanded ? "default" : "icon"}
                  className={`${sidebarExpanded ? "w-full justify-start gap-2" : "rounded-full"}`}
                  onClick={() => {}}
                >
                  <Settings size={18} />
                  {sidebarExpanded && <span>Settings</span>}
                </Button>
              </TooltipTrigger>
              {!sidebarExpanded && (
                <TooltipContent side="right">Settings</TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        variants={contentVariants}
        initial={false}
        animate={sidebarExpanded ? "expanded" : "collapsed"}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        className="flex-1 hidden md:block"
      >
        {/* Top Navigation Bar */}
        <header className="h-16 border-b bg-card flex items-center justify-between px-6">
          {/* Left Section - Page Title */}
          <h1 className="text-xl font-semibold">
            {menuItems.find((item) =>
              getIsActive(item.url === "/home" ? "/" : item.url)
            )?.name || "Dashboard"}
          </h1>

          {/* Right Section - Search, Notifications, User */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="w-64 pl-9 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full relative"
                >
                  <Bell size={18} />
                  {unreadCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
                    >
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-white">
                <DropdownMenuLabel className="flex justify-between items-center">
                  <span>Notifications</span>
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllNotificationsAsRead}
                      className="text-xs h-7"
                    >
                      Mark all as read
                    </Button>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length === 0 ? (
                  <div className="py-4 text-center text-muted-foreground">
                    No notifications
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <DropdownMenuItem key={notification.id} className="p-0">
                      <div
                        className={`w-full p-3 ${notification.read ? "" : "bg-muted"}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Bell size={14} className="text-primary" />
                          </div>
                          <div>
                            <p className="text-sm">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Just now
                            </p>
                          </div>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User dropdown */}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-8 w-8 p-0"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user.imageUrl}
                        alt={user.fullName || "User"}
                      />
                      <AvatarFallback>
                        {getInitials(user.fullName)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </motion.div>

      {/* Mobile Content View */}
      <div className="flex-1 md:hidden">
        {/* Mobile Top Bar */}
        <header className="h-16 border-b bg-card flex items-center justify-end px-4">
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full relative"
                >
                  <Bell size={18} />
                  {unreadCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
                    >
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex justify-between items-center">
                  <span>Notifications</span>
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllNotificationsAsRead}
                      className="text-xs h-7"
                    >
                      Mark all as read
                    </Button>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length === 0 ? (
                  <div className="py-4 text-center text-muted-foreground">
                    No notifications
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <DropdownMenuItem key={notification.id} className="p-0">
                      <div
                        className={`w-full p-3 ${notification.read ? "" : "bg-muted"}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Bell size={14} className="text-primary" />
                          </div>
                          <div>
                            <p className="text-sm">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Just now
                            </p>
                          </div>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {user && (
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={user.imageUrl}
                  alt={user.fullName || "User"}
                />
                <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
              </Avatar>
            )}
          </div>
        </header>

        {/* Mobile Content */}
        <main className="p-4 pt-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
