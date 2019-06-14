// 此版本有多个监听者

class EventEmitter { // 初始化
  constructor() {
    this._events = this._events || new Map(); // 存储订阅时的事件:回调键值对 
    this._maxListeners = this._maxListeners || 10; // 设置监听上限
  }
}

// 触发名为 type 的事件 --> 发布
EventEmitter.prototype.emit = function(type, ...args) {
  let handler;
  // 从储存事件键值对的 this._events 中获取对应事件回调函数
  handler = this._events.get(type); 
  if (Array.isArray(handler)) {
    handler.forEach((fn) => {
      if (args.length > 0) {
        fn.apply(this, args)
      } else {
        fn.call(this);
      }
    })
  } else { // 单个函数的情况
    if (args.length > 0) {
      handler.apply(this, args);
    } else {
      handler.call(this);
    }
  }
  return true;
}

// 监听名为 type 的事件(可有多个监听者)   --> 订阅
EventEmitter.prototype.on = function(type, fn) {
  // 将 type 事件以及对应的fn函数放入 this._events 中储存
  const handler = this._events.get(type);
  if (!handler) {
    this._events.set(type, fn);
  } else if (handler && typeof handler === 'function') { // 此时只有一个监听者
    this._events.set(type, [handler, fn]); // 同一个事件的多个监听者（回调）用数组存储
  } else {
    handler.push(fn); // 已有多个监听者的话就直接push
  }
}

// 简单实践

const emitter = new EventEmitter();

// 监听(订阅) sadhu 事件
emitter.on('sadhu', man => {
  console.log(`1 ${man}`);
})

emitter.on('sadhu', man => {
  console.log(`2 ${man}`)
})

emitter.on('sadhu', man => {
  console.log(`2 ${man}`)
})

// 触发（发布） sadhu 事件，订阅 sadhu 事件的回调就全部执行
emitter.emit('sadhu', 'high-end');