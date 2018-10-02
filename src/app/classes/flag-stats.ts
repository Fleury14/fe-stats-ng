export class FlagStats {
    public flags = {
        keyList: [ 'J', 'K', 'C', 'P', 'T', 'S', 'B', 'F', 'N', 'E', '$', 'X', 'Y', 'G', 'W', 'Z'],
        J: {
            0: 0,
            1: 0,
            2: 0,
            count: 0,
            description: 'Allowance of items/commands found in the Japanese version of FFIV. 0: None. 1: Items only. 2: Items and commands.'
        },
        K: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            count: 0,
            description: 'Locations of key items. 0: Vanilla locations. 1: Vanilla locations but shuffled. 2: Possible locations adds Lunar Bosses and Summon Bosses. 3: Possible locations include all trapped chests. 4: Same as K3 only you may be forced to go to the moon to get underground access.'
        },
        C: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            count: 0,
            description: 'Handling of character locations. 0: Vanilla locations. 1: All characters shuffled, with Edge/FuSoYa weighted to be in slightly tougher locations, with every character available somewhere. 2: Same as C1 with no weight. 3: Only 5 characters available.'
        },
        P: {
            0: 0,
            1: 0,
            2: 0,
            count: 0,
            description: 'Handles the location of the Pass, which now acts as a free warp to Zeromus. 0: Found in a shop. 1: Mixed in with key items. 2: Placed in 3 random non-lunar chests.'
        },
        T: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            count: 0,
            description: 'Content of treasure chests. 0: Vanilla. 1: Shuffled with location bias. 2: Randomized, with location bias. 3: Randomized with no bias. 4: Completely randomized, may contain anything. 5: All non-trapped chests are empty. (NOTE: In C2-C3, trapped chests pull from a stronger item pool than untrapped)'
        },
        S: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            count: 0,
            description: 'Content of Shops. 0: Vanilla 1: Shuffled with location bias. 2: Randomized with location bias. 3: Randomized with no bias, excluding highest-level items. 4: Shops may contain anything. 5: Shops only contain cabins.'
        },
        B: {
            0: 0,
            1: 0,
            2: 0,
            count: 0,
            description: 'How bosses are handled. 0: Vanilla locations. 1: Bosses are shuffled retaining the stats of the location it is at. Some bosses will not block underground access. 2: Any boss can be anywhere.'
        },
        F: {
            0: 0,
            1: 0,
            2: 0,
            count: 0,
            description: 'FuSoYa. 0: He starts at level 50 with all spells and HP. 1: Starts with 900HP and some spells, gets all his spells and HP by completing Mt. Ordeals. 2: Starts with 500HP and random low-level spells. Gains 100HP and 3 random spells after defeating any boss.'
        },
        N: {
            0: 0,
            1: 0,
            2: 0,
            count: 0,
            description: 'No Free Lunch 0: No changes 1: None of the free character locations are available. Edward does not give you a key item in Toroia. Rydias mom gives you a key item in Mist Village after defeating the Mist Dragon. 2: All bosses have the boss bit. Alternate win conditions on D.Knight, Karate, K/Q Eblan and WaterHag are removed.' 
        },
        E: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            count: 0,
            description: "Random encounters: 0: Vanilla. 1: Reduces encounter rate. 60% of trapdoors are disabled. Individual Behemoth encounters in Bahamut's lair have a 50% chance of being disabled. 2: Same as E1, but all aforementioned trapdoors and Behemoths are disabled. 3: Encounters (and trapdoor fights) are toggleable from the in-game Custom menu. 4: All random encounters are disabled."
        },
        $: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            count: 0,
            description: 'Money modifier. 0: No changes. 1: Chests with weak items contain GP instead. Chests with weak and moderate items now contain GP instead. 3: All items in shops are free.'
        },
        X: {
            0: 0,
            1: 0,
            2: 0,
            count: 0,
            description: "Experience modifier. 0: No changes. 1: XP is not divided amongst party members; each surviving character recieves the full amount. 2: Same as X1, in addition after collecting 10 key items, XP is gained is doubled. In full parties, characters with relatively low levels will recieve XP bonuses in order to 'slingshot' them up to the partys level quickly."
        },
        Y: {
            0: 0,
            1: 0,
            2: 0,
            count: 0,
            description: 'Turbo. 0: Hold Y to dash. 1: In addition to Y0, battle speed and battle message speed default to 1. 2: Same as Y1 except dashing is automatic, hold Y to walk.'
        },
        G: {
            0: 0,
            1: 0,
            count: 0,
            description: "'Glitchless' 0: All glitches enabled. 1: Disabled item duplication, MP underflow, and warping from the Dwarf Castle into the crystal room after the boss fights no longer gets you the Sealed cave reward."
        },
        W: {
            0: 0,
            1: 0,
            2: 0,
            count: 0,
            description: 'Wyvern Behavior. 0: Vanilla. 1: Opening MegaNuke is disabled. 2: Opening MegaNuke is replaced with a different random command.'
        },
        Z: {
            0: 0,
            1: 0,
            count: 0,
            description: 'Zeromus sprite: 0: Uses Vanilla true-form sprite. Is also akin to commiting heresy. 1: Replaces the Zeromus true-form sprite with a random sprite. Does not effect the boss behavior at all.'
        },
    }
}