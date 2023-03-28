pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

contract Elections {
    struct Election {
        uint256 id;
        string name;
        uint256 startDate;
        uint256 endDate;
        address creator;
        string creatorName;
        bool isActive;
        mapping(uint256 => uint256) votes;
        mapping(uint256 => string) candidates;
        uint256 candidateCount;
        mapping(address => bool) voters;
    }

    mapping(uint256 => Election) public elections;
    uint256 public electionCount;

    event ElectionCreated(
        uint256 id,
        string name,
        uint256 endDate,
        address creator,
        string _creatorName
    );
    event ElectionEnded(uint256 id, string name, uint256 winningCandidateId);
    event VoterRegistered(address voter);
    event VoteCasted(address voter, uint256 electionId, uint256 candidateId);

    function createElection(
        string memory _name,
        string memory _creatorName,
        uint256 _endDate
    ) public {
        require(
            _endDate > block.timestamp,
            "End date should be greater than start date"
        );

        elections[electionCount] = Election({
            id: electionCount,
            name: _name,
            startDate: block.timestamp,
            endDate: _endDate,
            creator: msg.sender,
            creatorName: _creatorName,
            isActive: true,
            candidateCount: 0
        });
        
        emit ElectionCreated(
            electionCount,
            _name,
            _endDate,
            msg.sender,
            _creatorName
        );
        electionCount++;
    }

    function getElections()
        public
        view
        returns (
            string[] memory,
            uint256[] memory,
            uint256[] memory,
            bool[] memory
        )
    {
        string[] memory names = new string[](electionCount);
        uint256[] memory startDates = new uint256[](electionCount);
        uint256[] memory endDates = new uint256[](electionCount);
        bool[] memory isActiveFlags = new bool[](electionCount);

        for (uint256 i = 1; i <= electionCount; i++) {
            Election storage election = elections[i];
            names[i - 1] = election.name;
            startDates[i - 1] = election.startDate;
            endDates[i - 1] = election.endDate;
            isActiveFlags[i - 1] = election.isActive;
        }

        return (names, startDates, endDates, isActiveFlags);
    }

    function addCandidate(
        uint256 _electionId,
        uint256 _candidateId,
        string memory _candidateName
    ) public {
        Election storage election = elections[_electionId];
        require(
            election.creator == msg.sender,
            "Only the creator of the election can add candidates"
        );
        require(election.isActive, "Election is not active");
        require(
            bytes(election.candidates[_candidateId]).length == 0,
            "Candidate already exists"
        );

        election.candidates[_candidateId] = _candidateName;
        election.candidateCount++;
    }

    function castVote(uint256 _electionId, uint256 _candidateId) public {
        Election storage election = elections[_electionId];
        require(election.isActive, "Election is not active");
        require(
            !election.voters[msg.sender],
            "Voter has already voted for this candidate"
        );
        
        election.votes[_candidateId]++;
        election.voters[msg.sender] = true;
        emit VoteCasted(msg.sender, _electionId, _candidateId);
    }

    function endElection(uint256 _electionId) public {
        Election storage election = elections[_electionId];
        require(
            election.creator == msg.sender,
            "Only the creator of the election can end it"
        );
        require(election.isActive, "Election is already ended");

        uint256 maxVotes = 0;
        uint256 winningCandidateId;
        for (uint256 i = 0; i < election.candidateCount; i++) {
            uint256 candidateId = i + 1;
            uint256 votes = election.votes[candidateId];
            if (votes > maxVotes) {
                maxVotes = votes;
                winningCandidateId = candidateId;
            }
        }

        election.isActive = false;

        emit ElectionEnded(election.id, election.name, winningCandidateId);
    }

    function getElectionData(
        uint256 _electionId
    )
        public
        view
        returns (string memory, uint256, uint256, bool, string[] memory)
    {
        Election storage election = elections[_electionId];
        require(election.id == _electionId, "Election not found");

        string[] memory candidatesNames = new string[](election.candidateCount);

        for (uint256 i = 0; i < election.candidateCount; i++) {
            candidatesNames[i] = election.candidates[i];
        }

        return (
            election.name,
            election.startDate,
            election.endDate,
            election.isActive,
            candidatesNames
        );
    }

    function getCandidateVotes(
        uint256 _electionId,
        uint256 _candidateId
    ) public view returns (uint256) {
        Election storage election = elections[_electionId];
        require(
            bytes(election.candidates[_candidateId]).length != 0,
            "Candidate does not exist"
        );

        return election.votes[_candidateId];
    }
}
