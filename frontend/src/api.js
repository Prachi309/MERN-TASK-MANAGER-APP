import { API_URL } from "./utils"

export const CreateTask= async (taskObj)=>{
    const url= `${API_URL}/tasks`;
    console.log('Creating task at:', url)
    
    const options={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskObj)
    };
    
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch (err) {
        console.error('Error creating task:', err);
        return { success: false, message: "Failed to create task" };
    }
}

export const getAllTasks = async () => {
    const url = `${API_URL}/tasks`;
    console.log('Fetching tasks from:', url);
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const result = await fetch(url, options);
        const data = await result.json();
        return data; // Ensure this returns the correct structure
    } catch (err) {
        console.error('Error fetching tasks:', err);
        return { success: false }; // Return an error structure
    }
};

export const deleteTaskById= async (id)=>{
    const url= `${API_URL}/tasks/${id}`;
    
    console.log('Deleting task at:', url)
    
    const options={
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    try {
        const result = await fetch(url, options);
        
        return await result.json();  // Ensure that this returns the correct structure.
        
    } catch (err) {
        console.error('Error deleting task:', err);
        
       return { success: false };  // Return an error structure.
   }
}

export const updateTaskById= async (id, reqBody)=>{
   const url= `${API_URL}/tasks/${id}`;
   
   console.log('Updating task at:', url)
   
   const options={
       method: 'PUT',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify(reqBody)
   };
   
   try {
       const result = await fetch(url, options);
       
       return await result.json();  // Ensure that this returns the correct structure.
       
   } catch (err) {
       console.error('Error updating task:', err);
       
       return { success: false };  // Return an error structure.
   }
}
