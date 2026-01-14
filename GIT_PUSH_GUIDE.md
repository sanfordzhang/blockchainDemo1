# Git 远程仓库配置指南

## 第一步：在GitHub创建远程仓库

### 访问GitHub
打开浏览器，访问：https://github.com/new

### 填写仓库信息
- **Repository name**: `simple-dapp`（或你喜欢的名称）
- **Description**: `A simple DApp with ERC20 token on Sepolia testnet`
- **Public/Private**: 根据需要选择

### 重要：不要勾选以下选项
❌ 不要勾选 "Initialize this repository with a README"
❌ 不要勾选 "Add .gitignore"
❌ 不要勾选 "Choose a license"

### 创建仓库
点击 "Create repository" 按钮

### 复制仓库URL
在创建后的页面顶部，找到并复制仓库地址：
```
https://github.com/YOUR_USERNAME/simple-dapp.git
```

---

## 第二步：配置并推送代码

### 方法1：使用命令行（推荐）

```bash
# 1. 添加远程仓库（替换YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/simple-dapp.git

# 2. 推送代码到GitHub
git push -u origin main

# 3. 如果遇到认证错误，使用Personal Access Token
# 需要在GitHub创建Token：Settings -> Developer settings -> Personal access tokens
# 然后使用：
# git push -u origin main
# 输入用户名和Token（密码位置）
```

### 方法2：使用GitHub CLI（需要先安装）

```bash
# 安装GitHub CLI后
gh auth login

# 创建仓库并推送
gh repo create simple-dapp --public --source=. --remote=origin
```

---

## 第三步：验证推送

### 检查远程仓库配置
```bash
git remote -v
```

输出应该显示：
```
origin  https://github.com/YOUR_USERNAME/simple-dapp.git (fetch)
origin  https://github.com/YOUR_USERNAME/simple-dapp.git (push)
```

### 查看推送状态
```bash
git log --oneline --graph --all
```

---

## 常见问题

### Q: 推送时提示认证失败？
A: 
1. GitHub不再支持密码登录，需要使用Personal Access Token
2. 访问：https://github.com/settings/tokens
3. 点击 "Generate new token" -> "Generate new token (classic)"
4. 选择权限（repo权限足够）
5. 复制生成的Token
6. 推送时，用户名输入GitHub用户名，密码输入Token

### Q: 推送时提示"remote contains work"？
A:
```bash
# 强制推送（会覆盖远程）
git push -u origin main --force

# 或者先拉取远程更改
git pull origin main --allow-unrelated-histories
```

### Q: 如何删除远程仓库？
A: 在GitHub仓库页面 -> Settings -> Danger Zone -> Delete repository

### Q: 如何更改远程仓库URL？
A:
```bash
git remote set-url origin https://github.com/NEW_USERNAME/NEW_REPO.git
```

---

## 完整的推送流程示例

```bash
# 确保在项目目录
cd d:/JackSource/blockchain/demo1

# 查看当前状态
git status

# 查看提交历史
git log --oneline

# 添加远程仓库（替换YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/simple-dapp.git

# 验证远程仓库配置
git remote -v

# 推送代码到GitHub
git push -u origin main

# 完成后，访问GitHub查看你的仓库
# https://github.com/YOUR_USERNAME/simple-dapp
```

---

## 推送后的仓库结构

你的GitHub仓库将包含以下文件：

```
simple-dapp/
├── .gitignore
├── .env.example
├── ENV_SETUP.md
├── README.md
├── QUICKSTART.md
├── app.js
├── compile.js
├── contracts/
│   └── SimpleToken.sol
├── hardhat.config.js
├── index.html
├── package.json
├── package-lock.json
├── src/
│   ├── contractABI.json
│   └── contractBytecode.txt
└── vite.config.js
```

---

## 使用Git管理后续修改

### 日常开发流程

```bash
# 1. 修改代码后查看状态
git status

# 2. 添加修改的文件
git add .

# 3. 提交修改
git commit -m "描述你的修改"

# 4. 推送到GitHub
git push
```

### 查看历史
```bash
# 查看提交历史
git log --oneline

# 查看详细的提交信息
git log

# 查看图形化历史
git log --graph --oneline --all
```

### 分支管理
```bash
# 创建新分支
git branch feature-name

# 切换到新分支
git checkout feature-name

# 创建并切换（简写）
git checkout -b feature-name

# 合并分支
git merge feature-name

# 删除分支
git branch -d feature-name
```

---

## 下一步

推送成功后，你可以：
1. ✅ 在GitHub上查看你的代码
2. ✅ 使用GitHub Pages托管DApp
3. ✅ 添加协作者一起开发
4. ✅ 使用GitHub Actions进行CI/CD
5. ✅ 发布为npm包
