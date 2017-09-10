import R from 'ramda';
import {getRandomItem} from 'ptz-math';

const getReadNextRandom = ({ nPosts, post, readNext, posts }) => {
  const validPosts = posts.filter(p =>
    p.fields.slug !== post.fields.slug &&
      p.fields.langKey === post.fields.langKey);
  const randomPosts = R.range(0, nPosts + 2).map(_ => getRandomItem(validPosts));
  return R.take(nPosts, R.concat(readNext, R.uniq(randomPosts)));
};
  
const filterReadNext = (nPosts, readNext, posts) => {
  return !readNext || !posts
    ? []
    : R.filter(p => R.contains(p.fields.slug, readNext), posts);
};
  
const getReadNext = (nPosts, post, posts) => {
  const readNext = filterReadNext(nPosts, post.frontmatter.readNext, posts);
  return readNext.length === nPosts
    ? readNext
    : getReadNextRandom({ nPosts, post, readNext, posts });
};

export {
  getReadNextRandom,
  filterReadNext,
  getReadNext
};
