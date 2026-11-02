# 计划追踪 · Plantracker

学生课表 + 计划复盘工具。纯本地运行、完全离线，数据只存在设备上（localStorage / WebView），不做任何上传。

本仓库只用于**公开版的静态分发**（GitHub Pages）。个人版（含内置课表、同步码、研究生时间轴）不在此仓库。

## 访问地址

| 用途 | 地址 |
|---|---|
| 落地页 | https://coolflower1984.github.io/plantracker/ |
| 网页版 | https://coolflower1984.github.io/plantracker/web.html |
| Android APK | https://coolflower1984.github.io/plantracker/plantracker-open-v2.4.16.apk |
| iOS（PWA） | https://coolflower1984.github.io/plantracker/ios.html |
| 版本信息 | https://coolflower1984.github.io/plantracker/version.json |

## 目录

| 文件 | 说明 |
|---|---|
| `index.html` | 下载落地页（公开版） |
| `web.html` | 网页版主程序，单文件应用 |
| `ios.html` | iOS PWA 版（Safari 添加到主屏幕） |
| `ios-project.zip` | iOS Xcode 工程打包 |
| `plantracker-open-v2.4.16.apk` | Android 安装包（公开版，versionCode 32） |
| `version.json` | 版本信息，App 启动时读取以判断是否有新版 |
| `sw.js` / `manifest.webmanifest` / `icon-*.png` | PWA 资源 |

## 当前版本 v2.4.16

- 今日页一项任务只占一张卡：今天占了几段就合成一张，卡上显示整项合计完成度（按段时长加权），下面按段列时间和各段完成度
- 时段并段的分界线是「中间空不到 30 分钟」（29 分钟以内），正好空 30 分钟就拆成两张卡；重叠必并、跨天不并
- 「全部计划」仍按段平铺，一段一张
- 顺延过的任务再顺延时，名字收敛为「（顺延×2）」，不再叠成「（顺延）（顺延）」
- 添加计划与顺延都支持跨天、多段、课表外时段；推荐顺延只占够用的那几节
- 一次跳过多个版本时，更新卡按版本各弹一次（最多补最近 3 版），不再只看到最后一版
- 旧版 `plantracker-open-v2.4.2.apk` 暂留，供仍在缓存旧清单的客户端下载

## 更新流程

1. 替换 `plantracker-open-vX.Y.Z.apk` 与 `web.html`、`ios.html`
2. 修改 `version.json` 的 `versionCode`、`versionName`、`apkUrl`、`notes`
3. 提交推送到 `main`，Pages 会在 1～2 分钟内自动重新发布

客户端读取 `version.json` 时按顺序尝试三个源：GitHub Pages → `raw.githubusercontent.com`
（`https://raw.githubusercontent.com/coolflower1984/plantracker/main/version-public.json`）→ jsDelivr。

> **注意**：jsDelivr 对 `@main` 有约 12 小时的缓存，推完代码它仍可能返回上一版，
> 导致回退线路误报「已是最新」。每次发版后必须手动清缓存，query 参数无效：
>
> ```
> curl https://purge.jsdelivr.net/gh/coolflower1984/plantracker@main/version.json
> curl https://purge.jsdelivr.net/gh/coolflower1984/plantracker@main/version-public.json
> ```
>
> 返回 `"status": "finished"` 即生效，随后复查两个地址的 versionName 是否为当前版本。

## 数据与隐私

所有课表、计划、复盘数据均保存在本机浏览器存储中，仓库内不含任何用户数据。
