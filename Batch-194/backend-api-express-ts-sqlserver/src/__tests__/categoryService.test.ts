import { fake_categories } from "../mockup/mockData";
import categoryService from "../services/categories.service";
import { ICategory } from "../types/categories";

jest.mock("../mockup/mockData", () => ({
  fake_categories: [
    { id: 1, name: "Food" },
    { id: 2, name: "Drink" },
  ] as ICategory[],
}));

describe("categoryService", () => {
  beforeEach(() => {
    // Reset lại dữ liệu giả mỗi lần test
    (fake_categories as ICategory[]).length = 0;
    fake_categories.push(
      { id: 1, name: "Food" },
      { id: 2, name: "Drink" }
    );
  });

  // ✅ findAll
  it("should return all categories", () => {
    const result = categoryService.findAll();
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe("Food");
  });

  // ✅ findById
  it("should return a category by id", () => {
    const result = categoryService.findById({ id: "1" });
    console.log('<===== result =====>', result);
    expect(result).toEqual({ id: 1, name: "Food" });
  });

  it("should throw 404 if category not found (findById)", () => {
    expect(() => categoryService.findById({ id: "99" })).toThrow("Category not found");
  });

  // ✅ create
  it("should create a new category", () => {
    const result = categoryService.create({ name: "Tech" });
    expect(result).toEqual({ id: 3, name: "Tech" });
    expect(fake_categories).toHaveLength(3);
  });

  // ✅ updateById
  it("should update a category name", () => {
    const result = categoryService.updateById({
      id: "1",
      payload: { name: "Updated Food" },
    });
    expect(result.name).toBe("Updated Food");
  });

  it("should throw 404 if updating non-existing category", () => {
    expect(() =>
      categoryService.updateById({
        id: "10",
        payload: { name: "New Name" },
      })
    ).toThrow("Category not found");
  });

  // ✅ deleteById
  it("should delete a category and return record deleted", () => {
    const result = categoryService.deleteById("1");
    expect(result).toEqual({ id: 1, name: "Food" });
    expect(result.name).toBe("Food");
  });

  it("should throw 404 if deleting non-existing category", () => {
    expect(() => categoryService.deleteById("99")).toThrow("Category not found");
  });
});
