const WS_LISTENER = 'WS_LISTENER'

export default class MessageProcess {
  static httpCallbacks = {}

  static msgListener = {}

  static addMsgListener(serviceId, callBack) {
    this.msgListener[serviceId] = callBack;
  }

  static emitData(msg) {
    this.msgListener[WS_LISTENER](msg)
  }

  static msgHandler(msg) {
    MessageProcess.emitData(msg)
  }

  static addHttpCallback(key, cbObj) {
    MessageProcess.httpCallbacks[key] = cbObj
  }


  static initListener() {
    MessageProcess.addMsgListener(WS_LISTENER, MessageProcess.onHttpCallBack)
  }

  
  static onHttpCallBack(msg) {
    const key = msg.key
    const callData = MessageProcess.httpCallbacks[key]

    callData.callback(msg)

    delete MessageProcess.httpCallbacks[key]
  }
}
