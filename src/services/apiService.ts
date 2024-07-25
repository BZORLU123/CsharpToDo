const API_URL = 'http://localhost:5000/api/tasks'; // ASP.NET Core API URL

export const getTasks = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/tasks'); // API URL'nizi buraya yazın
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return [];
    }
};

export const addTask = async (task: { name: string; done: boolean }) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });
    return response.json();
};

export const deleteTask = async (id: number) => {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
};

export const updateTask = async (id: number, task: { name: string; done: boolean }) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });
    return response.json();
};
