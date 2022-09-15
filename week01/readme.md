# RoadToWeb3
## Week One
第一周的任务比较简单，主要是学习并熟悉Web3开发环境，部署一份简单的NFT智能合约。
涉及的概念有，`Metamask`，`Alchemy`，`Remix`，`OpenZeppelin`，`Ethereum Rinkeby & faucet`，`filebase`，`IPFS` 和 `OpenSea`等

### 合约编写
使用 `OpenZeppelin` 的 Contract Wizard 创建合约
- 选择 ERC721 规范，并修改 Name 和 Symbol。
- 选择 NFT 特性，包括 Mintable/AutoIncrement ID, Enumerable, URI Storage.

简单的合约就创建好了，转到 Remix 开发。
去掉 onlyowner 修饰符，加上一些简单逻辑就 OK 了。

这时候要用 `metamask` 连接 Rinkeby 测试网，并从水龙头获取测试代币。

之后把合约部署到测试网上去。

### NFT metadata
为 NFT 准备 metadata 和图片。这里要用 `filebase` 来连接 `IPFS。`

在 filebase 创建 bucket，并且把图片和相关的 json 文件上传，获取对应的文件 CID。

### mint NFT 并在 OpenSea 展示
在 `Remix` 中查看合约的函数，黄色的是可写函数，蓝色的是只读函数。

调用 safemint 函数，传入的参数是钱包地址，和 `IPFS` 地址的 CID。支付 gas 后就成功 mint 了

到 `OpenSea` 的测试网地址就可以查看到自己的 NFT 了，刚 mint 出来属性还没加载到，等一段时间就好了。