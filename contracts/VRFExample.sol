// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@chainlink/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/vrf/VRFCoordinatorV2Interface.sol";

contract VRFExample is VRFConsumerBaseV2 {
    VRFCoordinatorV2Interface COORDINATOR;
    address private owner;
    uint64 private s_subscriptionId;
    bytes32 private keyHash;
    uint32 private callbackGasLimit = 100000;
    uint16 private requestConfirmations = 3;
    uint32 private numWords =  1;
    mapping(uint256 => address) private s_requestIdToAddress;
    mapping(address => uint256) private s_results;

    event RequestedRandomness(uint256 requestId);
    event RandomnessFulfilled(uint256 requestId, uint256 randomness);

    constructor(
        address vrfCoordinator,
        bytes32 _keyHash,
        uint64 subscriptionId
    ) VRFConsumerBaseV2(vrfCoordinator) {
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
        keyHash = _keyHash;
        s_subscriptionId = subscriptionId;
        owner = msg.sender;
    }

    function requestRandomWords() external {
        uint256 requestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );
        s_requestIdToAddress[requestId] = msg.sender;
        emit RequestedRandomness(requestId);
    }

    function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords) internal override {
        address requester = s_requestIdToAddress[requestId];
        uint256 result = randomWords[0] % 2;
        s_results[requester] = result;
        emit RandomnessFulfilled(requestId, result);
    }

    function getResult() external view returns (uint256) {
        return s_results[msg.sender];
    }
}
