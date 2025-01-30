const baseUrl = import.meta.env.VITE_API_URL;


export const urls = {
    users: {
        allUsers: baseUrl + "/users",
        userById: (id: number) => {
            return baseUrl + "/user" + "/" + id;
        },
    },
    recipes: {
        allrecipes: baseUrl + "/recipes",
        byUserId: (id: number) => {
            return baseUrl + "/carts" + "/user" + "/" + id;
        },
    }
};

export const pathHW = {
    hwTask2: {
        main: 'hw-3-2',
        cart: ':id/cart',
    },
    hwTask3: {
        main: 'hw-3-3',
        cart: 'hw-3-3/:id/cart',
    }
}