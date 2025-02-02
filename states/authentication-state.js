const authState = new HtmlState(

    {
        isAuthenticated: false,
        user: null,
        tabs: [
            {name: "New Arrivals",link:"#"},
            {name: "Best Selling",link:"#"},
            {name: "Top Deal",link:"#"},
        ]
    },
    {
        persist: true,
        storageKey: 'authState',
        storageType: 'sessionStorage',
        enableLogging: false,
    }
);

export default authState;
