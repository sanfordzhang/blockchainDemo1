const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("开始编译合约...");
  
  // 编译合约
  await hre.run("compile");
  
  // 获取合约工厂
  const Token = await hre.ethers.getContractFactory("SimpleToken");
  
  // 获取ABI和字节码
  const abi = Token.interface.formatJson();
  const bytecode = Token.bytecode;
  
  // 保存ABI
  const abiPath = path.join(__dirname, "artifacts", "contracts", "SimpleToken.sol", "SimpleToken.abi.json");
  fs.writeFileSync(abiPath, abi);
  console.log("ABI已保存到:", abiPath);
  
  // 保存字节码
  const bytecodePath = path.join(__dirname, "artifacts", "contracts", "SimpleToken.sol", "SimpleToken.bytecode.txt");
  fs.writeFileSync(bytecodePath, bytecode);
  console.log("字节码已保存到:", bytecodePath);
  
  // 创建供前端使用的文件
  const frontendAbiPath = path.join(__dirname, "src", "contractABI.json");
  fs.writeFileSync(frontendAbiPath, abi);
  console.log("前端ABI已保存到:", frontendAbiPath);
  
  const frontendBytecodePath = path.join(__dirname, "src", "contractBytecode.txt");
  fs.writeFileSync(frontendBytecodePath, bytecode);
  console.log("前端字节码已保存到:", frontendBytecodePath);
  
  console.log("\n编译完成！");
  console.log("ABI长度:", JSON.parse(abi).length, "个函数");
  console.log("字节码长度:", bytecode.length, "个字符");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
