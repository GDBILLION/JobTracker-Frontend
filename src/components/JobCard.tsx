// src/components/JobCard.tsx
import { ExternalLink, Calendar, MapPin, Eye } from 'lucide-react';
import { JobApplication } from '../types/JobApplication';
import { useState } from 'react';
import { JobDetailModal } from './JobDetailModal';

interface Props {
    job: JobApplication;
}

export const JobCard = ({ job }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Logic for color-coding statuses
    const getStatusStyle = (status: string) => {
        switch (status.toLowerCase()) {
            case 'offer': return 'bg-emerald-500/30 text-emerald-200 border-emerald-500/50';
            case 'interviewing': return 'bg-blue-500/30 text-blue-200 border-blue-500/50';
            case 'rejected': return 'bg-red-500/30 text-red-200 border-red-500/50';
            default: return 'bg-slate-600/50 text-slate-200 border-slate-500/50';
        }
    };

    // Logic to handle clicking "View Details"
    const handleViewDetails = () => {
        if (job.jobUrl && job.jobUrl.startsWith('http')) {
            window.open(job.jobUrl, '_blank', 'noopener,noreferrer');
        } else {
            alert(`Job ID: ${job.id}\nCompany: ${job.companyName}\nNote: No external URL provided.`);
        }
    };

    return (
        <div className="bg-slate-700 border border-slate-600 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 backdrop-blur">
            <div className="flex justify-between items-start mb-5">
                <div>
                    <h3 className="font-bold text-xl text-white">{job.companyName}</h3>
                    <p className="text-slate-300 font-medium text-sm mt-1">{job.jobTitle}</p>
                </div>
                <span className={`px-4 py-2 rounded-full text-xs font-bold border ${getStatusStyle(job.status)} uppercase tracking-wide`}>
                    {job.status}
                </span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
                <Calendar size={16} />
                <span>{job.dateApplied}</span>
            </div>

            {/* UPDATED BUTTON SECTION */}
            <div className="flex gap-2">
                <button 
                    onClick={() => setIsModalOpen(true)} // Open the modal
                    className="w-full flex justify-center items-center gap-2 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-xl"
                >
                    <Eye size={18} />
                    View Details
                </button>
            </div>

            {/* Use the Modal component here */}
            <JobDetailModal 
                job={job} 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </div>
    );
};