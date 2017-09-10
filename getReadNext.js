'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReadNext = exports.filterReadNext = exports.getReadNextRandom = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _ptzMath = require('ptz-math');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getReadNextRandom = function getReadNextRandom(_ref) {
  var nPosts = _ref.nPosts,
      post = _ref.post,
      readNext = _ref.readNext,
      posts = _ref.posts;

  var validPosts = posts.filter(function (p) {
    return p.fields.slug !== post.fields.slug && p.fields.langKey === post.fields.langKey;
  });
  var randomPosts = _ramda2.default.range(0, nPosts + 2).map(function (_) {
    return (0, _ptzMath.getRandomItem)(validPosts);
  });
  return _ramda2.default.take(nPosts, _ramda2.default.concat(readNext, _ramda2.default.uniq(randomPosts)));
};

var filterReadNext = function filterReadNext(nPosts, readNext, posts) {
  return !readNext || !posts ? [] : _ramda2.default.filter(function (p) {
    return _ramda2.default.contains(p.fields.slug, readNext);
  }, posts);
};

var getReadNext = function getReadNext(nPosts, post, posts) {
  var readNext = filterReadNext(nPosts, post.frontmatter.readNext, posts);
  return readNext.length === nPosts ? readNext : getReadNextRandom({ nPosts: nPosts, post: post, readNext: readNext, posts: posts });
};

exports.getReadNextRandom = getReadNextRandom;
exports.filterReadNext = filterReadNext;
exports.getReadNext = getReadNext;