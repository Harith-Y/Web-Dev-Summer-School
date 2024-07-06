import React, { useState } from "react";
import { ethers } from "ethers";
import GradeBookABI from "./GradeBookABI.json";

const GradeBook = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [gradeBook, setGradeBook] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState(0);
  const [average, setAverage] = useState(null);

  const contractAddress = "0x938A836Ada3b1d83c5977F6E04A50624E504b570";

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        GradeBookABI,
        signer
      );

      setProvider(provider);
      setSigner(signer);
      setContract(contract);
    } else {
      alert("Please install MetaMask");
    }
  };

  const addGrade = async () => {
    try {
      const tx = await contract.addGrade(studentName, subject, grade);
      await tx.wait();
      alert("Grade added successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to add grade");
    }
  };

  const getGrade = async () => {
    try {
      const grade = await contract.getGrade(studentName, subject);
      alert(`Grade: ${grade}`);
    } catch (err) {
      console.error(err);
      alert("Failed to get grade");
    }
  };

  const calculateAverage = async () => {
    try {
      const avg = await contract.averageGrade(subject);
      setAverage(avg);
    } catch (err) {
      console.error(err);
      alert("Failed to calculate average");
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
      <div>
        <h2>Add Grade</h2>
        <input
          type="text"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          type="number"
          placeholder="Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
        <button onClick={addGrade}>Add Grade</button>
      </div>
      <div>
        <h2>Get Grade</h2>
        <input
          type="text"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <button onClick={getGrade}>Get Grade</button>
      </div>
      <div>
        <h2>Calculate Average Grade</h2>
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <button onClick={calculateAverage}>Calculate Average</button>
        {average && <p>Average Grade: {average}</p>}
      </div>
    </div>
  );
};

export default GradeBook;
