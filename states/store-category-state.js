const storeCategoryState = new HtmlState(

    {
        title: "Explore Our Curated Collections",
        description: "Discover collections designed to match your needs.",
        categories: [
            {
                identity:"Foods",
                description:"Testing description in foods",
                index: 0,
                imageUrl: "/images/slide4.webp",
                altText:"image1",
                link: ""
            },
            {
                identity:"Drinks",
                description:"Testing description in drinks",
                index: 1,
                imageUrl: "/images/slide2.webp",
                altText:"image2",
                link: ""
            },
            {
                identity:"Fabrics",
                description:"Testing description in fabrics",
                index: 2,
                imageUrl: "/images/slide301.webp",
                altText:"image3",
                link: ""
            },
            {
                identity:"Dry Grains",
                description:"Testing description in grains",
                index: 3,
                imageUrl: "/images/slide4.webp",
                altText:"image4",
                link: ""
            },
            {
                identity:"Cleaning",
                description:"Testing description in cleaning",
                index: 4,
                imageUrl: "/images/slide2.webp",
                altText:"image5",
                link: ""
            },
            {
                identity:"Test",
                description:"Testing description in test",
                index: 5,
                imageUrl: "/images/slide301.webp",
                altText:"image6",
                link: ""
            },{
                identity:"Drinks",
                description:"Testing description in drinks",
                index: 1,
                imageUrl: "/images/slide2.webp",
                altText:"image2",
                link: ""
            },
            {
                identity:"Fabrics",
                description:"Testing description in fabrics",
                index: 2,
                imageUrl: "/images/slide301.webp",
                altText:"image3",
                link: ""
            },
            {
                identity:"Dry Grains",
                description:"Testing description in grains",
                index: 3,
                imageUrl: "/images/slide4.webp",
                altText:"image4",
                link: ""
            },
            {
                identity:"Cleaning",
                description:"Testing description in cleaning",
                index: 4,
                imageUrl: "/images/slide2.webp",
                altText:"image5",
                link: ""
            },
            {
                identity:"Test",
                description:"Testing description in test",
                index: 5,
                imageUrl: "/images/slide301.webp",
                altText:"image6",
                link: ""
            },
        ]
    },
    {
        persist: true,
        storageKey: 'storeCategoryState',
        storageType: 'sessionStorage',
        enableLogging: false,
    }
);

export default storeCategoryState;
