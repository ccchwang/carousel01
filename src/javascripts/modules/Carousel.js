import _throttle from 'lodash.throttle';

export default class Carousel {
  constructor(el) {
    this.el = el;
    this.init();
    this.bindEvents();
  }

  init() {
    let viewports = this.el.getElementsByClassName('carousel__viewport');
    this.lgViewportMap = this.setViewport(viewports[1], 'lgViewport');
    this.smViewportMap = this.setViewport(viewports[0], 'smViewport');

    let buttons = this.el.getElementsByClassName('controls');
    this.nextButton = buttons[1];
    this.prevButton = buttons[0];
  }

  setViewport(viewport, viewportName) {
    let viewportMap = [];
    let items = [].slice.call(viewport.getElementsByClassName('item-wrapper'));
    this.cacheDetails(items, viewportMap, viewportName);

    return viewportMap;
  }

  cacheDetails(items, viewportMap, viewportName) {
    items.forEach((item, i) => {
      let lastIndex = items.length - 1;
      let next = i === lastIndex ? 0 : i + 1;
      let prev = i === 0 ? lastIndex : i - 1;

      viewportMap[i] = { item, next, prev, index: i+1 };

      //set active item
      if (item.classList.value.includes('-active')) {
        this[`${viewportName}Active`] = viewportMap[i];
      }
    })
  }

  bindEvents() {
    this.nextButton.addEventListener('click', _throttle(this.onClick.bind(this, 'next'), 1500));
    this.prevButton.addEventListener('click', _throttle(this.onClick.bind(this, 'prev'), 1500));
  }

  onClick(direction) {
    let movePos = direction === 'next' ? 'Left' : 'Right';
    let placePos = direction === 'next' ? 'Right' : 'Left';

    //set next sibling node from map
    let sibNode_L = this.lgViewportMap[this.lgViewportActive[direction]];
    let sibNode_S = this.smViewportMap[this.smViewportActive[direction]];

    //set next sibling element
    let sib_L = sibNode_L.item;
    let sib_S = sibNode_S.item;

    //set currently active element
    let active_L = this.lgViewportActive.item;
    let active_S = this.smViewportActive.item;

    this.placeSibling(sib_L, sib_S, placePos);
    this.moveElements(active_L, active_S, sib_L, sib_S, movePos);
    this.removeClasses(active_L, active_S, sib_L, sib_S, movePos, placePos);
    this.setNewActive(sib_L, sib_S, sibNode_L, sibNode_S);
  }

  placeSibling(sib_L, sib_S, pos) {
    sib_L.classList.add(`-place${pos}`);
    sib_S.classList.add(`-place${pos}`);
  }

  moveElements(active_L, active_S, sib_L, sib_S, pos) {
    setTimeout(function() {
      active_L.classList.add(`-move${pos}`);
      active_S.classList.add(`-move${pos}`);

      sib_L.classList.add(`-move${pos}`);
      sib_S.classList.add(`-move${pos}`);
    }, 50)
  }

  removeClasses(active_L, active_S, sib_L, sib_S, movePos, placePos) {
    setTimeout(function() {
      active_L.classList.remove('-active');
      active_L.classList.remove(`-move${movePos}`);
      active_S.classList.remove('-active');
      active_S.classList.remove(`-move${movePos}`);

      sib_L.classList.remove(`-move${movePos}`);
      sib_L.classList.remove(`-place${placePos}`);
      sib_S.classList.remove(`-move${movePos}`);
      sib_S.classList.remove(`-place${placePos}`);
    }, 1400)
  }

  setNewActive(sib_L, sib_S, sibNode_L, sibNode_S) {
    setTimeout(() => {
      sib_L.classList.add('-active');
      sib_S.classList.add('-active');

      this.lgViewportActive = sibNode_L;
      this.smViewportActive = sibNode_S;
    }, 1400)
  }
}

