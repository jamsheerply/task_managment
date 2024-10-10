import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, Trash2, Pencil } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  // PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ErrorMessage, Field, Formik, FormikHelpers } from "formik";
import { Form, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import * as Yup from "yup";
import { axiosInstance } from "@/constants/axiosInstance";
import { userLogout } from "@/redux/actions/user.action";
import { useAppDispatch } from "@/redux/store";

// Task Interface
interface Task {
  _id: string;
  title: string;
  task: string;
  status: boolean;
}

// Form Values Interface
interface FormValues {
  title: string;
  task: string;
}

// Validation Schema using Yup
const TaskSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(30, "Title must not exceed 30 characters")
    .required("Title is required")
    .matches(/^\S*$/, "Title must not contain spaces"),
  task: Yup.string()
    .min(3, "Task must be at least 3 characters")
    .max(100, "Task must not exceed 100 characters")
    .required("Task description is required"),
});

const Task: React.FC = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.get("/task/read-task", {
        params: {
          page: currentPage,
          limit: 10,
          search: searchTerm,
          status: statusFilter,
        },
      });
      setTasks(data.data);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching tasks", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchTerm, statusFilter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTaskSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm, setFieldError }: FormikHelpers<FormValues>
  ) => {
    try {
      console.log(values);
      const { data } = await axiosInstance.post("/task/add-task", values);
      if (data) {
        setTasks([
          ...tasks,
          {
            _id: data.task._id,
            title: values.title,
            task: values.task,
            status: false,
          },
        ]);
      }
      setIsAddDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error adding task", error);
      setFieldError("title", "An error occurred while adding the task");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsEditDialogOpen(true);
  };

  const handleEditTaskSubmit = async (
    values: FormValues,
    { setSubmitting, setFieldError }: FormikHelpers<FormValues>
  ) => {
    if (!editingTask) return;

    try {
      const { data } = await axiosInstance.patch(
        `/task/update-task/${editingTask._id}`,
        values
      );
      if (data) {
        setTasks(
          tasks.map((task) =>
            task._id === editingTask._id
              ? { ...task, title: values.title, task: values.task }
              : task
          )
        );
      }
      setIsEditDialogOpen(false);
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task", error);
      setFieldError("title", "An error occurred while updating the task");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await axiosInstance.delete(`/task/delete-task/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  const handleStatusChange = async (taskId: string, newStatus: boolean) => {
    try {
      await axiosInstance.patch(`/task/update-task/${taskId}`, {
        status: newStatus,
      });
      setTasks(
        tasks.map((task) => ({
          ...task,
          status: task._id === taskId ? newStatus : task.status,
        }))
      );
    } catch (error) {
      console.error("Error updating task status", error);
    }
  };

  const handleLogout = async () => {
    await dispatch(userLogout());
  };
  return (
    <div className="flex h-screen bg-gray-50 mt-9">
      <div className="flex-1 flex flex-col overflow-hidden">
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
                <DropdownMenuItem onClick={() => navigate("/")}>
                  Home
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex justify-between items-center mb-4">
            <Input
              placeholder="Search tasks..."
              className="max-w-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Status <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setStatusFilter("true")}>
                    completed
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("false")}>
                    In Progress
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAddDialogOpen(true)}
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
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : tasks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      No tasks found
                    </TableCell>
                  </TableRow>
                ) : (
                  tasks.map((task) => (
                    <TableRow key={task._id} className="hover:bg-gray-50">
                      <TableCell>
                        <Checkbox
                          checked={task.status === true}
                          onCheckedChange={(checked) => {
                            handleStatusChange(task._id, checked === true);
                          }}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        TSK-{task._id.slice(-4)}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-500 mb-1">
                          {task.title}
                        </div>
                        <div className="font-medium">
                          {task.status ? <del>{task.task}</del> : task.task}
                        </div>
                      </TableCell>
                      <TableCell>
                        {task.status ? "Completed" : "In Progress"}
                      </TableCell>

                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditTask(task)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteTask(task._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
            {currentPage > 10 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      aria-disabled={currentPage === 1}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                  {[...Array(totalPages)].map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        onClick={() => setCurrentPage(index + 1)}
                        isActive={currentPage === index + 1}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      aria-disabled={currentPage === totalPages}
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </div>
      </div>

      {/* Add Task Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <Formik
            initialValues={{ title: "", task: "" }}
            validationSchema={TaskSchema}
            onSubmit={handleAddTaskSubmit}
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
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mt-4">
                  <Field name="task" as={Input} placeholder="Task" />
                  <ErrorMessage
                    name="task"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Add Task</Button>
                </DialogFooter>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      {/* Edit Task Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <Formik
            initialValues={{
              title: editingTask?.title || "",
              task: editingTask?.task || "",
            }}
            validationSchema={TaskSchema}
            onSubmit={handleEditTaskSubmit}
            enableReinitialize
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>Edit Task</DialogTitle>
                  <DialogDescription>
                    Modify the details of the task.
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
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mt-4">
                  <Field name="task" as={Input} placeholder="Task" />
                  <ErrorMessage
                    name="task"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditDialogOpen(false);
                      setEditingTask(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Update Task</Button>
                </DialogFooter>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Task;
