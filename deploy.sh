#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 检查markdown和文本语法
yarn lint-md

# 生成静态文件
yarn build

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'build: deploy personal docs'

git push -f git@github.com:fenghan34/fenghan34.github.io.git master
echo 'Github Pages已更新'
git push -f git@gitee.com:striveforus/striveforus.git master
echo 'Gitee Pages已更新'

cd -
