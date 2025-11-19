export interface Feature {
    id: number;
    name: string;
    desc: string;
    cat: 'Core' | 'UI' | 'World' | 'Pokémon' | 'Items' | 'Tech' | 'Gameplay';
    status: 'Owned' | 'Missing' | 'Planned' | 'Available';
    loaders?: ('Fabric' | 'Forge' | 'NeoForge')[];
    author?: string;
}

export const features: Feature[] = [
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
    // Tech / Core
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

    // Breeding
    {
        "id": 201,
        "name": "Cobbreeding",
        "desc": "Physical, block-based breeding system with Pasture Blocks. Supports IV/Nature inheritance.",
        "cat": "Gameplay",
        "status": "Available",
        "loaders": ["Fabric", "Forge"]
    },

    // Mobility
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

    // Combat & AI
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
        "cat": "Gameplay",
        "status": "Available"
    },
    {
        "id": 404,
        "name": "Ascension Megamons",
        "desc": "Original Mega Evolution mod. Good animations but slower updates.",
        "cat": "Gameplay",
        "status": "Available",
        "loaders": ["Fabric"]
    },

    // Industry / Tech
    {
        "id": 501,
        "name": "Create: Cobblemon Industrialized",
        "desc": "Automated manufacturing of Pokéballs and items using Create mod mechanics.",
        "cat": "Tech",
        "status": "Available"
    },
    {
        "id": 502,
        "name": "Cobblemon Create Industries",
        "desc": "Adds industrial production and elemental armor sets (e.g., Water Stone boots).",
        "cat": "Tech",
        "status": "Available"
    },

    // UI / Info
    {
        "id": 601,
        "name": "Cobblemon Integrations",
        "desc": "JEI/Jade integration for viewing drops, egg groups, and friendship status.",
        "cat": "UI",
        "status": "Available"
    },
    {
        "id": 602,
        "name": "Cobblepedia",
        "desc": "In-game physical encyclopedia book for tracking catches and items.",
        "cat": "UI",
        "status": "Available"
    },
    {
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

    // World
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

    // Content / Spawns
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

    // Gameplay / Utility
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
    }
];
