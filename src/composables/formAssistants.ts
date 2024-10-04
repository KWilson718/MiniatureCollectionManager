// import { ref } from 'vue';
import { generateID } from "../modules/generateID";
import { Category, insertCategory, updateCategory, getCategory } from "../lib/dbController";

export function createCatSubmit() {
    const submitCat = async (data: any) => {
        try {
            // Generate the ID and wait for the result
            const randomID = await generateID();

            const now = new Date();

            const metadata = {
                createdAt: now.toLocaleString(),
                updatedAt: now.toLocaleString(),
            }

            let payload: Category = {
                id: randomID,
                name: data.categoryName,
                description: data?.categoryDesc,
                metadata: metadata,
                subcategories: [],
            }

            let insertion = await insertCategory(payload);

            console.log(insertion);

        } catch (error) {
            console.error('Error generating ID or submitting form:', error);
        }
    };

    return {
        submitCat
    };
}

export function  createSubCatSubmit(){
    const submitSubCat = async (data: any, categoryID: any) => {
        try{
            const category = await getCategory(categoryID);

            console.log("Data is set to:", data);
            console.log("Category is set to:", category);

            const randomID = await generateID();

            const now = new Date();

            const metadata = {
                createdAt: now.toLocaleString(),
                updatedAt: now.toLocaleString(),
            }

            const updatedMetadata = {
                updatedAt: now.toLocaleString(),
            }

            let subCatPayload: any = {
                id: randomID,
                name: data.subCategoryName,
                description: data?.subCategoryDesc,
                metadata: metadata,
                groups: [],

            }

            // Takes the previous Sub Categories and adds them to the current ones.
            let subCategoriesArray = category?.subcategories || []; // needs to account for when there is no subcategories present
            subCategoriesArray.push(subCatPayload);

            let categoryShell: any = {
                metadata: updatedMetadata,
                subCategories: subCategoriesArray,
            }

            let result = await updateCategory(category.id, categoryShell);

            console.log(result);
        }
        catch (error) {
            console.error('Error during SubCategory Creation', error);
        }
    }

    return {
        submitSubCat
    }
}