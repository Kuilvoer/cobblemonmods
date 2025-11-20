export interface Feature {
    id: number;
    name: string;
    desc: string;
    cat: 'Core' | 'UI' | 'World' | 'Pokémon' | 'Items' | 'Tech' | 'Gameplay';
    status: 'Owned' | 'Missing' | 'Planned' | 'Available';
    loaders?: ('Fabric' | 'Forge' | 'NeoForge')[];
    version?: string;
    author?: string;
}

export const features: Feature[] = [
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
