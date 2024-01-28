const { ObjectId } = require('mongodb');
const dbo = require("../database/dbcon");

const { Readable } = require('stream');

 const InsertPost = async (req, res) => {
    try {
        if (!req.file) {
          return res.status(400).json({ error: 'No file uploaded' });
        }
    
        const database =  await dbo.getDb();
        const postsCollection = database.collection('Posts');
            const bufferStream = new Readable();
        if(req.file.buffer)
        {
        bufferStream.push(req.file.buffer);
        bufferStream.push(null);
        }else{
         bufferStream.push("")
        }
        const newPost = {
          username: req.body.username,
          imageUrl: req.body.imageUrl,
          image: bufferStream,
          caption: req.body.caption,
          likes: [],
          comments: [],
          isLiked: false,
        };    
        const result = await postsCollection.insertOne(newPost);

        if (result) {
        res.json(result);
        }           
        else {
  res.status(500).json({ error: 'Failed to insert post' });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

const GetPosts= async (req, res) => {
  try {
    const { username } = req.body;

    const database =  await dbo.getDb();
    const usersCollection = database.collection('Users');
    const postsCollection = database.collection('Posts');

    const user = await usersCollection.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Extract the list of friends from the user document
    const friendsList = user.friends || [];

    // Query for posts where the username matches or the username is in the list of friends
    const posts = await postsCollection.find({
      $or: [
        { username: username },
        { 'user.username': { $in: friendsList } }
      ]
    }).toArray();

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {InsertPost,GetPosts};
