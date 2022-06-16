import './App.css';
import rocket from './assets/shuttle.png'
import texugo from './assets/Texugo.png'
import Web3 from 'web3';
import {useState,useEffect} from 'react';
import _contractProvider from './blockchain/tokensale';
/* IMPORT WEB3 library */

const App = () => {
  /* CONTRACT INSTANCE */
  const[_contract,setContract] = useState(null);
  /* WEB3 INSTANCE */
  const[_web3,setWeb3] = useState(null);
  /* TOKENS SOLD */
  const[_tokensSold,setTokenssold] = useState('');
  /* QTY UPDATE */
  const[_qty,setQty] = useState('');
  /* TOKENS SOLD */
  useEffect(()=>{
    if(_contract!=null)getTokens();
  });
  /* UPDATE QTY */
  const updateQty = event =>{
   setQty(event.target.value);
  }
  /* BUY TOKENS */
  const buyTokens = async () =>{
    try {
      /* MAKE AN CALL TO THE CONTRACT */
      const accounts = await _web3.eth.getAccounts();
       await _contract.methods.buyTokens(_qty).send({from: accounts[0],value: Web3.utils.toWei('0.000000000000001','ether')*_qty })
       
     alert('Sucess');
     getTokens();
    } catch (error) {
    alert('Something went wrong');
    console.log(error.message);
    }
 
  }

  /* TOKENS SOLD GET */
  const getTokens = async () =>{
    /* SET THE TOKENS SOLD */
    try {
      const token = await _contract.methods.tokensSold().call();
      setTokenssold(token);
    } catch (error) {
      setTokenssold('0');
    }
    
  }

 /* INIT APP */
  const init = async () =>{
  /* CHECK IF IT WAS METAMASK SUPP */
  if(typeof window !== 'undefined' && typeof window.ethereum !== 'undefined'){
  
  try {
  /* MAKE THE REQUEST */
  window.ethereum.request({method:"eth_requestAccounts"});
  /* GET THE INSTANCE */
  var web3 = new Web3(window.ethereum);
  setWeb3(web3);
  /* GET THE CONTRACT INSTANCE */
  const _contract = await _contractProvider(web3);
  setContract(_contract);
  } catch (error) {
    /* ALERT */
    alert(error.message);
  }
  }else{
  alert("You need metamask to persue this operation");
  }
  }

  


  return (
    <div className='content-end mt-4 grid place-items-center w-screen '>
     
     <div className='container mx-20 content-end mt-4 flex flex-row' >
     <span></span>
     <h1 className='text-end ml-40 grid place-items-center border-b-4 w-11/12 placefont-mono text-3xl text-cyan-900'>MRT TOKEN SALE</h1> 
     <button onClick={init} className=' hover:bg-green-300 bg-gray-800 text-white rounded-md border-radius-2 w-40 ml-3 border-solid border-2'>Connect Wallet</button> 
     </div>
     
     <img  className='mt-8'  src={texugo} alt='Texugo'></img>

     <div className='flex flex-row mt-20'>
     <p className='mt-2'>Introducing MRT token, the next token going to the moon </p>
     <img className='object-fill h-10 ml-2' src={rocket} alt='rocket'></img>
     </div>

     <div className='flex flex-row mt-10 w-9/12'>
     <input onChange={updateQty} className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-black-500' placeholder='Number of tokens you want to buy | Price: 1000 Wei'></input>
     <button onClick={buyTokens} className=' border-2 w-3/12 border-solid bg-gray-800 text-white  border-slate-800 hover:border-red-500 hover:bg-red-200 hover:text-black rounded-r-lg'>Buy</button>
     </div>

     <div className='flex flex-row mt-20'>
     <h1>Tokens Sold</h1>
     <h1 className='ml-2'>{_tokensSold}</h1>
     </div>

    </div>
  );
}

export default App;
