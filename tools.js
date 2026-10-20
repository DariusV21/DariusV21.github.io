// Public tools shown in the "Tools" section.
// Hosted by the Inventory_Tracker repo on GitHub Pages (login-system/public).
// To add a tool: drop the .html into login-system/public, push, and add an entry here.
const TOOLS_BASE = "https://dariusv21.github.io/Inventory_Tracker/";

const tools = [
    {
        title: "Inventory Tracker",
        desc: "Electronic components inventory backed by your own Google Sheet. Search, edit stock, export CSV, send parts to labels.",
        file: "Inventory_Tracker.html",
        icon: "inventory"
    },
    {
        title: "Label Generator",
        desc: "Printable labels for component drawers and boxes. Download as PNG or SVG.",
        file: "Label_Generator.html",
        icon: "label"
    },
    {
        title: "Gear Generator",
        desc: "Build a gear train of spur gears, ring gears and racks. Export as DXF, SVG or STL.",
        file: "Gear_Generator.html",
        icon: "gear"
    },
    {
        title: "GT2 Belt & Pulley Generator",
        desc: "2 mm pitch GT2 pulleys and belts. Set parameters, preview and export an STL for printing.",
        file: "GT2_Generator.html",
        icon: "pulley"
    },
    {
        title: "Gerber Panelizer",
        desc: "Load a Gerber ZIP and panelize it. Output uses JLCPCB, PCBWay or KiCad naming.",
        file: "Gerber_Panelizer.html",
        icon: "panel"
    }
];

// Line icons, 24x24, drawn with currentColor
const TOOL_ICONS = {
    inventory: '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="10" y1="6" x2="14" y2="6"/><line x1="10" y1="12" x2="14" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/>',
    label: '<path d="M20.6 13.4 11 3.8A2 2 0 0 0 9.6 3.2L4 3a1 1 0 0 0-1 1l.2 5.6a2 2 0 0 0 .6 1.4l9.6 9.6a2 2 0 0 0 2.8 0l4.4-4.4a2 2 0 0 0 0-2.8z"/><circle cx="7.5" cy="7.5" r="1.3"/>',
    gear: '<circle cx="12" cy="12" r="8.2" stroke-width="3" stroke-dasharray="2.3 2.85" stroke-linecap="butt"/><circle cx="12" cy="12" r="6.3"/><circle cx="12" cy="12" r="2.2"/>',
    pulley: '<circle cx="6.5" cy="13" r="3.5"/><circle cx="17" cy="11" r="5"/><circle cx="6.5" cy="13" r="1"/><circle cx="17" cy="11" r="1.4"/><line x1="5.9" y1="9.55" x2="16.1" y2="6.1"/><line x1="7.1" y1="16.45" x2="17.9" y2="15.9"/>',
    panel: '<rect x="2.5" y="2.5" width="19" height="19" rx="1.5"/><rect x="5.5" y="5.5" width="5.5" height="5.5" rx=".6"/><rect x="13" y="5.5" width="5.5" height="5.5" rx=".6"/><rect x="5.5" y="13" width="5.5" height="5.5" rx=".6"/><rect x="13" y="13" width="5.5" height="5.5" rx=".6"/>'
};
