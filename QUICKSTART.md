# 快速开始指南

## 安装依赖

```bash
npm install
```

## 编译智能合约

```bash
npm run compile
```

这将：
1. 使用Hardhat编译Solidity合约
2. 生成ABI文件到 `src/contractABI.json`
3. 生成字节码文件到 `src/contractBytecode.txt`

## 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:3000` 打开。

## 部署到Sepolia测试网络

### 1. 安装MetaMask
访问 https://metamask.io/ 下载并安装浏览器扩展

### 2. 配置Sepolia网络
在MetaMask中添加Sepolia测试网络：
- 网络名称: Sepolia
- RPC URL: `https://rpc.sepolia.org` 或使用Infura/Alchemy
- Chain ID: `11155111`
- 货币符号: `ETH`

### 3. 获取测试ETH
访问以下任一水龙头获取测试ETH：
- https://sepoliafaucet.com/
- https://cloud.google.com/application/web3/faucet/ethereum/sepolia
- https://faucet.quicknode.com/ethereum/sepolia

### 4. 连接并部署
1. 打开应用 `http://localhost:3000`
2. 点击"连接MetaMask钱包"
3. 在MetaMask中授权连接
4. 填写代币信息（名称、符号、初始供应量）
5. 点击"部署智能合约"
6. 在MetaMask中确认交易
7. 等待合约部署完成（15-30秒）

### 5. 使用合约
- 点击"查询余额"查看您的代币余额
- 输入接收地址和数量，点击"转账"进行转账

## 常见问题

### Q: MetaMask提示网络错误
A: 确保已切换到Sepolia测试网络，Chain ID应为11155111

### Q: 没有足够的Gas费用
A: 从水龙头获取更多Sepolia测试ETH

### Q: 合约部署失败
A: 检查网络连接，确保有足够的ETH支付Gas费用

### Q: 交易确认时间过长
A: Sepolia网络有时会拥堵，请耐心等待或检查交易状态

## 合约地址查询

部署成功后，可以在以下位置查看合约地址：
- 页面显示的"合约地址"字段
- MetaMask的交易记录
- Sepolia区块浏览器: https://sepolia.etherscan.io/

## 安全提示

⚠️ 此项目仅用于学习和测试目的
- 不要在主网使用此代码
- 不要在合约中存储真实资产
- 测试代币没有实际价值

## 技术支持

如遇到问题，请检查：
1. MetaMask是否已正确安装和配置
2. 是否连接到正确的网络（Sepolia）
3. 是否有足够的测试ETH
4. 浏览器控制台是否有错误信息
