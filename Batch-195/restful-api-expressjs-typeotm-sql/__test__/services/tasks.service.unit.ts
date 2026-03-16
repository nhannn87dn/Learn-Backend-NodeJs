import taskService from "../../src/services/tasks.service";
import Task from "../../src/models/task.model";

jest.mock("../../src/models/task.model");

describe("Tasks Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("getAllTasks", () => {
        it("should return all tasks", async () => {
            const mockTasks = [
                { _id: "1", title: "Task 1", description: "Desc 1", isCompleted: false },
                { _id: "2", title: "Task 2", description: "Desc 2", isCompleted: true },
            ];
            (Task.find as jest.Mock).mockResolvedValue(mockTasks);

            const tasks = await taskService.getAllTasks();
            expect(Array.isArray(tasks)).toBe(true);
            expect(tasks.length).toBe(2);
            expect(Task.find).toHaveBeenCalled();
        });
    });

    describe("getTaskById", () => {
        it("should return a task if id exists", async () => {
            const mockTask = { _id: "1", title: "Task 1", description: "Desc 1", isCompleted: false };
            (Task.findById as jest.Mock).mockResolvedValue(mockTask);

            const task = await taskService.getTaskById("1");
            expect(task).toHaveProperty("_id", "1");
            expect(task.title).toBe("Task 1");
            expect(Task.findById).toHaveBeenCalledWith("1");
        });

        it("should throw 404 error if task not found", async () => {
            (Task.findById as jest.Mock).mockResolvedValue(null);

            try {
                await taskService.getTaskById("999");
                fail("Should throw error");
            } catch (err: any) {
                expect(err.status).toBe(404);
                expect(err.message).toBe('Task not found');
            }
        });
    });

    describe("createTask", () => {
        it("should create a new task and return it", async () => {
            const payload = { title: "New Task", description: "New description", completed: false };
            const mockCreatedTask = { _id: "new-id", title: "New Task", description: "New description", isCompleted: false };
            
            const mockTaskInstance = {
                save: jest.fn().mockResolvedValue(mockCreatedTask),
            };
            (Task as any).mockImplementation(() => mockTaskInstance);

            const newTask = await taskService.createTask(payload as any);

            expect(newTask).toHaveProperty("_id");
            expect(newTask.title).toBe(payload.title);
            expect(newTask.description).toBe(payload.description);
            expect(newTask.isCompleted).toBe(payload.completed);
        });
    });

    describe("updateTaskById", () => {
        it("should update an existing task", async () => {
            const mockTask = { _id: "1", title: "Task 1", description: "Desc 1", isCompleted: false, save: jest.fn() };
            const updatedTask = { _id: "1", title: "Updated Task", description: "Desc 1", isCompleted: true };
            
            (Task.findById as jest.Mock).mockResolvedValue(mockTask);
            mockTask.save.mockResolvedValue(updatedTask);

            const updated = await taskService.updateTaskById("1", { title: "Updated Task", description: "Desc 1", completed: true } as any);
            expect(updated.isCompleted).toBe(true);
            expect(updated.title).toBe("Updated Task");
        });

        it("should throw if task does not exist", async () => {
            (Task.findById as jest.Mock).mockResolvedValue(null);

            try {
                await taskService.updateTaskById("999", {} as any);
                fail("Should throw error");
            } catch (err: any) {
                expect(err.status).toBe(404);
            }
        });
    });

    describe("deleteTaskById", () => {
        it("should delete task and return result", async () => {
            const mockTask = { _id: "1", title: "Task 1", description: "Desc 1", isCompleted: false };
            const mockDeleteResult = { deletedCount: 1 };
            
            (Task.findById as jest.Mock).mockResolvedValue(mockTask);
            (Task.deleteOne as jest.Mock).mockResolvedValue(mockDeleteResult);

            const result = await taskService.deleteTaskById("1");
            expect(result.deletedCount).toBe(1);
            expect(Task.deleteOne).toHaveBeenCalledWith({ _id: "1" });
        });
    });
});
