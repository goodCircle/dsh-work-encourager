# Releasing

发布由 GitHub Actions 通过 OIDC trusted publishing 完成。**第一次**需要一次性 token 占名，之后本地不再需要任何 token。

## 第一次发布（只做一次）

### 1. 开启 2FA

npm 已经不支持 TOTP，只能用安全钥匙：

> https://www.npmjs.com/settings/vimalakirti0/tfa → Security key → Continue → Touch ID / passkey

### 2. 建一次性 bypass token

> https://www.npmjs.com/settings/vimalakirti0/tokens → Generate New Token → Granular Access Token

- 有效期 30 天
- Permissions：`Read and write (publish and stage)`
- Packages：`All packages`（包还不存在）
- 勾选 **Allow this token to bypass 2FA**

### 3. 发布 1.0.1

在仓库根目录执行：

```sh
npm publish --access public \
  --//registry.npmjs.org/:_authToken=你的token \
  --cache /tmp/npm-cache-publish
```

验证：

```sh
npm view dsh-work-encourager version
```

发完撤销 token。

### 4. 推仓库和 tag

```sh
git push
git push --tags
```

`v1.0.1` 会触发 `.github/workflows/publish.yml`。

### 5. 配置 trusted publishing

> https://www.npmjs.com/package/dsh-work-encourager → Settings → Trusted publishing

- Repository：`goodCircle/dsh-work-encourager`
- Workflow filename：`publish.yml`
- Allowed actions：勾 `npm publish`
- Publishing access：第一次发布完成后选推荐项（disallow bypass 2fa tokens）

配置后状态是 **Pending validation**：用 OIDC 成功发布一次才会验证通过（有截止时间，页面会写）。

## 日常发版

先提交代码：

```sh
git add -A
git commit -m "feat: ..."
```

然后：

```sh
./release.sh patch     # 或 minor / major
```

脚本会升版本、commit、打 tag、推 main 和 tag，Actions 自动发布。

## 手动等价命令

```sh
npm version patch --no-git-tag-version
git add package.json
git commit -m "chore: release vX.Y.Z"
git tag vX.Y.Z
git push
git push --tags
```

## 注意

- 只推 main **不会**发布，必须推 tag
- tag 名和 `package.json` 版本要一致
- 同一个版本不能发两次；每次先升版本
- `release.sh` 要求工作区干净
- 如果 push 认证失败：`gh auth login -h github.com`，或配置
  `git config --local credential.https://github.com.helper "!gh auth git-credential"`
- 如果 push 失败但 tag 已创建：修好认证后手动 `git push && git push --tags`，不要重复跑脚本
