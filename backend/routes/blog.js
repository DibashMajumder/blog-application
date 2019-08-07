const express = require('express');
const appConfig = require('../config/appConfig');
const blogController = require('../controllers/blogController');

let setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/blogs`;
    
    app.get(`${baseUrl}/all`, blogController.getAllBlogs);
    app.get(`${baseUrl}/view/:blogId`, blogController.viewByBlogId);
    app.get(`${baseUrl}/view/author/:author`, blogController.viewByAuthor);
    app.get(`${baseUrl}/view/category/:category`, blogController.viewByCategory);
    app.get(`${baseUrl}/:blogId/count/view`, blogController.increaseBlogView);
    app.post(`${baseUrl}/create`, blogController.createBlog);
    app.post(`${baseUrl}/:blogId/delete`, blogController.deleteBlog);
    app.put(`${baseUrl}/:blogId/edit`, blogController.editBlog);
}

module.exports = {
    setRouter: setRouter
}