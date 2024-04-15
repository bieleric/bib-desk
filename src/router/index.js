import { createMemoryHistory, createRouter } from 'vue-router';
import bookView from '../views/bookView.vue';
import customerView from '../views/customerView.vue';
import rentalView from '../views/rentalView.vue';
import newBookEntryView from '../views/newBookEntryView.vue';

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
        path: '/newBookEntry', 
        component: newBookEntryView
    },
];

const router = createRouter({
    history: createMemoryHistory(),
    routes,
});

export default router;