class EventEmitter { // 初始化
  constructor() {
    this._events = this._events || new Map(); // 存储事件/回调键值对
    this._maxListeners = this._maxListeners || 10; // 设置监听上限
  }
}

// 触发名为 type 的事件 --> 发布
EventEmitter.prototype.emit = function(type, ...args) {
  let handler;
  // 从储存事件键值对的 this._events 中获取对应事件回调函数
  handler = this._events.get(type); 
  if (args.length > 0) {
    handler.apply(this, args); // 一旦发布后订阅的就收到了
  } else {
    handler.call(this);
  }
  return true;
}

// 监听名为 type 的事件(此时只能有一个监听者)   --> 订阅
EventEmitter.prototype.on = function(type, fn) {
  // 将 type 事件以及对应的fn函数放入 this._events 中储存
  if (!this._events.get(type)) {
    this._events.set(type, fn);
  }
}

// 简单实践

const emitter = new EventEmitter();
// 监听 sadhu 事件
emitter.on('sadhu', man => {
  console.log(`expel ${man}`);
})

// 触发 sadhu 事件发现回调成功执行
emitter.emit('sadhu', 'low-end');