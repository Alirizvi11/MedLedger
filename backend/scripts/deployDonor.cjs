const hre = require("hardhat");

async function main() {
  const Donor = await hre.ethers.getContractFactory("MedLedgerDonor");
  const donor = await Donor.deploy();
  await donor.deployed();
  console.log("✅ MedLedgerDonor deployed to:", donor.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
