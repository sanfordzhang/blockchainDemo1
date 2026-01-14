import { ethers } from 'ethers';
import contractABI from './src/contractABI.json';
import contractBytecode from './src/contractBytecode.txt?raw';

// 全局变量
let provider;
let signer;
let userAddress;
let contract;
let contractAddress;

// 显示错误信息
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.classList.add('show');
    setTimeout(() => {
        errorElement.classList.remove('show');
    }, 5000);
}

// 更新连接状态
function updateConnectionStatus(connected, address) {
    const statusElement = document.getElementById('connectionStatus');
    const connectBtn = document.getElementById('connectBtn');
    
    if (connected) {
        statusElement.classList.remove('disconnected');
        statusElement.classList.add('connected');
        statusElement.innerHTML = `
            <strong>连接状态:</strong>
            <span>已连接</span>
            <br><strong>钱包地址:</strong>
            <span>${address}</span>
        `;
        connectBtn.textContent = '已连接';
        connectBtn.disabled = true;
        
        // 显示部署和交互区域
        document.getElementById('deploySection').style.display = 'block';
        document.getElementById('interactSection').style.display = 'block';
    } else {
        statusElement.classList.remove('connected');
        statusElement.classList.add('disconnected');
        statusElement.innerHTML = `
            <strong>连接状态:</strong>
            <span>未连接</span>
        `;
        connectBtn.textContent = '连接MetaMask钱包';
        connectBtn.disabled = false;
        
        // 隐藏部署和交互区域
        document.getElementById('deploySection').style.display = 'none';
        document.getElementById('interactSection').style.display = 'none';
    }
}

// 切换到Sepolia网络
async function switchToSepolia() {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xaa36a7' }], // 0xaa36a7是11155111的十六进制
        });
    } catch (switchError) {
        // 如果网络不存在，添加Sepolia网络
        if (switchError.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: '0xaa36a7',
                            chainName: 'Sepolia test network',
                            nativeCurrency: {
                                name: 'SepoliaETH',
                                symbol: 'ETH',
                                decimals: 18,
                            },
                            rpcUrls: ['https://rpc.sepolia.org'],
                            blockExplorerUrls: ['https://sepolia.etherscan.io/'],
                        },
                    ],
                });
            } catch (addError) {
                console.error('添加网络失败:', addError);
                throw new Error('无法添加Sepolia网络，请手动添加');
            }
        } else {
            console.error('切换网络失败:', switchError);
            throw new Error('无法切换到Sepolia网络，请手动切换');
        }
    }
}

// 连接钱包
async function connectWallet() {
    try {
        // 检查MetaMask是否安装
        if (typeof window.ethereum === 'undefined') {
            alert('请先安装MetaMask钱包扩展程序！');
            return;
        }

        // 请求账户访问权限
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });

        if (accounts.length === 0) {
            throw new Error('未找到账户');
        }

        userAddress = accounts[0];

        // 创建provider和signer
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();

        // 检查网络
        const network = await provider.getNetwork();
        const chainId = Number(network.chainId);

        // Sepolia测试网络的chainId是11155111
        if (chainId !== 11155111) {
            console.log('当前不是Sepolia网络，正在切换...');
            await switchToSepolia();
            
            // 重新获取网络信息
            const newNetwork = await provider.getNetwork();
            console.log('已切换到网络:', newNetwork.name);
            console.log('Chain ID:', Number(newNetwork.chainId));
        } else {
            console.log('网络:', network.name);
            console.log('Chain ID:', chainId);
        }

        updateConnectionStatus(true, userAddress);

    } catch (error) {
        console.error('连接钱包失败:', error);
        alert(`连接钱包失败: ${error.message}`);
    }
}

// 部署合约
async function deployContract() {
    try {
        const deployBtn = document.getElementById('deployBtn');
        const tokenName = document.getElementById('tokenName').value;
        const tokenSymbol = document.getElementById('tokenSymbol').value;
        const initialSupply = document.getElementById('initialSupply').value;

        // 验证输入
        if (!tokenName || !tokenSymbol || !initialSupply) {
            showError('deployError', '请填写所有字段！');
            return;
        }

        // 更新按钮状态
        deployBtn.disabled = true;
        deployBtn.innerHTML = '部署中... <span class="loading"></span>';

        // 创建合约工厂
        const TokenFactory = new ethers.ContractFactory(
            contractABI,
            contractBytecode,
            signer
        );

        console.log('准备部署合约...');
        console.log('代币名称:', tokenName);
        console.log('代币符号:', tokenSymbol);
        console.log('初始供应量:', initialSupply);

        // 部署合约
        const contractInstance = await TokenFactory.deploy(
            tokenName,
            tokenSymbol,
            initialSupply
        );

        console.log('合约部署交易已提交，交易哈希:', contractInstance.deploymentTransaction().hash);

        // 等待部署完成
        await contractInstance.waitForDeployment();

        contractAddress = await contractInstance.getAddress();
        contract = contractInstance;

        console.log('合约部署成功！地址:', contractAddress);

        // 显示合约信息
        document.getElementById('contractAddress').textContent = contractAddress;
        document.getElementById('deployTxHash').textContent = contractInstance.deploymentTransaction().hash;
        document.getElementById('contractInfo').classList.add('show');

        alert(`合约部署成功！\n合约地址: ${contractAddress}`);

    } catch (error) {
        console.error('部署合约失败:', error);
        showError('deployError', `部署失败: ${error.message}`);
    } finally {
        const deployBtn = document.getElementById('deployBtn');
        deployBtn.disabled = false;
        deployBtn.innerHTML = '部署智能合约';
    }
}

// 查询余额
async function checkBalance() {
    try {
        const checkBalanceBtn = document.getElementById('checkBalanceBtn');
        
        if (!contract) {
            showError('transferError', '请先部署合约！');
            return;
        }

        // 更新按钮状态
        checkBalanceBtn.disabled = true;
        checkBalanceBtn.innerHTML = '查询中... <span class="loading"></span>';

        // 调用合约的getBalance函数
        const balance = await contract.getBalance(userAddress);
        
        // 转换为可读格式（考虑18位小数）
        const balanceFormatted = ethers.formatEther(balance);
        
        console.log('余额:', balanceFormatted);

        // 显示余额
        document.getElementById('balanceAmount').textContent = balanceFormatted + ' ' + await contract.symbol();
        document.getElementById('balanceDisplay').classList.add('show');

    } catch (error) {
        console.error('查询余额失败:', error);
        showError('transferError', `查询失败: ${error.message}`);
    } finally {
        const checkBalanceBtn = document.getElementById('checkBalanceBtn');
        checkBalanceBtn.disabled = false;
        checkBalanceBtn.innerHTML = '查询余额';
    }
}

// 转账
async function transferTokens() {
    try {
        const transferBtn = document.getElementById('transferBtn');
        const toAddress = document.getElementById('transferTo').value;
        const amount = document.getElementById('transferAmount').value;

        // 验证输入
        if (!toAddress || !amount) {
            showError('transferError', '请填写接收地址和转账数量！');
            return;
        }

        if (!ethers.isAddress(toAddress)) {
            showError('transferError', '无效的以太坊地址！');
            return;
        }

        if (!contract) {
            showError('transferError', '请先部署合约！');
            return;
        }

        // 更新按钮状态
        transferBtn.disabled = true;
        transferBtn.innerHTML = '转账中... <span class="loading"></span>';

        // 转换金额格式（乘以10^18）
        const amountWei = ethers.parseEther(amount);
        
        console.log('准备转账...');
        console.log('接收地址:', toAddress);
        console.log('转账数量:', amount);

        // 调用transfer函数
        const tx = await contract.transfer(toAddress, amountWei);
        
        console.log('转账交易已提交，交易哈希:', tx.hash);

        // 等待交易确认
        await tx.wait();

        console.log('转账成功！');

        alert(`转账成功！\n交易哈希: ${tx.hash}`);

        // 清空输入框
        document.getElementById('transferTo').value = '';
        document.getElementById('transferAmount').value = '';

        // 刷新余额显示
        checkBalance();

    } catch (error) {
        console.error('转账失败:', error);
        showError('transferError', `转账失败: ${error.message}`);
    } finally {
        const transferBtn = document.getElementById('transferBtn');
        transferBtn.disabled = false;
        transferBtn.innerHTML = '转账';
    }
}

// 监听账户变化
if (typeof window.ethereum !== 'undefined') {
    window.ethereum.on('accountsChanged', (accounts) => {
        console.log('账户已变化:', accounts);
        if (accounts.length > 0) {
            userAddress = accounts[0];
            updateConnectionStatus(true, userAddress);
        } else {
            updateConnectionStatus(false, null);
        }
    });

    window.ethereum.on('chainChanged', (chainId) => {
        console.log('网络已变化:', chainId);
        location.reload();
    });
}

// 检查是否已连接
async function checkExistingConnection() {
    try {
        if (typeof window.ethereum !== 'undefined') {
            const accounts = await window.ethereum.request({
                method: 'eth_accounts'
            });
            
            if (accounts.length > 0) {
                userAddress = accounts[0];
                provider = new ethers.BrowserProvider(window.ethereum);
                signer = await provider.getSigner();
                
                const network = await provider.getNetwork();
                if (Number(network.chainId) === 11155111) {
                    updateConnectionStatus(true, userAddress);
                }
            }
        }
    } catch (error) {
        console.error('检查连接失败:', error);
    }
}

// 页面加载时检查连接
checkExistingConnection();

// 导出到全局作用域（因为使用了type="module"）
window.connectWallet = connectWallet;
window.deployContract = deployContract;
window.checkBalance = checkBalance;
window.transferTokens = transferTokens;
