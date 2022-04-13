// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract MultiSig {
    address[] public approvers;
    uint public approvalNum;

    struct Transfer {
        uint id;
        uint amount;
        address payable to;
        uint approvals;
        bool sent;
    }

    mapping(uint => Transfer) public transfers;
    uint nextId;
    mapping(address => mapping(uint => bool)) approvals;

    constructor(address[] memory _approvers, uint _approvalNum) 
        payable {
        approvers = _approvers;
        approvalNum = _approvalNum;
    }

    function createTransfer(uint amount, address payable to) external onlyApprover() {
        transfers[nextId] = Transfer(
            nextId,
            amount,
            to,
            0,
            false
        );
        nextId++;
    }

    function sendTransfer(uint id) external onlyApprover() {
        require(transfers[id].sent == false, "transfer has already been sent");
        
         if(approvals[msg.sender][id] == false){
            approvals[msg.sender][id] = true;
            transfers[id].approvals++;
        }

        if(transfers[id].approvals >= approvalNum) {
            transfers[id].sent = true;
            address payable to = transfers[id].to;
            uint amount = transfers[id].amount;
            to.transfer(amount);
            return;
        }
       
    }

    function balanceOf(address payable _addr) public view returns(uint) {
        return _addr.balance;
    }

    modifier onlyApprover() {
        bool allowed = false;
        for(uint i = 0; i < approvers.length; i++) {
            if(approvers[i] == msg.sender){
                allowed = true;
            }
        }

        require(allowed == true, "Only Approver allowed");
        _;
    }
}