"use client";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

import { useEffect, useState } from "react";
import contrectABI from "./Contract/contractABI.json";
import Button from "./Compnents/Button";
import InputBox from "./Compnents/InputBox";
const { ethers } = require("ethers");

const contrectAddress = "0x73C32696005ce87FF20bA070EC8E69bc44E024Fb";

export default function Home() {

  const [stakeamount, setStakeamount] = useState("")
  const [unstakeamount, setUnstakeamount] = useState("")
  const [contract, setContract] = useState()
  const [address, setAddress] = useState("")
  const [balance, setBalance] = useState()
  const [withdrawalstatus, setWithdrawalstatus] = useState()
  const [stakingbalance, setStakingbalance] = useState()
  const [calcreward, setCalcreward] = useState()


  useEffect(()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const MyContract = new ethers.Contract(contrectAddress,contrectABI,signer);
    setContract(MyContract);
  },[])


  const ClaimReward = async () => {
    const claimreward = await contract.claim();
    console.log(claimreward);
  };


  const Stake = async () => {
    console.log(stakeamount)
    const _stake = await contract.stake(BigInt(stakeamount*10**18));
    console.log(_stake);
  };

  const UnStake = async () => {
    const _unstake = await contract.unstake(BigInt(unstakeamount*10**18));
    console.log(_unstake);
  };

  const StakingBalance = async () => {
    const _stakingblc = await contract.stakingBalances();
    setStakingbalance(_stakingblc/(10**18))
    console.log(_stakingblc/(10**18));
  };

  const BalanceOf = async () => {
    const _blc = await contract.balanceOf(address);
    setBalance(_blc/(10**18))
  };

  const CalculateReward = async () => {
    const _blc = await contract.calculateReward();
    setCalcreward(_blc/(10**18))
  };
  

  const WithdrawalStatus = async () => {
    const stat = await contract.withdrawalstatus();
    setWithdrawalstatus(stat)
    console.log(stat);
  };




  return (
        <ThirdwebProvider desiredChainId={11155111}>

<main>
  <div className="flex justify-between items-center h-20 bg-blue-500">
    <div className="flex items-center ml-96">
      <h1 className="text-3xl font-bold text-white ml-96">STK Staking App</h1>
    </div>
    <div className="mr-4">
      <ConnectWallet />
    </div>
  </div>
  <div className="flex justify-center mt-56">
    <div className="p-8 bg-gray-100 rounded-md shadow-md">
      <div className="flex justify-center mt-1">
        <div className="bg-gray-100 p-4 rounded-md shadow-md">
          <h1 className="text-center text-lg font-bold text-blue-500">Balance= {balance ? balance+" STK" : "0 STK"}</h1>
        </div>
      </div>

      <div className="flex items-center mb-4 mt-5">
        <InputBox onChange={(e) => setAddress(e.target.value)} value={address} placeholder={"Enter your address..."}/>
        <Button btntext='Balance Of' onClick={BalanceOf} />
      </div>

      <div className="flex items-center mb-4">
        <InputBox onChange={(e) => setStakeamount(e.target.value)} value={stakeamount} placeholder={"Enter your amount..."}/>
        <Button btntext='Stake' onClick={Stake} />
      </div>

      <div className="flex items-center mb-4">
        <InputBox onChange={(e) => setUnstakeamount(e.target.value)} value={unstakeamount} placeholder={"Enter your amount..."}/>
        <Button btntext='Unstake' onClick={UnStake} />
      </div>

      <div className="flex flex-row items-center">
        <div className="flex flex-col items-center">
          <Button btntext='Staking Balances' onClick={StakingBalance} />
          <p>{stakingbalance}</p>
        </div>
        <div className="flex flex-col items-center">
          <Button btntext='Claim' onClick={ClaimReward} />
          <p></p>
        </div>
        <div className="flex flex-col items-center">
          <Button btntext='Calculate Reward' onClick={CalculateReward} />
          <p>{calcreward}</p>
        </div>
        <div className="flex flex-col items-center">
          <Button btntext='Withdrawal Status' onClick={WithdrawalStatus} />
          <p>{withdrawalstatus}</p>
        </div>
      </div>
    </div>
  </div>
</main>


          </ThirdwebProvider>

  );
}
