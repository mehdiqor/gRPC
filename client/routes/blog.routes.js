const { listBlog, createBlog, updateBlog, deleteBlog, getBlog } = require("../controllers/blog.controller");

const router = require("express").Router();

router.get("/create", createBlog);
router.get("/update", updateBlog);
router.get("/list", listBlog);
router.get("/:id", getBlog);
router.get("/delete/:id", deleteBlog);

module.exports = {
    BlogRoutes : router
}