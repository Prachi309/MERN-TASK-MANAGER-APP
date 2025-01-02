import { toast } from 'react-toastify';

export const notify = (message, type = 'default') => {
    toast[type](message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};

export const API_URL='https://mern-task-manager-app-api.vercel.app'
