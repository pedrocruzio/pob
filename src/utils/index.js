import { ethers } from 'ethers';

async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
}

function getContract(contractAddr, artifact) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddr, artifact.abi, signer);

    return contract;
}

async function getUserAddress() {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const accountAddress = await signer.getAddress();
    console.log("Account:", accountAddress);
    return accountAddress;
}

export { requestAccount, getContract, getUserAddress }