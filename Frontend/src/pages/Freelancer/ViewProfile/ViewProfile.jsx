import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';

const ProfileCard = () => {
    const { id } = useParams();
    const fetchUrl = id ? `/api/users/${id}` : "/api/users/me";
    const { data: user, loading, error } = useFetch(fetchUrl);

    const defaultAvatar = (name) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=200&color=fff&bold=true`;

    const profileData = user ? {
        image: user.profilePhoto || defaultAvatar(user.name),
        name: user.name,
        location: user.location || "Remote",
        email: user.email,
        phone: user.phone || "Not provided",
        rating: 5,
        rate: user.hourlyRate ? `$${user.hourlyRate}` : "Negotiable",
        summary: user.bio || user.description || "No professional summary provided. This freelancer is ready to take on new challenges and deliver high-quality results.",
        workHistory: user.experience || [],
        education: user.education || [],
        videoSrc: user.videoUrl || "",
        videoLikes: user.videoLikes || 0,
        profileViews: user.profileViews || 0,
        skills: user.skills || []
    } : null;

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-4">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 bg-orange-500 rounded-full animate-pulse"></div>
                    </div>
                </div>
                <p className="text-slate-500 font-medium animate-pulse">Loading amazing profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-2xl mx-auto mt-20 p-10 bg-white rounded-3xl shadow-2xl border border-red-100 text-center">
                <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-2">Oops! Something went wrong</h2>
                <p className="text-slate-600 mb-8">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-8 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-200"
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (!profileData) {
        return (
            <div className="max-w-2xl mx-auto mt-20 p-10 bg-white rounded-3xl shadow-2xl border border-slate-100 text-center">
                <div className="w-20 h-20 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-2">Profile Not Found</h2>
                <p className="text-slate-600 mb-8">This freelancer seems to be in stealth mode.</p>
                <button
                    onClick={() => window.history.back()}
                    className="px-8 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-900 transition-all shadow-lg shadow-slate-200"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-8">
            <div className="max-w-6xl mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100 h-full">
                
                {/* Left Sidebar: Sticky stats and contact */}
                <div className="md:w-[35%] bg-slate-900 text-white p-8 md:p-10 flex flex-col relative overflow-hidden">
                    {/* Background Accents */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-orange-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse"></div>
                            <img
                                src={profileData.image}
                                alt={profileData.name}
                                className="relative rounded-full w-40 h-40 object-cover border-4 border-white/10 shadow-2xl"
                            />
                            <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-slate-900 rounded-full"></div>
                        </div>

                        <h2 className="text-3xl font-extrabold mt-6 text-center bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                            {profileData.name}
                        </h2>
                        <div className="flex items-center text-slate-400 mt-2 font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            {profileData.location}
                        </div>

                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-2 gap-4 w-full mt-10">
                            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors group">
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Rate</p>
                                <p className="text-xl font-black text-orange-400 group-hover:scale-105 transition-transform origin-left">{profileData.rate}<span className="text-xs text-slate-500 font-normal">/hr</span></p>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors group">
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Rating</p>
                                <div className="flex items-center group-hover:scale-105 transition-transform origin-left">
                                    <span className="text-xl font-black text-yellow-400 mr-1">5.0</span>
                                    <span className="text-yellow-500 text-sm">★★★★★</span>
                                </div>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors group">
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Views</p>
                                <p className="text-xl font-black text-blue-400 group-hover:scale-105 transition-transform origin-left">{profileData.profileViews.toLocaleString()}</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors group">
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Bio Data</p>
                                <p className="text-xl font-black text-purple-400 group-hover:scale-105 transition-transform origin-left">Verified</p>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="w-full mt-10 space-y-4">
                            <div className="group flex items-center p-3 bg-white/5 rounded-xl border border-transparent hover:border-orange-500/30 hover:bg-white/10 transition-all cursor-pointer">
                                <div className="p-2 bg-orange-500/20 text-orange-500 rounded-lg mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Email Address</p>
                                    <p className="text-sm font-medium truncate text-slate-200">{profileData.email}</p>
                                </div>
                            </div>

                            <div className="group flex items-center p-3 bg-white/5 rounded-xl border border-transparent hover:border-blue-500/30 hover:bg-white/10 transition-all cursor-pointer">
                                <div className="p-2 bg-blue-500/20 text-blue-500 rounded-lg mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Phone Number</p>
                                    <p className="text-sm font-medium text-slate-200">{profileData.phone}</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links Grid */}
                        <div className="grid grid-cols-2 gap-3 w-full mt-10">
                            <a href="#" className="flex items-center justify-center p-3 bg-white/5 rounded-xl font-bold text-xs hover:bg-white text-slate-300 hover:text-slate-900 transition-all border border-white/5">
                                LinkedIn
                            </a>
                            <a href="#" className="flex items-center justify-center p-3 bg-white/5 rounded-xl font-bold text-xs hover:bg-white text-slate-300 hover:text-slate-900 transition-all border border-white/5">
                                Portfolio
                            </a>
                            <a href="#" className="flex items-center justify-center p-3 bg-white/5 rounded-xl font-bold text-xs hover:bg-white text-slate-300 hover:text-slate-900 transition-all border border-white/5">
                                Resume
                            </a>
                            <a href="#" className="flex items-center justify-center p-3 bg-white/5 rounded-xl font-bold text-xs hover:bg-white text-slate-300 hover:text-slate-900 transition-all border border-white/5">
                                Github
                            </a>
                        </div>

                        <button className="w-full mt-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-1 transition-all">
                            INVITE NOW
                        </button>
                    </div>
                </div>

                {/* Right Content Section */}
                <div className="md:w-[65%] p-8 md:p-14 overflow-y-auto bg-white">
                    <div className="flex flex-col space-y-12">
                        
                        {/* Summary Section */}
                        <section>
                            <div className="flex items-center mb-6">
                                <div className="w-2 h-8 bg-orange-500 rounded-full mr-4"></div>
                                <h3 className="text-3xl font-black text-slate-800 tracking-tight">Professional Summary</h3>
                            </div>
                            <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 relative group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017C11.4647 12 11.017 11.5523 11.017 11V9C11.017 6.79086 12.8079 5 15.017 5H19.017C21.2261 5 23.017 6.79086 23.017 9V15C23.017 18.3137 20.3307 21 17.017 21H14.017ZM3.017 21L3.017 18C3.017 16.8954 3.91243 16 5.017 16H8.017C8.56928 16 9.017 15.5523 9.017 15V9C9.017 8.44772 8.56928 8 8.017 8H4.017C3.46472 8 3.017 8.44772 3.017 9V11C3.017 11.5523 2.56928 12 2.017 12H1.017C0.464722 12 0.017 11.5523 0.017 11V9C0.017 6.79086 1.80786 5 4.017 5H8.017C10.2261 5 12.017 6.79086 12.017 9V15C12.017 18.3137 9.33072 21 6.017 21H3.017Z" />
                                    </svg>
                                </div>
                                <p className="text-lg text-slate-700 leading-relaxed font-medium">
                                    {profileData.summary}
                                </p>
                            </div>
                        </section>

                        {/* Skills Section */}
                        {profileData.skills.length > 0 && (
                            <section>
                                <div className="flex items-center mb-6">
                                    <div className="w-2 h-8 bg-blue-500 rounded-full mr-4"></div>
                                    <h3 className="text-2xl font-black text-slate-800 tracking-tight">Core Competencies</h3>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {profileData.skills.map((skill, index) => (
                                        <span 
                                            key={index} 
                                            className="px-5 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold border border-slate-200 hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:-translate-y-1 transition-all duration-300"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* History & Education Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            {/* Work History */}
                            <section>
                                <div className="flex items-center mb-6">
                                    <div className="w-2 h-8 bg-purple-500 rounded-full mr-4"></div>
                                    <h3 className="text-2xl font-black text-slate-800 tracking-tight">Work History</h3>
                                </div>
                                <div className="space-y-6">
                                    {profileData.workHistory.length > 0 ? (
                                        profileData.workHistory.map((work, idx) => (
                                            <div key={idx} className="relative pl-8 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-0.5 before:bg-slate-100 last:before:hidden">
                                                <div className="absolute left-[-5px] top-2 w-3 h-3 bg-purple-500 rounded-full ring-4 ring-purple-100"></div>
                                                <h4 className="text-lg font-bold text-slate-800">{work.jobTitle}</h4>
                                                <p className="text-sm font-bold text-purple-600">{work.employer}</p>
                                                <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">{work.duration} • {work.location}</p>
                                                <p className="text-sm text-slate-600 mt-3 leading-relaxed">{work.description}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-slate-400 italic">No work history provided yet.</p>
                                    )}
                                </div>
                            </section>

                            {/* Education */}
                            <section>
                                <div className="flex items-center mb-6">
                                    <div className="w-2 h-8 bg-emerald-500 rounded-full mr-4"></div>
                                    <h3 className="text-2xl font-black text-slate-800 tracking-tight">Education</h3>
                                </div>
                                <div className="space-y-6">
                                    {profileData.education.length > 0 ? (
                                        profileData.education.map((edu, idx) => (
                                            <div key={idx} className="relative pl-8 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-0.5 before:bg-slate-100 last:before:hidden">
                                                <div className="absolute left-[-5px] top-2 w-3 h-3 bg-emerald-500 rounded-full ring-4 ring-emerald-100"></div>
                                                <h4 className="text-lg font-bold text-slate-800">{edu.degree}</h4>
                                                <p className="text-sm font-bold text-emerald-600">{edu.school}</p>
                                                <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Class of {edu.graduationYear} • {edu.field}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-slate-400 italic">No education records provided yet.</p>
                                    )}
                                </div>
                            </section>
                        </div>

                        {/* Video Section */}
                        {profileData.videoSrc && (
                            <section className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500"></div>
                                
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
                                    <div>
                                        <h3 className="text-3xl font-black tracking-tight">Expert Showcase</h3>
                                        <p className="text-slate-400 text-sm mt-1">Watch this freelancer present their core skills and approach.</p>
                                    </div>
                                    <div className="flex items-center bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-sm border border-white/10 group cursor-pointer hover:bg-white/20 transition-all">
                                        <div className="text-pink-500 mr-3 animate-pulse">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Video Likes</p>
                                            <p className="text-xl font-black text-white">{profileData.videoLikes.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/5 ring-1 ring-white/10 aspect-video group">
                                    <iframe
                                        className="w-full h-full object-cover"
                                        src={profileData.videoSrc.includes("youtube.com") || profileData.videoSrc.includes("youtu.be")
                                            ? profileData.videoSrc.replace("watch?v=", "embed/").split("&")[0]
                                            : profileData.videoSrc}
                                        title="Freelancer Video Showcase"
                                        allowFullScreen
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    ></iframe>
                                    <div className="absolute inset-0 pointer-events-none border-[12px] border-black/10 rounded-[22px]"></div>
                                </div>

                                <div className="mt-8 flex items-center justify-center space-x-4">
                                    <div className="h-px bg-white/10 flex-grow"></div>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Hire with confidence</p>
                                    <div className="h-px bg-white/10 flex-grow"></div>
                                </div>
                            </section>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
