// import Modal from 'components/Modal/Modal';
import React, { useEffect, useState } from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import { fetchPosts } from 'services/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const toastConfig = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
};

export const HomePage = () => {
  // const [modal, setModal] = useState({ isOpen: false, visibleData: null });
  const [posts, setPosts] = useState(
    () => JSON.parse(localStorage.getItem('posts')) ?? []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // const onOpenModal = data => {
  //   setModal({
  //     isOpen: true,
  //     visibleData: data,
  //   });
  // };

  // const onCloseModal = () => {
  //   setModal({
  //     isOpen: false,
  //     visibleData: null,
  //   });
  // };

  // const onSelectPostId = postId => {
  //   setSelectedPostId(postId);
  // };

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setIsLoading(true);
        const posts = await fetchPosts();
        setPosts(posts);
        toast.success('Your posts were successfully fetched!', toastConfig);
      } catch (error) {
        setError(error.message);
        toast.error(error.message, toastConfig);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPostData();
  }, []);

  return (
    <div>
      <h1 className="title-app">React</h1>
      {/* {modal.isOpen && (
        <Modal onCloseModal={onCloseModal} visibleData={modal.visibleData} />
      )} */}
      {error !== null && <p className="c-error"> Oops, error.</p>}
      {isLoading && (
        <ThreeCircles
          visible={true}
          height="100"
          width="100"
          color="#04e4f9"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      )}

      {posts.length > 0 &&
        posts.map(post => {
          return (
            <Link
              //   onClick={() => onSelectPostId(post.id)}
              className="post"
              key={post.id}
              to={`/post/${post.id}`}
            >
              <strong className="post-id">Id: {post.id}</strong>
              <h4 className="post-title"> {post.title} </h4>
              <p className="post-body">{post.body}</p>
            </Link>
          );
        })}
    </div>
  );
};

export default HomePage;
