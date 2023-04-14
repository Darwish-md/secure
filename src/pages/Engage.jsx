import React, { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { getAllPosts, tipPostOwner, uploadPost } from '../service/socialContractUtils'
import { FiHeart } from 'react-icons/fi';
import Loader from "../components/shared/Loader";

export default function Engage() {
    const [posts, setPosts] = useState([])
    const [hasProfile, setHasProfile] = useState(false)
    const [post, setPost] = useState([])
    const [address, setAddress] = useState('')
    const [loading, setLoading] = useState(true)

    const loadPosts = async () => {
        const [address, balance, returnedPosts] = await getAllPosts();
        setAddress(address);
        setHasProfile(() => balance > 0);
        setPosts(returnedPosts);
        setLoading(false);
    }
    useEffect(() => {
        async function fetchPosts() {
          await loadPosts();
        }
        fetchPosts();
    }, []);

    const publish = async () => {
        if (!post) return
        setLoading(true);
        await uploadPost(post);
        loadPosts();
    }
    const tip = async (post) => {
        // tip post owner
        await tipPostOwner(post);
        loadPosts()
    }

    return loading ? (
      <div className="flex w-full justify-center">
        <Loader />
      </div>
    ) : (
      <div className="container-fluid mt-5">
        {hasProfile ? (
          <div className="row">
            <main
              role="main"
              className="col-lg-12 mx-auto"
              style={{ maxWidth: "500px" }}
            >
              <div className="mx-auto">
                <div className="g-4">
                  <div className="bg-white text-black p-4 rounded-md shadow-md">
                    <textarea
                      className="w-full border-0 focus:outline-none text-lg resize-none"
                      style={{ minHeight: "100px" }}
                      onChange={(e) => setPost(e.target.value)}
                      placeholder="What's happening?"
                      required
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        onClick={publish}
                        className="bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full shadow-md text-white px-6 py-2"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        ) : (
          <div className="text-center">
            <main style={{ padding: "1rem 0" }}>
              <h2>Must own an NFT to post</h2>
            </main>
          </div>
        )}
        <p>&nbsp;</p>
        <hr />
        <p className="my-auto">&nbsp;</p>
        {posts.length > 0 ? (
          posts.map((post, key) => {
            return (
              <div
                key={key}
                className="block max-w-lg mx-auto mb-4 border border-gray-900 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl p-4 shadow"
                style={{ width: "1000px" }}
              >
                <div className="flex items-center mb-2">
                  <img
                    className="mr-2"
                    width="30"
                    height="30"
                    src={post.author.avatar}
                  />
                  <small className="ms-2 me-auto d-inline">
                    {post.author.username}
                  </small>
                  <small className="mt-1 float-end d-inline">
                    {post.author.address}
                  </small>
                </div>
                <div className="text-lg mb-3">{post.content}</div>
                <div className="flex items-center">
                  <div className="text-sm text-gray-500">
                    {ethers.utils.formatEther(post.tipAmount)} ETH
                  </div>
                  {address === post.author.address || !hasProfile ? null : (
                    <button
                      onClick={() => tip(post)}
                      className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-auto"
                    >
                      <FiHeart className="mr-1" /> Support Me
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center">
            <main style={{ padding: "1rem 0" }}>
              <h2>No posts yet</h2>
          </main>
        </div>
      )}
    </div>
  );
}
