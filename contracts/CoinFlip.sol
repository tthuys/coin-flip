// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract CoinFlip is VRFConsumerBaseV2, ConfirmedOwner {
    VRFCoordinatorV2Interface COORDINATOR;

    // Chainlink subscription ID as a string.
    string public s_subscriptionId;

    bytes32 keyHash;

    uint32 callbackGasLimit = 100000;
    uint16 requestConfirmations = 3;
    uint32 numWords = 1;

    uint256[] public s_randomWords;
    uint256 public s_requestId;
    address s_owner;

    enum Coin { HEADS, TAILS }
    Coin public result;

    event CoinFlipped(Coin result, address player);

    constructor(string memory subscriptionId, address vrfCoordinator, bytes32 _keyHash)
        VRFConsumerBaseV2(vrfCoordinator)
        ConfirmedOwner(msg.sender)
    {
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
        s_subscriptionId = subscriptionId;
        keyHash = _keyHash;
    }

    function flipCoin() public {
        s_requestId = COORDINATOR.requestRandomWords(
            keyHash,
            uint64(bytes8(keccak256(abi.encodePacked(s_subscriptionId)))), // Example conversion
            requestConfirmations,
            callbackGasLimit,
            numWords
        );
    }

    function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords) internal override {
        require(s_requestId == requestId, "Request ID mismatch");
        result = Coin(randomWords[0] % 2);
        emit CoinFlipped(result, msg.sender);
    }

    function getResult() public view returns (Coin) {
        return result;
    }
}
