require('dotenv').config()
/* THE ABI */
const abi = [{"inputs":[{"internalType":"contract Token","name":"_token_contract","type":"address"},{"internalType":"uint256","name":"_price","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_buyer","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"Sell","type":"event"},{"inputs":[{"internalType":"uint256","name":"_numberOfTokens","type":"uint256"}],"name":"buyTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"endSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token_contract","outputs":[{"internalType":"contract Token","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokensSold","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

/* CONTRACT PROVIDER */
const _contractProvider = _web3 =>{
return new _web3.eth.Contract(
/* THE ABI */
abi,
/* THE CONTRACT ADDRESS */
process.env.CONTRACT
)
}

/* EXPORT IT */
export default _contractProvider; 