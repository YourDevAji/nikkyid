const authState = new HtmlState(

    {
        isAuthenticated: false,
        user: null,
        //        siteName: "NikkyId Stores",
        siteName: "",
        tabs: [
            {name: "New Arrivals",link:"#"},
            {name: "Best Selling",link:"#"},
            {name: "Top Deal",link:"#"},
        ],
        cart:['']
    },
    {
        persist: true,
        storageKey: 'authState',
        storageType: 'sessionStorage',
        enableLogging: false,
    }
);

export default authState;
