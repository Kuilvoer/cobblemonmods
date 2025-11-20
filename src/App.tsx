import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Grid,
    X,
    CheckCircle2,
    Circle,
    Clock,
    Box,
    Cpu,
    Map as MapIcon,
    Gamepad2,
    Zap,
    Ghost,
    Settings,
    ExternalLink,
    Info,
    Download,
    Filter
} from 'lucide-react';

// --- Data ---

import { features, type Feature } from './data';

// --- Components ---

const CategoryIcon = ({ cat }: { cat: string }) => {
    switch (cat) {
        case 'UI': return <Box className="w-4 h-4" />;
        case 'World': return <MapIcon className="w-4 h-4" />;
        case 'Pokémon': return <Ghost className="w-4 h-4" />;
        case 'Items': return <Box className="w-4 h-4" />;
        case 'Core': return <Cpu className="w-4 h-4" />;
        case 'Tech': return <Settings className="w-4 h-4" />;
        case 'Gameplay': return <Gamepad2 className="w-4 h-4" />;
        default: return <Zap className="w-4 h-4" />;
    }
};

const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
        'Owned': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        'Missing': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        'Planned': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        'Available': 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    };

    const icon: Record<string, React.ReactNode> = {
        'Owned': <CheckCircle2 className="w-3 h-3 mr-1" />,
        'Missing': <X className="w-3 h-3 mr-1" />,
        'Planned': <Clock className="w-3 h-3 mr-1" />,
        'Available': <Circle className="w-3 h-3 mr-1" />,
    };

    return (
        <span className={`flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status] || styles['Available']}`}>
            {icon[status]}
            {status}
        </span>
    );
};

const FeatureCard = ({ feature, onClick }: { feature: Feature; onClick: (f: Feature) => void }) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={() => onClick(feature)}
        className="group relative bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-5 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 flex flex-col h-full cursor-pointer overflow-hidden"
    >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="flex items-center space-x-2 text-slate-400 text-xs font-medium uppercase tracking-wider">
                <CategoryIcon cat={feature.cat} />
                <span>{feature.cat}</span>
            </div>
            <StatusBadge status={feature.status} />
        </div>

        <h3 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-emerald-400 transition-colors line-clamp-1 relative z-10">
            {feature.name}
        </h3>

        <p className="text-slate-400 text-sm leading-relaxed flex-grow mb-4 line-clamp-3 relative z-10">
            {feature.desc}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800/50 relative z-10">
            <div className="flex gap-2">
                {feature.loaders?.map(loader => (
                    <span key={loader} className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-500 rounded border border-slate-700">
                        {loader}
                    </span>
                ))}
            </div>
            <button className="text-xs font-medium text-emerald-500 hover:text-emerald-400 transition-colors flex items-center gap-1">
                Details <ExternalLink className="w-3 h-3" />
            </button>
        </div>
    </motion.div>
);

const DetailModal = ({ feature, onClose }: { feature: Feature | null; onClose: () => void }) => {
    if (!feature) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-[#0F1623] border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
                >
                    <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                                <CategoryIcon cat={feature.cat} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">{feature.name}</h2>
                                <p className="text-xs text-slate-400 uppercase tracking-wider">{feature.cat} Module</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="p-6 space-y-6">
                        <div>
                            <h3 className="text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                                <Info className="w-4 h-4 text-emerald-500" /> Description
                            </h3>
                            <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                                <span className="text-xs text-slate-500 uppercase block mb-1">Status</span>
                                <StatusBadge status={feature.status} />
                            </div>
                            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                                <span className="text-xs text-slate-500 uppercase block mb-1">Version</span>
                                <span className="text-slate-200 font-mono text-sm">{feature.version || 'Latest'}</span>
                            </div>
                        </div>

                        {feature.loaders && (
                            <div>
                                <h3 className="text-sm font-semibold text-slate-300 mb-2">Supported Loaders</h3>
                                <div className="flex gap-2">
                                    {feature.loaders.map(l => (
                                        <span key={l} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-sm border border-slate-700">
                                            {l}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-6 border-t border-slate-800 bg-slate-900/30 flex justify-end gap-3">
                        <button onClick={onClose} className="px-4 py-2 text-slate-400 hover:text-white text-sm font-medium transition-colors">
                            Close
                        </button>
                        <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Install Module
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

// --- Main App ---

export default function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

    const categories = useMemo(() => {
        const cats = new Set(features.map(f => f.cat));
        return ['All', ...Array.from(cats).sort()];
    }, []);

    const filteredData = useMemo(() => {
        return features.filter(feature => {
            const matchesSearch = (feature.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                (feature.desc || '').toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = activeCategory === 'All' || feature.cat === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, activeCategory]);

    return (
        <div className="min-h-screen bg-[#0B0F17] text-slate-200 font-sans selection:bg-emerald-500/30 flex">

            {/* Sidebar */}
            <aside className="hidden lg:flex flex-col w-72 border-r border-slate-800/50 bg-[#0B0F17]/95 backdrop-blur-xl fixed inset-y-0 z-20">
                <div className="p-8 border-b border-slate-800/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                            <Box className="text-white w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="font-bold text-xl tracking-tight text-white">CobbleDash</h1>
                            <p className="text-xs text-slate-500 font-medium">v2.0.0 • Ecosystem</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 p-6 space-y-1 overflow-y-auto custom-scrollbar">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-2 flex items-center justify-between">
                        <span>Categories</span>
                        <span className="bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded text-[10px]">{categories.length - 1}</span>
                    </div>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${activeCategory === cat
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                {cat === 'All' ? <Grid className="w-4 h-4" /> : <CategoryIcon cat={cat} />}
                                <span>{cat}</span>
                            </div>
                            {cat !== 'All' && (
                                <span className={`text-[10px] px-1.5 rounded ${activeCategory === cat ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-600 group-hover:text-slate-500'}`}>
                                    {features.filter(f => f.cat === cat).length}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>

                <div className="p-6 border-t border-slate-800/50">
                    <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs font-medium text-emerald-400">System Online</span>
                        </div>
                        <p className="text-[10px] text-slate-500">
                            Connected to Cobble Verse 1.6<br />
                            {features.length} Active Modules
                        </p>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-72 p-8 lg:p-12 overflow-y-auto">
                <header className="max-w-7xl mx-auto mb-12">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">Module Dashboard</h2>
                            <p className="text-slate-400">Manage and monitor your installed Cobblemon ecosystem addons.</p>
                        </div>

                        <div className="relative w-full md:w-96 group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-3 border border-slate-800 rounded-xl leading-5 bg-slate-900/50 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 focus:bg-slate-900 transition-all"
                                placeholder="Search modules, descriptions..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <kbd className="hidden sm:inline-block border border-slate-700 rounded px-2 text-[10px] font-mono text-slate-500">CTRL K</kbd>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <div className="text-sm text-slate-500">
                            Showing <span className="text-white font-semibold">{filteredData.length}</span> modules
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                                <Filter className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    >
                        <AnimatePresence>
                            {filteredData.map(feature => (
                                <FeatureCard
                                    key={feature.id}
                                    feature={feature}
                                    onClick={setSelectedFeature}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {filteredData.length === 0 && (
                        <div className="text-center py-20">
                            <div className="bg-slate-900/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-slate-600" />
                            </div>
                            <h3 className="text-lg font-medium text-slate-300">No modules found</h3>
                            <p className="text-slate-500 mt-2">Try adjusting your search or category filter.</p>
                        </div>
                    )}
                </div>
            </main>

            {/* Modal */}
            {selectedFeature && (
                <DetailModal
                    feature={selectedFeature}
                    onClose={() => setSelectedFeature(null)}
                />
            )}
        </div>
    );
}
