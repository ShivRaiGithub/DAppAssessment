const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
  const OrgRegistry = await ethers.getContractFactory("VestingSchedule");
  const orgRegistry = await OrgRegistry.deploy();
  const address = await orgRegistry.getAddress();
  console.log("OrgRegistry deployed to:", address);
}

main()
 .then(() => process.exit(0))
 .catch(error => {
  console.error(error);
  process.exit(1);
});
