import { createMemoryHistory, createRouter } from 'vue-router';
import bookView from '../views/bookView.vue';
import customerView from '../views/customerView.vue';
import rentalView from '../views/rentalView.vue';
import BookFormView from '../views/BookFormView.vue';

const routes = [
    { 
        path: '/', 
        component: bookView 
    },
    { 
        path: '/customers', 
        component: customerView 
    },
    { 
        path: '/rental', 
        component: rentalView 
    },
    { 
        path: '/bookAction', 
        component: BookFormView
    },
];

const router = createRouter({
    history: createMemoryHistory(),
    routes,
});

export default router;