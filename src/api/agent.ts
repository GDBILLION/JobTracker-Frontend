import axios from 'axios';
import { JobApplication, CreateJobApplication } from '../types/JobApplication';

const instance = axios.create({
    baseURL: 'http://localhost:5171/api', // Ensure this matches your .NET port
});

const responseBody = <T>(response: any) => response.data;

const requests = {
    get: <T>(url: string) => instance.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => instance.post<T>(url, body).then(responseBody),
};

const agent = {
    list: () => requests.get<JobApplication[]>('/Applications'),
    create: (job: CreateJobApplication) => requests.post<JobApplication>('/Applications', job),
};

export default agent;