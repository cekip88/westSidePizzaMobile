import { MainEventBus } from "./libs/MainEventBus.lib.js";
import { _front } from "./libs/_front.js";
class Front extends _front{
  constructor(){
    super();
    const _ = this;
    _.swipeAnswer();
    _.popupsCloseBtn();
    MainEventBus.add(_.componentName,'createOrderSuccess',_.createOrderSuccess.bind(_));
    MainEventBus.add(_.componentName,'createOrderFail',_.createOrderFail.bind(_));
  }
  createOrderSuccess(orderData){}
  createOrderFail(orderData){}

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
      startItemPosition = parseInt(item.getAttribute('data-position'));

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
