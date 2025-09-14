const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("🚀 Deploying contracts with account:", deployer.address);

  const MedLedger = await hre.ethers.getContractFactory("MedLedger");
  const med = await MedLedger.deploy();
  await med.deployed();

  const MedLedgerDonor = await hre.ethers.getContractFactory("MedLedgerDonor");
  const donor = await MedLedgerDonor.deploy();
  await donor.deployed();

  const MedLedgerOrgan = await hre.ethers.getContractFactory("MedLedgerOrgan");
  const organ = await MedLedgerOrgan.deploy();
  await organ.deployed();

  const addresses = {
    MedLedger: med.address,
    MedLedgerDonor: donor.address,
    MedLedgerOrgan: organ.address,
  };

  fs.writeFileSync(
    path.join(__dirname, "../contract-addresses.json"),
    JSON.stringify(addresses, null, 2)
  );

  console.log("✅ Contracts deployed successfully:");
  console.table(addresses);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exit(1);
});
