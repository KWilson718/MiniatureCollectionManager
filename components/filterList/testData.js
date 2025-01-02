const data = [
    { 
        id: 1, 
        title: 'Games Workshop',
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
    { id: 2, title: 'Atomic Mass Games'},
    { id: 3, title: 'Warlord Games'},
    { id: 4, title: 'Wargames Atlantic'},
    { id: 5, title: 'Modiphius' }
];

export default data;