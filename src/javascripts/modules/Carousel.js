export default class Carousel {
  constructor(el) {
    this.el = el;
    this.init();
    this.bindEvents();
  }

  init() {
    let viewports = this.el.getElementsByClassName('carousel__viewport');
    this.setViewport(viewports[1], 'currViewport');
    this.setViewport(viewports[0], 'prevViewport');

    let buttons = this.el.getElementsByClassName('controls');
    this.prevButton = buttons[0];
    this.nextButton = buttons[1];

  }

  setViewport(viewport, viewportName) {
    this[viewportName] = viewport;
    this[`${viewportName}Items`] = [];

    let items = [].slice.call(viewport.getElementsByClassName('item'));

    items.forEach((item, i) => {
      let lastIndex = items.length-1;
      let next = i === lastIndex ? 0 : i + 1;
      let prev = i === 0 ? lastIndex : i - 1;

      this[`${viewportName}Items`][i] = {item, next, prev};

      if (item.classList.value.includes('-active')) {
        this[`${viewportName}Active`] = this[`${viewportName}Items`][i];
      }
    })
  }

  bindEvents() {
    this.nextButton.addEventListener('click', function() {
      let nextNode = this.currViewportItems[this.currViewportActive.next];
      let nextItem = nextNode.item;
      let activeItem = this.currViewportActive.item;

      //disable click
      this.nextButton.classList.add('disableClick');

      //move sibling to right
      nextItem.classList.add('-placeRight')

      //move both to left
      setTimeout(function() {
        activeItem.classList.add('-moveLeft');
        nextItem.classList.add('-moveLeft');
      }.bind(this), 100)


      setTimeout(function() {
        activeItem.classList.remove('-active');
        activeItem.classList.remove('-moveLeft');

        nextItem.classList.remove('-moveLeft');
        nextItem.classList.remove('-placeRight');
        nextItem.classList.add('-active');

        //set new active
        this.currViewportActive = nextNode;

        //reenable click
        this.nextButton.classList.remove('disableClick');
      }.bind(this), 1100)



      //TODO - REFACTOR MOVE FOR PREV VIEWPORT
      let nextNode2 = this.prevViewportItems[this.prevViewportActive.next];
      let nextItem2 = nextNode2.item;
      let activeItem2 = this.prevViewportActive.item;

      //disable click
      this.nextButton.classList.add('disableClick');

      //move sibling to right
      nextItem2.classList.add('-placeRight')

      //move both to left
      setTimeout(function() {
        activeItem2.classList.add('-moveLeft');
        nextItem2.classList.add('-moveLeft');
      }.bind(this), 100)


      setTimeout(function() {
        activeItem2.classList.remove('-active');
        activeItem2.classList.remove('-moveLeft');

        nextItem2.classList.remove('-moveLeft');
        nextItem2.classList.remove('-placeRight');
        nextItem2.classList.add('-active');

        //set new active
        this.prevViewportActive = nextNode2;

        //reenable click
        this.nextButton.classList.remove('disableClick');
      }.bind(this), 1100)
      /*
        1. when next button is pressed, the immediate next one gains opacity and is placed right next to outside of carousel.

      */
    }.bind(this));
  }
}

