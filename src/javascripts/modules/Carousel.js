export default class Carousel {
  constructor(el) {
    this.el = el;
    this.currViewportItems = [];
    this.init();
    this.bindEvents();
  }

  init() {
    let viewports = this.el.getElementsByClassName('carousel__viewport');

    this.setCurrentViewport(viewports);
    this.prevViewport = viewports[0];


    let buttons = this.el.getElementsByClassName('controls');
    this.prevButton = buttons[0];
    this.nextButton = buttons[1];

  }

  setCurrentViewport(viewports) {
    this.currViewport = viewports[1];

    let items = [].slice.call(this.currViewport.getElementsByClassName('item'));

    items.forEach((item, i) => {
      let lastIndex = items.length-1;
      let next = i === lastIndex ? 0 : i + 1;
      let prev = i === 0 ? lastIndex : i - 1;

      this.currViewportItems[i] = {item, next, prev};

      if (item.classList.value.includes('-active')) {
        this.currViewportActive = this.currViewportItems[i];
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
      }.bind(this), 600)



      /*
        1. when next button is pressed, the immediate next one gains opacity and is placed right next to outside of carousel.

      */
    }.bind(this));
  }
}

