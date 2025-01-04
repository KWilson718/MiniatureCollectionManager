const data = [
    { 
        id: 1, 
        title: 'Games Workshop',
        description: 'The Pinnacle of Wargame Miniatures',
        games: [
            {
                title: 'Warhammer 40k',
                factions: [
                    {
                        factionID: 1,
                        title: 'Space Marines',
                        description: 'Genetically Modified Super Soldiers of the Imperium'
                    },
                    {
                        factionID: 2,
                        title: 'Orks',
                        description: 'A Mass Horde of Space Orks which grow as a fungal infestation of a world'
                    }
                ]
            },
            {
                title: 'Warhammer Age of Sigmar',
                factions: [
                    {
                        factionID: 3,
                        title: 'Orruk Warclans',
                    },
                    {
                        factionID: 4,
                        title: 'Stormcast Eternals'
                    },
                    {
                        factionID: 5,
                        title: 'Gloomspite Gitz'
                    }
                ]
            }
        ]
    },
    { id: 2, title: 'Atomic Mass Games', description: 'Popular for Wargames Set in IPs like Marvel & Star Wars'},
    { id: 3, title: 'Warlord Games', description: 'Well known for Historical Wargames like Bolt Action'},
    { id: 4, title: 'Wargames Atlantic', description: 'Popular for various budget friendly mass troop boxes'},
    { id: 5, title: 'Modiphius', description: 'Known for IP based games in the Fallout & Dune worlds'}
];

export default data;