import React, { useState ,useEffect} from 'react';
import NewPostForm from './NewPost';
import { AiOutlineSend } from 'react-icons/ai';
import { FiMoreHorizontal, FiSend, FiMessageSquare, FiHeart, FiSmile, FiBookmark } from 'react-icons/fi';
import { RxAvatar } from 'react-icons/rx';
import CardPost from './CardPost';
import axios from 'axios';
import FeedSkeleton from './FeedSkeleton';

  
const Posts = ({user}) => {
  const [posts, setPosts] = useState([]);
  const [username,setUserName]=useState(user.username);
  const [isPostPresent,setIsPostPresent]=useState(false);
  const [postError,setPostError]=useState(false);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.post('http://localhost:8080/posts',  {username} );
        setPosts(response.data);
        setIsPostPresent(true);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPostError(true);
      }
    };

    fetchPosts();
  }, [user.username]);
  const [file, setFile] = useState(null);
  const [toggleLike, setToggleLike] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleAddComment = (postId, newComment) => {
    console.log(`Adding comment "${newComment}" to post with ID ${postId}`);
  };

  const handleLikes = () => {
    setToggleLike(!toggleLike);
  };
  const handleUpload = async (newPost,image,file) => {
    const formData = new FormData();
    formData.append('username', user.username ); 
    formData.append('imageUrl', image); 
    formData.append('caption',newPost ); 
    formData.append('image', file);
    try {
      const response = await axios.post('http://localhost:8080/newpost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Post created:', response.data);
    } catch (error) {
      console.error('Request failed:', error.message);
    }
  };
  const handleAddPost = (newPost,image,file) => {    
    handleUpload(newPost,image,file);
    const newPostObj = {
      username: user.username, 
      imageUrl: image, 
      caption: newPost,
      likes: 0,
      comments: 0,
    };
    setPosts((prevPosts) => [newPostObj, ...prevPosts]);
  };
  return (
    <div className="flex justify-center items-center bg-gray-50">
      <div className="max-w-3xl max-w-[40rem] p-4">
        <NewPostForm onAddPost={handleAddPost} user={user} />
       
        {isPostPresent ?(
        posts.map((post) => (
          <div key={post.id} className="bg-white mt-4 rounded-lg border-[1px]">
            <div className="flex flex-row my-2 items-center pl-3">
              <RxAvatar className="h-9 w-9" />
              <div className="flex flex-col grow mx-2">
                <p className="text-sm font-semibold">{post.username}</p>
              </div>
              <FiMoreHorizontal className="mr-2 h-6 w-6 ml-4 hover:text-purple-500 cursor-pointer" />
            </div>
            {post.imageUrl?(
            <img draggable={false} className="max-h-[30rem] min-h-[30rem] min-w-[30rem] max-w-[30rem] object-cover object-center" src={post.imageUrl} alt="" />
            ):(
              <div>
                  <CardPost content={post.caption}/>
              </div>
            )
          }
            <div className="flex flex-row m-1">
            {post.isLiked ? (
    <FiHeart
      onClick={() => {
        setPosts((prevPosts) =>
          prevPosts.map((prevPost) =>
            prevPost.id === post.id ? { ...prevPost, isLiked: false } : prevPost
          )
        );
      }}
      className="h-6 w-6 ml-1 cursor-pointer text-purple-500"
    />
  ) : (
    <FiHeart
      onClick={() => {
        setPosts((prevPosts) =>
          prevPosts.map((prevPost) =>
            prevPost.id === post.id ? { ...prevPost, isLiked: true } : prevPost
          )
        );
      }}
      className="h-6 w-6 ml-1 hover:text-purple-500 cursor-pointer"
    />
  )}
              <FiMessageSquare className="h-6 w-6 ml-4 hover:text-purple-500 cursor-pointer" />
              <FiSend className="h-6 w-6 ml-4 hover:text-purple-500 cursor-pointer" />
              <div className="grow">
                <FiBookmark className="float-right h-6 w-6 hover:text-red-600 cursor-pointer " />
              </div>
            </div>
            <div className="ml-3">
              {post.isLiked ? (
                post.likes>0?(
                <div>
                  <p className="text-sm">
                    Like by{' '}
                    <span className="font-semibold">{post.username}</span> and{' '}
                    <span className="font-semibold">{post.likes} others</span>
                  </p>
                </div>):(
                  <div>
                  <p className="text-sm">
                    Liked by{' '}
                    <span className="font-semibold">{post.username}</span>
                  </p>
                </div>
                )
              ) : (
                post.likes>0?(
                <span className="text-sm font-semibold">{post.likes} likes</span>
                ):(
                  <span className="text-sm font-semibold">Be the first one to like</span>

                )
              )}
            </div>
            <div className="mx-3 my-2">
              <p className="text-sm">
                <span className="font-semibold">{post.username}</span> {post.caption}
              </p>
            </div>
           { post.comments>0&&(
            <div className="mx-3 my-2">
              <p className="text-sm font-medium text-secondary-text">
                View all {post.comments} comments
              </p>
            </div>)
            }
            <div className="mx-3 my-2 text-secondary-text text-[10px]">{post.createdTime}</div>
            <div className="flex flex-row items-center border-t-[1px] border-t-post-separator mx-1 py-2">
              <FiSmile className="h-6 w-6 ml-1 hover:text-yellow-500 cursor-pointer" />
              <div className="grow">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="w-full pl-1 pr-5 h-5 focus:outline-none focus:border-transparent"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddComment(post.id, e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
              </div>
              <button className="mr-3 text-primary-button font-semibold">
                <AiOutlineSend className="w-6 h-6 hover:text-green-700 cursor-pointer" />
              </button>
            </div>
          </div>
        ))):
        (
          <FeedSkeleton/>
        )
}
        
      </div>
    </div>
  );
};

export default Posts;
