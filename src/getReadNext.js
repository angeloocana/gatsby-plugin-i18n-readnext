import R from 'ramda';
import {getRandomItem} from 'ptz-math';

/*eslint max-params: ["error", 4]*/

/**
 * Concat random posts to readNext list
 * @param {number} nPosts total number of posts
 * @param {Post} post post node
 * @param {[Post]} readNext read next post list
 * @param {[Posts]} posts all posts
 * @returns {[Posts]} random posts
 */
const getReadNextRandom = (nPosts, post, readNext, posts) => {
  const validPosts = posts.filter(p =>
    p.fields.slug !== post.fields.slug &&
      p.fields.langKey === post.fields.langKey);
  const randomPosts = R.range(0, nPosts + 2).map(_ => getRandomItem(validPosts));
  return R.take(nPosts, R.concat(readNext, R.uniq(randomPosts)));
};

/**
 * get read next posts from selected posts in post.frontmatter.readNext
 * @param {*} nPosts total number of posts
 * @param {*} post post to get the selected read next slug list
 * @param {*} posts all posts
 * @returns {[Posts]} selected posts
 */
const getReadNextSelected = (nPosts, post, posts) => {
  return !post.frontmatter.readNext || !posts
    ? []
    : R.filter(p => R.contains(p.fields.slug, post.frontmatter.readNext), posts);
};

/**
 * get read next posts and concat random posts to complete if needed
 * @param {*} nPosts total number of posts
 * @param {*} post post to get the selected read next slug list
 * @param {*} posts all posts
 * @returns {[Posts]} selected posts + random posts
 */
const getReadNext = (nPosts, post, posts) => {
  const readNext = getReadNextSelected(nPosts, post, posts);

  return readNext.length === nPosts
    ? readNext
    : getReadNextRandom(nPosts, post, readNext, posts);
};

export {
  getReadNextRandom,
  getReadNextSelected,
  getReadNext
};
