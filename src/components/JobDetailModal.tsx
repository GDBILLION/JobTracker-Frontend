import { X, Calendar, Globe, Briefcase, Building2, Clock } from 'lucide-react';
import { JobApplication } from '../types/JobApplication';

interface Props {
    job: JobApplication;
    isOpen: boolean;
    onClose: () => void;
}

export const JobDetailModal = ({ job, isOpen, onClose }: Props) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-slate-800 border border-slate-700 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header Section */}
                <div className="relative h-32 bg-gradient-to-br from-blue-600 to-indigo-700 p-6">
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                    <div className="mt-4">
                        <h2 className="text-2xl font-black text-white leading-tight">{job.companyName}</h2>
                        <p className="text-blue-100 font-medium">{job.jobTitle}</p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-8 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-700/50 p-4 rounded-2xl border border-slate-600">
                            <div className="flex items-center gap-2 text-blue-400 mb-1">
                                <Clock size={16} />
                                <span className="text-[10px] uppercase font-bold tracking-wider">Status</span>
                            </div>
                            <p className="text-white font-bold">{job.status}</p>
                        </div>
                        <div className="bg-slate-700/50 p-4 rounded-2xl border border-slate-600">
                            <div className="flex items-center gap-2 text-indigo-400 mb-1">
                                <Calendar size={16} />
                                <span className="text-[10px] uppercase font-bold tracking-wider">Applied On</span>
                            </div>
                            <p className="text-white font-bold">{job.dateApplied}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-slate-400 text-xs font-black uppercase tracking-widest">Application Details</h4>
                        <div className="flex items-center gap-3 text-slate-200">
                            <div className="p-2 bg-slate-700 rounded-lg text-slate-400"><Building2 size={18} /></div>
                            <span>Enterprise Software Sector</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-200">
                            <div className="p-2 bg-slate-700 rounded-lg text-slate-400"><Globe size={18} /></div>
                            <a href={job.jobUrl} target="_blank" className="text-blue-400 hover:underline truncate">{job.jobUrl || 'No link provided'}</a>
                        </div>
                    </div>

                    <button 
                        onClick={() => window.open(job.jobUrl, '_blank')}
                        className="w-full py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-blue-50 transition-colors flex justify-center items-center gap-2 shadow-lg"
                    >
                        Open Original Listing
                        <Globe size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};