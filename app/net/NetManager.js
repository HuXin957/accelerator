import WSNetwork from "./WSNetwork";
import MessageProcess from "./MsgProcess";

export default class NetManager {
  static network = null
  static msgId = 1

  //初始化网络(在应用启动时调用)
  static initNetwork() {
    NetManager.network = new WSNetwork();
    MessageProcess.initListener();
  }

  //想server发送消息,应把NetManager.msgId传过去，server返回数据时再返回
  static sendMsg(msg) {
    return new Promise((resolve, reject) => {
      NetManager.network.wsSendMsg(msg)

      MessageProcess.addHttpCallback(NetManager.msgId++, {
        callback: (data) => {
          resolve(data)
        }
      })
    })
  }
}
