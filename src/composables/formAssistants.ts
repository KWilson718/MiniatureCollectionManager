// import { ref } from 'vue';
import { generateID } from "../modules/generateID";

export function createCatSubmit() {
    const submit = async (data: any) => {
        try {
            // Generate the ID and wait for the result
            const randomID = await generateID();
            console.log('Form submitted with data:', data);
            console.log('ID Generated:', randomID);
            // Add your submission logic here (e.g., API calls)
        } catch (error) {
            console.error('Error generating ID or submitting form:', error);
        }
    };

    return {
        submit
    };
}