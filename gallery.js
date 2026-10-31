// Work gallery shown in the "Work" section.
// One entry per category; each gets its own photo carousel.
// To swap in real photos: put them in docs/work/<folder>/ and replace the
// placeholder URLs below, e.g. "docs/work/pcb/motor-driver.webp".
// Tip: keep every photo in a category the same aspect ratio (4:3 looks best).
// const ph = (seed) => `https://picsum.photos/seed/${seed}/1200/900`;

const gallery = [
    {
        title: "PCB prototype design",
        desc: "Schematics and board layouts, ready for fabrication and assembly.",
        icon: "pcb",
        photos: ["docs/work/PCB_Rpi_Breakout.jpg", "docs/work/PCB_ESP32_Breakout.jpg", "docs/work/PCB_Button_PNL.jpg", "docs/work/PCB_ESP32_NTC.jpg"]
    },
    {
        title: "CAD for 3D-printed prototypes",
        desc: "Functional parts and enclosures, designed to print right the first time.",
        icon: "cad",
        photos: ["docs/work/Enclosure_BotRemotes.jpg", "docs/work/Enclosure_PSU.jpg", "docs/work/Enclosure_WiFi_LCD.jpg", "docs/work/Enclosure_Organizer.jpg", "docs/work/Enclosure_Remote.jpg"]
    },
    {
        title: "Automotive consulting",
        desc: "Hands-on expertise for AUGA tractors and Dancerbus buses.",
        icon: "auto",
        photos: ["docs/work/Bus_Front.jpg", "docs/work/Bus_Rear.jpg", "docs/work/Bus_Plane.jpg", "docs/work/Tractor_Front.jpg"]
    },
    {
        title: "Robotics",
        desc: "My combat robot designs, and moments from the tournaments.",
        icon: "robot",
        photos: ["docs/work/Bots_BalticRobotSumo2026.jpg", "docs/work/Bots_CrabBot.jpg"]
    }
];

const GALLERY_ICONS = {
    pcb:   '<rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/>',
    cad:   '<path d="M12 3 20 7.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5 12 12l8-4.5M12 12v9"/>',
    auto:  '<path d="M3 17V7a2 2 0 0 1 2-2h11l5 5v7"/><path d="M3 11h18M8 5v6"/><circle cx="7" cy="17.5" r="2"/><circle cx="17" cy="17.5" r="2"/>',
    robot: '<rect x="4" y="8" width="16" height="10" rx="2"/><circle cx="9" cy="13" r="1.5"/><circle cx="15" cy="13" r="1.5"/><path d="M12 8V4.5"/><circle cx="12" cy="3.5" r="1"/><path d="M2 12v3M22 12v3"/>'
};
