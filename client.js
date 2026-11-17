window.__ModuleLoader__.load({
  id: 'dsh-work-encourager',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    /** Dictionary namespace, panel id (shared with the main panel), and storage key. */
    const NS = 'work-encourager';
    const PANEL_ID = 'workday';
    const STORAGE_KEY = 'dsh.work-encourager.v1';

    /** Defaults mirror the classic "daily wage / office hours / lunch" card. */
    const DEFAULTS = {
      dailyWage: 140,
      start: '09:00',
      end: '18:00',
      lunchStart: '12:00',
      lunchMinutes: 90,
    };

    /** Rotating encouragement: six lines shared by both locales. */
    const CHEER_COUNT = 6;

    const zh = {
      'panel.label': '上班鼓励器',
      'page.title': '上班鼓励器',
      'phase.working': '上班中 · 收获正在增加',
      'phase.lunch': '午休中 · 收入暂停一下',
      'phase.before': '还没上班 · 先给自己一杯咖啡',
      'phase.done': '今天下班了 · 收获已入账',
      'phase.rest': '今天休息 · 不用上班',
      'phase.setup': '时间还没设好',
      'status.working': '上班中。',
      'status.am.0': '牛马已就位。',
      'status.am.1': '工位已加热。',
      'status.mid.0': '上午的电量还剩一半。',
      'status.mid.1': '咖啡在左，KPI 在右。',
      'status.late.0': '饭堂在召唤。',
      'status.late.1': '再撑一下，就能吃饭。',
      'status.pm.0': '下半场开始。',
      'status.pm.1': '灵魂开始排队下班。',
      'status.midPm.0': '全公司都在等下班。',
      'status.midPm.1': '手已经放在包上了。',
      'status.end.0': '最后一程，稳住。',
      'status.end.1': '马上就能走了。',
      'status.lunch': '工位熄火，灵魂充电。',
      'status.before': '工位在等你。',
      'status.done': '今天的额度用完了。',
      'status.rest': '棚里放假，不用上工。',
      'status.setup': '先把卖身契填好。',
      'money.burst': '+¥{amount} 已到账',
      'earned.label': '今天已经赚到',
      'earned.hint': '每分钟 +¥{rate} · 积少成多',
      'count.working': '距离今天下班',
      'count.lunch': '距离下午开工',
      'count.before': '距离今天上班',
      'count.done': '已下班 · 明天见',
      'count.rest': '今天不用打卡',
      'count.setup': '下班时间要晚于上班时间',
      'progress.label': '今日工时进度 {percent}%',
      'progress.hours': '已工作 {worked} / {total} 小时',
      'stat.rate': '时薪',
      'stat.full': '今日满勤',
      'stat.month': '本月累计',
      'month.note': '已过的工作日按满勤补算 · 本月排班 {days} 天',
      'details.show': '工时与收入明细',
      'details.hide': '收起明细',
      'shop.title': '工资小卖部',
      'shop.shuffle': '换一批',
      'shop.quip': '{name} · {copy}',
      'shop.count': '×{count}',
      'shop.short': '差 ¥{amount}',
      'shop.milestone': '再赚 ¥{amount} 解锁「{name}」',
      'shop.milestoneDone': '今日货架全部拿下，剩下的钱留着下班花。',
      'shop.rest': '休息日打烊，明天再开张。',
      'shop.done': '今天的工资已全部入账，买点开心的吧。',
      'shop.before': '还没开工，先看看今天想买什么。',
      'item.milktea': '奶茶',
      'item.milktea.copy': '续命水，今天的糖分靠它。',
      'item.coffee': '手冲咖啡',
      'item.coffee.copy': '给牛马加一滴高级汽油。',
      'item.movie': '电影票',
      'item.movie.copy': '两小时别人的人生，比你的好看。',
      'item.hotpot': '火锅',
      'item.hotpot.copy': '辣到流泪，就不用想工作。',
      'item.massage': '按摩',
      'item.massage.copy': '把班味按出去。',
      'item.game': 'Steam 3A',
      'item.game.copy': '在游戏里当主角，在工位当牛马。',
      'item.concert': '演唱会看台',
      'item.concert.copy': '离偶像 200 米，离自由 0 米。',
      'item.infield': '演唱会内场',
      'item.infield.copy': '这辈子总得离舞台近一次。',
      'item.flight': '往返机票',
      'item.flight.copy': '去一个不用打卡的地方。',
      'item.chair': '人体工学椅',
      'item.chair.copy': '腰是自己的，工位是老板的。',
      'item.lens': '相机镜头',
      'item.lens.copy': '拍下不用上班的周末。',
      'rest.work': '今天也上班',
      'rest.undo': '还是休息吧',
      'rest.note': '临时调整只对今天生效',
      'settings.open': '设置',
      'settings.close': '收起',
      'settings.title': '上班设置',
      'settings.wage': '日薪',
      'settings.start': '上班时间',
      'settings.end': '下班时间',
      'settings.lunchStart': '午休开始',
      'settings.lunch': '午休时长',
      'settings.minutes': '分钟',
      'settings.reset': '恢复默认',
      'settings.hint': '改完立刻生效，数据只保存在本机。',
      'settings.invalid': '下班时间要晚于上班时间。',
      'foot': '数据只保存在本机：点右上角「设置」改日薪、工时和午休时间。',
      'cheer.1': '每分钟 +¥{rate}，积少成多。',
      'cheer.2': '慢慢来，每一秒的努力都算数。',
      'cheer.3': '工资正在到账，请勿打扰。',
      'cheer.4': '你不是在打工，是在给未来的自己攒选择。',
      'cheer.5': '下班倒计时和钱包一起变好。',
      'cheer.6': '今天也稳稳地赚到了。',
      'cheer.rest': '休息也是上班的一部分，今天不涨钱也没关系。',
      'cheer.done': '今天的工位任务完成，剩下的时间归你。',
      'cheer.before': '还没开工，先把状态调到最好。',
      'cheer.setup': '填好上班和下班时间，秒针就会开始印钱。',
    };

    const en = {
      'panel.label': 'Workday',
      'page.title': 'Workday encourager',
      'phase.working': 'On the clock · Pay is ticking up',
      'phase.lunch': 'Lunch break · Pay paused',
      'phase.before': 'Not clocked in · Coffee first',
      'phase.done': 'Clocked out · Today is banked',
      'phase.rest': 'Day off · No clock today',
      'phase.setup': 'Finish your schedule first',
      'status.working': 'On the clock.',
      'status.am.0': 'The horse is saddled.',
      'status.am.1': 'Desk warmed up.',
      'status.mid.0': 'Morning battery at half.',
      'status.mid.1': 'Coffee on the left, KPIs on the right.',
      'status.late.0': 'The canteen is calling.',
      'status.late.1': 'Hold on. Food is near.',
      'status.pm.0': 'Second half. Begin.',
      'status.pm.1': 'The exit queue is forming.',
      'status.midPm.0': 'The whole office is waiting.',
      'status.midPm.1': 'Bag is already on the shoulder.',
      'status.end.0': 'Last stretch. Hold.',
      'status.end.1': 'Almost out.',
      'status.lunch': 'Desk off. Soul charging.',
      'status.before': 'Your desk is waiting.',
      'status.done': "Today's quota is spent.",
      'status.rest': 'The barn is closed. No shift.',
      'status.setup': 'Fill in your contract first.',
      'money.burst': '+¥{amount} received',
      'earned.label': 'Earned so far today',
      'earned.hint': '+¥{rate} every minute · small and steady',
      'count.working': 'Until quitting time',
      'count.lunch': 'Until the afternoon starts',
      'count.before': 'Until work starts',
      'count.done': 'Off the clock · see you tomorrow',
      'count.rest': 'No clock today',
      'count.setup': 'Quitting time must be after start time',
      'progress.label': 'Workday progress {percent}%',
      'progress.hours': 'Worked {worked} / {total} hours',
      'stat.rate': 'Hourly',
      'stat.full': 'Full day',
      'stat.month': 'This month',
      'month.note': 'Finished workdays count in full · {days} workdays this month',
      'details.show': 'Pay details',
      'details.hide': 'Hide details',
      'shop.title': 'Payday corner shop',
      'shop.shuffle': 'Shuffle',
      'shop.quip': '{name} · {copy}',
      'shop.count': '×{count}',
      'shop.short': '¥{amount} to go',
      'shop.milestone': '¥{amount} more unlocks “{name}”',
      'shop.milestoneDone': "Today's shelf is cleared. Save the rest for after work.",
      'shop.rest': 'Closed on your day off. Opens again tomorrow.',
      'shop.done': "Today's pay is all banked. Buy something that makes you happy.",
      'shop.before': 'Not clocked in yet. Plan your little splurge.',
      'item.milktea': 'milk tea',
      'item.milktea.copy': 'The life-support water. Today’s sugar comes from here.',
      'item.coffee': 'pour-over',
      'item.coffee.copy': 'A drop of premium fuel for the office horse.',
      'item.movie': 'movie ticket',
      'item.movie.copy': 'Two hours of someone else’s life, which looks better than yours.',
      'item.hotpot': 'hotpot',
      'item.hotpot.copy': 'Spicy enough to cry, so you stop thinking about work.',
      'item.massage': 'massage',
      'item.massage.copy': 'Beat the office smell out of you.',
      'item.game': 'AAA game',
      'item.game.copy': 'A hero in the game, a draft horse at the desk.',
      'item.concert': 'concert (upper)',
      'item.concert.copy': '200 meters from the idol, 0 meters from freedom.',
      'item.infield': 'concert (front)',
      'item.infield.copy': 'Once in your life, get close to the stage.',
      'item.flight': 'round-trip flight',
      'item.flight.copy': 'Go somewhere that does not require clocking in.',
      'item.chair': 'office chair',
      'item.chair.copy': 'Your back is yours; the desk belongs to the boss.',
      'item.lens': 'camera lens',
      'item.lens.copy': 'Photograph weekends that do not involve work.',
      'rest.work': 'Work today anyway',
      'rest.undo': 'Take the day off',
      'rest.note': 'This only changes today',
      'settings.open': 'Settings',
      'settings.close': 'Close',
      'settings.title': 'Work schedule',
      'settings.wage': 'Daily wage',
      'settings.start': 'Start',
      'settings.end': 'End',
      'settings.lunchStart': 'Lunch starts',
      'settings.lunch': 'Lunch length',
      'settings.minutes': 'min',
      'settings.reset': 'Reset to defaults',
      'settings.hint': 'Changes apply instantly and stay on this device.',
      'settings.invalid': 'Quitting time must be later than start time.',
      'foot': 'Everything stays on this device. Use Settings to change wage, hours, and lunch.',
      'cheer.1': 'That is +¥{rate} a minute. Small and steady.',
      'cheer.2': 'Take it slow — every second of effort counts.',
      'cheer.3': 'Pay is arriving. Please do not disturb.',
      'cheer.4': 'You are buying your future self options, one hour at a time.',
      'cheer.5': 'The countdown and the wallet both look better now.',
      'cheer.6': 'You earned it again today.',
      'cheer.rest': 'Rest is part of the job. No pay today, and that is fine.',
      'cheer.done': 'Work is done. The rest of the day belongs to you.',
      'cheer.before': 'Not clocked in yet. Ease into it.',
      'cheer.setup': 'Set your start and end times and the seconds start paying.',
    };

    /* Page chrome follows the host panel pages: full-height column, centered
       content, host type scale, and only --dsw-alias-* theme tokens for color. */
    const pageCss = `
.dsh-wc-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  height: 100%;
  min-height: 0;
  background: var(--dsw-alias-bg-base);
  color: var(--dsw-alias-label-primary);
  font-size: 14px;
  line-height: 1.6;
  overflow: hidden;
}
.dsh-wc-scroll {
  flex: 1;
  min-height: 0;
  overflow: auto;
  scrollbar-gutter: stable;
}
.dsh-wc-content {
  box-sizing: border-box;
  max-width: 620px;
  margin: 0 auto;
  padding: 0 clamp(20px, 4vw, 40px) 56px;
}
.dsh-wc-head {
  padding-top: 28px;
  margin-bottom: 18px;
}
[data-platform='darwin'] .dsh-wc-head {
  padding-top: calc(28px + var(--dsh-frame-top-clearance, 0px));
}
.dsh-wc-headRow {
  display: flex;
  align-items: center;
  gap: 12px;
}
.dsh-wc-mark {
  display: grid;
  place-items: center;
  flex: none;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 14%, var(--dsw-alias-bg-layer-1));
  color: var(--dsw-alias-brand-primary);
  font-size: 19px;
  font-weight: 500;
  line-height: 1;
}
.dsh-wc-titles {
  flex: 1;
  min-width: 0;
}
.dsh-wc-title {
  margin: 0;
  font-size: 19px;
  font-weight: 500;
  line-height: 26px;
}
.dsh-wc-sub {
  margin: 1px 0 0;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
  line-height: 18px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.dsh-wc-ghost {
  flex: none;
  height: 30px;
  padding: 0 12px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 15px;
  background: transparent;
  color: var(--dsw-alias-label-secondary);
  font: inherit;
  font-size: 12px;
  line-height: 18px;
  cursor: pointer;
}
.dsh-wc-ghost:hover {
  background: color-mix(in srgb, var(--dsw-alias-label-primary) 6%, transparent);
  color: var(--dsw-alias-label-primary);
}
.dsh-wc-stack {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.dsh-wc-hero {
  position: relative;
  box-sizing: border-box;
  padding: 18px 22px 16px;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-brand-primary) 22%, var(--dsw-alias-border-l1));
  border-radius: 20px;
  background:
    radial-gradient(130% 150% at 100% 0%, color-mix(in srgb, var(--dsw-alias-brand-primary) 18%, transparent) 0%, transparent 64%),
    var(--dsw-alias-bg-layer-1);
  overflow: hidden;
}
.dsh-wc-hero[data-phase='done'] {
  border-color: color-mix(in srgb, var(--dsw-alias-state-success-primary) 28%, var(--dsw-alias-border-l1));
  background:
    radial-gradient(130% 150% at 100% 0%, color-mix(in srgb, var(--dsw-alias-state-success-primary) 16%, transparent) 0%, transparent 64%),
    var(--dsw-alias-bg-layer-1);
}
.dsh-wc-hero[data-phase='rest'] {
  border-color: var(--dsw-alias-border-l1);
  background: var(--dsw-alias-bg-layer-1);
}
.dsh-wc-heroTop {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 6px 12px;
}
.dsh-wc-state {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-height: 18px;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
  line-height: 18px;
}
.dsh-wc-stateText {
  display: inline-block;
  animation: dsh-wc-quip-in 240ms ease-out;
}
.dsh-wc-stateDot {
  flex: none;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--dsw-alias-state-idle-primary);
}
.dsh-wc-hero[data-phase='working'] .dsh-wc-stateDot {
  background: var(--dsw-alias-state-success-primary);
  animation: dsh-wc-breathe 2.4s ease-in-out infinite;
}
.dsh-wc-hero[data-phase='lunch'] .dsh-wc-stateDot {
  background: var(--dsw-alias-state-warn-primary);
}
.dsh-wc-hero[data-phase='done'] .dsh-wc-stateDot {
  background: var(--dsw-alias-state-success-primary);
}
.dsh-wc-hero[data-phase='setup'] .dsh-wc-stateDot {
  background: var(--dsw-alias-state-error-primary);
}
.dsh-wc-rate {
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
  line-height: 18px;
  font-variant-numeric: tabular-nums;
}
.dsh-wc-earnedLabel {
  margin-top: 14px;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
  line-height: 18px;
}
.dsh-wc-money {
  display: flex;
  align-items: baseline;
  margin-top: 2px;
  color: var(--dsw-alias-brand-primary);
  font-size: clamp(38px, 8vw, 54px);
  font-weight: 300;
  line-height: 1.12;
  letter-spacing: -0.01em;
  font-variant-numeric: tabular-nums;
}
.dsh-wc-hero[data-phase='done'] .dsh-wc-money {
  color: var(--dsw-alias-state-success-primary);
}
.dsh-wc-moneyMark {
  margin-right: 0.12em;
  font-size: 0.56em;
  font-weight: 400;
}
.dsh-wc-moneyLast {
  margin-left: 0.03em;
  color: var(--dsw-alias-label-primary);
  font-size: 0.5em;
  transform: translateY(-0.34em);
  animation: dsh-wc-tick 180ms ease-out;
}
.dsh-wc-burst {
  position: absolute;
  top: 72px;
  right: 22px;
  padding: 1px 8px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--dsw-alias-state-success-primary) 16%, transparent);
  color: var(--dsw-alias-state-success-primary);
  font-size: 11px;
  line-height: 18px;
  font-variant-numeric: tabular-nums;
  pointer-events: none;
  animation: dsh-wc-burst 1.6s ease-out forwards;
}
.dsh-wc-hint {
  margin: 6px 0 0;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
  line-height: 18px;
}
.dsh-wc-count {
  box-sizing: border-box;
  padding: 14px 18px 12px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 16px;
  background: var(--dsw-alias-bg-layer-1);
}
.dsh-wc-countLabel {
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
  line-height: 18px;
}
.dsh-wc-countValue {
  margin: 1px 0 0;
  font-size: 30px;
  font-weight: 300;
  line-height: 1.22;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.01em;
}
.dsh-wc-count[data-mode='text'] .dsh-wc-countValue {
  font-size: 17px;
  font-weight: 400;
  line-height: 26px;
  color: var(--dsw-alias-label-secondary);
  letter-spacing: 0;
}
.dsh-wc-track {
  height: 6px;
  margin-top: 12px;
  border-radius: 3px;
  background: color-mix(in srgb, var(--dsw-alias-label-primary) 10%, transparent);
  overflow: hidden;
}
.dsh-wc-fill {
  height: 100%;
  border-radius: 3px;
  background: var(--dsw-alias-brand-primary);
  transition: width 0.5s linear;
}
.dsh-wc-hero[data-phase='done'] ~ .dsh-wc-count .dsh-wc-fill,
.dsh-wc-count[data-phase='done'] .dsh-wc-fill {
  background: var(--dsw-alias-state-success-primary);
}
.dsh-wc-countMeta {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 2px 12px;
  margin-top: 8px;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
  line-height: 18px;
  font-variant-numeric: tabular-nums;
}
.dsh-wc-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  box-sizing: border-box;
  padding: 14px 18px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 16px;
  background: var(--dsw-alias-bg-layer-1);
}
.dsh-wc-stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.dsh-wc-statLabel {
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
  line-height: 17px;
}
.dsh-wc-statValue {
  font-size: 15px;
  line-height: 22px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.dsh-wc-monthNote {
  margin: 0;
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
  line-height: 17px;
}
.dsh-wc-disclosure {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  align-self: flex-start;
  padding: 2px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--dsw-alias-label-secondary);
  font: inherit;
  font-size: 12px;
  line-height: 18px;
  cursor: pointer;
}
.dsh-wc-disclosure:hover {
  color: var(--dsw-alias-label-primary);
}
.dsh-wc-chevron {
  flex: none;
  transition: transform 0.2s ease;
}
.dsh-wc-disclosure[aria-expanded='true'] .dsh-wc-chevron {
  transform: rotate(90deg);
}
.dsh-wc-shop {
  box-sizing: border-box;
  padding: 14px 16px 15px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 18px;
  background:
    radial-gradient(120% 140% at 0% 0%, color-mix(in srgb, var(--dsw-alias-brand-primary) 9%, transparent) 0%, transparent 58%),
    var(--dsw-alias-bg-layer-1);
}
.dsh-wc-shopHead {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px 12px;
}
.dsh-wc-shopHeadText {
  flex: 1;
  min-width: 0;
}
.dsh-wc-shopTitle {
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
}
.dsh-wc-shopSub {
  margin-top: 1px;
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
  line-height: 17px;
}
.dsh-wc-shopAside {
  display: flex;
  flex: none;
  align-items: center;
  gap: 8px;
}
.dsh-wc-shopAmount {
  flex: none;
  color: var(--dsw-alias-brand-primary);
  font-size: 13px;
  line-height: 20px;
  font-variant-numeric: tabular-nums;
}
.dsh-wc-shuffle {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 22px;
  padding: 0 8px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 11px;
  background: transparent;
  color: var(--dsw-alias-label-secondary);
  font: inherit;
  font-size: 10px;
  line-height: 16px;
  cursor: pointer;
}
.dsh-wc-shuffle:hover {
  color: var(--dsw-alias-label-primary);
  background: color-mix(in srgb, var(--dsw-alias-label-primary) 6%, transparent);
}
.dsh-wc-shuffleIcon {
  flex: none;
  animation: dsh-wc-shuffle-spin 380ms ease-out;
}
.dsh-wc-shelf {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 8px;
  margin-top: 12px;
}
.dsh-wc-shelfItem {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  min-width: 0;
  padding: 9px 4px 8px;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-brand-primary) 14%, var(--dsw-alias-border-l1));
  border-radius: 12px;
  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 6%, var(--dsw-alias-bg-layer-2));
  text-align: center;
  animation: dsh-wc-deal 260ms ease-out backwards;
}
.dsh-wc-shelfItem:nth-child(2) { animation-delay: 25ms; }
.dsh-wc-shelfItem:nth-child(3) { animation-delay: 50ms; }
.dsh-wc-shelfItem:nth-child(4) { animation-delay: 75ms; }
.dsh-wc-shelfItem:nth-child(5) { animation-delay: 100ms; }
.dsh-wc-shelfItem[data-locked='true'] {
  border-color: var(--dsw-alias-border-l1);
  background: var(--dsw-alias-bg-layer-2);
  opacity: 0.6;
  animation-name: dsh-wc-deal-locked;
}
.dsh-wc-shelfEmoji {
  font-size: 20px;
  line-height: 26px;
}
.dsh-wc-shelfName {
  max-width: 100%;
  overflow: hidden;
  color: var(--dsw-alias-label-secondary);
  font-size: 10px;
  line-height: 16px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.dsh-wc-shelfCount {
  font-size: 12px;
  line-height: 18px;
  font-variant-numeric: tabular-nums;
}
.dsh-wc-shelfCount[data-locked='true'] {
  color: var(--dsw-alias-label-secondary);
  font-size: 9px;
  line-height: 15px;
}
.dsh-wc-milestone {
  margin-top: 12px;
}
.dsh-wc-milestoneTop {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 2px 10px;
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
  line-height: 17px;
}
.dsh-wc-milestonePct {
  font-variant-numeric: tabular-nums;
}
.dsh-wc-milestoneTrack {
  height: 5px;
  margin-top: 6px;
  border-radius: 3px;
  background: color-mix(in srgb, var(--dsw-alias-label-primary) 10%, transparent);
  overflow: hidden;
}
.dsh-wc-milestoneFill {
  height: 100%;
  border-radius: 3px;
  background: var(--dsw-alias-state-success-primary);
  transition: width 0.4s linear;
}
@media (max-width: 560px) {
  .dsh-wc-shelf {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
@media (max-width: 380px) {
  .dsh-wc-shelf {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
.dsh-wc-cheer {
  margin: 0;
  padding: 2px 0 2px 13px;
  border-left: 2px solid color-mix(in srgb, var(--dsw-alias-brand-primary) 55%, transparent);
  color: var(--dsw-alias-label-secondary);
  font-size: 13px;
  line-height: 21px;
}
.dsh-wc-restActions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 12px;
  margin-top: 2px;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
  line-height: 18px;
}
.dsh-wc-settings {
  box-sizing: border-box;
  padding: 16px 18px 14px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 16px;
  background: var(--dsw-alias-bg-layer-1);
}
.dsh-wc-settingsHead {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}
.dsh-wc-settingsTitle {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
}
.dsh-wc-fields {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
}
.dsh-wc-field {
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
}
.dsh-wc-fieldLabel {
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
  line-height: 18px;
}
.dsh-wc-inputWrap {
  position: relative;
  display: flex;
  align-items: center;
}
.dsh-wc-input {
  box-sizing: border-box;
  width: 100%;
  height: 34px;
  padding: 0 10px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 9px;
  background: var(--dsw-alias-bg-base);
  color: var(--dsw-alias-label-primary);
  font: inherit;
  font-size: 13px;
  line-height: 20px;
  font-variant-numeric: tabular-nums;
}
.dsh-wc-inputWrap[data-suffix='true'] .dsh-wc-input {
  padding-right: 46px;
}
.dsh-wc-input:focus-visible {
  outline: 2px solid var(--dsw-alias-brand-primary);
  outline-offset: 1px;
  border-color: transparent;
}
.dsh-wc-suffix {
  position: absolute;
  right: 10px;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
  line-height: 18px;
  pointer-events: none;
}
.dsh-wc-settingsFoot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 6px 12px;
  margin-top: 12px;
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
  line-height: 17px;
}
.dsh-wc-invalid {
  color: var(--dsw-alias-state-error-primary);
}
.dsh-wc-link {
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--dsw-alias-label-secondary);
  font: inherit;
  font-size: 11px;
  line-height: 17px;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 2px;
}
.dsh-wc-link:hover {
  color: var(--dsw-alias-label-primary);
}
.dsh-wc-ghost:focus-visible,
.dsh-wc-link:focus-visible,
.dsh-wc-action:focus-visible,
.dsh-wc-shuffle:focus-visible,
.dsh-wc-disclosure:focus-visible {
  outline: 2px solid var(--dsw-alias-brand-primary);
  outline-offset: 2px;
}
.dsh-wc-action {
  flex: none;
  height: 28px;
  padding: 0 12px;
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 14px;
  background: transparent;
  color: var(--dsw-alias-label-primary);
  font: inherit;
  font-size: 12px;
  line-height: 18px;
  cursor: pointer;
}
.dsh-wc-action:hover {
  background: color-mix(in srgb, var(--dsw-alias-label-primary) 6%, transparent);
}
.dsh-wc-foot {
  margin: 0;
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
  line-height: 17px;
}
@keyframes dsh-wc-breathe {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.45; transform: scale(0.82); }
}
@keyframes dsh-wc-quip-in {
  from { opacity: 0; transform: translateY(3px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes dsh-wc-tick {
  0% { transform: translateY(-0.34em) scale(1.16); opacity: 0.6; }
  100% { transform: translateY(-0.34em) scale(1); opacity: 1; }
}
@keyframes dsh-wc-burst {
  0% { opacity: 0; transform: translateY(6px) scale(0.94); }
  14% { opacity: 1; transform: translateY(0) scale(1); }
  68% { opacity: 1; transform: translateY(-8px); }
  100% { opacity: 0; transform: translateY(-16px); }
}
@keyframes dsh-wc-shuffle-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes dsh-wc-deal {
  from { opacity: 0; transform: translateY(4px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes dsh-wc-deal-locked {
  from { opacity: 0; transform: translateY(4px) scale(0.98); }
  to { opacity: 0.6; transform: translateY(0) scale(1); }
}
@media (prefers-reduced-motion: reduce) {
  .dsh-wc-stateDot { animation: none !important; }
  .dsh-wc-fill { transition: none; }
  .dsh-wc-stateText,
  .dsh-wc-moneyLast,
  .dsh-wc-burst,
  .dsh-wc-shuffleIcon,
  .dsh-wc-shelfItem { animation: none !important; }
}
`;

    /* The sidebar glyph carries the workday ring, so the entry itself shows how
       much of today is already banked. */
    const iconCss = `
.dsh-wc-glyph {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.dsh-wc-glyphTrack {
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  opacity: 0.22;
}
.dsh-wc-glyphArc {
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.5s linear, stroke 0.2s ease;
}
.dsh-wc-glyph[data-tone='active'] .dsh-wc-glyphArc { stroke: var(--dsw-alias-brand-primary); }
.dsh-wc-glyph[data-tone='done'] .dsh-wc-glyphArc { stroke: var(--dsw-alias-state-success-primary); }
.dsh-wc-glyph[data-tone='idle'] .dsh-wc-glyphArc { stroke: currentColor; }
.dsh-wc-glyphYuan {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.dsh-wc-glyph[data-tone='active'] .dsh-wc-glyphYuan { stroke: var(--dsw-alias-label-primary); }
@media (prefers-reduced-motion: reduce) {
  .dsh-wc-glyphArc { transition: none; }
}
`;

    /** Two-digit zero padding for clock text. */
    function pad2(value) {
      return value < 10 ? `0${value}` : String(value);
    }

    /** Clamp one numeric value into a closed range. */
    function clamp(value, low, high) {
      return Math.min(high, Math.max(low, value));
    }

    /** `HH:mm` parsed into minutes since midnight, or the fallback when unreadable. */
    function parseTime(text, fallback) {
      if (typeof text !== 'string') return fallback;
      const match = /^(\d{1,2}):(\d{2})$/.exec(text.trim());
      if (match === null) return fallback;
      const hours = Number(match[1]);
      const minutes = Number(match[2]);
      if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return fallback;
      if (hours > 23 || minutes > 59) return fallback;
      return hours * 60 + minutes;
    }

    /** `HH:mm` of a minute offset, clamped into one day, for inputs and labels. */
    function timeText(minutes) {
      const safe = clamp(Math.round(minutes), 0, 23 * 60 + 59);
      return `${pad2(Math.floor(safe / 60))}:${pad2(safe % 60)}`;
    }

    /** Grouped fixed-precision money text; falls back when Intl is unavailable. */
    function moneyText(value, digits) {
      const safe = Number.isFinite(value) ? value : 0;
      try {
        return safe.toLocaleString(undefined, {
          minimumFractionDigits: digits,
          maximumFractionDigits: digits,
        });
      } catch (error) {
        return safe.toFixed(digits);
      }
    }

    /** Seconds since local midnight, including the fraction that makes money move. */
    function secondsOfDay(date) {
      return date.getHours() * 3600
        + date.getMinutes() * 60
        + date.getSeconds()
        + date.getMilliseconds() / 1000;
    }

    /** Local calendar day key (`YYYY-MM-DD`). */
    function dayKey(date) {
      return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
    }

    /** Saturday and Sunday are rest days unless today's schedule was overridden. */
    function isRestDay(date) {
      const weekday = date.getDay();
      return weekday === 0 || weekday === 6;
    }

    /** Whether one schedule window contains a second-of-day value. */
    function inWindow(seconds, window) {
      return seconds >= window[0] && seconds < window[1];
    }

    /** A weekday label for the header line, in the page's own language. */
    function weekdayText(date) {
      try {
        return new Intl.DateTimeFormat(undefined, { weekday: 'short' }).format(date);
      } catch (error) {
        return '';
      }
    }

    /** Header line: date, weekday, and the running clock. */
    function dateLine(date) {
      const weekday = weekdayText(date);
      const datePart = `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
      const timePart = `${pad2(date.getHours())}:${pad2(date.getMinutes())}:${pad2(date.getSeconds())}`;
      return weekday === '' ? `${datePart} · ${timePart}` : `${datePart} ${weekday} · ${timePart}`;
    }

    /** `mm:ss`, or `hh:mm:ss` when more than an hour remains. */
    function formatCountdown(totalSeconds) {
      const total = Math.max(0, Math.ceil(totalSeconds));
      const hours = Math.floor(total / 3600);
      const minutes = Math.floor((total % 3600) / 60);
      const seconds = total % 60;
      if (hours > 0) return `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`;
      return `${pad2(minutes)}:${pad2(seconds)}`;
    }

    /** A stored setting record reduced to values this page can compute with. */
    function normalizeSettings(raw) {
      const base = { ...DEFAULTS };
      if (raw === null || typeof raw !== 'object') return base;
      const wage = Number(raw.dailyWage);
      const lunch = Number(raw.lunchMinutes);
      return {
        dailyWage: Number.isFinite(wage) ? clamp(wage, 0, 1000000) : base.dailyWage,
        start: timeText(parseTime(raw.start, parseTime(base.start, 540))),
        end: timeText(parseTime(raw.end, parseTime(base.end, 1080))),
        lunchStart: timeText(parseTime(raw.lunchStart, parseTime(base.lunchStart, 720))),
        lunchMinutes: Number.isFinite(lunch) ? clamp(Math.round(lunch), 0, 600) : base.lunchMinutes,
      };
    }

    /** Read the saved settings and today's rest-day override, or start fresh. */
    function readState() {
      const fallback = { settings: { ...DEFAULTS }, restOverride: null, shopRound: 0 };
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw === null) return fallback;
        const parsed = JSON.parse(raw);
        if (parsed === null || typeof parsed !== 'object') return fallback;
        return {
          settings: normalizeSettings(parsed.settings),
          restOverride: typeof parsed.restOverride === 'string' ? parsed.restOverride : null,
          shopRound: Number.isFinite(parsed.shopRound) ? Math.max(0, Math.floor(parsed.shopRound)) : 0,
        };
      } catch (error) {
        return fallback;
      }
    }

    /**
     * The paid part of the day: the morning and afternoon windows between start
     * and end, with the lunch gap removed. An unreadable schedule is invalid
     * rather than silently guessed, so the settings hint can ask for a fix.
     */
    function scheduleOf(settings) {
      const start = parseTime(settings.start, 540);
      const end = parseTime(settings.end, 1080);
      const lunchStart = parseTime(settings.lunchStart, 720);
      const valid = end > start;
      const lunchLength = valid ? Math.min(Math.max(0, settings.lunchMinutes), end - start) : 0;
      const lunchFrom = valid ? clamp(lunchStart, start, end) : start;
      const lunchTo = valid ? Math.min(end, lunchFrom + lunchLength) : start;
      const windows = valid
        ? [
          [start * 60, lunchFrom * 60],
          [lunchTo * 60, end * 60],
        ].filter((window) => window[1] - window[0] > 0)
        : [];
      const workSeconds = windows.reduce((sum, window) => sum + (window[1] - window[0]), 0);
      return {
        valid,
        startSeconds: start * 60,
        endSeconds: end * 60,
        windows,
        workSeconds,
        /* A zero-length lunch leaves two windows that touch, not a real gap. */
        hasGap: valid && lunchTo > lunchFrom,
      };
    }

    /** Paid seconds already accumulated today; lunch and evenings add nothing. */
    function workedSecondsOf(now, schedule) {
      const seconds = secondsOfDay(now);
      let total = 0;
      for (const window of schedule.windows) {
        if (seconds <= window[0]) continue;
        total += Math.min(seconds, window[1]) - window[0];
      }
      return total;
    }

    /** Which card the workday is in right now. */
    function phaseOf(now, schedule, rest, override) {
      if (!schedule.valid) return 'setup';
      if (rest && !override) return 'rest';
      const seconds = secondsOfDay(now);
      if (seconds < schedule.startSeconds) return 'before';
      if (seconds >= schedule.endSeconds) return 'done';
      if (schedule.windows.some((window) => inWindow(seconds, window))) return 'working';
      return schedule.hasGap ? 'lunch' : 'working';
    }

    /** Seconds until the next paid boundary, or null when nothing is counting. */
    function countdownSecondsOf(now, schedule) {
      const seconds = secondsOfDay(now);
      if (seconds < schedule.startSeconds) return schedule.startSeconds - seconds;
      for (const window of schedule.windows) {
        if (inWindow(seconds, window)) return window[1] - seconds;
      }
      for (const window of schedule.windows) {
        if (window[0] > seconds) return window[0] - seconds;
      }
      return null;
    }

    /**
     * Weekdays of the current month: the schedule, the workdays already behind
     * us (counted at full wage), and what today has added so far.
     */
    function monthStatsOf(now, settings, todayEarned, rest, override) {
      const year = now.getFullYear();
      const month = now.getMonth();
      const today = now.getDate();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      let workdays = 0;
      let pastWorkdays = 0;
      for (let day = 1; day <= daysInMonth; day += 1) {
        const date = new Date(year, month, day);
        if (isRestDay(date)) continue;
        workdays += 1;
        if (day < today) pastWorkdays += 1;
      }
      const todayCounts = !rest || override;
      return {
        workdays,
        monthWage: workdays * settings.dailyWage,
        earned: pastWorkdays * settings.dailyWage + (todayCounts ? todayEarned : 0),
      };
    }

    /** Every value both surfaces render, derived from the wall clock each tick. */
    function derive(timestamp, state) {
      /* Callers pass the wall clock they tick on; accept both a Date and a
         timestamp so a stale caller can never crash a slot cell. */
      const now = timestamp instanceof Date ? timestamp : new Date(timestamp);
      const settings = state.settings;
      const schedule = scheduleOf(settings);
      const today = dayKey(now);
      const rest = isRestDay(now);
      const override = state.restOverride === today;
      const phase = phaseOf(now, schedule, rest, override);
      const counted = phase !== 'rest' && phase !== 'setup' && phase !== 'before';
      const workedSeconds = counted ? workedSecondsOf(now, schedule) : 0;
      const fullSeconds = schedule.workSeconds;
      const fraction = fullSeconds > 0 ? clamp(workedSeconds / fullSeconds, 0, 1) : 0;
      const earned = clamp(settings.dailyWage * fraction, 0, settings.dailyWage);
      const ratePerSecond = fullSeconds > 0 ? settings.dailyWage / fullSeconds : 0;
      return {
        phase,
        rest,
        override,
        schedule,
        workedSeconds,
        workSeconds: fullSeconds,
        progress: fraction,
        earned,
        ratePerSecond,
        ratePerMinute: ratePerSecond * 60,
        countdownSeconds: phase === 'working' || phase === 'lunch' || phase === 'before'
          ? countdownSecondsOf(now, schedule)
          : null,
        month: monthStatsOf(now, settings, earned, rest, override),
      };
    }

    /** The encouragement line for the current phase or the rotating list. */
    function cheerKeyOf(phase, index) {
      if (phase === 'rest') return 'cheer.rest';
      if (phase === 'done') return 'cheer.done';
      if (phase === 'before') return 'cheer.before';
      if (phase === 'setup') return 'cheer.setup';
      return `cheer.${(index % CHEER_COUNT) + 1}`;
    }

    /**
     * The status bar's own voice. Each stretch of a paid window gets two short
     * quips, so the line follows the clock instead of repeating one phase label.
     */
    function statusKeysOf(now, phase, schedule) {
      if (phase === 'lunch') return ['status.lunch'];
      if (phase === 'before') return ['status.before'];
      if (phase === 'done') return ['status.done'];
      if (phase === 'rest') return ['status.rest'];
      if (phase === 'setup') return ['status.setup'];
      if (phase !== 'working') return ['status.working'];
      const seconds = secondsOfDay(now);
      for (let index = 0; index < schedule.windows.length; index += 1) {
        const window = schedule.windows[index];
        if (!inWindow(seconds, window)) continue;
        const position = (seconds - window[0]) / Math.max(1, window[1] - window[0]);
        if (position < 0.22) {
          return index === 0 ? ['status.am.0', 'status.am.1'] : ['status.pm.0', 'status.pm.1'];
        }
        if (position < 0.7) {
          return index === 0 ? ['status.mid.0', 'status.mid.1'] : ['status.midPm.0', 'status.midPm.1'];
        }
        return index === 0 ? ['status.late.0', 'status.late.1'] : ['status.end.0', 'status.end.1'];
      }
      return ['status.working'];
    }

    /** Every wish the shop can stock, cheapest first. */
    const SHOP_ITEMS = [
      { key: 'item.milktea', emoji: '🧋', price: 16 },
      { key: 'item.coffee', emoji: '☕', price: 32 },
      { key: 'item.movie', emoji: '🎬', price: 45 },
      { key: 'item.hotpot', emoji: '🍲', price: 188 },
      { key: 'item.massage', emoji: '💆', price: 228 },
      { key: 'item.game', emoji: '🎮', price: 298 },
      { key: 'item.concert', emoji: '🎤', price: 480 },
      { key: 'item.infield', emoji: '🎫', price: 1280 },
      { key: 'item.flight', emoji: '✈️', price: 1680 },
      { key: 'item.chair', emoji: '🪑', price: 2600 },
      { key: 'item.lens', emoji: '📷', price: 3200 },
    ];

    /** How many wishes the daily shelf shows. */
    const SHOP_SHELF_SIZE = 5;

    /** FNV-1a string hash, used only to seed one day's shelf draw. */
    function shopHash(text) {
      let hash = 2166136261;
      for (let index = 0; index < text.length; index += 1) {
        hash ^= text.charCodeAt(index);
        hash = Math.imul(hash, 16777619);
      }
      return hash >>> 0;
    }

    /**
     * Today's shelf: five wishes drawn by a pure random order seeded with the
     * calendar day and the user's reshuffle count, so the shelf is stable all
     * day (and across reloads) but a "换一批" draws a different one.
     */
    function dailyShopOf(day, round) {
      const seedRound = Number.isFinite(round) ? Math.max(0, Math.floor(round)) : 0;
      const seed = `${day}:${seedRound}`;
      return [...SHOP_ITEMS]
        .sort((left, right) => shopHash(`${seed}:${left.key}`) - shopHash(`${seed}:${right.key}`))
        .slice(0, SHOP_SHELF_SIZE)
        .sort((left, right) => left.price - right.price);
    }

    /** Shelf rows with the count today's amount buys; zero means still locked. */
    function shopShelfOf(shelf, earned) {
      return shelf.map((item) => ({
        ...item,
        count: Math.max(0, Math.floor(earned / item.price)),
      }));
    }

    /** The cheapest wish still out of reach on today's shelf, with its progress. */
    function nextShelfUnlockOf(shelf, earned) {
      const next = shelf.find((item) => item.price > earned) ?? null;
      return {
        next,
        progress: next === null ? 1 : clamp(earned / next.price, 0, 1),
      };
    }

    /** The shop's mood line; null while working, when today's quip takes over. */
    function shopPhaseKeyOf(phase) {
      if (phase === 'rest') return 'shop.rest';
      if (phase === 'done') return 'shop.done';
      if (phase === 'before') return 'shop.before';
      return null;
    }

    /**
     * The schedule and today's rest override, shared by the sidebar glyph and
     * the panel page. It lives outside React so both surfaces read one source.
     */
    function createStore() {
      let state = readState();
      const listeners = new Set();

      function emit() {
        for (const listener of [...listeners]) listener();
      }

      function save() {
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (error) {
          /* Private mode or a full quota: the schedule still works this session. */
        }
      }

      return {
        get: () => state,
        subscribe(listener) {
          listeners.add(listener);
          return () => {
            listeners.delete(listener);
          };
        },
        update(patch) {
          state = {
            ...state,
            settings: normalizeSettings({ ...state.settings, ...patch }),
          };
          save();
          emit();
        },
        setRestOverride(day) {
          state = {
            ...state,
            restOverride: typeof day === 'string' ? day : null,
          };
          save();
          emit();
        },
        reshuffleShop() {
          state = {
            ...state,
            shopRound: (Number.isFinite(state.shopRound) ? state.shopRound : 0) + 1,
          };
          save();
          emit();
        },
        resetSettings() {
          state = { ...state, settings: { ...DEFAULTS } };
          save();
          emit();
        },
        dispose() {
          listeners.clear();
        },
      };
    }

    /** Set in `apply`; both surfaces read it through `useStoreState`. */
    let store = null;

    /** What both surfaces read before the store exists (never for long). */
    const EMPTY_STATE = { settings: { ...DEFAULTS }, restOverride: null, shopRound: 0 };

    /** Subscribe one component to the shared schedule state. */
    function useStoreState() {
      const [state, setState] = React.useState(() => (store === null ? EMPTY_STATE : store.get()));
      React.useEffect(() => {
        if (store === null) return undefined;
        const current = store;
        setState(current.get());
        return current.subscribe(() => setState(current.get()));
      }, []);
      return state;
    }

    /** A wall clock that also catches up as soon as the page becomes visible. */
    function useNow(intervalMs) {
      const [now, setNow] = React.useState(() => new Date());
      React.useEffect(() => {
        const id = window.setInterval(() => setNow(new Date()), intervalMs);
        const onVisible = () => {
          if (document.visibilityState === 'visible') setNow(new Date());
        };
        document.addEventListener('visibilitychange', onVisible);
        window.addEventListener('focus', onVisible);
        return () => {
          window.clearInterval(id);
          document.removeEventListener('visibilitychange', onVisible);
          window.removeEventListener('focus', onVisible);
        };
      }, [intervalMs]);
      return now;
    }

    /** Decorative sidebar glyph: the workday ring with a ¥ inside. */
    function WorkdayIcon({ size = 18 }) {
      const now = useNow(20000);
      const state = useStoreState();
      const info = derive(now, state);
      const radius = 9.1;
      const circumference = 2 * Math.PI * radius;
      const tone = info.phase === 'done' ? 'done' : info.phase === 'working' ? 'active' : 'idle';
      return h(
        'span',
        { className: 'dsh-wc-glyph', 'data-tone': tone },
        h('style', null, iconCss),
        h(
          'svg',
          { width: size, height: size, viewBox: '0 0 24 24', 'aria-hidden': true, focusable: false },
          h('circle', { className: 'dsh-wc-glyphTrack', cx: 12, cy: 12, r: radius }),
          h('circle', {
            className: 'dsh-wc-glyphArc',
            cx: 12,
            cy: 12,
            r: radius,
            strokeDasharray: `${circumference} ${circumference}`,
            strokeDashoffset: circumference * (1 - info.progress),
            transform: 'rotate(-90 12 12)',
          }),
          h('path', { className: 'dsh-wc-glyphYuan', d: 'M12 8.2v7.6M9.2 8.1l2.8 3.2 2.8-3.2M9.4 12h5.2M9.4 13.9h5.2' }),
        ),
      );
    }

    /** A numeric settings field that commits live and snaps back when unreadable. */
    function NumberField({ label, value, min, max, step, suffix, onChange }) {
      const [text, setText] = React.useState(() => String(value));
      React.useEffect(() => {
        setText(String(value));
      }, [value]);
      const commit = (next) => {
        const parsed = Number.parseFloat(next);
        if (!Number.isFinite(parsed)) return;
        onChange(clamp(parsed, min, max));
      };
      return h(
        'label',
        { className: 'dsh-wc-field' },
        h('span', { className: 'dsh-wc-fieldLabel' }, label),
        h(
          'span',
          { className: 'dsh-wc-inputWrap', 'data-suffix': suffix ? 'true' : undefined },
          h('input', {
            className: 'dsh-wc-input',
            type: 'number',
            inputMode: 'decimal',
            min,
            max,
            step: step === undefined ? 1 : step,
            value: text,
            onChange: (event) => {
              setText(event.target.value);
              commit(event.target.value);
            },
            onBlur: () => setText(String(value)),
            onKeyDown: (event) => {
              if (event.key === 'Enter') event.currentTarget.blur();
            },
          }),
          suffix === undefined ? null : h('span', { className: 'dsh-wc-suffix' }, suffix),
        ),
      );
    }

    /** A time settings field; the native picker already yields valid `HH:mm`. */
    function TimeField({ label, value, onChange }) {
      return h(
        'label',
        { className: 'dsh-wc-field' },
        h('span', { className: 'dsh-wc-fieldLabel' }, label),
        h('input', {
          className: 'dsh-wc-input',
          type: 'time',
          value,
          onChange: (event) => {
            if (event.target.value !== '') onChange(event.target.value);
          },
        }),
      );
    }

    /** The settings card: wage, hours, and lunch, all persisted as they change. */
    function SettingsCard({ t, settings, schedule }) {
      const update = (patch) => store.update(patch);
      return h(
        'div',
        { className: 'dsh-wc-settings' },
        h(
          'div',
          { className: 'dsh-wc-settingsHead' },
          h('h2', { className: 'dsh-wc-settingsTitle' }, t('settings.title')),
        ),
        h(
          'div',
          { className: 'dsh-wc-fields' },
          h(NumberField, {
            label: t('settings.wage'),
            value: settings.dailyWage,
            min: 0,
            max: 1000000,
            step: 10,
            suffix: '¥',
            onChange: (next) => update({ dailyWage: next }),
          }),
          h(TimeField, {
            label: t('settings.start'),
            value: settings.start,
            onChange: (next) => update({ start: next }),
          }),
          h(TimeField, {
            label: t('settings.end'),
            value: settings.end,
            onChange: (next) => update({ end: next }),
          }),
          h(TimeField, {
            label: t('settings.lunchStart'),
            value: settings.lunchStart,
            onChange: (next) => update({ lunchStart: next }),
          }),
          h(NumberField, {
            label: t('settings.lunch'),
            value: settings.lunchMinutes,
            min: 0,
            max: 600,
            step: 15,
            suffix: t('settings.minutes'),
            onChange: (next) => update({ lunchMinutes: next }),
          }),
        ),
        h(
          'div',
          { className: 'dsh-wc-settingsFoot' },
          h(
            'span',
            schedule.valid ? undefined : { className: 'dsh-wc-invalid' },
            schedule.valid ? t('settings.hint') : t('settings.invalid'),
          ),
          h(
            'button',
            {
              type: 'button',
              className: 'dsh-wc-link',
              onClick: () => store.resetSettings(),
            },
            t('settings.reset'),
          ),
        ),
      );
    }

    /** The panel page; the shell renders it in the center column while selected. */
    function WorkdayPage({ t }) {
      const now = useNow(250);
      const state = useStoreState();
      const info = derive(now, state);
      const settings = state.settings;
      const today = dayKey(now);
      const shopRound = Number.isFinite(state.shopRound) ? state.shopRound : 0;
      const [settingsOpen, setSettingsOpen] = React.useState(false);
      const [detailsOpen, setDetailsOpen] = React.useState(false);
      const [cheerIndex, setCheerIndex] = React.useState(0);
      const [burst, setBurst] = React.useState(null);
      const lastHundred = React.useRef(Math.floor(info.earned / 100));

      React.useEffect(() => {
        const id = window.setInterval(() => setCheerIndex((index) => index + 1), 9000);
        return () => window.clearInterval(id);
      }, []);

      /* One small "到账" toast per ¥100 crossed. A lower amount (a wage edit or a
         new day) only re-arms the threshold; it never fires backwards. */
      const hundred = Math.floor(info.earned / 100);
      React.useEffect(() => {
        if (hundred > lastHundred.current) {
          const gained = (hundred - lastHundred.current) * 100;
          lastHundred.current = hundred;
          setBurst({ id: Date.now(), amount: gained });
          const timer = window.setTimeout(() => setBurst(null), 1600);
          return () => window.clearTimeout(timer);
        }
        if (hundred < lastHundred.current) {
          lastHundred.current = hundred;
          setBurst(null);
        }
        return undefined;
      }, [hundred]);

      /* toFixed keeps a "." separator regardless of the browser's locale, so the
         split below cannot lose the decimals on a comma-decimal system. */
      const earnedText = info.earned.toFixed(4);
      const earnedParts = earnedText.split('.');
      const shelfItems = dailyShopOf(today, shopRound);
      const shelf = shopShelfOf(shelfItems, info.earned);
      const unlock = nextShelfUnlockOf(shelfItems, info.earned);
      const unlockPercent = Math.round(unlock.progress * 100);
      const unlockLabel = unlock.next === null
        ? t('shop.milestoneDone')
        : t('shop.milestone', {
          amount: moneyText(unlock.next.price - info.earned, 2),
          name: t(unlock.next.key),
        });
      const featured = shelfItems[cheerIndex % shelfItems.length];
      const shopPhaseKey = shopPhaseKeyOf(info.phase);
      const shopSub = shopPhaseKey === null
        ? t('shop.quip', { name: t(featured.key), copy: t(`${featured.key}.copy`) })
        : t(shopPhaseKey);
      const cheer = t(cheerKeyOf(info.phase, cheerIndex), {
        rate: moneyText(info.ratePerMinute, 4),
      });
      const statusKeys = statusKeysOf(now, info.phase, info.schedule);
      const statusKey = statusKeys[cheerIndex % statusKeys.length];

      const hasClock = info.countdownSeconds !== null;
      let countdownText;
      if (info.phase === 'done') countdownText = t('count.done');
      else if (info.phase === 'rest') countdownText = t('count.rest');
      else if (info.phase === 'setup') countdownText = t('count.setup');
      else countdownText = formatCountdown(info.countdownSeconds === null ? 0 : info.countdownSeconds);

      const countdownLabel = info.phase === 'working'
        ? t('count.working')
        : info.phase === 'lunch'
          ? t('count.lunch')
          : info.phase === 'before'
            ? t('count.before')
            : t('phase.' + info.phase);

      const percent = (info.progress * 100).toFixed(1);
      const workedHours = (info.workedSeconds / 3600).toFixed(2);
      const fullHours = (info.workSeconds / 3600).toFixed(2);
      const minuteRate = moneyText(info.ratePerMinute, 4);

      return h(
        'section',
        { className: 'dsh-wc-page', 'aria-label': t('page.title') },
        h('style', null, pageCss),
        h(
          'div',
          { className: 'dsh-wc-scroll' },
          h(
            'div',
            { className: 'dsh-wc-content' },
            h(
              'header',
              { className: 'dsh-wc-head' },
              h(
                'div',
                { className: 'dsh-wc-headRow' },
                h('span', { className: 'dsh-wc-mark', 'aria-hidden': true }, '¥'),
                h(
                  'div',
                  { className: 'dsh-wc-titles' },
                  h('h1', { className: 'dsh-wc-title' }, t('page.title')),
                  h('p', { className: 'dsh-wc-sub' }, dateLine(now)),
                ),
                h(
                  'button',
                  {
                    type: 'button',
                    className: 'dsh-wc-ghost',
                    'aria-expanded': settingsOpen ? 'true' : 'false',
                    onClick: () => setSettingsOpen((open) => !open),
                  },
                  t(settingsOpen ? 'settings.close' : 'settings.open'),
                ),
              ),
            ),
            h(
              'div',
              { className: 'dsh-wc-stack' },
              h(
                'div',
                { className: 'dsh-wc-hero', 'data-phase': info.phase },
                h(
                  'div',
                  { className: 'dsh-wc-heroTop' },
                  h(
                    'span',
                    { className: 'dsh-wc-state' },
                    h('span', { className: 'dsh-wc-stateDot', 'aria-hidden': true }),
                    h('span', { className: 'dsh-wc-stateText', key: statusKey }, t(statusKey)),
                  ),
                  h(
                    'span',
                    { className: 'dsh-wc-rate' },
                    t('earned.hint', { rate: minuteRate }),
                  ),
                ),
                h('div', { className: 'dsh-wc-earnedLabel' }, t('earned.label')),
                burst === null
                  ? null
                  : h(
                    'span',
                    { className: 'dsh-wc-burst', key: burst.id, 'aria-hidden': true },
                    t('money.burst', { amount: moneyText(burst.amount, 0) }),
                  ),
                h(
                  'div',
                  { className: 'dsh-wc-money', 'aria-label': `¥${earnedText}` },
                  h('span', { className: 'dsh-wc-moneyMark', 'aria-hidden': true }, '¥'),
                  h('span', { 'aria-hidden': true }, earnedParts[0]),
                  h('span', { 'aria-hidden': true }, '.'),
                  h('span', { 'aria-hidden': true }, earnedParts[1].slice(0, -1)),
                  h(
                    'span',
                    { className: 'dsh-wc-moneyLast', key: earnedParts[1].slice(-1), 'aria-hidden': true },
                    earnedParts[1].slice(-1),
                  ),
                ),
                info.rest && !info.override
                  ? h(
                    'div',
                    { className: 'dsh-wc-restActions' },
                    h('span', null, t('rest.note')),
                    h(
                      'button',
                      {
                        type: 'button',
                        className: 'dsh-wc-action',
                        onClick: () => store.setRestOverride(today),
                      },
                      t('rest.work'),
                    ),
                  )
                  : info.rest && info.override
                    ? h(
                      'div',
                      { className: 'dsh-wc-restActions' },
                      h('span', null, t('rest.note')),
                      h(
                        'button',
                        {
                          type: 'button',
                          className: 'dsh-wc-action',
                          onClick: () => store.setRestOverride(null),
                        },
                        t('rest.undo'),
                      ),
                    )
                    : null,
              ),
              h(
                'div',
                { className: 'dsh-wc-count', 'data-mode': hasClock ? undefined : 'text', 'data-phase': info.phase },
                h('div', { className: 'dsh-wc-countLabel' }, countdownLabel),
                h('div', { className: 'dsh-wc-countValue' }, countdownText),
                h(
                  'div',
                  {
                    className: 'dsh-wc-track',
                    role: 'progressbar',
                    'aria-valuemin': 0,
                    'aria-valuemax': 100,
                    'aria-valuenow': Math.round(info.progress * 100),
                    'aria-label': t('progress.label', { percent }),
                  },
                  h('div', {
                    className: 'dsh-wc-fill',
                    style: { width: `${(info.progress * 100).toFixed(2)}%` },
                  }),
                ),
                h(
                  'div',
                  { className: 'dsh-wc-countMeta' },
                  h('span', null, t('progress.label', { percent })),
                  h('span', null, t('progress.hours', { worked: workedHours, total: fullHours })),
                ),
              ),
              h(
                'button',
                {
                  type: 'button',
                  className: 'dsh-wc-disclosure',
                  'aria-expanded': detailsOpen ? 'true' : 'false',
                  onClick: () => setDetailsOpen((open) => !open),
                },
                h(
                  'svg',
                  {
                    className: 'dsh-wc-chevron',
                    width: 10,
                    height: 10,
                    viewBox: '0 0 10 10',
                    'aria-hidden': true,
                    focusable: false,
                  },
                  h('path', {
                    d: 'M3.5 1.5 7 5l-3.5 3.5',
                    fill: 'none',
                    stroke: 'currentColor',
                    strokeWidth: 1.4,
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                  }),
                ),
                t(detailsOpen ? 'details.hide' : 'details.show'),
              ),
              detailsOpen
                ? h(
                  React.Fragment,
                  null,
                  h(
                    'div',
                    { className: 'dsh-wc-stats' },
                    h(
                      'div',
                      { className: 'dsh-wc-stat' },
                      h('span', { className: 'dsh-wc-statLabel' }, t('stat.rate')),
                      h(
                        'span',
                        { className: 'dsh-wc-statValue' },
                        `¥${moneyText(info.workSeconds > 0 ? settings.dailyWage / (info.workSeconds / 3600) : 0, 2)}`,
                      ),
                    ),
                    h(
                      'div',
                      { className: 'dsh-wc-stat' },
                      h('span', { className: 'dsh-wc-statLabel' }, t('stat.full')),
                      h('span', { className: 'dsh-wc-statValue' }, `¥${moneyText(settings.dailyWage, 2)}`),
                    ),
                    h(
                      'div',
                      { className: 'dsh-wc-stat' },
                      h('span', { className: 'dsh-wc-statLabel' }, t('stat.month')),
                      h('span', { className: 'dsh-wc-statValue' }, `¥${moneyText(info.month.earned, 2)}`),
                    ),
                  ),
                  h(
                    'p',
                    { className: 'dsh-wc-monthNote' },
                    t('month.note', { days: info.month.workdays }),
                  ),
                )
                : null,
              h(
                'div',
                { className: 'dsh-wc-shop' },
                h(
                  'div',
                  { className: 'dsh-wc-shopHead' },
                  h(
                    'div',
                    { className: 'dsh-wc-shopHeadText' },
                    h('div', { className: 'dsh-wc-shopTitle' }, t('shop.title')),
                    h('div', { className: 'dsh-wc-shopSub' }, shopSub),
                  ),
                  h(
                    'div',
                    { className: 'dsh-wc-shopAside' },
                    h('div', { className: 'dsh-wc-shopAmount' }, `¥${moneyText(info.earned, 2)}`),
                    h(
                      'button',
                      {
                        type: 'button',
                        className: 'dsh-wc-shuffle',
                        title: t('shop.shuffle'),
                        'aria-label': t('shop.shuffle'),
                        onClick: () => store.reshuffleShop(),
                      },
                      h(
                        'svg',
                        {
                          key: shopRound,
                          className: 'dsh-wc-shuffleIcon',
                          width: 12,
                          height: 12,
                          viewBox: '0 0 16 16',
                          'aria-hidden': true,
                          focusable: false,
                        },
                        h('path', {
                          d: 'M2 5h3l6 6h3M2 11h3l6-6h3M11.6 3.4 14 5l-2.4 1.6M11.6 9.4 14 11l-2.4 1.6',
                          fill: 'none',
                          stroke: 'currentColor',
                          strokeWidth: 1.3,
                          strokeLinecap: 'round',
                          strokeLinejoin: 'round',
                        }),
                      ),
                      t('shop.shuffle'),
                    ),
                  ),
                ),
                h(
                  'div',
                  { className: 'dsh-wc-shelf', role: 'list' },
                  shelf.map((item) =>
                    h(
                      'div',
                      {
                        key: `${shopRound}-${item.key}`,
                        className: 'dsh-wc-shelfItem',
                        role: 'listitem',
                        'data-locked': item.count > 0 ? undefined : 'true',
                        title: `${t(item.key)} · ${t(`${item.key}.copy`)}`,
                      },
                      h('span', { className: 'dsh-wc-shelfEmoji', 'aria-hidden': true }, item.emoji),
                      h('span', { className: 'dsh-wc-shelfName' }, t(item.key)),
                      item.count > 0
                        ? h('span', { className: 'dsh-wc-shelfCount' }, t('shop.count', { count: item.count }))
                        : h(
                          'span',
                          { className: 'dsh-wc-shelfCount', 'data-locked': 'true' },
                          t('shop.short', { amount: moneyText(item.price - info.earned, 2) }),
                        ),
                    ),
                  ),
                ),
                h(
                  'div',
                  { className: 'dsh-wc-milestone' },
                  h(
                    'div',
                    { className: 'dsh-wc-milestoneTop' },
                    h('span', null, unlockLabel),
                    h('span', { className: 'dsh-wc-milestonePct' }, `${unlockPercent}%`),
                  ),
                  h(
                    'div',
                    {
                      className: 'dsh-wc-milestoneTrack',
                      role: 'progressbar',
                      'aria-valuemin': 0,
                      'aria-valuemax': 100,
                      'aria-valuenow': unlockPercent,
                      'aria-label': unlockLabel,
                    },
                    h('div', {
                      className: 'dsh-wc-milestoneFill',
                      style: { width: `${(unlock.progress * 100).toFixed(1)}%` },
                    }),
                  ),
                ),
              ),
              h('p', { className: 'dsh-wc-cheer' }, cheer),
              settingsOpen ? h(SettingsCard, { t, settings, schedule: info.schedule }) : null,
              h('p', { className: 'dsh-wc-foot' }, t('foot')),
            ),
          ),
        ),
      );
    }

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'work-encourager: dictionaries');
        const t = ctx.locale.bind(NS);

        ctx.effect(() => {
          store = createStore();
          return () => {
            if (store !== null) {
              store.dispose();
              store = null;
            }
          };
        }, 'work-encourager: schedule store');

        /* The main panel key and the sidebar entry id are the same value: the
           sidebar dispatches this key when its entry is clicked. */
        ctx.slots.inject('main', () =>
          ctx.slots.register({ name: 'main', key: PANEL_ID, locale: NS }, WorkdayPage),
        );

        ctx.slots.inject('sidebar.panellist', () =>
          ctx.slots.register(
            {
              name: 'sidebar.panellist',
              id: PANEL_ID,
              order: 20,
              locale: NS,
              label: () => t('panel.label'),
            },
            WorkdayIcon,
          ),
        );
      },
    };
  },
});
