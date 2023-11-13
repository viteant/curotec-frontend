import {ref} from 'vue'
import type ITask from "@/interfaces/ITask";
import axios from 'axios';


import {toast} from 'vue3-toastify';

const tasks = ref<Array<ITask>>([])
const currentTask = ref()

const createTask = () => {
    const t = toast('loading...');
    axios.post('http://localhost:8000/api/tasks', {
        task: currentTask.value
    }).then(resp => {
        tasks.value.push(resp.data.task)
        toast.remove(t)
        toast(resp.data.message)
    });
}

const deleteTask = (id: number) => {
    const op = confirm('¿Are you sure?')
    if (op) {
        const t = toast('loading...');
        axios.delete(`http://localhost:8000/api/tasks/${id}`).then(resp => {
            tasks.value = tasks.value.filter(el => el.id !== id)
            toast.remove(t)
            toast(resp.data.message)
        });
    }
}

const getTasks = () => {
    axios.get('http://localhost:8000/api/tasks').then(resp => {
        tasks.value = resp.data
    });
}

const updateTask = (id: number, task: string) => {
    const newTask = prompt('Update your task', task)
    const t = toast('loading...');
    axios.put(`http://localhost:8000/api/tasks/${id}`, {
        task: newTask
    }).then(resp => {
        const currentTaskIndx = tasks.value.findIndex((el) => el.id === id)
        tasks.value[currentTaskIndx] = resp.data.task
        toast.remove(t)
        toast(resp.data.message)
    });
}

const updateStatus = (id: number, status: string) => {
    if (confirm('Are you sure?')) {
        const t = toast('loading...');
        axios.put(`http://localhost:8000/api/tasks/${id}`, {
            status: status
        }).then(resp => {
            const currentTaskIndx = tasks.value.findIndex((el) => el.id === id)
            tasks.value[currentTaskIndx] = resp.data.task
            toast.remove(t)
            toast(resp.data.message)
        });
    }

}


export const useTask = () => ({
    createTask,
    getTasks,
    deleteTask,
    updateTask,
    updateStatus,
    tasks,
    currentTask
})
