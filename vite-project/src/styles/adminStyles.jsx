export const C = {
    bg: "#F4F6FB",
    card: "#FFFFFF",
    ink: "#0D0F1A",
    slate: "#1E2235",
    muted: "#6B7280",
    border: "#E5E7EB",
    accent: "#6366F1",
    green: "#10B981",
    rose: "#F43F5E",
    amber: "#F59E0B",
    teal: "#06B6D4",
    sidebar: "#1E2235",
};

export const CHART_COLORS = [C.green, C.rose, C.amber, C.teal, C.accent];

export const gStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: ${C.bg};
    color: ${C.ink};
  }

  /* ── SHELL ── */
  .admin-shell {
    display: flex;
    min-height: 100vh;
  }

  /* ── SIDEBAR ── */
  .sidebar {
    background: ${C.sidebar};
    transition: width 0.28s cubic-bezier(.4,0,.2,1);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 0;
    height: 100vh;
    flex-shrink: 0;
  }
  .sidebar-logo {
    font-size: 1.3rem;
    font-weight: 800;
    white-space: nowrap;
    overflow: hidden;
    background: linear-gradient(90deg, #A5B4FC, ${C.teal});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .sidebar-logo-area {
    padding: 24px 20px 16px;
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }
  .menu-toggle {
    background: rgba(255,255,255,0.08);
    border: none;
    cursor: pointer;
    border-radius: 8px;
    padding: 7px;
    color: #fff;
    transition: background 0.15s;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .menu-toggle:hover { background: rgba(255,255,255,0.15); }

  .sidebar-nav {
    padding: 12px 10px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 11px 14px;
    border-radius: 12px;
    cursor: pointer;
    color: rgba(255,255,255,0.6);
    font-weight: 600;
    font-size: 0.875rem;
    white-space: nowrap;
    overflow: hidden;
    transition: background 0.15s, color 0.15s;
    margin-bottom: 4px;
  }
  .nav-item:hover { background: rgba(255,255,255,0.07); color: #fff; }
  .nav-item.active {
    background: linear-gradient(135deg, ${C.accent}, #4F46E5);
    color: #fff;
    box-shadow: 0 4px 16px rgba(99,102,241,0.3);
  }
  .nav-item.danger { color: rgba(255,90,90,0.8); }
  .nav-item.danger:hover { background: rgba(244,63,94,0.12); color: #F43F5E; }
  .nav-label { flex: 1; min-width: 0; overflow: hidden; }

  /* ── TOPBAR ── */
  .topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 28px;
    background: ${C.card};
    border-bottom: 1px solid ${C.border};
    position: sticky;
    top: 0;
    z-index: 50;
    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
  }
  .topbar-title { font-size: 1.3rem; font-weight: 800; color: ${C.ink}; }
  .topbar-right { display: flex; align-items: center; gap: 12px; }

  .refresh-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border-radius: 10px;
    border: 1.5px solid ${C.border};
    background: #fff;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.83rem;
    color: ${C.muted};
    transition: all 0.15s;
    font-family: inherit;
  }
  .refresh-btn:hover { border-color: ${C.accent}; color: ${C.accent}; }
  .refresh-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  /* ── LAYOUT ── */
  .main-content { flex: 1; overflow-y: auto; min-width: 0; }
  .page { padding: 28px; }

  /* ── STAT CARDS ── */
  .stats-row {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 18px;
    margin-bottom: 28px;
  }
  .stat-card {
    background: ${C.card};
    border-radius: 18px;
    padding: 22px 24px;
    box-shadow: 0 2px 16px rgba(0,0,0,0.06);
    border: 1.5px solid ${C.border};
    transition: transform 0.2s, box-shadow 0.2s;
    position: relative;
    overflow: hidden;
  }
  .stat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 32px rgba(0,0,0,0.1); }
  .stat-label {
    font-size: 0.78rem;
    font-weight: 700;
    color: ${C.muted};
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 8px;
    display: block;
  }
  .stat-value { font-size: 2.2rem; font-weight: 800; line-height: 1; }
  .stat-sub { font-size: 0.75rem; color: ${C.muted}; margin-top: 6px; }

  /* ── GENERIC CARD ── */
  .g-card {
    background: ${C.card};
    border-radius: 20px;
    box-shadow: 0 2px 16px rgba(0,0,0,0.06);
    border: 1.5px solid ${C.border};
    padding: 24px;
  }
  .g-card-title {
    font-size: 1.05rem;
    font-weight: 800;
    color: ${C.ink};
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  /* ── TWO COLUMN ── */
  .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 22px;
    margin-bottom: 24px;
  }
  @media(max-width: 768px) { .two-col { grid-template-columns: 1fr; } }

  /* ── FILTER PILLS ── */
  .filter-pills { display: flex; gap: 8px; flex-wrap: wrap; }
  .pill {
    padding: 6px 16px;
    border-radius: 99px;
    border: 1.5px solid ${C.border};
    background: #fff;
    font-size: 0.8rem;
    font-weight: 700;
    cursor: pointer;
    color: ${C.muted};
    transition: all 0.15s;
    font-family: inherit;
  }
  .pill.active {
    background: ${C.accent};
    color: #fff;
    border-color: ${C.accent};
    box-shadow: 0 4px 12px rgba(99,102,241,0.25);
  }
  .pill:hover:not(.active) { border-color: ${C.accent}; color: ${C.accent}; }

  /* ── PROBLEM CARDS ── */
  .prob-card {
    border-radius: 14px;
    overflow: hidden;
    border: 1.5px solid;
    margin-bottom: 14px;
    transition: box-shadow 0.2s;
  }
  .prob-card.solved  { border-color: #A7F3D0; }
  .prob-card.unsolved { border-color: #FECDD3; }
  .prob-card.in_progress { border-color: #FDE68A; }

  .prob-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 16px 18px;
    cursor: pointer;
    gap: 12px;
    transition: background 0.15s;
  }
  .prob-card.solved   .prob-header  { background: #F0FDF4; }
  .prob-card.unsolved .prob-header  { background: #FFF1F2; }
  .prob-card.in_progress .prob-header { background: #FFFBEB; }
  .prob-card.solved   .prob-header:hover { background: #DCFCE7; }
  .prob-card.unsolved .prob-header:hover { background: #FFE4E6; }
  .prob-card.in_progress .prob-header:hover { background: #FEF3C7; }

  .prob-text { font-weight: 600; font-size: 0.9rem; flex: 1; line-height: 1.5; }
  .prob-meta { font-size: 0.75rem; color: ${C.muted}; margin-top: 5px; }

  .prob-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    border-radius: 99px;
    font-size: 0.72rem;
    font-weight: 700;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .prob-badge.solved   { background: #D1FAE5; color: #065F46; }
  .prob-badge.unsolved { background: #FFE4E6; color: #9F1239; }
  .prob-badge.in_progress { background: #FEF3C7; color: #92400E; }

  .prob-expanded {
    padding: 18px;
    background: #fff;
    border-top: 1px solid ${C.border};
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .prev-reply {
    padding: 12px 14px;
    border-radius: 10px;
    background: #EFF6FF;
    border-left: 3px solid #3B82F6;
  }
  .reply-row { display: flex; gap: 10px; }
  .reply-input {
    flex: 1;
    border: 1.5px solid ${C.border};
    border-radius: 10px;
    padding: 10px 14px;
    font-family: inherit;
    font-size: 0.87rem;
    outline: none;
    transition: border-color 0.2s;
  }
  .reply-input:focus {
    border-color: ${C.accent};
    box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
  }
  .action-row { display: flex; gap: 8px; flex-wrap: wrap; }
  .act-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border: none;
    border-radius: 10px;
    font-weight: 700;
    font-size: 0.82rem;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.15s;
  }
  .act-btn:hover  { transform: scale(1.03); }
  .act-btn.send   { background: ${C.accent}; color: #fff; }
  .act-btn.send:hover { background: #4F46E5; }
  .act-btn.green  { background: ${C.green}; color: #fff; }
  .act-btn.amber  { background: ${C.amber}; color: #fff; }
  .act-btn.red    { background: ${C.rose};  color: #fff; }

  /* ── FEEDBACK CARDS ── */
  .fb-card {
    border: 1.5px solid ${C.border};
    border-radius: 14px;
    padding: 18px;
    background: #FAFAFA;
    transition: box-shadow 0.15s;
    margin-bottom: 12px;
  }
  .fb-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
  .fb-stars { color: #F59E0B; font-size: 1rem; margin-bottom: 8px; letter-spacing: 2px; }
  .fb-text  { font-weight: 600; font-size: 0.92rem; color: ${C.slate}; line-height: 1.5; }
  .fb-email { font-size: 0.76rem; color: ${C.muted}; margin-top: 6px; }

  /* ── STUDENT TABLE ── */
  .stu-table { width: 100%; border-collapse: collapse; margin-top: 4px; }
  .stu-table th {
    text-align: left;
    font-size: 0.72rem;
    font-weight: 700;
    color: ${C.muted};
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 10px 14px;
    background: #F8FAFF;
    border-bottom: 1.5px solid ${C.border};
  }
  .stu-table td {
    padding: 13px 14px;
    border-bottom: 1px solid #F1F5F9;
    font-size: 0.87rem;
    vertical-align: middle;
  }
  .stu-table tr:last-child td { border-bottom: none; }
  .stu-table tr:hover td { background: #F8FAFF; }

  .stu-avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: linear-gradient(135deg, ${C.accent}, ${C.teal});
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: 800;
    font-size: 0.8rem;
    flex-shrink: 0;
  }
  .stu-name { font-weight: 700; color: ${C.ink}; }
  .stu-roll { font-size: 0.75rem; color: ${C.muted}; margin-top: 2px; }
  .ms-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 10px;
    border-radius: 99px;
    background: #EFF6FF;
    color: #1D4ED8;
    font-size: 0.72rem;
    font-weight: 700;
  }
  .stu-date { font-size: 0.78rem; color: ${C.muted}; }

  /* ── MISC ── */
  .divider { height: 1px; background: ${C.border}; margin: 20px 0; }
  .empty   { text-align: center; padding: 48px 0; color: ${C.muted}; }

  /* ── TEACHER TABLE ── */
  .t-table { width: 100%; border-collapse: collapse; }
  .t-table th {
    text-align: left;
    font-size: 0.72rem;
    font-weight: 700;
    color: ${C.muted};
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 10px 14px;
    background: #F8FAFF;
    border-bottom: 1.5px solid ${C.border};
  }
  .t-table td {
    padding: 11px 14px;
    border-bottom: 1px solid #F1F5F9;
    font-size: 0.85rem;
    vertical-align: middle;
  }
  .t-table tr:last-child td { border-bottom: none; }
  .t-table tr:hover td { background: #F5F7FF; cursor: pointer; }

  .desig-badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 20px;
    font-size: 10px;
    font-weight: 700;
    white-space: nowrap;
  }
  .block-chip {
    width: 24px;
    height: 24px;
    border-radius: 6px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 800;
    color: #fff;
  }

  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
`;