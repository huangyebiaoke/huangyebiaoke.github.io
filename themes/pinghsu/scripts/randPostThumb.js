var randPostThumb = function() {
  const prefix = '/images/thumbs/';
  return prefix + randomInt(1, 22) + '.jpg';
};

function randomInt(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

hexo.extend.helper.register('randPostThumb', randPostThumb);