import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

// Search for candidates on GitHub
const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [candidate, setCandidate] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch candidates and their details on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await searchGithub();
        setCandidates(data);

        // Fetch the first candidate's details
        if (data.length > 0) {
          const candidateData = await searchGithubUser(data[0].login);
          setCandidate(candidateData);
        }
      } catch (err) {
        setError('Failed to fetch candidates');
      }
    };

    fetchData();
  }, []);
 
  if (error) return <div>{error}</div>;

  return (
    <div className="tr">
      <h1>Candidate Search</h1>
      {candidate ? (
        <div>
          <img src={candidate.avatar_url} alt={`${candidate.name}'s avatar`} />
          <p>Name: {candidate.name}</p>
          <p>Username: {candidate.login}</p>
          <p>Location: {candidate.location}</p>
          <p>Email: {candidate.email}</p>
          <p>Company: {candidate.company}</p>
          <p>
            Profile: <a href={candidate.html_url}>{candidate.html_url}</a>
          </p>
        </div>
      ) : (
        <div>Loading candidate information...</div>
      )}
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate.id}>{candidate.login}</li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateSearch;