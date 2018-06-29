import Fuse from 'fuse.js';

let fuse;

const initSearch = (list, keys) => {
  const options = {
    caseSensitive: false,
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [...keys],
  };

  fuse = new Fuse(list, options); // "list" is the item array
};

const findMatches = text => fuse.search(text);

export default { initSearch, findMatches };
