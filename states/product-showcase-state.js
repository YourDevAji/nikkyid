const productShowcaseState = new HtmlState(

    {
        canAutoScrollInterval : true,
        autoScrollInterval : 5000,
        products: [
            {
                imageUrl: "/images/slide4.webp",
                altText:"image1",
                index: 0,
                active: true,
                title: "FRESH FOODS FOR YOUR KITCHEN",
                description: "Buy fresh food items sourced from the best suppliers across the world",
                buttonText:"BUY NOW",
                link: ""
            },
            {
                imageUrl: "/images/slide2.webp",
                altText:"image2",
                index: 1,
                active: false,
                title: "BUY QUALITY AFRICAN FABRICS",
                description: "Shop at Ease, Discover More",
                buttonText:"SHOP NOW",
                link: ""
            },
            {
                imageUrl: "/images/slide4.webp",
                altText:"image3",
                index: 2,
                active: false,
                title: "OLD FOODS FOR YOUR PARLOR",
                description: "Buy old food items sourced from the worst suppliers across the town",
                buttonText:"RETURN NOW",
                link: ""
            },
        ]
    },
    {
        persist: true,
        storageKey: 'productShowcaseState',
        storageType: 'sessionStorage',
        enableLogging: false,
    }
);

export default productShowcaseState;
