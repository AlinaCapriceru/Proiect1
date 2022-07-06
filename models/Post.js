import express from 'express';
import mongoose from 'mongoose';
import Post from './database/models/Post';

const PostSchema = new mongoose.Schema({
    title: String,
    description: String,
    content: String
});

const Post = mongoose.model('Post', PostSchema);

async function savePost() {
    const post = new Post({
        title: "The Legend of wilde wine",
        description: "Legenda spune ca trebuie sa gusti",
        content: "Cel mai iubit dintre pamanteni"
    });
    const result = await post.save();
    console.log(result);
}

savePost();
//Read) Documents in MongoDB
async function getPosts() {
    const posts = await Post.find();
    console.log(posts);
}

getPosts();

//Passing a filter to find()
async function getPosts() {
    const posts = await Post.find({
        title: "The Legend of wilde wine"
    });
    console.log(posts);
}

getPosts();


module.exports = Post;