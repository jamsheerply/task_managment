import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  // CalendarIcon,
  // User2Icon,
  // Trash2Icon,
  // ChevronLeftIcon,
  // SearchIcon,
  // MoreVerticalIcon,
  // PlusIcon,
  ChevronDown,
  // ChevronsLeft,
  // ChevronLeft,
  // ChevronRight,
  // ChevronsRight,
  Trash2,
  Pencil,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ErrorMessage, Field, Formik } from "formik";
import { Form } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import * as Yup from "yup";
interface Task {
  id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  priority: string;
  date?: string;
  assignee?: string;
}

// Validation Schema using Yup
const TaskSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(30, "Title must not exceed 30 characters")
    .required("Title is required")
    .matches(/^\S*$/, "Title must not contain spaces"),
  description: Yup.string()
    .min(3, "Description must be at least 3 characters")
    .max(100, "Description must not exceed 100 characters")
    .required("Task description is required"),
});
const Test: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tasks] = useState<Task[]>([
    {
      id: "TASK-8782",
      title: "Documentation",
      type: "Documentation",
      description:
        "You can't compress the program without quantifying the open-source SS...",
      status: "In Progress",
      priority: "Medium",
    },
    {
      id: "TASK-7878",
      title: "Documentation",
      type: "Documentation",
      description:
        "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
      status: "Backlog",
      priority: "Medium",
    },
    {
      id: "TASK-7839",
      title: "Bug",
      type: "Bug",
      description: "We need to bypass the neural TCP card!",
      status: "Todo",
      priority: "High",
    },
    {
      id: "TASK-5562",
      title: "Feature",
      type: "Feature",
      description:
        "The SAS interface is down, bypass the open-source pixel so we can bac...",
      status: "Backlog",
      priority: "Medium",
    },
    {
      id: "TASK-8686",
      title: "Feature",
      type: "Feature",
      description:
        "I'll parse the wireless SSL protocol, that should driver the API panel!",
      status: "Canceled",
      priority: "Medium",
    },
    {
      id: "TASK-1280",
      title: "Bug",
      type: "Bug",
      description:
        "Use the digital TLS panel, then you can transmit the haptic system!",
      status: "Done",
      priority: "High",
    },
    {
      id: "TASK-7262",
      title: "Feature",
      type: "Feature",
      description:
        "The UTF8 application is down, parse the neural bandwidth so we can ba...",
      status: "Done",
      priority: "High",
    },
    {
      id: "TASK-1138",
      title: "Feature",
      type: "Feature",
      description:
        "Generating the driver won't do anything, we need to quantify the 1080p ...",
      status: "In Progress",
      priority: "Medium",
    },
    {
      id: "TASK-7184",
      title: "Feature",
      type: "Feature",
      description: "We need to program the back-end THX pixel!",
      status: "Todo",
      priority: "Low",
    },
    {
      id: "TASK-5160",
      title: "Documentation",
      type: "Documentation",
      description:
        "Calculating the bus won't do anything, we need to navigate the back-end...",
      status: "In Progress",
      priority: "High",
    },
  ]);

  // const addTask = () => {
  //   const newTask: Task = {
  //     id: tasks.length + 1,
  //     title: "",
  //     description: "",
  //   };
  //   setTasks([...tasks, newTask]);
  // };

  const getStatusIndicator = (status: string) => {
    const colors: { [key: string]: string } = {
      "In Progress": "bg-blue-500",
      Backlog: "bg-yellow-500",
      Todo: "bg-gray-500",
      Canceled: "bg-red-500",
      Done: "bg-green-500",
    };
    return (
      <div className="flex items-center">
        <div
          className={`w-2 h-2 rounded-full ${
            colors[status] || "bg-gray-500"
          } mr-2`}
        ></div>
        <span>{status}</span>
      </div>
    );
  };

  // const getPriorityIndicator = (priority: string) => {
  //   const colors: { [key: string]: string } = {
  //     High: "text-red-500",
  //     Medium: "text-yellow-500",
  //     Low: "text-green-500",
  //   };
  //   return (
  //     <span className={colors[priority] || "text-gray-500"}>{priority}</span>
  //   );
  // };

  const handleAddTaskSubmit = () => {
    console.log("submit");
  };
  return (
    <div className="flex h-screen bg-gray-50 mt-9">
      {/* Sidebar */}
      {/* <div className="w-64 bg-white shadow-md flex flex-col ">
        <div className="p-4">
          <Button variant="outline" className="w-full justify-start">
            <PlusIcon className="mr-2 h-4 w-4" /> New Space
          </Button>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <div className="px-4 py-2 text-sm font-medium text-gray-600">
            Shortcuts
          </div>
          <div className="px-4 py-2 text-sm font-medium text-gray-600">
            Direct messages
          </div>
          <div className="px-4 py-2 text-sm font-bold text-gray-600 ">
            Spaces
          </div>
          <div className="px-4 py-2 text-sm  text-black">
            E-Learning Project
          </div>
          <div className="px-4 py-2 text-sm bg-gray-200 text-black">TEST</div>
        </nav>
      </div> */}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        {/* <header className="bg-white shadow-sm"> */}
        {/* <div className="flex items-center justify-between px-4 py-3"> */}
        {/* <div className="flex items-center">
              <Button variant="ghost" size="icon">
                <ChevronLeftIcon className="h-6 w-6" />
              </Button>
              <div className="ml-2 flex items-center">
                <div className="w-6 h-6 rounded-md bg-pink-100 text-pink-600 flex items-center justify-center text-sm font-medium">
                  T
                </div>
                <h1 className="ml-2 text-xl font-semibold">TEST</h1>
                <span className="ml-2 text-sm text-gray-500">2 members</span>
              </div>
            </div> */}
        {/* <div className="flex items-center space-x-2 mx-8"> */}
        {/* <Button variant="ghost" size="icon">
                <SearchIcon className="h-5 w-5" />
              </Button> */}
        {/* <Button variant="ghost" size="icon">
                <LayoutGridIcon className="h-5 w-5" />
              </Button> */}
        <>
          {/* <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt={"User Avatar"}
                      />
                      <AvatarFallback>{"CN"}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Home</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Task</DropdownMenuItem>
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu> */}
        </>
        {/* <Button variant="ghost" size="icon">
                <MoreVerticalIcon className="h-5 w-5" />
              </Button>
            </div> */}
        {/* </div>
          <nav className="flex px-4">
            <Button
              variant="ghost"
              className="px-4 py-2 text-blue-600 border-b-2 "
            >
              Add Tasks
            </Button>
          </nav> */}
        {/* </header> */}

        {/* Task list */}
        {/* <main className="flex-1 overflow-y-auto bg-red-500 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-end items-center mb-4">
              <div className="flex space-x-4 text-sm text-gray-500">
                <span>Date</span>
                <span>Assignee</span>
                <span>delete</span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full justify-start text-blue-600 mb-4"
              onClick={addTask}
            >
              <PlusIcon className="mr-2 h-4 w-4" /> Add space task
            </Button>
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white p-4 rounded-lg shadow-sm mb-3"
              >
                <div className="flex items-start">
                  <Checkbox className="mt-1 mr-3" />
                  <div className="flex-1">
                    <Input
                      value={task.title}
                      onChange={(e) => {

                      }}
                      className="mb-2 font-medium"
                      placeholder="Task title"
                    />
                    <Input
                      value={task.description}
                      onChange={(e) => {
             
                      }}
                      className="text-gray-600"
                      placeholder="Task description"
                    />
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button variant="ghost" size="icon">
                      <CalendarIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <User2Icon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MessageSquareIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2Icon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main> */}
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between px-4 py-3">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
              <p className="text-gray-600 mb-4">
                Here's a list of your tasks for this month!
              </p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt={"User Avatar"}
                  />
                  <AvatarFallback>{"CN"}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Task</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Home</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex justify-between items-center mb-4">
            <Input placeholder="Filter tasks..." className="max-w-sm" />
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Status <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
              {/* <Button variant="outline" size="sm">
                Priority <ChevronDown className="ml-2 h-4 w-4" />
              </Button> */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsDialogOpen(true)}
              >
                Add task
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Task</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  {/* <TableHead>Priority</TableHead> */}
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id} className="hover:bg-gray-50">
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell className="font-medium">{task.id}</TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-500 mb-1">
                        {task.type}
                      </div>
                      <div className="font-medium">{task.description}</div>
                    </TableCell>
                    <TableCell>{getStatusIndicator(task.status)}</TableCell>
                    {/* <TableCell>{getPriorityIndicator(task.priority)}</TableCell> */}
                    <TableCell>
                      <Pencil />
                    </TableCell>
                    <TableCell>
                      <Trash2 />
                    </TableCell>
                    {/* <TableCell>...</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <Formik
            initialValues={{ title: "", task: "" }} // Adjust initial values for task fields
            validationSchema={TaskSchema} // Use the TaskSchema for validation
            onSubmit={handleAddTaskSubmit} // Function to handle form submission
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>Add New Task</DialogTitle>
                  <DialogDescription>
                    Fill in the details to create a new task.
                  </DialogDescription>
                </DialogHeader>

                <div>
                  <Field
                    name="title"
                    as={Input}
                    placeholder="Task Title"
                    className="mt-2"
                  />
                  <ErrorMessage
                    name="title"
                    component="p"
                    className="text-red-600"
                  />
                </div>

                <div className="mt-4">
                  <Field
                    name="task"
                    as={Input}
                    placeholder="Task Description"
                    className="mt-2"
                  />
                  <ErrorMessage
                    name="task"
                    component="p"
                    className="text-red-600"
                  />
                </div>

                <DialogFooter className="flex items-center justify-between mt-4">
                  <Button
                    type="button"
                    onClick={() => setIsDialogOpen(false)}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Add Task</Button>
                </DialogFooter>
                {/* Optional: Add any task-related errors here */}
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Test;
