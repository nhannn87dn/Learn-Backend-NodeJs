import createError from "http-errors";
import taskService from "../../src/services/tasks.service";

describe("Tasks Service", () => {
    describe("getAllTasks", () => {
        it("should return all tasks", () => {
            const tasks = taskService.getAllTasks();
            expect(Array.isArray(tasks)).toBe(true);
            expect(tasks.length).toBeGreaterThan(0);
        });
    });

    describe("getTaskById", () => {
        it("should return a task if id exists", () => {
            const task = taskService.getTaskById(1);
            expect(task).toHaveProperty("id", 1);
        });

        it("should throw 404 error if task not found", () => {
            expect(() => taskService.getTaskById(999)).toThrow('Task not found');
            try {
                taskService.getTaskById(999);
            } catch (err: any) {
                expect(err).toBeInstanceOf(createError.HttpError);
                expect(err.status).toBe(404);
            }
        });
    });

    describe("createTask", () => {
        it("should create a new task and return it", () => {
            const payload = { title: "New Task", completed: false };
            const newTask = taskService.createTask(payload as any);

            expect(newTask).toHaveProperty("id");
            expect(newTask.title).toBe(payload.title);
            expect(newTask.completed).toBe(payload.completed);
        });
    });

    describe("updateTaskById", () => {
        it("should update an existing task", () => {
            const updated = taskService.updateTaskById(1, { completed: true } as any);
            expect(updated.completed).toBe(true);
        });

        it("should throw if task does not exist", () => {
            expect(() => taskService.updateTaskById(999, {} as any)).toThrow();
            try {
                taskService.updateTaskById(999, {} as any);
            } catch (err: any) {
                expect(err.status).toBe(404);
            }
        });
    });

    describe("deleteTaskById", () => {
        it("should return filtered tasks without the deleted id", () => {
            const tasks = taskService.deleteTaskById(1);
            expect(tasks.find(t => t.id === 1)).toBeUndefined();
        });
    });
});
