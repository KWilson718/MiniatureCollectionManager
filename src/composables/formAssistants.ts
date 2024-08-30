// import { ref } from 'vue';
import { generateID } from "../modules/generateID";
import { Category, insertCategory } from "../lib/dbController";

export function createCatSubmit() {
    const submit = async (data: any) => {
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
        submit
    };
}