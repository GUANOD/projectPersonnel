const routes = {
  userInfo: {
    get: "/user/read",
    update: "/user/update",
    delete: "/user/delete",
  },
  auth: {
    reg: "/auth/reg",
    login: "/auth/login",
    validate: "/auth/validate",
  },
  content: {
    read: "/content/read",
    post: "/content/post",
  },
  // blog: {
  //   post: "/content/blog/post",
  //   search: "/content/blog/search",
  // },
};
export default routes;
