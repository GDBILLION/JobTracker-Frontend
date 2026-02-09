// The data we receive FROM the API (Response DTO)
export interface JobApplication {
    id: number;
    companyName: string;
    jobTitle: string;
    status: string;
    dateApplied: string;
    jobUrl?: string;
}

// The data we send TO the API (Request DTO)
export interface CreateJobApplication {
    companyName: string;
    jobTitle: string;
    jobUrl?: string;
}