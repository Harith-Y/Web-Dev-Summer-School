// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract GradeBook {
    address public owner;

    struct Grade {
        string studentName;
        string subject;
        uint8 grade; // Assuming grade is an integer between 0 and 100
    }

    Grade[] public grades;

    mapping(string => mapping(string => uint8)) private studentGrades;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addGrade(string memory studentName, string memory subject, uint8 grade) public onlyOwner {
        Grade memory newGrade = Grade(studentName, subject, grade);
        grades.push(newGrade);
        studentGrades[studentName][subject] = grade;
    }

    function updateGrade(string memory studentName, string memory subject, uint8 newGrade) public onlyOwner {
        bool gradeExists = false;
        for (uint i = 0; i < grades.length; i++) {
            if (keccak256(bytes(grades[i].studentName)) == keccak256(bytes(studentName)) && keccak256(bytes(grades[i].subject)) == keccak256(bytes(subject))) {
                grades[i].grade = newGrade;
                gradeExists = true;
                break;
            }
        }
        require(gradeExists, "Grade entry not found");
        studentGrades[studentName][subject] = newGrade;
    }

    function getGrade(string memory studentName, string memory subject) public view returns (uint8) {
        return studentGrades[studentName][subject];
    }

    function averageGrade(string memory subject) public view returns (uint8) {
        uint totalGrades = 0;
        uint gradeCount = 0;
        for (uint i = 0; i < grades.length; i++) {
            if (keccak256(bytes(grades[i].subject)) == keccak256(bytes(subject))) {
                totalGrades += grades[i].grade;
                gradeCount++;
            }
        }
        require(gradeCount > 0, "No grades found for this subject");
        return uint8(totalGrades / gradeCount);
    }
}
