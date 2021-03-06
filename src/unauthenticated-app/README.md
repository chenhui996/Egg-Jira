# 登陆注册相关

- 技术：JWT。（JSON Web Tokens）
  - 一切以 token 为核心。

## token 存放

- 存在本地的 localstorage 中。
  - 每次发请求，在 header 中带上此 token。
  - 服务端即可 '比对识别'，是否是 **已成功注册** 的账号（成功即完成登陆）。

## 概述登陆过程

- 场景：
  1. 已经注册用户输入**正确的账号和密码**，点击登陆。
  2. 成功提示。
- 过程：
  1. 触发 <form> 标签下的 `onSubmit` 方法 `handleSubmit`。
  2. `handleSubmit` 取到账号和密码，**作为参数** 发给自定义 hook `useAuth` 解构出来的 `login` 方法。
  3. 自定义 hook `useAuth` 中存有 `useContext` 的引用，于是进一步查询 `useContext` 定义的内容 `AuthContext`。
  4. 其中找到 `login` 方法（就是上述的 login），其还有进一步调用 `auth` 下的 `login` 方法（不是同一个 login），于是再进一步寻找。
  5. 找到 `auth` 下的 `login` 方法，即为 **发送请求的逻辑**所在。

> 注册和登出，逻辑类似

---

## 抽象 http 的请求

- 如何让登陆、注册操作均携带 token？
  - **抽象 http 的请求**
- 封装一个函数解决这个问题：
  - 地址路径：`src/utils/http.ts`
  - 之后所有的 **API 请求** 和 **异步请求** 均用该函数进行处理。
    - 若有统一的改变，就在该 **函数内** 进行调整改变。
