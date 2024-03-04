## 最不优雅： if - else

```js
/**
 * 按钮点击事件
 * @param {number} status 活动状态：1 开团进行中 2 开团失败 3 商品售罄 4 开团成功 5 系统取消
 */
const onButtonClick = (status) => {
  if (status == 1) {
    sendLog("processing");
    jumpTo("IndexPage");
  } else if (status == 2) {
    sendLog("fail");
    jumpTo("FailPage");
  } else if (status == 3) {
    sendLog("fail");
    jumpTo("FailPage");
  } else if (status == 4) {
    sendLog("success");
    jumpTo("SuccessPage");
  } else if (status == 5) {
    sendLog("cancel");
    jumpTo("CancelPage");
  } else {
    sendLog("other");
    jumpTo("Index");
  }
};
```

## switch case

```js
/**
 * 按钮点击事件
 * @param {number} status 活动状态：1 开团进行中 2 开团失败 3 商品售罄 4 开团成功 5 系统取消
 */
const onButtonClick = (status) => {
  switch (status) {
    case 1:
      sendLog("processing");
      jumpTo("IndexPage");
      break;
    case 2:
    case 3:
      sendLog("fail");
      jumpTo("FailPage");
      break;
    case 4:
      sendLog("success");
      jumpTo("SuccessPage");
      break;
    case 5:
      sendLog("cancel");
      jumpTo("CancelPage");
      break;
    default:
      sendLog("other");
      jumpTo("Index");
      break;
  }
};
```

## 一元判断时：存到 Object 里

将判断条件作为对象的属性名，将处理逻辑作为对象的属性值，在按钮点击的时候，通过对象属性查找的方式来进行逻辑判断，这种写法特别适合一元条件判断的情况。

```js
const actions = {
  1: ["processing", "IndexPage"],
  2: ["fail", "FailPage"],
  3: ["fail", "FailPage"],
  4: ["success", "SuccessPage"],
  5: ["cancel", "CancelPage"],
  default: ["other", "Index"],
};
/**
 * 按钮点击事件
 * @param {number} status 活动状态：1开团进行中 2开团失败 3 商品售罄 4 开团成功 5 系统取消
 */
const onButtonClick = (status) => {
  let action = actions[status] || actions["default"],
    logName = action[0],
    pageName = action[1];
  sendLog(logName);
  jumpTo(pageName);
};
```

## 一元判断时：存到 Map 里

同上，但使用 Map

```js
const actions = new Map([
  [1, ["processing", "IndexPage"]],
  [2, ["fail", "FailPage"]],
  [3, ["fail", "FailPage"]],
  [4, ["success", "SuccessPage"]],
  [5, ["cancel", "CancelPage"]],
  ["default", ["other", "Index"]],
]);
/**
 * 按钮点击事件
 * @param {number} status 活动状态：1 开团进行中 2 开团失败 3 商品售罄 4 开团成功 5 系统取消
 */
const onButtonClick = (status) => {
  let action = actions.get(status) || actions.get("default");
  sendLog(action[0]);
  jumpTo(action[1]);
};
```

## 多元判断时：将 condition 拼接成字符串存到 Object 里

把两个条件组合成字符串

```js
const actions = {
  guest_1: () => {
    /*do sth*/
  },
  guest_2: () => {
    /*do sth*/
  },
  //....
};

const onButtonClick = (identity, status) => {
  let action = actions[`${identity}_${status}`] || actions["default"];
  action.call(this);
};
```

## 多元判断时：将 condition 拼接成字符串存到 Map 里

同上，但使用 Map

```js
const actions = new Map([
  ['guest_1', ()=>{/*do sth*/}],
  ['guest_2', ()=>{/*do sth*/}],
  ['guest_3', ()=>{/*do sth*/}],
  ['guest_4', ()=>{/*do sth*/}],
  ['guest_5', ()=>{/*do sth*/}],
  ['master_1', ()=>{/*do sth*/}],
  ['master_2', ()=>{/*do sth*/}],
  ['master_3', ()=>{/*do sth*/}],
  ['master_4', ()=>{/*do sth*/}],
  ['master_5', ()=>{/*do sth*/}],
  ['default', ()=>{/*do sth*/}],
])

/**
 * 按钮点击事件
 * @param {string} identity 身份标识：guest客态 master主态
 * @param {number} status 活动状态：1 开团进行中 2 开团失败 3 开团成功 4 商品售罄 5 有库存未开团
 */
const onButtonClick = (identity,status)=>{
  let action = actions.get(`${identity}_${status}`) || actions.get('default')
  action.call(this)
```

## 多元判断时：将 condition 存为 Object 存到 Map 里

不做条件的拼接，以 object 作为 key，同时“缓存”了一下处理的函数

```js
const actions = () => {
  const functionA = () => {
    /*do sth*/
  };
  const functionB = () => {
    /*do sth*/
  };
  return new Map([
    [{ identity: "guest", status: 1 }, functionA],
    [{ identity: "guest", status: 2 }, functionA],
    [{ identity: "guest", status: 3 }, functionA],
    [{ identity: "guest", status: 4 }, functionA],
    [{ identity: "guest", status: 5 }, functionB],
    //...
  ]);
};

const onButtonClick = (identity, status) => {
  let action = [...actions()].filter(
    ([key, value]) => key.identity == identity && key.status == status
  );
  action.forEach(([key, value]) => value.call(this));
};
```
