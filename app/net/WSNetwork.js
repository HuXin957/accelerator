export default class WSNetwork {
  constructor(msgHandler) {
    this.init();
    this.msgHandler = msgHandler;
  }

  init() {
    this.wssocket = null;
    this.serverUrl = "ws://127.0.0.1:3000/websocket";
  }

  connect() {
    this.wssocket = new WebSocket(this.serverUrl);

    this.wssocket.onopen = this.onOpen.bind(this);
    this.wssocket.onclose = this.onClose.bind(this);
    this.wssocket.onerror = this.onError.bind(this);
    this.wssocket.onmessage = this.onMessage.bind(this);

  }

  //打开连接
  onOpen() {
    console.log("WS_OPEN")
  }

  //关闭连接
  onClose() {
    console.log("WS_CLOSE")
  }

  //连接出错
  onError(e) {
    console.log("WS_ERROR===>>>", e)
  }

  //接收消息
  onMessage(event) {
    this.msgHandler(event);
  }

  wsSendMsg(msg){
    this.wssocket.send(msg);
  }
}
