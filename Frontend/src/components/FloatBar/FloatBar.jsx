import React from 'react';

const FloatBar = () => {
    return (
        <div className="fixed bottom-6 inset-x-0 flex justify-center z-[9999]">
            <div className="bg-white/90 backdrop-blur-lg border border-white/20 px-8 py-3 rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] flex items-center space-x-3 animate-bounce-subtle hover:scale-105 transition-all duration-500 group">
                <div className="relative">
                    <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-2.5 h-2.5 bg-indigo-400 rounded-full animate-ping opacity-75"></div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
                    <span className="text-[10px] uppercase tracking-widest text-indigo-500 font-bold">Author</span>
                    <span className="text-sm font-semibold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                        THANUSHA A <span className="text-indigo-600 font-bold ml-1">(7376231CS332)</span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default FloatBar;
