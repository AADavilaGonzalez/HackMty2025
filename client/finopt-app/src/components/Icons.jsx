// Icon Components
const Icons = {
    Wallet: (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
            <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
            <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
        </svg>
    ),

    Plus: (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    ),

    Trash2: (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            <line x1="10" x2="10" y1="11" y2="17" />
            <line x1="14" x2="14" y1="11" y2="17" />
        </svg>
    ),

    TrendingUp: (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            <polyline points="16 7 22 7 22 13" />
        </svg>
    ),

    DollarSign: (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" x2="12" y1="2" y2="22" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
    ),

    Calendar: (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
    ),

    Percent: (props) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" x2="5" y1="5" y2="19" />
            <circle cx="6.5" cy="6.5" r="2.5" />
            <circle cx="17.5" cy="17.5" r="2.5" />
        </svg>
    )
};

export default Icons;
