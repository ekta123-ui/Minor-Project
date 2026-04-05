import React, { useState } from "react";

const locations = [
    // Block A — Ground Floor (0)
    { v: "A-entrance", l: "Block A", f: 0, n: "Main Entrance / Reception" },
    { v: "A-admission", l: "Block A", f: 0, n: "Admission Counselling (A005)" },
    { v: "A-admin", l: "Block A", f: 0, n: "Admin & Transport Office (A004)" },
    { v: "A-physio", l: "Block A", f: 0, n: "Physiotherapy OPD (A002)" },
    { v: "A-server", l: "Block A", f: 0, n: "Server Room (A003)" },
    { v: "A-cdc", l: "Block A", f: 0, n: "Career Development Center (A016)" },
    { v: "A-faculty1", l: "Block A", f: 0, n: "Faculty Hall 1 (A001)" },
    { v: "A-registrar", l: "Block A", f: 0, n: "Registrar Office (A008)" },
    { v: "A-comp-labs", l: "Block A", f: 0, n: "Computer Labs I–IV (A009–A014)" },
    // Block A — Basement (-1)
    { v: "A-library", l: "Block A", f: -1, n: "Central Library (A Basement)" },
    { v: "A-xerox", l: "Block A", f: -1, n: "Xerox & IT Store (A Basement)" },
    { v: "A-phd", l: "Block A", f: -1, n: "PhD Research Centre (A Basement)" },
    { v: "A-comp-lab-7", l: "Block A", f: -1, n: "Computer Lab VII / Digital Library" },
    { v: "A-accounts", l: "Block A", f: -1, n: "Account & Records (A Basement)" },
    // Block A — 1st Floor
    { v: "A-psych-lab", l: "Block A", f: 1, n: "Psychology Lab (A111)" },
    { v: "A-class-1", l: "Block A", f: 1, n: "Classrooms A101–A110" },
    // Block A — 2nd Floor
    { v: "A-humanities", l: "Block A", f: 2, n: "School of Humanities (A 2F)" },
    { v: "A-welfare", l: "Block A", f: 2, n: "Student Welfare Office (A207B)" },
    { v: "A-placement", l: "Block A", f: 2, n: "Training & Placement Cell (A207C)" },
    { v: "A-drone-a", l: "Block A", f: 2, n: "Drone Lab (A207)" },
    { v: "A-education", l: "Block A", f: 2, n: "School of Education (A 2F)" },
    // Block A — 3rd Floor
    { v: "A-legal", l: "Block A", f: 3, n: "School of Legal Studies (A 3F)" },
    { v: "A-moot-court", l: "Block A", f: 3, n: "Moot Court (A411)" },
    { v: "A-classrooms-3", l: "Block A", f: 3, n: "Classrooms A301–A316" },
    // Block A — 4th Floor
    { v: "A-chancellor", l: "Block A", f: 4, n: "Chancellor / Chairman Office (A 4F)" },
    { v: "A-exam-cell", l: "Block A", f: 4, n: "Examination Cell (A413)" },
    { v: "A-iqac", l: "Block A", f: 4, n: "IQAC Director (A404)" },
    { v: "A-rnd", l: "Block A", f: 4, n: "R&D Cell (A408)" },
    { v: "A-vc", l: "Block A", f: 4, n: "Vice Chancellor Conference (A405)" },

    // Block B — Ground Floor (0)
    { v: "B-entrance", l: "Block B", f: 0, n: "Block B Main Entrance" },
    { v: "B-physics", l: "Block B", f: 0, n: "Physics Lab (B001)" },
    { v: "B-elec-lab", l: "Block B", f: 0, n: "Electrical & Electronics Lab (B002)" },
    { v: "B-chem-lab", l: "Block B", f: 0, n: "Chemistry Lab (B003)" },
    { v: "B-pharma-lab", l: "Block B", f: 0, n: "Pharmaceutics Lab II (B004)" },
    { v: "B-comp-lab-9", l: "Block B", f: 0, n: "Computer Lab IX (B005)" },
    { v: "B-class-g", l: "Block B", f: 0, n: "Classrooms B007–B018" },
    // Block B — 1st Floor
    { v: "B-pharma-micro", l: "Block B", f: 1, n: "Pharmaceutical Microbiology Lab" },
    { v: "B-drug-lab", l: "Block B", f: 1, n: "Advanced Drug Delivery Lab" },
    // Block B — 2nd Floor
    { v: "B-soe-dean", l: "Block B", f: 2, n: "School of Engineering Dean (B206)" },
    { v: "B-comp-15", l: "Block B", f: 2, n: "Computer Lab XV (B202)" },
    { v: "B-basic-elec", l: "Block B", f: 2, n: "Basic Electricity Lab (B203)" },
    { v: "B-forensic", l: "Block B", f: 2, n: "Forensic Lab (B204)" },
    // Block B — 3rd Floor
    { v: "B-biomech", l: "Block B", f: 3, n: "Biomechanics & Kinesiology Lab (B301)" },
    { v: "B-electro", l: "Block B", f: 3, n: "Electrotherapy Lab (B302)" },
    { v: "B-anatomy", l: "Block B", f: 3, n: "Anatomy Lab (B303)" },
    { v: "B-exercise", l: "Block B", f: 3, n: "Exercise Therapy Lab (B304)" },
    { v: "B-coe", l: "Block B", f: 3, n: "Centre of Excellence (B310)" },
    // Block B — 4th Floor
    { v: "B-pharma-3", l: "Block B", f: 4, n: "Pharmaceutics Lab III (B401)" },
    { v: "B-comp-6", l: "Block B", f: 4, n: "Computer Lab VI (B402)" },
    { v: "B-pharma-chem", l: "Block B", f: 4, n: "Pharmaceutical Chemistry Lab IV (B404)" },
    { v: "B-museum", l: "Block B", f: 4, n: "Museum (B406)" },
    { v: "B-nss", l: "Block B", f: 4, n: "NSS Office (B410)" },
    // Block B — Basement (-1)
    { v: "B-machine-shop", l: "Block B", f: -1, n: "Machine Shop (B502)" },
    { v: "B-drone-b", l: "Block B", f: -1, n: "Drone Lab Pioneer (B503)" },
    { v: "B-concrete", l: "Block B", f: -1, n: "Concrete Technology Lab (B507)" },
    { v: "B-discipline", l: "Block B", f: -1, n: "Discipline Committee Office (B515)" },
    { v: "B-carpentry", l: "Block B", f: -1, n: "Carpentry / Fitting / Welding Shop" },

    // Block C — Ground Floor (0)
    { v: "C-entrance", l: "Block C", f: 0, n: "Block C Main Entrance" },
    { v: "C-medical", l: "Block C", f: 0, n: "Medical Room (C002)" },
    { v: "C-housekeeping", l: "Block C", f: 0, n: "Housekeeping Lab (C007)" },
    { v: "C-front-office", l: "Block C", f: 0, n: "Front Office Conference Lab (C011)" },
    { v: "C-laundry", l: "Block C", f: 0, n: "Laundry & Linen Lab (C016)" },
    { v: "C-eng-kitchen", l: "Block C", f: 0, n: "Engineering Kitchen (C001)" },
    // Block C — Basement (-1)
    { v: "C-cafeteria", l: "Block C", f: -1, n: "Cafeteria & Kitchen (C Basement)" },
    { v: "C-dance", l: "Block C", f: -1, n: "Dance Studio (C Basement)" },
    { v: "C-music", l: "Block C", f: -1, n: "Music Studio (C Basement)" },
    { v: "C-billiard", l: "Block C", f: -1, n: "Billiard Club (C Basement)" },
    // Block C — 1st Floor
    { v: "C-fashion", l: "Block C", f: 1, n: "Fashion Studio (C115)" },
    { v: "C-jmc", l: "Block C", f: 1, n: "Journalism & Mass Comm (C113)" },
    { v: "C-pcr", l: "Block C", f: 1, n: "PCR Studio (C119)" },
    { v: "C-garment", l: "Block C", f: 1, n: "Garment Construction Lab (C114)" },
    { v: "C-weaving", l: "Block C", f: 1, n: "Weaving & Block Printing Lab (C101)" },
    // Block C — 2nd Floor
    { v: "C-design", l: "Block C", f: 2, n: "Design Studio IV & VI (C201/C202)" },
    { v: "C-exhibition", l: "Block C", f: 2, n: "Exhibition Room (C210)" },
    { v: "C-model", l: "Block C", f: 2, n: "Model Making (C212)" },
    // Block C — 3rd Floor
    { v: "C-agronomy", l: "Block C", f: 3, n: "Agronomy / Soil Science Lab (C304)" },
    { v: "C-horticulture", l: "Block C", f: 3, n: "Horticulture Lab (C306)" },
    { v: "C-entomology", l: "Block C", f: 3, n: "Entomology Lab (C309)" },
    // Block C — 4th Floor
    { v: "C-management", l: "Block C", f: 4, n: "School of Management (C 4F)" },
    { v: "C-media-lab", l: "Block C", f: 4, n: "Media Production Lab (C409)" },
    { v: "C-comp-13", l: "Block C", f: 4, n: "Computer Lab XIII (C404)" },
];

// Walking time (minutes) between block ground-floor entrances
const blockWalk = { AA: 0, BB: 0, CC: 0, AB: 3, BA: 3, BC: 3, CB: 3, AC: 7, CA: 7 };

const dotColors = { start: "#6366F1", walk: "#06B6D4", floor: "#F59E0B", arrive: "#10B981" };

// ─── Campus Buildings Data ────────────────────────────────────────
const campusData = {
    "Block A": {
        floors: {
            "Basement": ["Xerox Machine", "IT Store", "Central Library", "Account & Records", "Computer lab X, XI, XIV", "Computer lab VII / Digital Library", "PhD Research Centre"],
            "Ground Floor": ["Career Development Center (A016)", "Reception", "Admission Counselling (A005)", "Server Room (A003)", "Faculty Hall 1 (A001)", "Faculty Hall 2", "Admin & Transport Office (A004)", "Physiotherapy OPD (A002)", "Admission Department (A010)", "Registrar Office (A008)", "Accounts Section (A008)", "Computer Lab I–IV (A009, A012, A011, A014)"],
            "1st Floor": ["Psychology Lab (A111)", "Classrooms A101–A110"],
            "2nd Floor": ["School of Humanities", "Faculty Room (A207A, A212)", "Classrooms A208–A211, A214–A216", "School of Education", "Student Welfare Office (A207B)", "Training & Placement Cell (A207C)", "Common Room Girls (A200)", "Drone Lab (A207)", "Presentation Room (A213)", "Common Room Boys (A216A)"],
            "3rd Floor": ["School of Legal Studies", "Classrooms A301–A305, A307–A316", "Faculty Hall (A307A)", "Resource Room SOED (A306)", "Store – Examination"],
            "4th Floor": ["Chairman Office (A402)", "VC Conference (A405)", "Vice Conference Room (A403)", "Examination Cell (A413)", "Conference Room (A401)", "Chancellor Office (A407)", "IQAC Director (A404)", "Pro Vice Chancellor (A406)", "R&D Cell (A408)", "CCTV Monitoring (A408B)", "Dean Research (A409)", "Examination Control Center (A411)", "Moot Court (A411)", "Multi-Purpose Hall (A414A)", "Secrecy Room (A417)"],
        },
    },
    "Block B": {
        floors: {
            "Basement": ["Machine Shop (B502)", "Drone Lab Pioneer (B503)", "Computer Lab (B504)", "Concrete Technology Lab (B507)", "Computer Lab XIV (B508)", "Physics Lab II (B510)", "Chemistry Lab II (B512)", "Central Store (B513)", "Discipline Committee Office (B515)", "Carpentry / Fitting / Welding Shop"],
            "Ground Floor": ["Physics Lab (B001)", "Electrical & Electronics Lab (B002)", "Chemistry Lab (B003)", "Chemistry Instrumentation Room (B006)", "Pharmaceutics Lab II (B004)", "Computer Lab IX (B005)", "Faculty Room (B008)", "Classrooms B007, B009–B018"],
            "1st Floor": ["Pharmaceutical Microbiology Lab", "Advanced Drug Delivery Lab"],
            "2nd Floor": ["School of Engineering & Technology", "Dean Office (B206)", "Computer Lab XV (B202)", "Basic Electricity Lab (B203)", "Computer Lab XVI (B207)", "Forensic Lab (B204)", "Faculty Rooms B210, B212, B214"],
            "3rd Floor": ["Biomechanics & Kinesiology Lab (B301)", "Electrotherapy Lab (B302)", "Anatomy Lab (B303)", "Exercise Therapy Lab (B304)", "Functional Diagnostic Lab (B306)", "Faculty Room (B307)", "Centre of Excellence (B310)", "Classrooms B308, B311–B318"],
            "4th Floor": ["Pharmaceutics Lab III (B401)", "Computer Lab VI (B402)", "Pharmacology Lab II (B403)", "Pharmaceutical Chemistry Lab IV (B404)", "Social Pharmacy Lab (B405)", "Museum (B406)", "Central Instrumentation Facility (B409)", "NSS (B410)", "Classrooms B413, B414"],
        },
    },
    "Block C": {
        floors: {
            "Basement": ["Kitchen Lab SOHMCT", "F&B Training Lab SOHMCT", "Billiard Club", "Dance Studio", "Music Studio", "Cafeteria & Kitchen"],
            "Ground Floor": ["Housekeeping Lab (C007)", "Front Office Conference Lab (C011)", "Laundry & Linen Lab (C016)", "Computer Lab VIII (C015)", "Engineering Kitchen (C001)", "Dean & Faculty Room (C009)", "Medical Room (C002)"],
            "1st Floor": ["Weaving & Block Printing Lab (C101)", "Museum (C110A)", "Garment Construction Lab (C114)", "Fashion Studio (C115)", "Pattern Making Lab (C116)", "Computer Lab XII (C102)", "Journalism & Mass Communication (C113)", "PCR Studio (C119)"],
            "2nd Floor": ["Design Studio IV (C201)", "Design Studio VI (C202)", "Computer Lab (C204)", "Model Making (C212)", "Art Room / Design Studio (C216)", "Dean Office (C205)", "Exhibition Room (C210)", "Building Material Museum (C214)"],
            "3rd Floor": ["Agronomy / Soil Science Lab (C304)", "Horticulture Lab (C306)", "Entomology Lab (C309)", "Museum Room (C307)", "Dean Office (C311)", "Faculty Room (C313)"],
            "4th Floor": ["School of Management & Commerce", "Management Faculty Room (C417)", "Computer Lab XIII (C404)", "Media Production Lab (C409)", "Classrooms C401–C416"],
        },
    },
};

const blockMeta = {
    "Block A": { grad: "linear-gradient(135deg,#1E3A8A,#3B82F6)", dark: "#1E3A8A", accent: "#3B82F6" },
    "Block B": { grad: "linear-gradient(135deg,#065F46,#10B981)", dark: "#065F46", accent: "#10B981" },
    "Block C": { grad: "linear-gradient(135deg,#881337,#F43F5E)", dark: "#881337", accent: "#F43F5E" },
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap');

  .cn-page {
    font-family:'IBM Plex Sans',sans-serif;
    background:#F5F4F0; min-height:100vh; color:#1A1A1A;
  }

  .cn-hero {
    background:#1A1A1A; padding:44px 32px 40px;
    border-bottom:3px solid #F59E0B;
  }
  .cn-hero-inner { max-width:1000px; margin:0 auto; }
  .cn-hero-eyebrow {
    font-family:'IBM Plex Mono',monospace;
    font-size:11px; color:#F59E0B;
    letter-spacing:0.12em; text-transform:uppercase;
    margin-bottom:14px;
  }
  .cn-hero h1 {
    font-size:clamp(1.8rem,4vw,2.6rem);
    font-weight:600; color:#fff;
    line-height:1.15; margin-bottom:8px;
  }
  .cn-hero h1 em { font-style:normal; color:#F59E0B; }
  .cn-hero p { color:rgba(255,255,255,0.45); font-size:0.9rem; }

  .cn-dist-chips {
    display:flex; gap:10px; flex-wrap:wrap; margin-top:20px;
  }
  .cn-dist-chip {
    background:rgba(255,255,255,0.07);
    border:1px solid rgba(255,255,255,0.12);
    border-radius:8px; padding:6px 13px;
    font-size:11.5px; color:rgba(255,255,255,0.6);
    font-family:'IBM Plex Mono',monospace;
  }
  .cn-dist-chip span { color:#F59E0B; font-weight:600; }

  .cn-container { max-width:1000px; margin:0 auto; padding:32px 24px; }

  .cn-card {
    background:#fff;
    border:1.5px solid #E8E5DF;
    border-radius:20px;
    padding:28px;
    margin-bottom:16px;
  }

  .cn-selects {
    display:grid; grid-template-columns:1fr auto 1fr; gap:12px;
    align-items:end; margin-bottom:16px;
  }
  .cn-swap-icon {
    width:36px; height:36px;
    display:flex; align-items:center; justify-content:center;
    background:#F5F4F0; border-radius:10px;
    font-size:16px; cursor:pointer;
    border:1.5px solid #E8E5DF;
    transition:background 0.15s;
    align-self:end; margin-bottom:1px;
  }
  .cn-swap-icon:hover { background:#EDEDEA; }

  .cn-form-group { display:flex; flex-direction:column; gap:6px; }
  .cn-label {
    font-family:'IBM Plex Mono',monospace;
    font-size:10.5px; color:#888; letter-spacing:0.08em; text-transform:uppercase;
  }
  .cn-select {
    width:100%; padding:11px 13px;
    border:1.5px solid #E8E5DF; border-radius:12px;
    font-size:13px; font-family:inherit;
    background:#FAFAF9; color:#1A1A1A;
    cursor:pointer; outline:none;
    transition:border-color 0.15s;
    appearance:none;
    background-image:url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 7L11 1' stroke='%23888' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat:no-repeat; background-position:right 12px center;
    padding-right:34px;
  }
  .cn-select:focus { border-color:#F59E0B; }

  .cn-go-btn {
    width:100%; padding:13px;
    background:#1A1A1A; color:#fff;
    border:none; border-radius:12px;
    font-size:14px; font-weight:600; font-family:inherit;
    cursor:pointer; letter-spacing:0.02em;
    transition:background 0.15s, transform 0.1s;
    display:flex; align-items:center; justify-content:center; gap:8px;
  }
  .cn-go-btn:hover { background:#333; transform:scale(1.01); }

  .cn-result {
    margin-top:24px; border-top:1.5px solid #EDEDEA;
    padding-top:22px; display:none;
  }
  .cn-result.show { display:block; }

  .cn-result-header {
    display:flex; justify-content:space-between; align-items:flex-start;
    gap:12px; margin-bottom:20px; flex-wrap:wrap;
  }
  .cn-result-title {
    font-size:14px; font-weight:600; color:#1A1A1A; line-height:1.4;
  }
  .cn-time-badges { display:flex; gap:8px; flex-wrap:wrap; }
  .cn-badge {
    padding:6px 14px; border-radius:8px;
    font-family:'IBM Plex Mono',monospace;
    font-size:12px; font-weight:600;
    border:1.5px solid;
  }
  .cn-badge.walk  { background:#FFF8E8; border-color:#F59E0B; color:#92400E; }
  .cn-badge.cycle { background:#EEF2FF; border-color:#6366F1; color:#3730A3; }

  .cn-steps { display:flex; flex-direction:column; }
  .cn-step { display:flex; gap:14px; }
  .cn-spine {
    display:flex; flex-direction:column; align-items:center;
    flex-shrink:0;
  }
  .cn-dot {
    width:12px; height:12px; border-radius:50%;
    flex-shrink:0; margin-top:3px;
  }
  .cn-line {
    width:2px; flex:1; min-height:16px;
    background:#E8E5DF; margin:4px 0;
  }
  .cn-step-body { padding-bottom:18px; flex:1; }
  .cn-step-name { font-size:13.5px; font-weight:600; color:#1A1A1A; margin-bottom:3px; }
  .cn-step-desc { font-size:12.5px; color:#888; line-height:1.55; }
  .cn-step-time {
    display:inline-block;
    font-family:'IBM Plex Mono',monospace;
    font-size:11px; font-weight:600;
    color:#F59E0B; margin-top:5px;
    background:#FFF8E8; padding:3px 9px;
    border-radius:6px;
  }

  .cn-ref-grid {
    display:grid; grid-template-columns:repeat(3,1fr);
    gap:10px; margin-top:4px;
  }
  .cn-ref-item {
    background:#FAFAF9; border:1.5px solid #E8E5DF;
    border-radius:12px; padding:13px 14px;
  }
  .cn-ref-route {
    font-family:'IBM Plex Mono',monospace;
    font-size:11px; color:#888; margin-bottom:4px;
  }
  .cn-ref-time {
    font-size:14px; font-weight:600; color:#1A1A1A;
  }
  .cn-ref-note { font-size:11px; color:#AAA; margin-top:2px; }

  .cn-tip {
    background:#FFF8E8; border:1.5px solid #F59E0B;
    border-radius:12px; padding:13px 16px;
    font-size:12.5px; color:#92400E; margin-top:4px;
    line-height:1.6;
  }

  /* ─── Campus Buildings ─── */
  .cn-section-title {
    font-size:15px; font-weight:600; color:#1A1A1A;
    margin-bottom:6px; margin-top:28px;
    display:flex; align-items:center; gap:8px;
  }
  .cn-section-sub {
    font-size:12px; color:#888; margin-bottom:16px;
  }

  .cn-blocks-grid {
    display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr));
    gap:16px;
  }
  .cn-block-card {
    border-radius:18px; overflow:hidden;
    border:1.5px solid #E8E5DF;
    background:#fff;
  }
  .cn-block-header {
    padding:18px 20px; color:#fff;
    display:flex; align-items:center; gap:10px;
  }
  .cn-block-header-icon {
    width:36px; height:36px; border-radius:10px;
    background:rgba(255,255,255,0.2);
    display:flex; align-items:center; justify-content:center;
    font-size:18px;
  }
  .cn-block-header-title { font-weight:600; font-size:1.05rem; }
  .cn-block-header-sub { font-size:11px; opacity:0.7; margin-top:2px; }

  .cn-floor-btn {
    width:100%; display:flex; justify-content:space-between; align-items:center;
    padding:11px 18px; background:#FAFAF9; border:none; cursor:pointer;
    font-weight:600; font-size:13px; color:#1A1A1A;
    border-top:1px solid #F0EDE8;
    font-family:'IBM Plex Sans',sans-serif;
    transition:background 0.15s;
    text-align:left;
  }
  .cn-floor-btn:hover { background:#F0EDE8; }
  .cn-floor-btn-left { display:flex; align-items:center; gap:8px; }
  .cn-floor-chevron {
    font-size:10px; color:#888;
    transition:transform 0.2s;
    display:inline-block;
  }
  .cn-floor-chevron.open { transform:rotate(180deg); }

  .cn-floor-rooms {
    padding:10px 18px 14px; display:flex; flex-direction:column; gap:5px;
    background:#FDFCFB;
  }
  .cn-room-row {
    display:flex; align-items:center; gap:7px;
    font-size:12px; color:#666;
    padding:3px 0; border-bottom:1px solid #F5F2EC;
  }
  .cn-room-row:last-child { border:none; }
  .cn-room-dot {
    width:5px; height:5px; border-radius:50%; flex-shrink:0;
  }

  @media(max-width:620px){
    .cn-selects { grid-template-columns:1fr; }
    .cn-swap-icon { display:none; }
    .cn-ref-grid { grid-template-columns:1fr 1fr; }
    .cn-blocks-grid { grid-template-columns:1fr; }
  }
`;

export default function CampusNavigator() {
    const [fromV, setFromV] = useState("");
    const [toV, setToV] = useState("");
    const [route, setRoute] = useState(null);
    const [openFloor, setOpenFloor] = useState(null);

    const groups = locations.reduce((acc, l) => {
        (acc[l.l] = acc[l.l] || []).push(l);
        return acc;
    }, {});

    const selectOptions = Object.entries(groups).map(([g, ls]) => (
        <optgroup key={g} label={g}>
            {ls.map(l => <option key={l.v} value={l.v}>{l.n}</option>)}
        </optgroup>
    ));

    const swap = () => {
        setFromV(toV);
        setToV(fromV);
        setRoute(null);
    };

    const calcRoute = () => {
        if (!fromV || !toV) { alert("Please select both locations."); return; }
        if (fromV === toV) { alert("Start and destination are the same!"); return; }

        const from = locations.find(l => l.v === fromV);
        const to = locations.find(l => l.v === toV);
        const fromBlock = from.l.split(" ")[1];
        const toBlock = to.l.split(" ")[1];

        const floorTimeFrom = Math.abs(from.f);
        const floorTimeTo = Math.abs(to.f);
        const walkBetween = blockWalk[fromBlock + toBlock] || 0;
        const totalWalk = 1 + floorTimeFrom + walkBetween + floorTimeTo;
        const totalCycle = Math.max(1, Math.round(totalWalk * 0.55));

        const steps = [];

        if (from.f < 0) {
            steps.push({
                type: "floor",
                name: `Exit basement · ${from.n}`,
                desc: `Take the stairs up ${Math.abs(from.f)} floor${Math.abs(from.f) > 1 ? "s" : ""} to the ground floor of ${from.l}.`,
                time: `~${floorTimeFrom} min`,
            });
        } else if (from.f > 0) {
            steps.push({
                type: "floor",
                name: `Descend to ground floor · ${from.n}`,
                desc: `Take the lift or stairs down ${from.f} floor${from.f > 1 ? "s" : ""} to the ground floor of ${from.l}.`,
                time: `~${floorTimeFrom} min`,
            });
        } else {
            steps.push({
                type: "start",
                name: `Start at ${from.n}`,
                desc: `Ground floor · ${from.l}`,
                time: "0 min",
            });
        }

        if (fromBlock !== toBlock) {
            const path =
                fromBlock === "A" && toBlock === "C" ? "Block A → Block B → Block C" :
                    fromBlock === "C" && toBlock === "A" ? "Block C → Block B → Block A" :
                        `${from.l} → ${to.l}`;
            steps.push({
                type: "walk",
                name: `Walk to ${to.l}`,
                desc: `Follow the campus corridor: ${path}. Stay on the ground floor throughout.`,
                time: `~${walkBetween} min`,
            });
        }

        if (to.f < 0) {
            steps.push({
                type: "floor",
                name: `Go to basement · ${to.l}`,
                desc: `Take stairs down ${Math.abs(to.f)} floor${Math.abs(to.f) > 1 ? "s" : ""} from the ground floor entrance of ${to.l}.`,
                time: `~${floorTimeTo} min`,
            });
        } else if (to.f > 0) {
            steps.push({
                type: "floor",
                name: `Climb to floor ${to.f} · ${to.l}`,
                desc: `Use the lift (faster) or stairs. ${to.f} floor${to.f > 1 ? "s" : ""} up from the ${to.l} ground entrance.`,
                time: `~${floorTimeTo} min`,
            });
        }

        steps.push({
            type: "arrive",
            name: `Arrive at ${to.n}`,
            desc: `${to.l} · ${to.f < 0 ? "Basement" : to.f === 0 ? "Ground Floor" : `Floor ${to.f}`}`,
            time: "✓ Destination",
        });

        setRoute({
            fromName: from.n,
            toName: to.n,
            totalWalk,
            totalCycle,
            steps,
        });
    };

    return (
        <div className="cn-page">
            <style>{styles}</style>

            <div className="cn-hero">
                <div className="cn-hero-inner">
                    <div className="cn-hero-eyebrow">// campus_navigator.krmangalam</div>
                    <h1>Find your way<br />to <em>any room</em> on campus</h1>
                    <p>Step-by-step walking directions with real time estimates across all three blocks</p>
                    <div className="cn-dist-chips">
                        <div className="cn-dist-chip">Same floor → <span>~1 min</span></div>
                        <div className="cn-dist-chip">Floor change → <span>+1 min / floor</span></div>
                        <div className="cn-dist-chip">A ↔ B → <span>~3 min</span></div>
                        <div className="cn-dist-chip">B ↔ C → <span>~3 min</span></div>
                        <div className="cn-dist-chip">A ↔ C → <span>~7 min</span></div>
                    </div>
                </div>
            </div>

            <div className="cn-container">

                {/* Route Finder */}
                <div className="cn-card">
                    <div className="cn-selects">
                        <div className="cn-form-group">
                            <span className="cn-label">Starting point</span>
                            <select
                                className="cn-select"
                                value={fromV}
                                onChange={e => { setFromV(e.target.value); setRoute(null); }}
                            >
                                <option value="">— select start —</option>
                                {selectOptions}
                            </select>
                        </div>

                        <div className="cn-swap-icon" onClick={swap} title="Swap">⇄</div>

                        <div className="cn-form-group">
                            <span className="cn-label">Destination</span>
                            <select
                                className="cn-select"
                                value={toV}
                                onChange={e => { setToV(e.target.value); setRoute(null); }}
                            >
                                <option value="">— select destination —</option>
                                {selectOptions}
                            </select>
                        </div>
                    </div>

                    <button className="cn-go-btn" onClick={calcRoute}>
                        Get walking route →
                    </button>

                    {route && (
                        <div className="cn-result show">
                            <div className="cn-result-header">
                                <div className="cn-result-title">
                                    {route.fromName}<br />
                                    <span style={{ color: "#888", fontWeight: 400 }}>↓</span><br />
                                    {route.toName}
                                </div>
                                <div className="cn-time-badges">
                                    <div className="cn-badge walk">🚶 ~{route.totalWalk} min</div>
                                    <div className="cn-badge cycle">🚲 ~{route.totalCycle} min</div>
                                </div>
                            </div>

                            <div className="cn-steps">
                                {route.steps.map((s, i) => (
                                    <div key={i} className="cn-step">
                                        <div className="cn-spine">
                                            <div className="cn-dot" style={{ background: dotColors[s.type] }} />
                                            {i < route.steps.length - 1 && <div className="cn-line" />}
                                        </div>
                                        <div className="cn-step-body">
                                            <div className="cn-step-name">{s.name}</div>
                                            <div className="cn-step-desc">{s.desc}</div>
                                            <div className="cn-step-time">{s.time}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Distance Reference */}
                <div className="cn-card">
                    <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "14px" }}>
                        Campus distance reference
                    </div>
                    <div className="cn-ref-grid">
                        {[
                            { route: "Same block, same floor", time: "~1 min", note: "Direct walk" },
                            { route: "Same block, +1 floor", time: "+1 min", note: "Stairs or lift" },
                            { route: "Block A ↔ Block B", time: "~3–4 min", note: "Corridor walk" },
                            { route: "Block B ↔ Block C", time: "~3–4 min", note: "Corridor walk" },
                            { route: "Block A ↔ Block C", time: "~6–8 min", note: "Via Block B" },
                            { route: "Basement → Rooftop", time: "~5–7 min", note: "Lift faster" },
                        ].map((r, i) => (
                            <div key={i} className="cn-ref-item">
                                <div className="cn-ref-route">{r.route}</div>
                                <div className="cn-ref-time">{r.time}</div>
                                <div className="cn-ref-note">{r.note}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="cn-tip">
                    ⏱ <strong>Peak hour tip:</strong> Add 1–2 min between 9–10 AM, 12–1 PM, and 4–5 PM when corridors are busy. The lift in Block A has the longest wait — use stairs for 1–2 floors.
                </div>

                {/* Campus Buildings */}
                <div className="cn-section-title" style={{ marginTop: 32 }}>
                    🏢 Campus Buildings
                </div>
                <div className="cn-section-sub">
                    Explore every floor and room across all three blocks.
                </div>

                <div className="cn-blocks-grid">
                    {Object.entries(campusData).map(([blkName, block]) => {
                        const meta = blockMeta[blkName];
                        return (
                            <div key={blkName} className="cn-block-card">
                                <div className="cn-block-header" style={{ background: meta.grad }}>
                                    <div className="cn-block-header-icon">🏛️</div>
                                    <div>
                                        <div className="cn-block-header-title">{blkName}</div>
                                        <div className="cn-block-header-sub">
                                            {Object.keys(block.floors).length} Floors · {Object.values(block.floors).flat().filter(Boolean).length} Facilities
                                        </div>
                                    </div>
                                </div>
                                <div style={{ maxHeight: 360, overflowY: "auto" }}>
                                    {Object.entries(block.floors).map(([floor, rooms], fi) => {
                                        const key = `${blkName}-${fi}`;
                                        const open = openFloor === key;
                                        return (
                                            <div key={fi}>
                                                <button
                                                    className="cn-floor-btn"
                                                    onClick={() => setOpenFloor(open ? null : key)}
                                                >
                                                    <div className="cn-floor-btn-left">
                                                        <span style={{ color: meta.accent, fontSize: 13 }}>▦</span>
                                                        {floor}
                                                    </div>
                                                    <span className={`cn-floor-chevron ${open ? "open" : ""}`}>▼</span>
                                                </button>
                                                {open && (
                                                    <div className="cn-floor-rooms">
                                                        {rooms.filter(Boolean).map((room, ri) => (
                                                            <div key={ri} className="cn-room-row">
                                                                <div className="cn-room-dot" style={{ background: meta.accent }} />
                                                                {room}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}