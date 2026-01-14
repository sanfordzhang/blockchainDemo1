# Git 推送到GitHub - 手动操作指南

## 远程仓库已配置 ✅

远程仓库地址已添加：
```
origin  https://github.com/sanfordzhang/blockchainDemo1.git
```

---

## 🚀 推送代码到GitHub

### 方法1：使用命令行（需要认证）

请在PowerShell或命令行中执行以下命令：

```bash
cd d:/JackSource/blockchain/demo1
git push -u origin main
```

### 认证方式：

**重要：GitHub已不再支持密码登录，需要使用Personal Access Token**

#### 第一步：创建Personal Access Token

1. 访问：https://github.com/settings/tokens
2. 点击 "Generate new token" -> "Generate new token (classic)"
3. 填写：
   - Note: `SimpleToken DApp`
   - Expiration: 选择过期时间（如：No expiration）
   - 勾选权限：`repo`（Full control of private repositories）
4. 点击 "Generate token"
5. ⚠️ **立即复制Token**（只显示一次）

#### 第二步：执行git push

```bash
cd d:/JackSource/blockchain/demo1
git push -u origin main
```

系统会提示：
```
Username: YOUR_GITHUB_USERNAME
Password: YOUR_PERSONAL_ACCESS_TOKEN
```

- Username: 输入你的GitHub用户名 `sanfordzhang`
- Password: 粘贴刚才复制的Personal Access Token

#### 第三步：验证推送

推送成功后，访问：https://github.com/sanfordzhang/blockchainDemo1

你应该能看到：
- ✅ 所有项目文件
- ✅ 2个提交记录
- ✅ README.md作为项目说明

---

## 方法2：使用GitHub CLI（需要安装）

如果你已安装GitHub CLI，可以使用以下方式：

```bash
# 1. 登录GitHub
gh auth login

# 2. 推送代码
git push -u origin main
```

---

## 推送成功后的仓库内容

```
blockchainDemo1/
├── .gitignore
├── .env.example
├── ENV_SETUP.md
├── GIT_PUSH_GUIDE.md
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

## 推送成功后的操作

### 1. 查看仓库
访问：https://github.com/sanfordzhang/blockchainDemo1

### 2. 启用GitHub Pages（可选）

如果你想在线访问DApp：

1. 访问仓库 Settings -> Pages
2. Build and deployment -> Source 选择：`Deploy from a branch`
3. Branch 选择：`main`，Folder 选择：`/ (root)`
4. 点击 Save
5. 等待部署完成（约1-2分钟）
6. 访问生成的URL：`https://sanfordzhang.github.io/blockchainDemo1/`

### 3. 后续更新代码

```bash
# 修改代码后
git add .
git commit -m "描述修改"
git push
```

---

## 故障排除

### 问题1：认证失败
```
remote: Invalid username or password
fatal: Authentication failed
```

**解决方法：**
1. 确保使用Personal Access Token，而不是GitHub密码
2. Token需要有`repo`权限
3. 检查Token是否已过期

### 问题2：Token忘记保存

如果Token忘记保存，需要重新创建：
1. 访问 https://github.com/settings/tokens
2. 删除旧Token
3. 创建新Token
4. 重新执行 `git push`

### 问题3：推送提示"remote contains work"

```bash
# 强制推送（如果远程仓库是空的，不会有这个问题）
git push -u origin main --force
```

### 问题4：Windows凭据问题

如果使用Windows凭据管理器遇到问题：

```bash
# 清除缓存的凭据
git config --global --unset credential.helper

# 重新推送（会提示输入用户名和Token）
git push -u origin main
```

---

## 快速检查清单

在推送之前，确认：

- [ ] GitHub账号已登录
- [ ] Personal Access Token已创建
- [ ] Token有`repo`权限
- [ ] Token已复制（或已保存到安全位置）
- [ ] 远程仓库URL正确：`https://github.com/sanfordzhang/blockchainDemo1.git`
- [ ] 本地分支是 `main`

---

## 完整的推送命令

```bash
# 进入项目目录
cd d:/JackSource/blockchain/demo1

# 查看状态（确认没有未提交的更改）
git status

# 查看提交历史
git log --oneline

# 查看远程仓库配置
git remote -v

# 推送到GitHub（会提示输入用户名和Token）
git push -u origin main
```

---

## 推送成功后的验证

### 1. 检查本地状态
```bash
git status
```
应该显示：`Your branch is up to date with 'origin/main'.`

### 2. 访问GitHub仓库
打开浏览器访问：https://github.com/sanfordzhang/blockchainDemo1

确认能看到：
- ✅ 所有文件已上传
- ✅ README.md显示在仓库首页
- ✅ 2个提交记录（Commits）

### 3. 查看提交历史
在GitHub仓库页面点击 "2 commits"，应该看到：
- `Add environment variable documentation`
- `Initial commit: SimpleToken DApp with Sepolia network support`

---

## 下一步

推送成功后，你可以：

1. **分享项目** - 分享仓库链接给别人
2. **启用GitHub Pages** - 在线部署DApp
3. **添加协作者** - Settings -> Collaborators -> Add people
4. **使用GitHub Actions** - 自动化测试和部署
5. **创建Issues** - 跟踪bug和功能请求
6. **发布Release** - 标记版本发布

---

## 获取帮助

如果遇到问题：

1. **GitHub文档**: https://docs.github.com/
2. **Git文档**: https://git-scm.com/doc
3. **Personal Access Token帮助**: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token

---

## 现在就开始推送！

请在PowerShell或命令行执行：

```bash
cd d:/JackSource/blockchain/demo1
git push -u origin main
```

输入：
- Username: `sanfordzhang`
- Password: `<你的Personal Access Token>`

推送成功后，访问：https://github.com/sanfordzhang/blockchainDemo1

🎉 祝你推送成功！
