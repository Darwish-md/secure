// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Elections {
    struct Election {
        uint8 id;
        string name;
        string description;
        uint256 startDate;
        uint256 endDate;
        address creator;
        string creatorName;
    }

    struct Candidate {
        uint8 id;
        string name;
        uint32 votes;
    }

    uint8 public electionCount;
    mapping(uint8 => Election) public elections;
    mapping(uint8 => mapping(address => bool)) private voters;
    mapping(uint8 => mapping(uint8 => uint32)) private votes;
    mapping(uint8 => mapping(uint8 => string)) public candidates;

    event ElectionCreated(
        uint8 id,
        string name,
        string description,
        uint256 startDate,
        uint256 endDate,
        address indexed creator,
        string creatorName
    );
    event CandidateAdded(
        uint8 electionId,
        uint8 candidateId,
        string candidateName
    );
    event VoteCast(uint8 electionId, uint8 candidateId);

    function createElection(
        string memory _name,
        string memory _description,
        uint256 _endDate,
        string memory _creatorName,
        string[] memory _candidateNames
    ) public {
        address creator = msg.sender;
        elections[electionCount] = Election({
            id: electionCount,
            name: _name,
            description: _description,
            startDate: block.timestamp,
            endDate: _endDate,
            creator: creator,
            creatorName: _creatorName
        });
        addCandidates(electionCount, _candidateNames);
        emit ElectionCreated(
            electionCount,
            _name,
            _description,
            block.timestamp,
            _endDate,
            creator,
            _creatorName
        );
        electionCount++;
    }

    function addCandidates(
        uint8 _electionId,
        string[] memory _candidateNames
    ) private {
        require(
            elections[_electionId].creator == msg.sender,
            "Only the election creator can add candidates"
        );
        for (uint8 i = 0; i < _candidateNames.length; i++) {
            candidates[_electionId][i] = _candidateNames[i];
            emit CandidateAdded(_electionId, i, _candidateNames[i]);
        }
    }

    function hasVoted(uint8 _electionId) public view returns (bool) {
        if (voters[_electionId][msg.sender]) return true;
        return false;
    }

    function castVote(uint8 _electionId, uint8 _candidateId) public {
        require(
            elections[_electionId].endDate >= block.timestamp,
            "Election has ended"
        );
        require(!hasVoted(_electionId), "Voter has already voted");
        require(
            bytes(candidates[_electionId][_candidateId]).length != 0,
            "Invalid candidate id"
        );
        voters[_electionId][msg.sender] = true;
        votes[_electionId][_candidateId]++;
        emit VoteCast(_electionId, _candidateId);
    }

    function getElectionById(
        uint8 _electionId
    )
        public
        view
        returns (
            uint8 id,
            string memory name,
            string memory description,
            uint256 startDate,
            uint256 endDate,
            address creator,
            string memory creatorName
        )
    {
        Election storage election = elections[_electionId];
        require(election.id == _electionId, "Election does not exist");

        return (
            election.id,
            election.name,
            election.description,
            election.startDate,
            election.endDate,
            election.creator,
            election.creatorName
        );
    }

    function getCandidates(
        uint8 _electionId
    ) public view returns (Candidate[] memory) {
        uint8 candidateCount = 0;
        uint8 i = 0;
        while (bytes(candidates[_electionId][i]).length != 0) {
            candidateCount++;
            i++;
        }
        Candidate[] memory candidatesArray = new Candidate[](candidateCount);

        for (i = 0; i < candidateCount; i++) {
            candidatesArray[i] = Candidate({
                id: i,
                name: candidates[_electionId][i],
                votes: votes[_electionId][i]
            });
        }
        return candidatesArray;
    }
}
