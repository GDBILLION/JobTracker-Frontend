// src/components/AddJobModal.tsx
import React, { useState } from 'react';
import { CreateJobApplication } from '../types/JobApplication';
import agent from '../api/agent';

export const AddJobForm = ({ onJobAdded }: { onJobAdded: () => void }) => {
    const [form, setForm] = useState<CreateJobApplication>({
        companyName: '',
        jobTitle: '',
        jobUrl: ''
    });
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await agent.create(form);
            onJobAdded(); // Refresh the list
            setForm({ companyName: '', jobTitle: '', jobUrl: '' }); // Reset
            setError(null);
        } catch (error) {
            console.error("Error saving job", error);
            setError("Failed to save job. Backend may not be available.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-slate-700 border border-slate-600 rounded-2xl p-8 shadow-2xl max-w-2xl mx-auto backdrop-blur">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Add New Application</h2>
            {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6 text-sm">
                    {error}
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input 
                    className="bg-slate-800 border border-slate-500 text-white placeholder-slate-400 p-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
                    placeholder="Company Name"
                    value={form.companyName}
                    onChange={e => setForm({...form, companyName: e.target.value})}
                    required
                />
                <input 
                    className="bg-slate-800 border border-slate-500 text-white placeholder-slate-400 p-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
                    placeholder="Job Title"
                    value={form.jobTitle}
                    onChange={e => setForm({...form, jobTitle: e.target.value})}
                    required
                />
                <button type="submit" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl active:scale-95">
                    Add to Tracker
                </button>
            </div>
        </form>
    );
};