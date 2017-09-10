'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReadNext = exports.getReadNextSelected = exports.getReadNextRandom = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _ptzMath = require('ptz-math');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*eslint max-params: ["error", 4]*/

/**
 * Concat random posts to readNext list
 * @param {number} nPosts total number of posts
 * @param {Post} post post node
 * @param {[Post]} readNext read next post list
 * @param {[Posts]} posts all posts
 * @returns {[Posts]} random posts
 */
var getReadNextRandom = function getReadNextRandom(nPosts, post, readNext, posts) {
  var validPosts = posts.filter(function (p) {
    return p.fields.slug !== post.fields.slug && p.fields.langKey === post.fields.langKey;
  });
  var randomPosts = _ramda2.default.range(0, nPosts + 2).map(function (_) {
    return (0, _ptzMath.getRandomItem)(validPosts);
  });
  return _ramda2.default.take(nPosts, _ramda2.default.concat(readNext, _ramda2.default.uniq(randomPosts)));
};

/**
 * get read next posts from selected posts in post.frontmatter.readNext
 * @param {*} nPosts total number of posts
 * @param {*} post post to get the selected read next slug list
 * @param {*} posts all posts
 * @returns {[Posts]} selected posts
 */
var getReadNextSelected = function getReadNextSelected(nPosts, post, posts) {
  return !post.frontmatter.readNext || !posts ? [] : _ramda2.default.filter(function (p) {
    return _ramda2.default.contains(p.fields.slug, post.frontmatter.readNext);
  }, posts);
};

/**
 * get read next posts and concat random posts to complete if needed
 * @param {*} nPosts total number of posts
 * @param {*} post post to get the selected read next slug list
 * @param {*} posts all posts
 * @returns {[Posts]} selected posts + random posts
 */
var getReadNext = function getReadNext(nPosts, post, posts) {
  var readNext = getReadNextSelected(nPosts, post, posts);

  return readNext.length === nPosts ? readNext : getReadNextRandom(nPosts, post, readNext, posts);
};

exports.getReadNextRandom = getReadNextRandom;
exports.getReadNextSelected = getReadNextSelected;
exports.getReadNext = getReadNext;