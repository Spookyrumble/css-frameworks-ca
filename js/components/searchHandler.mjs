/**
 *
 * @param {*} posts
 * @param {*} value
 * @returns
 */
export function filterPostsByValue(posts, value) {
  const filteredPosts = posts.filter((post) => {
    const postTitle = post.title.rendered.toLowerCase();
    const postContent = post.content.rendered.toLowerCase();
    return postTitle.includes(value) || postContent.includes(value);
  });
  return filteredPosts;
}
