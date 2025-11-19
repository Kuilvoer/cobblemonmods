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

interface Feature {
    id: number;
    name: string;
    desc: string;
    cat: 'Core' | 'UI' | 'World' | 'Pokémon' | 'Items' | 'Tech' | 'Gameplay';
    status: 'Owned' | 'Missing' | 'Planned' | 'Available';
    loaders?: ('Fabric' | 'Forge' | 'NeoForge')[];
    version?: string;
}

const features: Feature[] = [
    // --- UI ---
    { "id": 1, "name": "Cobblemon Manager Dashboard", "desc": "Navigation tool, trainer calls, and info UI.", "cat": "UI", "status": "Owned", "version": "1.4.0" },
    { "id": 6, "name": "Cobblemon Interface", "desc": "Visual upgrade for the battle UI.", "cat": "UI", "status": "Owned", "version": "1.2.1" },
    { "id": 7, "name": "Minimap UI", "desc": "Displays Pokémon icons on minimaps.", "cat": "UI", "status": "Owned", "version": "1.0.5" },
    { "id": 602, "name": "Cobblepedia", "desc": "In-game physical encyclopedia book for tracking catches and items.", "cat": "UI", "status": "Available" },
    { "id": 603, "name": "Cobblemon UI Tweaks", "desc": "QoL improvements for battle UI and PC box management.", "cat": "UI", "status": "Available" },
    { "id": 604, "name": "Xaero's Cobblemon Icons", "desc": "Adds sprite-accurate Pokémon icons to Xaero's Minimap.", "cat": "UI", "status": "Available" },
    { "id": 1003, "name": "Cobblemon Move Inspector", "desc": "Allows players to view detailed stats and effects of Pokémon moves.", "cat": "UI", "status": "Available" },
    { "id": 1012, "name": "Cobblemon Battle Tracks", "desc": "Adds dynamic battle music inspired by the main series games.", "cat": "UI", "status": "Available" },
    { "id": 1014, "name": "Cobblemon Spawn Notification", "desc": "Alerts players when Rare, Shiny, or Legendary Pokémon spawn nearby.", "cat": "UI", "status": "Available" },
    { "id": 1015, "name": "Cobblemon Show Held Items", "desc": "Visually displays the item a wild Pokémon is holding.", "cat": "UI", "status": "Available" },
    { "id": 1021, "name": "WTHIT Integration", "desc": "Shows Pokémon info in the 'What The Hell Is That' tooltip.", "cat": "UI", "status": "Available" },
    { "id": 1022, "name": "JourneyMap Integration", "desc": "Adds Pokémon icons and waypoints to JourneyMap.", "cat": "UI", "status": "Available" },
    { "id": 1023, "name": "Cobblemon Pokenav", "desc": "Adds a Pokenav device for tracking spawns and checking biomes.", "cat": "UI", "status": "Available" },
    { "id": 1104, "name": "Cobblemon IVs", "desc": "Adds IV viewing and tracking features.", "cat": "UI", "status": "Available" },

    // --- World ---
    { "id": 2, "name": "Cobblebase", "desc": "Cooking system with berries and crops.", "cat": "World", "status": "Owned", "version": "2.0.1" },
    { "id": 8, "name": "Classic Grass Pack", "desc": "Visual overhaul for grass textures to match classic styles.", "cat": "World", "status": "Owned" },
    { "id": 701, "name": "CobbleTowns", "desc": "Procedurally generated Pokémon-style towns with functional Centers and Marts.", "cat": "World", "status": "Available" },
    { "id": 702, "name": "Cobbled Stops", "desc": "Generates loot kiosks in the wild, inspired by Pokémon GO stops.", "cat": "World", "status": "Available" },
    { "id": 1016, "name": "Cobblemon Extra Structures", "desc": "Adds new world structures like Gyms and Centers ported from handheld games.", "cat": "World", "status": "Available" },
    { "id": 1024, "name": "Brocraft Cobblemon Additions", "desc": "Replaces vanilla villages with Pokémon-themed towns.", "cat": "World", "status": "Available" },
    { "id": 1025, "name": "Radical Cobblemon Structures", "desc": "Adds challenging dungeons and towers to the world generation.", "cat": "World", "status": "Available" },
    { "id": 1026, "name": "Road Architect", "desc": "Helper mod for building realistic roads between towns.", "cat": "World", "status": "Available" },
    { "id": 1027, "name": "Terralith", "desc": "Overhauls world generation with stunning new biomes (compatible with Cobblemon).", "cat": "World", "status": "Available" },
    { "id": 1028, "name": "CobbleFurnies", "desc": "Adds Pokémon-themed furniture and decorations.", "cat": "World", "status": "Available" },
    { "id": 1029, "name": "Cobblemon Legendary Structures", "desc": "Spawns specific structures for Legendary encounters (e.g., Zapdos Power Plant).", "cat": "World", "status": "Available" },
    { "id": 1030, "name": "Cobblemon Legendary Monuments", "desc": "Adds large-scale monuments for summoning mythical Pokémon.", "cat": "World", "status": "Available" },
    { "id": 1103, "name": "Legendary Structures", "desc": "Adds structures for legendary Pokémon spawns.", "cat": "World", "status": "Available" },

    // --- Pokémon ---
    { "id": 3, "name": "Fully Hisuian Starters", "desc": "Adds Hisuian starter Pokémon to the game.", "cat": "Pokémon", "status": "Owned" },
    { "id": 13, "name": "LuminymMods", "desc": "Texture pack add-on for Pokémon variations.", "cat": "Pokémon", "status": "Owned" },
    { "id": 801, "name": "All The Mons", "desc": "Massive datapack adding hundreds of Pokémon not yet in the core mod.", "cat": "Pokémon", "status": "Available" },
    { "id": 802, "name": "Cobblemon Radiants", "desc": "Adds a new 'Radiant' rarity tier above Shiny with unique palettes.", "cat": "Pokémon", "status": "Available" },
    { "id": 1007, "name": "Extra Eeveelutions", "desc": "Introduces new evolutionary forms for Eevee beyond the standard set.", "cat": "Pokémon", "status": "Available" },
    { "id": 1008, "name": "Twilight Forest Forms", "desc": "Integrates Cobblemon with Twilight Forest, adding themed forms.", "cat": "Pokémon", "status": "Available" },
    { "id": 1009, "name": "Laser's Fakemon Pack", "desc": "Adds high-quality custom Fakemon and regional variants.", "cat": "Pokémon", "status": "Available" },
    { "id": 1010, "name": "Livelier Pokémon", "desc": "Overhauls animations to make Pokémon movement more dynamic and realistic.", "cat": "Pokémon", "status": "Available" },
    { "id": 1011, "name": "CobbleMotion", "desc": "Adds idle animations to battle poses for static models.", "cat": "Pokémon", "status": "Available" },
    { "id": 1031, "name": "Mystic Mons", "desc": "Adds a collection of mystical and fantasy-themed Pokémon.", "cat": "Pokémon", "status": "Available" },
    { "id": 1032, "name": "MissingMons", "desc": "Fills in the gaps of missing Pokémon from the national dex.", "cat": "Pokémon", "status": "Available" },
    { "id": 1033, "name": "GenoMons", "desc": "Adds genetically modified or 'clone' Pokémon variants.", "cat": "Pokémon", "status": "Available" },
    { "id": 1034, "name": "Rotom Appliances", "desc": "Adds all Rotom forms with functional appliances.", "cat": "Pokémon", "status": "Available" },
    { "id": 1035, "name": "Cobblemon Fusiomon", "desc": "Allows fusing specific Pokémon to create new hybrids.", "cat": "Pokémon", "status": "Available" },
    { "id": 1036, "name": "Poké Costume", "desc": "Adds costumed variants of popular Pokémon (e.g., Pikachu Libre).", "cat": "Pokémon", "status": "Available" },
    { "id": 1037, "name": "Dyable Starters", "desc": "Allows players to dye their starter Pokémon different colors.", "cat": "Pokémon", "status": "Available" },

    // --- Items ---
    { "id": 4, "name": "Cobbledex", "desc": "Search system for trading and item lookup.", "cat": "Items", "status": "Owned" },
    { "id": 5, "name": "Badges & Badges", "desc": "Physical badges and storage boxes for items.", "cat": "Items", "status": "Owned" },
    { "id": 11, "name": "Cobblemon Box Link", "desc": "Access PC boxes directly from your inventory.", "cat": "Items", "status": "Owned" },
    { "id": 14, "name": "3D Poke Rods", "desc": "3D models for fishing rods.", "cat": "Items", "status": "Owned" },
    { "id": 15, "name": "Only Bottle Caps", "desc": "Adds Bottle Caps for IV training.", "cat": "Items", "status": "Owned" },
    { "id": 1002, "name": "Simple TMs", "desc": "Implements Technical Machines (TMs) and TRs for teaching moves.", "cat": "Items", "status": "Available" },
    { "id": 1006, "name": "Cobblemon Armors", "desc": "Adds Pokémon-themed armor sets with unique effects.", "cat": "Items", "status": "Available" },
    { "id": 1013, "name": "Cobble Hats", "desc": "Cosmetic mod adding wearable Pokémon hats for players.", "cat": "Items", "status": "Available" },
    { "id": 1038, "name": "Cobblemon Repel", "desc": "Adds functional Repels to prevent wild spawns.", "cat": "Items", "status": "Available" },
    { "id": 1039, "name": "Berry Pouch", "desc": "A bag to store all your berries in one inventory slot.", "cat": "Items", "status": "Available" },
    { "id": 1040, "name": "Cobblemon Loot Balls", "desc": "Adds Pokéball loot chests found in the wild.", "cat": "Items", "status": "Available" },
    { "id": 1041, "name": "Cobblemon Utility+", "desc": "Adds utility items like IV checkers and candy bags.", "cat": "Items", "status": "Available" },

    // --- Gameplay ---
    { "id": 201, "name": "Cobbreeding", "desc": "Physical, block-based breeding system with Pasture Blocks.", "cat": "Gameplay", "status": "Available" },
    { "id": 301, "name": "Cobblemon Ride On", "desc": "Advanced mounting system with stat-dependent physics.", "cat": "Gameplay", "status": "Available" },
    { "id": 302, "name": "Cobblemon Rider", "desc": "Simplified mounting system, highly compatible with datapacks.", "cat": "Gameplay", "status": "Available" },
    { "id": 401, "name": "Fight or Flight", "desc": "Advanced AI: wild Pokémon can be aggressive or skittish.", "cat": "Gameplay", "status": "Available" },
    { "id": 402, "name": "Radical Cobblemon Trainers", "desc": "Hardcore NPC trainers with level caps and competitive teams.", "cat": "Gameplay", "status": "Available" },
    { "id": 403, "name": "Cobblemon Mega Showdown", "desc": "Implements Mega Evolution, Z-Moves, and Terastallization.", "cat": "Gameplay", "status": "Available" },
    { "id": 404, "name": "Ascension Megamons", "desc": "Original Mega Evolution mod. Good animations but slower updates.", "cat": "Gameplay", "status": "Available" },
    { "id": 803, "name": "Cobblemon Mass Outbreaks", "desc": "Simulates Legends: Arceus style mass swarms.", "cat": "Gameplay", "status": "Available" },
    { "id": 901, "name": "Cobblemon Unchained", "desc": "Adds chaining mechanics for hunting shinies and high IVs.", "cat": "Gameplay", "status": "Available" },
    { "id": 903, "name": "Cobbled Gacha", "desc": "Gacha machine system for obtaining Pokémon using currency.", "cat": "Gameplay", "status": "Available" },
    { "id": 1001, "name": "Cobblemon Capture XP", "desc": "Grants experience to party Pokémon upon capturing a wild Pokémon.", "cat": "Gameplay", "status": "Available" },
    { "id": 1004, "name": "Myths and Legends", "desc": "Adds key items and spawning conditions for Legendary encounters.", "cat": "Gameplay", "status": "Available" },
    { "id": 1005, "name": "Cobble Dollars", "desc": "Economy system where battling earns currency.", "cat": "Gameplay", "status": "Available" },
    { "id": 1017, "name": "Cobblemon Alpha Project", "desc": "Introduces Alpha Pokémon and Alpha Dens to the overworld.", "cat": "Gameplay", "status": "Available" },
    { "id": 1018, "name": "Cobblemon Parting Gifts", "desc": "Drops loot/rewards when defeating wild Pokémon.", "cat": "Gameplay", "status": "Available" },
    { "id": 1019, "name": "Cobblemon DexRewards", "desc": "Grants rewards for reaching Pokédex completion milestones.", "cat": "Gameplay", "status": "Available" },
    { "id": 1042, "name": "Cobblemon Raid Dens", "desc": "Adds Sword/Shield style Raid Dens for cooperative battles.", "cat": "Gameplay", "status": "Available" },
    { "id": 1043, "name": "Cobblemon Autobattle", "desc": "Allows your Pokémon to automatically fight nearby wild Pokémon.", "cat": "Gameplay", "status": "Available" },
    { "id": 1044, "name": "Cobblemon Challenge", "desc": "Adds daily and weekly challenges for rewards.", "cat": "Gameplay", "status": "Available" },
    { "id": 1045, "name": "Cobble Contests", "desc": "Implements Pokémon Contests with judging and ribbons.", "cat": "Gameplay", "status": "Available" },
    { "id": 1046, "name": "Daycare+", "desc": "Enhanced daycare system for leveling and breeding.", "cat": "Gameplay", "status": "Available" },
    { "id": 1047, "name": "Z-A Megas Early", "desc": "Early access to Mega Evolutions from Legends: Z-A.", "cat": "Gameplay", "status": "Available" },
    { "id": 1101, "name": "Daycare+", "desc": "Enhanced daycare system for leveling and breeding.", "cat": "Gameplay", "status": "Available" },
    { "id": 1102, "name": "Standard Cobblemon Trainers", "desc": "Adds standard NPC trainers to the world.", "cat": "Gameplay", "status": "Available" },

    // --- Core ---
    { "id": 9, "name": "Capture XP", "desc": "XP for capturing Pokémon.", "cat": "Core", "status": "Owned" },
    { "id": 10, "name": "Player XP", "desc": "Leveling system for the player.", "cat": "Core", "status": "Owned" },
    { "id": 12, "name": "Safe Pastures", "desc": "Prevents permanent damage (drowning/fall damage).", "cat": "Core", "status": "Owned" },

    // --- Tech ---
    { "id": 101, "name": "Kotlin for Forge/Fabric", "desc": "Essential language adapter library.", "cat": "Tech", "status": "Available" },
    { "id": 102, "name": "Cobblemon Tim Core", "desc": "Standardized library for hitboxes and animations.", "cat": "Tech", "status": "Available" },
    { "id": 902, "name": "Cobblemon Counter", "desc": "Tracks KOs, captures, and streaks.", "cat": "Tech", "status": "Available" },
    { "id": 1020, "name": "Cobblemon Size-Changer", "desc": "Tech mod allowing server admins to resize Pokémon.", "cat": "Tech", "status": "Available" },
    { "id": 1048, "name": "Cobblemon Integration", "desc": "Provides compatibility with JEI, Jade, and other tech mods.", "cat": "Tech", "status": "Available" },
    { "id": 1049, "name": "Cobblemon Extras", "desc": "Adds useful commands like /poketrade and /pokeshout.", "cat": "Tech", "status": "Available" },
    { "id": 1050, "name": "ServerCore", "desc": "Optimizes server performance and tick rates.", "cat": "Tech", "status": "Available" },
    { "id": 1051, "name": "Lithium", "desc": "General purpose optimization mod.", "cat": "Tech", "status": "Available" },
    { "id": 1052, "name": "FerriteCore", "desc": "Memory usage optimization.", "cat": "Tech", "status": "Available" },
    { "id": 501, "name": "Create: Cobblemon Industrialized", "desc": "Integrates Cobblemon with Create mod. Automate Pokéball production and healing.", "cat": "Tech", "status": "Available" },
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
