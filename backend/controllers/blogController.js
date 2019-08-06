const mongoose = require('mongoose');
const shortId = require('shortid');
const time = require('../libs/timeLib');
const response = require('../libs/responseLib');
const logger = require('../libs/loggerLib');
const check = require('../libs/checkLib');

const BlogModel = mongoose.model('Blog');

//read all blogs
let getAllBlogs = (req, res) => {
    BlogModel.find()
    .select('-_V -_id')
    .lean()
    .exec((err, result) => {
        if(err) {
            console.log(err);
            logger.error(err.message, 'BlogController: getAllBlogs', 10);
            let apiResponse = response.generate(true, 'Failed to find blog details', 500, null);
            res.send(apiResponse);
        } else if(check.isEmpty(result)) {
            logger.info('No blog found', 'blogController: getAllBlogs');
            let apiResponse = response.generate(true, 'No blog found', 404, null);
            res.send(apiResponse);
        } else {
            let apiResponse = response.generate(false, 'All blog details found', 200, result);
            res.send(apiResponse);
        }
    })
}

//read single blog
let viewByBlogId = (req, res) => {
    if(check.isEmpty(req.params.blogId)) {
        console.log('Blog ID should be passed in the request');
        let apiResponse = response.generate(true, 'Blog Id is missing', 403, null);
        res.send(apiResponse);
    } else {
        BlogModel.findOne({ 'blogId': req.params.blogId }, (err, result) => {
            if(err) {
                console.log('Error occured while fetching blog details');
                logger.error(`Error Occured: ${err}`, Database, 10);
                let apiResponse = response.generate(true, 'Error Occured', 500, null);
                res.send(apiResponse);
            } else if (check.isEmpty(result)) {
                logger.info('Requested blog not found', 'blogController: viewByBlogId');
                let apiResponse = response.generate(true, 'Requested blog not found', 404, null);
                res.send(apiResponse);
            } else {
                logger.info('Requested blog found successfully', 'blogController: viewByBlogId', 5);
                let apiResponse = response.generate(false, 'Requested Blog found successfully', 200, result);
                res.send(apiResponse);
            }
        })
    }
}


//read blogs by category
let viewByCategory = (req, res) => {
    if (check.isEmpty(req.params.categoryId)) {
        console.log('categoryId should be passed');
        let apiResponse = response.generate(true, 'CategoryId is missing', 403, null);
        res.send(apiResponse);
    } else {
        BlogModel.find({ 'category': req.params.category }, (err, result) => {
            if (err) {
                console.log('Error Occured while looking for category')
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                console.log('Blogs Not Found.')
                let apiResponse = response.generate(true, 'Blogs Not Found', 404, null)
                res.send(apiResponse)
            } else {
                console.log('Blogs Found Successfully')
                let apiResponse = response.generate(false, 'Blogs Found Successfully.', 200, result)
                res.send(apiResponse)
            }
        })
    }
}


//read blogs by author
let viewByAuthor = (req, res) => {
    if (check.isEmpty(req.params.author)) {
        console.log('author should be passed');
        let apiResponse = response.generate(true, 'author is missing', 403, null);
        res.send(apiResponse);
    } else {
        BlogModel.find({ 'author': req.params.author }, (err, result) => {
            if (err) {
                console.log('Error Occured while looking for author');
                logger.error(`Error Occured : ${err}`, 'Database', 10);
                let apiResponse = response.generate(true, 'Error Occured.', 500, null);
                res.send(apiResponse);
            } else if (check.isEmpty(result)) {
                console.log('Blogs Not Found.');
                let apiResponse = response.generate(true, 'Blogs Not Found', 404, null);
                res.send(apiResponse);
            } else {
                console.log('Blogs Found Successfully');
                let apiResponse = response.generate(false, 'Blogs Found Successfully.', 200, result);
                res.send(apiResponse);
            }
        })
    }
}

//edit blog
let editBlog = (req, res) => {
    if(check.isEmpty(req.params.blogId)) {
        console.log('Blog Id should be passed to edit the blog');
        let apiResponse = response.generate(true, 'blog id to edit is missing',403, null);
        res.send(apiResponse);
    } else {
        let options = req.body;
        console.log(options);
        BlogModel.update({ 'blogId': req.params.blogId }, options, { multi: true })
            .exec((err, result) => {
                if(err) {
                    console.log('Error occured to edit blog');
                    logger.error(`Errro Occured: ${err}`, 'Database', 10);
                    let apiResponse = response.generate(true, 'Error Occured to edit blog', 500, null);
                    res.send(apiResponse);
                } else if (check.isEmpty(result)) {
                    console.log('Blog Not Found.')
                    let apiResponse = response.generate(true, 'Blog Not Found',404, null);
                    res.send(apiResponse);
                } else {
                    console.log('Blog Edited Successfully');
                    let apiResponse = response.generate(false, 'Blog Edited Successfully.', 200, result);
                    res.send(apiResponse);
                }
            })
    }
}

//delete blog
let deleteBlog = (req, res) => {
    if (check.isEmpty(req.params.blogId)) {
        console.log('blogId should be passed');
        let apiResponse = response.generate(true, 'blogId is missing', 403, null);
        res.send(apiResponse);
    } else {
        BlogModel.remove({
            'blogId': req.params.blogId
        }, (err, result) => {
            if (err) {
                console.log('Error Occured.');
                logger.error(`Error Occured : ${err}`, 'Database', 10);
                let apiResponse = response.generate(true, 'Error Occured.', 500, null);
                res.send(apiResponse);
            } else if (check.isEmpty(result)) {
                console.log('Blog Not Found.');
                let apiResponse = response.generate(true, 'Blog Not Found.', 404, null);
                res.send(apiResponse);
            } else {
                console.log('Blog Deletion Success');
                let apiResponse = response.generate(false, 'Blog Deleted Successfully', 200, result);
                res.send(apiResponse);
            }
        })
    }
}

//create blog
let createBlog = (req, res) => {
    let blogCreateFunction = () => {
        return new Promise((resolve, reject) => {
            console.log(req.body);
            if(check.isEmpty(req.body.title) || check.isEmpty(req.body.description) || check.isEmpty(req.body.blogBody) || check.isEmpty(req.body.category)) {
                console.log('403, Forbidden request');
                let apiResponse = response.generate(true, 'Required parameters are missing', 403, null);
                reject(apiResponse);
            } else {
                let today = Date.now();
                let blogId = shortId.generate();
                let newBlog = new BlogModel({
                    blogId: blogId,
                    title: req.body.title,
                    description: req.body.description,
                    bodyHtml: req.body.blogBody,
                    isPublished: true,
                    category: req.body.category,
                    author: req.user.fullName,
                    created: today,
                    lastModified: today
                })

                let tags = (req.body.tags!= undefined && req.body.tags!= null && req.body.tags!= '') ? req.body.tags.split(','): [];
                newBlog.tags = tags;

                newBlog.save((err, result) => {
                    if(err) {
                        console.log('Error occured');
                        logger.error(`Error Occured: ${err}`, 'Database', 10);
                        let apiResponse = response.generate(true, 'Error Occured', 500, null);
                        reject(apiResponse);
                    } else {
                        console.log('Blog Created Successfully');
                        resolve(result);
                    }
                })
            }
        })
    }

    blogCreateFunction()
        .then((result) => {
            let apiResponse = response.generate(false, 'Blog created successfully', 200, result);
            res.send(apiResponse);
        })
        .catch((error) => {
            console.log(error);
            res.send(error);
        })
}

//increase blog view
let increaseBlogView = (req, res) => {
    if(check.isEmpty(req.params.blogId)) {
        console.log('Blog Id should be passed to increment blog view count');
        let apiResponse = response.generate(true, 'blog Id is missing', 403, null);
        res.send(apiResponse);
    } else {
        BlogModel.findOne({ 'blogId': req.params.blogId }, (err, result) => {
            if(err) {
                console.log('Error occured while finding blog to increase view');
                logger.error(`Error Occured: ${err}`, 'Database', 10);
                let apiResponse = response.generate(true, 'Error Occured', 500, null);
                res.send(apiResponse);
            } else if (check.isEmpty(result)) {
                console.log('Blog Not Found.')
                let apiResponse = response.generate(true, 'Blog Not Found', 404, null);
                res.send(apiResponse);
            } else {
                result.views += 1;
                result.save((err, result) => {
                    if (err) {
                        console.log('Error Occured.')
                        logger.error(`Error Occured : ${err}`, 'Database', 10)
                        let apiResponse = response.generate(true, 'Error Occured While saving blog', 500, null)
                        res.send(apiResponse)
                    } else {
                        console.log('Blog Updated Successfully')
                        let apiResponse = response.generate(false, 'Blog Updated Successfully.', 200, result)
                        res.send(apiResponse)
                    }
                });
            }
        });
    }
}

module.exports = {

    getAllBlogs: getAllBlogs,
    createBlog: createBlog,
    viewByBlogId: viewByBlogId,
    viewByCategory: viewByCategory,
    viewByAuthor: viewByAuthor,
    editBlog: editBlog,
    deleteBlog: deleteBlog,
    increaseBlogView: increaseBlogView
} // end exports