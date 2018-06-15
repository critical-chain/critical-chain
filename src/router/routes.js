export default [
  {
    path: "/",
    component: () => import("components/EstimationsList.vue")
  },
  {
    path: "/estimation/:id",
    name: "estimation",
    component: () => import("components/Estimation.vue"),
    props: true
  },
  { // Always leave this as last one
    path: "*",
    component: () => import("pages/404")
  }
];
