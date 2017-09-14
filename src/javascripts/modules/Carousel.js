export default class Carousel {
  constructor(el) {
    this.el = el;
    this.init();
    this.bindEvents();
  }

  init() {
    let viewports = this.el.getElementsByClassName('carousel__viewport');
    this.setViewport(viewports[1], 'lgViewport');
    this.setViewport(viewports[0], 'smViewport');

    let buttons = this.el.getElementsByClassName('controls');
    this.prevButton = buttons[0];
    this.nextButton = buttons[1];

    this.counter = this.el.getElementsByClassName('counter')[0];
  }

  setViewport(viewport, viewportName) {
    //initialize map of viewport items
    this[`${viewportName}Map`] = [];

    //get all items inside viewport
    let items = [].slice.call(viewport.getElementsByClassName('item-wrapper'));

    //for each item, cache details in map
    items.forEach((item, i) => {
      let lastIndex = items.length - 1;
      let next = i === lastIndex ? 0 : i + 1;
      let prev = i === 0 ? lastIndex : i - 1;

      this[`${viewportName}Map`][i] = { item, next, prev, index: i+1 };

      //set active item
      if (item.classList.value.includes('-active')) {
        this[`${viewportName}Active`] = this[`${viewportName}Map`][i];
      }
    })
  }

  bindEvents() {
    this.nextButton.addEventListener('click', this.onClick.bind(this, 'next'));
    this.prevButton.addEventListener('click', this.onClick.bind(this, 'prev'));
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


    //disable click on button
    this.nextButton.classList.add('disableClick');
    this.prevButton.classList.add('disableClick');



    /////**********************////change counter
    let goingBack = direction === 'prev' ? true : false;
    let classes = goingBack ? ' pre-animation -backward' : ' pre-animation';
    this.counter.classList += classes;

    setTimeout(function(){
      this.counter.classList.remove('pre-animation')
      this.counter.classList.add('during-animation')
      this.counter.innerHTML = sibNode_L.index;
    }.bind(this), 200)

    setTimeout(function(){
      this.counter.classList.remove('during-animation');

      if (goingBack) { this.counter.classList.remove('-backward'); }
    }.bind(this), 300)
    /////******************////



    //place siblings
    this.placeSibling(sib_L, sib_S, placePos);

    //move elements
    setTimeout(
      this.moveElements.bind(this, active_L, active_S, sib_L, sib_S, movePos)
    , 50)

    //remove classes and set new active element
    setTimeout(function () {
      this.removeClasses(active_L, active_S, sib_L, sib_S, movePos, placePos);
      this.setNewActive(sib_L, sib_S, sibNode_L, sibNode_S);
    }.bind(this), 1400)

  }

  placeSibling(sib_L, sib_S, pos) {
    sib_L.classList.add(`-place${pos}`);
    sib_S.classList.add(`-place${pos}`);
  }

  moveElements(active_L, active_S, sib_L, sib_S, pos) {
    active_L.classList.add(`-move${pos}`);
    active_S.classList.add(`-move${pos}`);

    sib_L.classList.add(`-move${pos}`);
    sib_S.classList.add(`-move${pos}`);
  }

  removeClasses(active_L, active_S, sib_L, sib_S, movePos, placePos) {
    active_L.classList.remove('-active');
    active_L.classList.remove(`-move${movePos}`);
    active_S.classList.remove('-active');
    active_S.classList.remove(`-move${movePos}`);

    sib_L.classList.remove(`-move${movePos}`);
    sib_L.classList.remove(`-place${placePos}`);
    sib_S.classList.remove(`-move${movePos}`);
    sib_S.classList.remove(`-place${placePos}`);

    this.nextButton.classList.remove('disableClick');
    this.prevButton.classList.remove('disableClick');
  }

  setNewActive(sib_L, sib_S, sibNode_L, sibNode_S) {
    sib_L.classList.add('-active');
    sib_S.classList.add('-active');

    this.lgViewportActive = sibNode_L;
    this.smViewportActive = sibNode_S;
  }
}

