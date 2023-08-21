import { createRouter, createWebHistory } from 'vue-router';

import TsPage from "../view/TsPage";
import NotFoundPage from "../components/NotFoundPage";

const routes = [
    {
        path: "/",
        component: TsPage,
        props: true,
    },
    {
        path: "/overview",
        component: NotFoundPage,
    },
    {
        path: "/htdb",
        component: NotFoundPage,
    },
    {
        path: "/tool",
        component: NotFoundPage,
    },
    {
        path: "/list",
        component: NotFoundPage,
    },
    {
        path: "/research",
        component: NotFoundPage,
    },
    {
        path: "/report",
        component: NotFoundPage,
    },
    {
        path: "/:pathMatch(.*)*",
        component: NotFoundPage,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
