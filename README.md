# 上班鼓励器 · Workday Encourager

给 DeepSeek Harness Web 侧栏用的上班工资计时器：大数字实时滚动今天赚到的钱，配下班倒计时、工时进度，还有一个每天换货的「工资小卖部」。

## 功能

- **实时收入**：按你的日薪和工时逐秒累计，精确到小数点后四位
- **下班倒计时 + 工时进度**：一眼看到还有多久、干到哪儿了
- **工资小卖部**：11 件心愿里每天纯随机上架 5 件，买得起就显示数量，买不起显示差额；底部进度条盯着今天货架上最便宜的那件还没买得起的，每天换一批
- **明细折叠**：时薪、今日满勤、本月累计默认收起，点「工时与收入明细」才展开
- **按日状态**：上班中 / 休息中 / 已下班 / 休息日，周末可临时「今天也上班」
- **跟随主题**：只用 DSH 主题变量，明暗自动切换
- **设置**：日薪、上下班时间、休息时间（可添加任意多段，自动按开始时间排序），改完立即生效

## 安装

**方式一：npm（推荐）**

在 DeepSeek Harness 的 **插件 → Add plugin** 里输入：

```
dsh-work-encourager
```

或命令行：

```sh
dsh plugin --profile <profile> add dsh-work-encourager
```

**方式二：Git 地址**

```
https://github.com/goodCircle/dsh-work-encourager
```

安装后左侧栏会出现一个 ¥ 金币图标，点开就是面板。需要 DSH >= `0.2.2-rc.1`（Web UI 侧栏）。

## 隐私

- 插件是**纯客户端**的：Host 半边只有一个空的 `apply()`，不读写文件、不启动进程
- **没有任何网络请求**，不接入第三方服务，也没有运行时依赖
- 工资、工时、休息时间和临时上班设置只写入本机浏览器的 `localStorage`（键 `dsh.work-encourager.v1`），不会上传；卸载插件后仍留在本机，可在浏览器站点数据里清除
- 卸载/升级不会清空你的设置

## 默认值

日薪 ¥140、09:00–18:00、午休 12:00 起 60 分钟 + 17:30 起 30 分钟（合计 7.5 小时工作日）。进入面板右上角「设置」即可改成你自己的，休息段可以任意增删。

## English

A workday salary ticker in the DeepSeek Harness Web sidebar: today's pay ticks up live, a countdown to quitting time, workday progress, and a daily rotating five-item payday shelf. Install with `dsh plugin --profile <profile> add dsh-work-encourager`. Settings stay in local storage; the plugin makes no network requests and has an empty host half.

## License

MIT
