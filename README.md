# Local Weahter App

## 项目地址
https://lmafia.github.io/local-weather-app/


## 项目

### 💻 项目教程
项目学习自 `Net Ninja` 的 `Vue & Tailwind Weather App`

- [视频教程](https://www.youtube.com/watch?v=gUsBaB5ViAo)

### 🔧 改造点:
- 天气服务: 国内注册教程里的天气服务账号比较麻烦，我选用了比较方便的高德天气而且有免费 5kqpd
- 天气数据: 每个天气服务的接口数据会不一样, 所以我没有视频里的每时天气, 只有 3 日天气, 反正做了一些适配.
- 天气 icon: 视频使用的天气 icon 是天气服务返回的 png 地址,  高德没有, 我就是用的[和风天气图标库](https://icons.qweather.com/), 再进行中文天气的匹配
- API Key 配置: 使用 LocalStorge 保存 API Key 的配置, 不用写死在项目中, 需要在主页的 🔑 配置即可. 这也算是我的一个 API 套壳项目了. 




## Project Setup
```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
