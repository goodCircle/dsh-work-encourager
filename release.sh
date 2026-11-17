#!/usr/bin/env bash
# Release helper for dsh-work-encourager.
#
# Usage:
#   ./release.sh patch     # 1.0.1 -> 1.0.2
#   ./release.sh minor     # 1.0.1 -> 1.1.0
#   ./release.sh major     # 1.0.1 -> 2.0.0
#
# Commit your code changes first; this script only bumps the version,
# commits that bump, tags it, and pushes main plus the tag. GitHub Actions
# then publishes the package through OIDC trusted publishing.
set -euo pipefail
cd "$(dirname "$0")"

level="${1:-patch}"

if [ -n "$(git status --porcelain)" ]; then
  echo "工作区有未提交的改动，先把代码 commit 掉，再运行 ./release.sh $level" >&2
  exit 1
fi

npm version "$level" --no-git-tag-version >/dev/null
version="$(node -p "require('./package.json').version")"

git add package.json
git commit -m "chore: release v$version"
git tag "v$version"

git push
git push --tags

echo ""
echo "已推送 v$version（以及 main），GitHub Actions 会自动发布。"
echo "进度：https://github.com/goodCircle/dsh-work-encourager/actions"
