# Idea 
The objective of this project is to address the issue of insecure and opaque elections through the development of a decentralized web application. The platform will be built using technologies such as Ethereum Solidity, React, and Hardhat to provide users with a highly secure and transparent means of participating in elections. In addition to providing a platform for creating and participating in elections, the platform will also have a social aspect. Users will be able to publish posts and have their profile stored as a Non-Fungible Token (NFT) on IPFS. The main goal of this project is to promote fair and secure elections while also providing a decentralized and transparent space for individuals to express their opinions and engage with others.
# Getting Started with Secure
## Cloning the project repository
1. Open your terminal or command prompt.
2. Navigate to the directory where you want to clone the repository. You can do this using the cd command. For example, to navigate to your home directory, you can type: `cd ~` 
3. Clone the repository by running the following command:
`git clone https://github.com/Darwish-md/secure.git `
4. Navigate to the cloned repository by running the following command:
`cd secure` 
5. Install the dependencies by running the following command:
`npm install`

## Starting the Application
1. Open three separate terminal windows.
2. In terminal `window 1`, run the following command to clean the build cache:
`npx hardhat clean`
3. In terminal `window 1`, compile the contracts by running the following command:
`npx hardhat compile`
4. In terminal `window 2`, start a local blockchain node by running the following command:
`npx hardhat node`
5. Leave this terminal window running while performing the next steps.
6. In terminal `window 1`, deploy the two contracts by running the following two commands:
`npx hardhat run scripts/deployElections.js  --network localhost`
`npx hardhat run scripts/deploySocial.js  --network localhost`

7. You will receive an output for each command similar to the following:
    - Elections contract deployed to: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
    - Social contract deployed to: `0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512`

8. This output contains the address of the deployed contract, which will be needed to use in the next step.
9. You will need to change the value of the contract address in the following files:
    -	`electionContractUtils.js`
    -	`socialContractUtils.js`
10. In terminal `window 3`, start the front-end by running the following command:
`npm run start`
11. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
12. In the MetaMask browser extension, switch to the `localhost:8545` network, and click on the circle in the upper right corner to import an account using one of the private keys shown in terminal `window 2`. Then, click on `Settings > Advanced > Reset Account`.




