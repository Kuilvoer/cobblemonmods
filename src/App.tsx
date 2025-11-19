import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Grid,
    Menu,
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
    Settings
} from 'lucide-react';

// --- Data ---

interface Feature {
    id: number;
    name: string;
    desc: string;
    cat: 'Core' | 'UI' | 'World' | 'Pokémon' | 'Items' | 'Tech' | 'Gameplay';
    status: 'Owned' | 'Missing' | 'Planned' | 'Available';
    loaders?: ('Fabric' | 'Forge' | 'NeoForge')[];
    author?: string;
}

const features: Feature[] = [
    // Original Data
    { "id": 1, "name": "Cobblemon Manager Dashboard", "desc": "Navigatietool, trainer calls, info UI", "cat": "UI", "status": "Owned" },
    { "id": 2, "name": "Cobblebase", "desc": "Koken met bessen en gewassen.", "cat": "World", "status": "Owned" },
    { "id": 3, "name": "Fully Hisuian Starters", "desc": "Voegt Hisuian starter Pokémon toe.", "cat": "Pokémon", "status": "Owned" },
    { "id": 4, "name": "Cobbledex", "desc": "Zoeksysteem voor ruilen.", "cat": "Items", "status": "Owned" },
    { "id": 5, "name": "Badges & Badges", "desc": "Fysieke badges en opslagbox voor items.", "cat": "Items", "status": "Owned" },
    { "id": 6, "name": "Cobblemon Interface", "desc": "Battle UI visuele upgrade.", "cat": "UI", "status": "Owned" },
    { "id": 7, "name": "Minimap UI", "desc": "Pokémon iconen op minimaps.", "cat": "UI", "status": "Owned" },
    { "id": 8, "name": "Classic Grass Pack", "desc": "Visuele overhaul voor gras texturen.", "cat": "World", "status": "Owned" },
    { "id": 9, "name": "Capture XP", "desc": "XP voor het vangen van Pokémon.", "cat": "Core", "status": "Owned" },
    { "id": 10, "name": "Player XP", "desc": "Leveling systeem voor de speler.", "cat": "Core", "status": "Owned" },
    { "id": 11, "name": "Cobblemon Box Link", "desc": "Toegang tot de PC box vanuit inventaris.", "cat": "Items", "status": "Owned" },
    { "id": 12, "name": "Safe Pastures", "desc": "Voorkomt blijvende schade (verdrinken/valschade).", "cat": "Core", "status": "Owned" },
    { "id": 13, "name": "LuminymMods", "desc": "Textuurpakket add-on voor variaties.", "cat": "Pokémon", "status": "Owned" },
    { "id": 14, "name": "3D Poke Rods", "desc": "3D modellen voor hengels.", "cat": "Items", "status": "Owned" },
    { "id": 15, "name": "Only Bottle Caps", "desc": "Voegt Bottle Caps toe voor IV training.", "cat": "Items", "status": "Owned" },

    // Extracted from Analysis Document
    {
        "id": 101,
        "name": "Kotlin for Forge/Fabric",
        "desc": "Essential language adapter library required for many Cobblemon addons.",
        "cat": "Tech",
        "status": "Available",
        "loaders": ["Fabric", "Forge"]
    },
    {
        "id": 102,
        "name": "Cobblemon Tim Core",
        "desc": "Standardized library for hitboxes, animations, and data tracking. Required for Unchained/Counter.",
        "cat": "Tech",
        "status": "Available",
        "loaders": ["Fabric", "Forge"]
    },
    {
        "id": 201,
        "name": "Cobbreeding",
        "desc": "Physical, block-based breeding system with Pasture Blocks. Supports IV/Nature inheritance.",
        "cat": "Gameplay",
        "status": "Available",
        "loaders": ["Fabric", "Forge"]
    },
    {
        "id": 301,
        "name": "Cobblemon Ride On",
        "desc": "Advanced mounting system with stat-dependent physics (Speed IVs affect movement).",
        "cat": "Gameplay",
        "status": "Available",
        "loaders": ["Fabric", "Forge"]
    },
    {
        "id": 302,
        "name": "Cobblemon Rider",
        "desc": "Simplified mounting system, highly compatible with datapack Pokémon.",
        "cat": "Gameplay",
        "status": "Available"
    },
    {
        "id": 401,
        "name": "Fight or Flight",
        "desc": "Advanced AI that makes wild Pokémon aggressive or skittish. Adds real-time danger.",
        "cat": "Gameplay",
        "status": "Available"
    },
    {
        "id": 402,
        "name": "Radical Cobblemon Trainers",
        "desc": "Hardcore NPC trainers with level caps, competitive teams, and biome-specific spawns.",
        "cat": "Gameplay",
        "status": "Available"
    },
    {
        "id": 403,
        "name": "Cobblemon Mega Showdown",
        "desc": "Implements Mega Evolution, Z-Moves, and Terastallization with Geode mining mechanics.",
        "id": 603,
        "name": "Cobblemon UI Tweaks",
        "desc": "QoL improvements for battle UI and PC box management.",
        "cat": "UI",
        "status": "Available"
    },
    {
        "id": 604,
        "name": "Xaero's Cobblemon Icons",
        "desc": "Adds sprite-accurate Pokémon icons to Xaero's Minimap.",
        "cat": "UI",
        "status": "Available"
    },
    {
        "id": 701,
        "name": "CobbleTowns",
        "desc": "Procedurally generated Pokémon-style towns with functional Centers and Marts.",
        "cat": "World",
        "status": "Available"
    },
    {
        "id": 702,
        "name": "Cobbled Stops",
        "desc": "Generates loot kiosks in the wild, inspired by Pokémon GO stops.",
        "cat": "World",
        "status": "Available"
    },
    {
        "id": 801,
        "name": "All The Mons",
        "desc": "Massive datapack adding hundreds of Pokémon not yet in the core mod.",
        "cat": "Pokémon",
        "status": "Available"
    },
    {
        "id": 802,
        "name": "Cobblemon Radiants",
        "desc": "Adds a new 'Radiant' rarity tier above Shiny with unique palettes.",
        "cat": "Pokémon",
        "status": "Available"
    },
    {
        "id": 803,
        "name": "Cobblemon Mass Outbreaks",
        "desc": "Simulates Legends: Arceus style mass swarms with increased shiny rates.",
        "cat": "Gameplay",
        "status": "Available"
    },
    {
        "id": 901,
        "name": "Cobblemon Unchained",
        "desc": "Adds chaining mechanics (Pokeradar style) for hunting shinies and high IVs.",
        "cat": "Gameplay",
        "status": "Available"
    },
    {
        "id": 902,
        "name": "Cobblemon Counter",
        "desc": "Tracks KOs, captures, and streaks. Essential for Unchained.",
        "cat": "Tech",
        "status": "Available"
    },
    {
        "id": 903,
        "name": "Cobbled Gacha",
        "desc": "Gacha machine system for obtaining Pokémon using in-game currency.",
        "cat": "Gameplay",
        "status": "Available"
    },

    // Expanded Mod List (Web Search Results)
    {
        "id": 1001,
        "name": "Cobblemon Capture XP",
        "desc": "Grants experience to party Pokémon upon capturing a wild Pokémon.",
        "cat": "Gameplay",
        "status": "Available"
    },
    {
        "id": 1002,
        "name": "Simple TMs",
        "desc": "Implements Technical Machines (TMs) and TRs for teaching moves.",
        "cat": "Items",
        "status": "Available"
    },
    {
        "id": 1003,
        "name": "Cobblemon Move Inspector",
        "desc": "Allows players to view detailed stats and effects of Pokémon moves.",
        "cat": "UI",
        "status": "Available"
    },
    {
        "id": 1004,
        "name": "Myths and Legends",
        "desc": "Adds key items and spawning conditions for Legendary and Mythical encounters.",
        "cat": "Gameplay",
        "status": "Available"
    },
    {
        "id": 1005,
        "name": "Cobble Dollars",
        "desc": "Economy system where battling earns currency to buy items from villagers.",
        "cat": "Gameplay",
        "status": "Available"
    },
    {
        "id": 1006,
        "name": "Cobblemon Armors",
        "desc": "Adds Pokémon-themed armor sets with unique effects.",
        "cat": "Items",
        "status": "Available"
    },
    {
        "id": 1007,
        "name": "Extra Eeveelutions",
        "desc": "Introduces new evolutionary forms for Eevee beyond the standard set.",
        "cat": "Pokémon",
        "status": "Available"
    },
    {
        "id": 1008,
        "name": "Twilight Forest Forms",
        "desc": "Integrates Cobblemon with Twilight Forest, adding themed forms.",
        "cat": "Pokémon",
        "status": "Available"
    },
    {
        "id": 1009,
        "name": "Laser's Fakemon Pack",
        "desc": "Adds high-quality custom Fakemon and regional variants.",
        "cat": "Pokémon",
        "status": "Available"
    },
    {
        "id": 1010,
        "name": "Livelier Pokémon",
        "desc": "Overhauls animations to make Pokémon movement more dynamic and realistic.",
        "cat": "Pokémon",
        "status": "Available"
    },
    {
        "id": 1011,
        "name": "CobbleMotion",
        "desc": "Adds idle animations to battle poses for static models.",
        "cat": "Pokémon",
        "status": "Available"
    },
    {
        "id": 1012,
        "name": "Cobblemon Battle Tracks",
        "desc": "Adds dynamic battle music inspired by the main series games.",
        "cat": "UI",
        "status": "Available"
    },
    {
        "id": 1013,
        "name": "Cobble Hats",
        "desc": "Cosmetic mod adding wearable Pokémon hats for players.",
        "cat": "Items",
        "status": "Available"
    },
    {
        "id": 1014,
        "name": "Cobblemon Spawn Notification",
        "desc": "Alerts players when Rare, Shiny, or Legendary Pokémon spawn nearby.",
        "cat": "UI",
        "status": "Available"
    },
    {
        "id": 1015,
        "name": "Cobblemon Show Held Items",
        "desc": "Visually displays the item a wild Pokémon is holding.",
        "cat": "UI",
        "status": "Available"
    },
    {
        "id": 1016,
        "name": "Cobblemon Extra Structures",
        "desc": "Adds new world structures like Gyms and Centers ported from handheld games.",
        "cat": "World",
        "status": "Available"
    },
    {
        "id": 1017,
        "name": "Cobblemon Alpha Project",
        "desc": "Introduces Alpha Pokémon and Alpha Dens to the overworld.",
        "cat": "Gameplay",
        "status": "Available"
    },
    {
        "id": 1018,
        "name": "Cobblemon Parting Gifts",
        "desc": "Drops loot/rewards when defeating wild Pokémon.",
        "cat": "Gameplay",
        "status": "Available"
    },
    {
        "id": 1019,
        "name": "Cobblemon DexRewards",
        "desc": "Grants rewards for reaching Pokédex completion milestones.",
        "cat": "Gameplay",
        "status": "Available"
    },
    {
        "id": 1020,
        "name": "Cobblemon Size-Changer",
        "desc": "Tech mod allowing server admins to resize Pokémon entities.",
        "cat": "Tech",
        "status": "Available"
    }
];

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

const FeatureCard = ({ feature }: { feature: Feature }) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="group relative bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-5 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 flex flex-col h-full"
    >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

        <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-2 text-slate-400 text-xs font-medium uppercase tracking-wider">
                <CategoryIcon cat={feature.cat} />
                <span>{feature.cat}</span>
            </div>
            <StatusBadge status={feature.status} />
        </div>

        <h3 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-emerald-400 transition-colors line-clamp-1">
            {feature.name}
        </h3>

        <p className="text-slate-400 text-sm leading-relaxed flex-grow mb-4 line-clamp-3">
            {feature.desc}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800/50">
            <div className="flex gap-2">
                {feature.loaders?.map(loader => (
                    <span key={loader} className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-500 rounded border border-slate-700">
                        {loader}
                    </span>
                ))}
            </div>
            <button className="text-xs font-medium text-emerald-500 hover:text-emerald-400 transition-colors">
                Details &rarr;
            </button>
        </div>
    </motion.div>
);

// --- Main App ---

export default function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const categories = useMemo(() => {
        const cats = new Set(features.map(f => f.cat));
        return ['All', ...Array.from(cats)];
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

            {/* Sidebar (Desktop) */}
            <aside className="hidden lg:flex flex-col w-64 border-r border-slate-800/50 bg-[#0B0F17]/50 backdrop-blur-xl fixed inset-y-0 z-20">
                <div className="p-6 border-b border-slate-800/50">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
                            <Box className="text-white w-5 h-5" />
                        </div>
                        <h1 className="font-bold text-lg tracking-tight text-slate-100">CFMD</h1>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Categories</div>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeCategory === cat
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                                }`}
                        >
                            {cat === 'All' ? <Grid className="w-4 h-4" /> : <CategoryIcon cat={cat} />}
                            {cat}
                            <span className="ml-auto text-xs opacity-50">
                                {cat === 'All' ? features.length : features.filter(f => f.cat === cat).length}
                            </span>
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-800/50">
                    <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
                        <h4 className="text-xs font-semibold text-slate-300 mb-1">System Status</h4>
                        <div className="flex items-center gap-2 text-xs text-emerald-400">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            Online & Synced
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-64 min-h-screen relative">
                {/* Mobile Header */}
                <div className="lg:hidden sticky top-0 z-30 bg-[#0B0F17]/80 backdrop-blur-md border-b border-slate-800/50 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                            <Box className="text-white w-5 h-5" />
                        </div>
                        <span className="font-bold text-slate-100">CFMD</span>
                    </div>
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-400 hover:text-white">
                        {isSidebarOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isSidebarOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            className="lg:hidden fixed inset-0 z-20 bg-[#0B0F17] pt-20 px-4"
                        >
                            <div className="space-y-2">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => { setActiveCategory(cat); setIsSidebarOpen(false); }}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium ${activeCategory === cat ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                    {/* Top Bar */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">Dashboard</h2>
                            <p className="text-slate-400">Manage your Cobblemon ecosystem modules.</p>
                        </div>

                        <div className="relative w-full md:w-96 group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all shadow-sm"
                                placeholder="Search modules..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <div className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-500 border border-slate-700">Ctrl K</div>
                            </div>
                        </div>
                    </div>

                    {/* Grid */}
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    >
                        <AnimatePresence mode='popLayout'>
                            {filteredData.map(feature => (
                                <FeatureCard key={feature.id} feature={feature} />
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {/* Empty State */}
                    {filteredData.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-6 border border-slate-800">
                                <Search className="w-8 h-8 text-slate-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-300 mb-2">No modules found</h3>
                            <p className="text-slate-500 max-w-md">
                                We couldn't find any modules matching "{searchTerm}" in the {activeCategory} category.
                            </p>
                            <button
                                onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                                className="mt-6 px-6 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
