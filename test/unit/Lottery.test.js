// const { inputToConfig } = require("@ethereum-waffle/compiler")
const { assert } = require("chai")
const { getNamedAccounts, deployments, ethers } = require("hardhat")
const {
    developmentChains,
    networkConfig,
} = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Lottery Unit Tests", async function () {
          let lottery, vrfCoordinatorV2Mock
          const chainId = network.config.chainId

          beforeEach(async function () {
              const { deployer } = await getNamedAccounts()
              await deployments.fixture(["all"])
              lottery = await ethers.getContract("Lottery", deployer)
              vrfCoordinatorV2Mock = await ethers.getContract(
                  "VRFCoordinatorV2Mock",
                  deployer
              )
          })

          describe("constructor", async function () {
              it("initializes the lottery correctly", async function () {
                  // Ideally we make our tests with just 1 assert per "it"
                  const lotteryState = await lottery.getLotteryState()
                  const interval = await lottery.getInterval()
                  console.log(`interval: ${interval.toString()}`)
                  assert.equal(lotteryState.toString(), "0") // let's change that to the enum
                  assert.equal(
                      interval.toString(),
                      networkConfig[chainId]["interval"]
                  )
              })
          })
      })
