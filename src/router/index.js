import { createMemoryHistory, createRouter } from 'vue-router';
import bookView from '../views/bookView.vue';
import customerView from '../views/customerView.vue';
import rentalView from '../views/rentalView.vue';
import FormView from '../views/FormView.vue';

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
        component: FormView
    },
    { 
        path: '/customerAction', 
        component: FormView
    },
    { 
        path: '/rentalAction', 
        component: FormView
    },
];

const router = createRouter({
    history: createMemoryHistory(),
    routes,
});

export default router;