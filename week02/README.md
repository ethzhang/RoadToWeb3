# RoadToWeb3
## Week Two
第二周的任务是开发智能合约并部署到链上，然后做个前端的网站，通过 ethers.js 来跟合约进行交互。

主要的知识点是，通过 `hardhat` 和 `ethers.js` 来构建项目工程。熟悉区块链智能合约的开发，测试和部署。

### Hardhat 环境搭建
创建项目，安装 Hardhat。在命令行输入 `npx hardhat`

任务中用 `npm` 来进行依赖管理，实际使用时，用`yarn`会更好。

### 智能合约开发
没啥好说的

### 测试及部署脚本
在 scipts 文件夹建立 js 文件来进行测试。会用到 ethers.js 来调用智能合约的方法/函数
- hre.waffle.provider.getBalance
- hre.ethers.getContractFactory
- hre.ethers.utils.parseEther

这些功能允许我们读取区块链钱包账户余额，部署合约，以及格式化以太币加密货币价值。

当要把脚本部署到测试网时，会用到部署者的私钥。私钥通过 `.env` 文件保存，并通过 `.gitignore` 文件避免被提交到外部。

### 前端开发
前端开发使用 `Replit` 平台，可以轻松构建 Web 前端并提供了 live server 的能力，可以实时看到网页效果。也可以分享链接给别人体验。

前端框架使用的，`Next.js`。注意修改文件中的智能合约地址，和 ABI数据。
