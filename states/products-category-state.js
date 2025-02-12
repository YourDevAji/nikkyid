const productsCategoryState = new HtmlState(

    {
        collections: [
            {
                identity:"Best Selling",
                description:"Testing description in foods",
                index: 0,
                link: "",
                products: [
                    {
                        name: "Apple Snails",
                        buttonText: "Add To Cart",
                        image: "/images/slide2.webp",
                        altText: "Apple Snails",
                        price: 4.88,
                        currency: "€",
                        discount: null, // No discount
                        isNew: true,
                        variation: "Standard",
                        measurement: "500g",
                    },
                    {
                        name: "Bitter-Leaves / Ndoleh / Ewuro",
                        buttonText: "Add To Cart",
                        image: "/images/slide2.webp",
                        altText: "Bitter Leaves",
                        price: 3.05,
                        currency: "€",
                        discount: null, // No discount
                        isNew: true,
                        variation: "Fresh",
                        measurement: "500g",
                    },
                    {
                        name: "Tilapia Fish Steaks (Frozen)",
                        buttonText: "Add To Cart",
                        image: "/images/slide2.webp",
                        altText: "Tilapia Fish Steaks",
                        price: 7.69,
                        currency: "€",
                        discount: 6.99, // Discounted price
                        isNew: true,
                        variation: "Frozen",
                        measurement: "1kg",
                    },
                    {
                        name: "African Beauty Palm Oil",
                        buttonText: "Add To Cart",
                        image: "/images/slide2.webp",
                        altText: "African Beauty Palm Oil",
                        price: 3.18,
                        currency: "€",
                        discount: null, // No discount
                        isNew: true,
                        variation: "Pure Red Palm Oil",
                        measurement: "500ml",
                    },
                    {
                        name: "Baobab Seeds",
                        buttonText: "Add To Cart",
                        image: "/images/slide2.webp",
                        altText: "Baobab Seeds",
                        price: 5.75,
                        currency: "€",
                        discount: null, // No discount
                        isNew: true,
                        variation: "Raw",
                        measurement: "500g",
                    },
                ]
            },
            {
                identity:"Drinks",
                description:"Testing description in drinks",
                index: 1,
                link: "",
                products: [

                ]
            },
            {
                identity:"Fabrics",
                description:"Testing description in fabrics",
                index: 2,
                link: "",
                products: [

                ]
            },
            {
                identity:"Dry Grains",
                description:"Testing description in grains",
                index: 3,
                link: "",
                products: [

                ]
            },
            {
                identity:"Cleaning",
                description:"Testing description in cleaning",
                index: 4,
                link: "",
                products: [

                ]
            },
            {
                identity:"Test",
                description:"Testing description in test",
                index: 5,
                link: "",
                products: [

                ]
            },{
                identity:"Drinks",
                description:"Testing description in drinks",
                index: 1,
                link: "",
                products: [

                ]
            },
            {
                identity:"Fabrics",
                description:"Testing description in fabrics",
                index: 2,
                link: "",
                products: [

                ]
            },
            {
                identity:"Dry Grains",
                description:"Testing description in grains",
                index: 3,
                link: "",
                products: [

                ]
            },
            {
                identity:"Cleaning",
                description:"Testing description in cleaning",
                index: 4,
                link: "",
                products: [

                ]
            },
            {
                identity:"Test",
                description:"Testing description in test",
                index: 5,
                link: "",
                products: [

                ]
            },
        ]
    },
    {
        persist: true,
        storageKey: 'productsCategoryState',
        storageType: 'sessionStorage',
        enableLogging: false,
    }
);

export default productsCategoryState;
