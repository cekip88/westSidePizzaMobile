import { MainEventBus } from "./libs/MainEventBus.lib.js";
import { _front } from "./libs/_front.js";
class Front extends _front{
  constructor(){
    super();
    const _ = this;
    _.swipeAnswer();
    _.swipeScrollBar();
    _.popupsCloseBtn();
    MainEventBus.add(_.componentName,'createOrderSuccess',_.createOrderSuccess.bind(_));
    MainEventBus.add(_.componentName,'createOrderFail',_.createOrderFail.bind(_));
  }
  createOrderSuccess(orderData){}
  createOrderFail(orderData){}

  swipeScrollBar(){
    const _ = this;
    let swipeItems = document.querySelectorAll('.horizontal .bar');
    if (swipeItems.length > 0){
      swipeItems.forEach(function (item){
        let positions = _.getPositionScrollBarrSwipe(item.parentElement);
        item.addEventListener('touchstart', function (e){
          _.handleScrollBarSwipeStart(e)
        });
        item.addEventListener('touchmove',function (e){
          _.handleScrollBarSwipeMove(e,item,positions)
        });
        item.addEventListener('touchend',function (e){
          _.handleScrollBarSwipeEnd(item,positions)
        });
      })
    }
  }
  getPositionScrollBarrSwipe(item){
    let
      parent = item.parentElement,
      positions = [0],
      count = parseInt(item.getAttribute('data-count'));

    for (let i = 0; i < count - 2; i++){
      let width = item.clientWidth / (count - 1);
      positions.push(width * (i + 1));
    }

    positions.push(item.clientWidth);
    return positions;
  }
  handleScrollBarSwipeStart(e){
    this.startCursorPosition = e.changedTouches[0]["clientX"];
  }
  handleScrollBarSwipeMove(e,item,positions){
    const _ = this;
    let
        currentCursorPosition = e.changedTouches[0]["clientX"],
        startItemPosition = 0,
        itemPosition = item.getAttribute('data-position');

    if (!itemPosition) item.setAttribute('data-position','0');
    else startItemPosition = parseInt(itemPosition)

    let currentItemPosition = startItemPosition + currentCursorPosition - _.startCursorPosition;

    if (currentItemPosition > positions[0]) currentItemPosition = positions[0];
    else if (currentItemPosition < positions[positions.length - 1]) currentItemPosition = positions[positions.length - 1];

    _.startCursorPosition = currentCursorPosition;
    item.style.transform = `translateX(${currentItemPosition}px)`;
    item.setAttribute('data-position',currentItemPosition)
  }
  handleScrollBarSwipeEnd(item,positions){
    let currentItemPosition = parseInt(item.getAttribute('data-position'));

    if (currentItemPosition < positions['end'] / 2) currentItemPosition = positions['end'];
    else if (currentItemPosition >= positions['end'] / 2 && currentItemPosition < positions['start'] / 2) currentItemPosition = 0;
    else currentItemPosition = positions['start'];

    item.setAttribute('data-position',currentItemPosition);
    item.style.transform = `translateX(${currentItemPosition}px)`
  }

  swipeAnswer(){
    const _ = this;
    let swipeItems = document.querySelectorAll('.answer-row .row .answer');
    if (swipeItems.length > 0){
      swipeItems.forEach(function (item){
        let positions = _.getPositionAnswerSwipe(item);
        item.addEventListener('touchstart', function (e){
          _.handleAnswerSwipeStart(e)
        });
        item.addEventListener('touchmove',function (e){
          _.handleAnswerSwipeMove(e,item,positions)
        });
        item.addEventListener('touchend',function (e){
          _.handleAnswerSwipeEnd(item,positions)
        });
      })
    }
  }
  handleAnswerSwipeStart(e){
    this.startCursorPosition = e.changedTouches[0]["clientX"];
  }
  getPositionAnswerSwipe(item){
    return {
      start: item.previousElementSibling.clientWidth + 10,
      end: (item.nextElementSibling.clientWidth + 10) * -1
    }
  }
  handleAnswerSwipeMove(e,item,positions){
    const _ = this;
    let
        currentCursorPosition = e.changedTouches[0]["clientX"],
        startItemPosition = 0,
        itemPosition = item.getAttribute('data-position');

    if (!itemPosition) item.setAttribute('data-position','0');
    else startItemPosition = parseInt(itemPosition)

    let currentItemPosition = startItemPosition + currentCursorPosition - _.startCursorPosition;

    if (currentItemPosition > positions['start']) currentItemPosition = positions['start'];
    else if (currentItemPosition < positions['end']) currentItemPosition = positions['end'];

    _.startCursorPosition = currentCursorPosition;
    item.style.transform = `translateX(${currentItemPosition}px)`;
    item.setAttribute('data-position',currentItemPosition)
  }
  handleAnswerSwipeEnd(item,positions){
    let currentItemPosition = parseInt(item.getAttribute('data-position'));

    if (currentItemPosition < positions['end'] / 2) currentItemPosition = positions['end'];
    else if (currentItemPosition >= positions['end'] / 2 && currentItemPosition < positions['start'] / 2) currentItemPosition = 0;
    else currentItemPosition = positions['start'];

    item.setAttribute('data-position',currentItemPosition);
    item.style.transform = `translateX(${currentItemPosition}px)`
  }

  popupsCloseBtn(){
    let popCloses = document.querySelectorAll('.popup .close');
    if (popCloses.length <= 0) return;
    popCloses.forEach(function (item){
      let target = item.closest('.popup');
      item.addEventListener('click',function (){
        target.classList.remove('active')
      })
    })
  }
}
new Front();
