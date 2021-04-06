import { MainEventBus } from "./libs/MainEventBus.lib.js";
import { _front } from "./libs/_front.js";
class Front extends _front{
  constructor(){
    super();
    const _ = this;
    MainEventBus.add(_.componentName,'createOrderSuccess',_.createOrderSuccess.bind(_));
    MainEventBus.add(_.componentName,'createOrderFail',_.createOrderFail.bind(_));
  }
  createOrderSuccess(orderData){
    console.log(orderData);
  }
  createOrderFail(orderData){}
}
new Front();
