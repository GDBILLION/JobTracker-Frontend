import { useEffect, useState } from "react";
import { AddJobForm } from "./components/AddJobModal";
import { JobCard } from "./components/JobCard";
import { JobApplication } from "./types/JobApplication";
import agent from "./api/agent";

function App() {
    const [jobs, setJobs] = useState<JobApplication[]>([]);
    const [error, setError] = useState<string | null>(null);
    
    // Mock data for demonstration
    const mockJobs: JobApplication[] = [
        { id: 1, companyName: "Google", jobTitle: "Senior Frontend Engineer", status: "interviewing", dateApplied: "2026-02-01" },
        { id: 2, companyName: "Microsoft", jobTitle: "Full Stack Developer", status: "applied", dateApplied: "2026-02-03" },
        { id: 3, companyName: "Amazon", jobTitle: "Software Engineer", status: "offer", dateApplied: "2026-01-28" },
    ];
    
    const loadJobs = async () => {
        try {
            const data = await agent.list();
            setJobs(data);
            setError(null);
        } catch (err) {
            console.error("Failed to load jobs from API:", err);
            // Use mock data as fallback
            setJobs(mockJobs);
            setError("Using demo data - backend not available");
        }
    };

    useEffect(() => {
        loadJobs();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 mb-3 drop-shadow-lg">My Career Pipeline</h1>
                    <p className="text-slate-300 text-lg">
                        {jobs.length === 0 ? "Start tracking your opportunities" : `Tracking ${jobs.length} active application${jobs.length !== 1 ? 's' : ''}`}
                    </p>
                </div>
                
                {error && (
                    <div className="bg-amber-500/20 border border-amber-500/50 text-amber-100 px-4 py-3 rounded-lg mb-8 text-center">
                        {error}
                    </div>
                )}
                
                {/* Form Section */}
                <div className="mb-12">
                    <AddJobForm onJobAdded={loadJobs} />
                </div>

                {/* Jobs Grid */}
                {jobs.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-slate-400 text-lg">No applications yet. Add your first job above!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {jobs.map(job => (
                            <JobCard key={job.id} job={job} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;