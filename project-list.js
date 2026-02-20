const projects = [
    {
        id: 1,
        folder: "prj_001",
        title: "Router Cabinet",
        shortDesc: "Custom wooden cabinet designed to elegantly hide networking equipment.",
        icon: "📦",
        image: "1.jpg", // optional: main image for the project
        tags: ["Woodworking", "Home-Improvement", "CAD"],
        // optional: add images array when you want gallery slides
        // filenames only -> files are located at projects/prj_001/files/{filename}
        gallery: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"]
    },
    {
        id: 2,
        folder: "prj_002",
        title: "Q-tip and Cotton Pad Holders",
        shortDesc: "Custom laser cut storage solutions for bathroom organization.",
        image: "1.jpg", // optional: main image for the project
        tags: ["Woodworking", "Laser-CNC", "Home-Improvement", "CAD"],
        gallery: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"]
    },
    {
        id: 3,
        folder: "prj_003",
        title: "Key Hanger",
        shortDesc: "Wall-mounted wooden key organizer with rustic design.",
        image: "1.jpg", // optional: main image for the project
        tags: ["Woodworking", "Home-Improvement"],
        gallery: ["1.jpg"]
    },
    {
        id: 4,
        folder: "prj_004",
        title: "Lithuanian bots Controller",
        shortDesc: "Custom designed PCB for controlling mini sumo robots.",
        image: "3.png", // optional: main image for the project
        tags: ["Electronics", "Toys", "PCB-Design"],
        gallery: ["1.jpg", "2.jpg", "3.png", "4.png", "5.jpg"],
        imageText: [1, "PCB design for mini sumo robot competition."] // optional: text to show with each gallery image
    },
    {
        id: 5,
        folder: "prj_005",
        title: "Kitchen remodeling",
        shortDesc: "A complete kitchen refresh using fitted, store-bought cabinets for an efficient layout, plumbing, painting.",
        image: "1.jpg", // optional: main image for the project
        tags: ["Home-Improvement", "Woodworking"],
        gallery: ["1.jpg", "2.jpg"]
    },
    {
        id: 6,
        folder: "prj_006",
        title: "Portable variable power supply",
        shortDesc: "Custom made portable power supply for electronics projects and testing.",
        image: "1.jpg",
        tags: ["Electronics", "3D-Printing", "CAD"],
        gallery: ["1.jpg", "2.jpg", "3.jpg"]
    },
    {
        id: 7,
        folder: "prj_007",
        title: "Custom PCB projects",
        shortDesc: "Various custom-built pcb solutions.",
        image: "1.jpg",
        tags: ["Electronics", "PCB-Design", "Automotive", "Toys", "Software", "CAD"],
        gallery: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpeg", "10.jpg"],
        imageText: [
            [1, "Various custom-built PCB solutions for Electrical Hybrid Agriculture tractor project."],
            [2, "Raspberry Pi CM4 based infotainment system module for a fully Electric City Bus."],
            [3, "CAN over WiFi transmitter module, based on ESP32."],
            [8, "Partially populated board of an infotainment system module for a fully Electric City Bus."]
        ]
    },
    {
        id: 8,
        folder: "prj_008",
        title: "SLA 3D Printed Miniatures",
        shortDesc: "Miniature models created using SLA 3D printing for tabletop gaming",
        image: "1.jpg",
        tags: ["3D-Printing", "Toys"],
        gallery: ["1.jpg", "2.jpg", "3.jpg", "4.jpg"],
        imageText: [
            [1, "A collection of custom-designed miniatures for tabletop gaming."],
            [2, "Models can be printed with very high detail and smooth surfaces, ready for painting."],
            [3, "Printer used: SLA Photon Mono, with buildplate dimensions of 130x78x160mm."]
        ]
    },
    {
        id: 9,
        folder: "prj_009",
        title: "Bluetooth Mono Speaker",
        shortDesc: "Bluetooth mono speaker enclosure, made from reclaimed materials",
        image: "1.jpg",
        tags: ["Woodworking", "Electronics"],
        gallery: ["1.jpg", "2.jpg", "3.jpg"],
        imageText: [
            [1, "A simple single speaker box, made from scraps of 6mm plywood."],
            [6, "Speaker is connected to a generic AliExpress bluetooth compatible audio receiver and amplifier modules"]
        ]
    },
    {
        id: 10,
        folder: "prj_010",
        title: "Dice Tower",
        shortDesc: "Custom made folding dice tower from plywood for tabletop gaming",
        image: "1.jpg",
        tags: ["Woodworking", "Toys", "CAD"],
        gallery: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"]
    },
    {
        id: 11,
        folder: "prj_011",
        title: "Temperature and Voltage Monitoring System",
        shortDesc: "System to track battery voltage level of a nearby parked car.",
        image: "1.jpg",
        tags: ["Electronics", "Automotive", "3D-Printing", "Software", "CAD"],
        gallery: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"],
        // imageText can be provided as an array of [index, text] pairs (1-based image index)
        imageText: [
            [1, "Receiver monitor and a webserver. Uses ESP32 with a custom PCB and a 3D printed enclosure."],
            [2, "WEB interface."],
            [6, "Module is powered via micro USB connector."]
        ]
    },
    {
        id: 12,
        folder: "prj_012",
        title: "Tea and Coffee Condiments holder tray",
        shortDesc: "A simple yet very useful tray for sorting random tea / coffee condiments.",
        image: "1.png",
        tags: ["3D-Printing", "Home-Improvement", "CAD"],
        gallery: ["1.png", "2.png", "3.png"]
    },
    {
        id: 13,
        folder: "prj_013",
        title: "Cryptex gift box",
        shortDesc: "Fully functional Cryptex with a user defined and changeable code. Model by @Cees from printables.com",
        image: "1.png",
        tags: ["3D-Printing", "Toys"],
        gallery: ["1.png", "2.png", "3.png"]
    },
    {
        id: 14,
        folder: "prj_014",
        title: "Trash bag holder",
        shortDesc: "Trash bag holder that fits over standard kitchen cabinet doors.",
        image: "1.png",
        tags: ["3D-Printing", "Home-Improvement", "CAD"],
        gallery: ["1.png", "2.png", "3.png"]
    },
    {
        id: 15,
        folder: "prj_015",
        title: "Ninja Cats Stacking Game",
        shortDesc: "Cat stacking table-top game. Model by @ValeriaMomo from printables.com",
        image: "1.png",
        tags: ["3D-Printing", "Toys"],
        gallery: ["1.png", "2.png"]
    },

];