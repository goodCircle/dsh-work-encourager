# Releasing

发布由 GitHub Actions 通过 OIDC trusted publishing 完成，本地不需要 npm token。

## 流程

1. 改代码，先正常提交：
   ```sh
   git add -A
   git commit -m "feat: ..."
   ```
2. 跑发布脚本：
   ```sh
   ./release.sh patch   # 或 minor / major
   ```
   脚本会：
   - 升 `package.json` 版本号
   - 提交 `chore: release vX.Y.Z`
   - 打 `vX.Y.Z` tag
   - 推 main 和 tag
3. GitHub Actions 的 `publish.yml` 被 tag 触发，自动发布到 npm。
4. 看进度：https://github.com/goodCircle/dsh-work-encourager/actions

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

- 同一个版本不能发两次；每次先升版本。
- tag 名要和 `package.json` 的版本一致。
- 只推 main 不会发布，必须推 tag。
- 第一次发布（v1.0.1）成功后会验证 trusted publisher；之后所有 tag 自动发布。
