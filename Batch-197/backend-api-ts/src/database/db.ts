import Category from "../models/category.model";

// Function to create a new category
const runDB = async () => {
    try {
        const newCategory = new Category({
            category_name: "Electronics 1",
            description: "Devices and gadgets 2",
        });
        await newCategory.save()
    console.log("New category created:", newCategory);
    } catch (error) {
        console.error("Error creating category:", error);
    }
}

runDB();