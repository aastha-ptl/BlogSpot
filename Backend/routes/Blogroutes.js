const express = require('express');
const router = express.Router();
const blogController = require('../controller/Blogcontroller');
const auth = require('../Middleware/authmiddleware');
const multer = require('multer');
const path = require('path');
//save images to uploads/blog-images folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/blog-images');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); 
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;
        cb(null, uniqueName);
    }
});
const upload = multer({ storage });
// Routes
router.post('/', auth, upload.single('image'), blogController.createBlog);
router.get('/', blogController.getAllBlogs);
router.get('/myblogs', auth, blogController.getUserBlogs); 
router.patch('/views/:id', blogController.incrementView);
router.patch('/likes/:id', auth, blogController.toggleLike);
router.post('/comments/:id', auth, blogController.addComment);
router.put('/:id', auth, upload.single('image'), blogController.updateBlog);
router.get('/blogs/:id', auth, blogController.getSingleBlog);
router.delete('/:id', auth, blogController.deleteBlog);
router.get('/gusetview/:id',blogController.getPublicBlogView);
router.get('/:id/secure', auth, blogController.getBlogDetailsForUser);



module.exports = router;
