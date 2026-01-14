# 环境变量配置说明

## `hardhat.config.js` 中的环境变量

### 1. `process.env.SEPOLIA_RPC_URL`

**作用：** Sepolia测试网络的RPC节点URL

**从哪里读取：** 从项目的 `.env` 文件中读取

**如何获取：**

#### 方法1: 使用公共RPC（免费，无需注册）
```
https://rpc.sepolia.org
```

#### 方法2: Infura（需要注册免费账号）
1. 访问 https://infura.io/
2. 注册并创建新项目
3. 复制 Sepolia 网络的 HTTPS RPC URL
4. 格式：`https://sepolia.infura.io/v3/YOUR_PROJECT_ID`

#### 方法3: Alchemy（需要注册免费账号）
1. 访问 https://www.alchemy.com/
2. 注册并创建新应用
3. 选择 Sepolia 网络
4. 复制 RPC URL
5. 格式：`https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY`

#### 方法4: QuickNode（需要注册免费账号）
1. 访问 https://www.quicknode.com/
2. 创建免费端点
3. 选择 Sepolia 网络
4. 复制 HTTP Endpoint URL

---

### 2. `process.env.PRIVATE_KEY`

**作用：** 用于Hardhat脚本部署合约的账户私钥

**从哪里读取：** 从项目的 `.env` 文件中读取

**如何获取：**
1. 打开MetaMask扩展
2. 点击右上角三个圆点 (⋮)
3. 选择"账户详情" (Account Details)
4. 点击"导出私钥" (Export private key)
5. 输入MetaMask密码
6. 复制显示的私钥（以0x开头）

**⚠️ 重要安全提示：**
- 永远不要将 `.env` 文件提交到Git仓库
- `.env` 已在 `.gitignore` 中
- 只在测试网络使用
- 不要使用主网账户的私钥
- 创建一个专门用于测试的新MetaMask账户

---

## 前端 vs 后端环境变量

### 前端（浏览器端）
```
✅ 不需要 .env 文件
✅ 通过 MetaMask 连接
✅ 使用 MetaMask 的签名
✅ 部署时使用 MetaMask 钱包
```

### 后端（Hardhat脚本）
```
⚠️ 需要 .env 文件
⚠️ 需要配置 RPC URL
⚠️ 需要配置私钥
⚠️ 用于自动化部署脚本
```

---

## 何时需要配置这些环境变量？

### 不需要配置的情况 ✅
- 通过前端界面部署合约
- 只使用MetaMask交互
- 运行 `npm run dev` 启动开发服务器

### 需要配置的情况 ⚠️
- 使用Hardhat脚本部署合约
- 运行测试脚本
- 自动化部署流程
- CI/CD 自动部署

---

## 配置步骤

### 1. 创建 `.env` 文件

在项目根目录创建 `.env` 文件：

```bash
# Windows (PowerShell)
New-Item -Path .env -ItemType File

# Windows (CMD)
type nul > .env

# Linux/Mac
touch .env
```

### 2. 编辑 `.env` 文件

```env
# 使用公共RPC（简单快速）
SEPOLIA_RPC_URL=https://rpc.sepolia.org

# 或使用 Infura/Alchemy/QuickNode
# SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID

# MetaMask 导出的私钥（不要使用主网私钥！）
PRIVATE_KEY=0x1234567890abcdef...
```

### 3. 保存文件

保存 `.env` 文件后，Hardhat 会自动读取这些变量。

---

## 当前项目状态

### 已有配置：
- ✅ `hardhat.config.js` 已配置环境变量读取
- ✅ `.gitignore` 已排除 `.env` 文件
- ✅ `.env.example` 已创建，提供配置模板

### 暂不需要：
- ❌ 当前项目通过前端部署，不需要 `.env`
- ❌ 可选：如需使用Hardhat脚本部署，再创建 `.env`

---

## 验证配置

### 测试RPC连接
```bash
# 如果配置了 .env，可以测试Hardhat连接
npx hardhat console --network sepolia
```

### 测试账户余额
```javascript
// 在Hardhat控制台中
await ethers.provider.getBalance("YOUR_ADDRESS")
```

---

## 常见问题

### Q: 我应该使用哪个RPC？
A: 开发测试可以使用公共RPC，生产环境建议使用 Infura 或 Alchemy。

### Q: 必须配置这些环境变量吗？
A: 不必须。如果只通过前端界面操作，完全不需要配置。

### Q: 为什么不提供默认的 `.env` 文件？
A: 为了安全起见，私钥不能硬编码或提交到Git。

### Q: 我忘记保存 `.env` 了怎么办？
A: 重新导出MetaMask私钥，并创建新的 `.env` 文件。

### Q: 可以分享 `.env` 文件吗？
A: 绝对不可以！私钥一旦泄露，账户资产可能被盗。

---

## 总结

- `process.env.SEPOLIA_RPC_URL` 和 `process.env.PRIVATE_KEY` 从 `.env` 文件读取
- `.env` 文件用于Hardhat后端脚本部署
- 前端通过MetaMask连接，不需要这些变量
- 当前DApp可以直接使用，无需配置环境变量
- 如需使用Hardhat脚本，再创建 `.env` 文件
