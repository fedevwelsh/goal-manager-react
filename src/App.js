import Airtable from 'airtable';
import { useEffect, useState } from 'react';
import Goal from './components/Goal';
import styled from 'styled-components';
import { GlobalStyle } from "./styles/Global.style";

const base = new Airtable({ apiKey:"patNg0h1S7k3Y9d9Y.81b5a513f8389ff9420040fa31280be8a3b3503680de1fffdd5f166f9ff90bd8" }).base('appVl3c2FvzvEYz6u');

const StyledH1 = styled.h1`
  text-align: center;
  font-size: 4rem;
  margin: 1rem 0;
`;

function App() {
  const [goals, setGoals] = useState([])
  const [updates, setUpdates] = useState([])

  useEffect(() => {
    base("goals")
      .select({ view: "Grid view" })
      .eachPage((records, fetchNextPage) => {
        setGoals(records);
        console.log(records);
        fetchNextPage();
      });
    base("updates")
    .select({ view: "Grid view" })
    .eachPage((records, fetchNextPage) => {
      setUpdates(records);
      console.log(records);
      fetchNextPage();
    });
  }, [])

  return (
    <>
      <GlobalStyle />
      <StyledH1>My Goals</StyledH1>
      {goals.map(goal => (
        <Goal
          key={goal.id}
          goal={goal}
          updates={updates.filter(update => update.fields.goalid[0] === goal.id)}
        />
      ))}
    </>
  )
}

export default App;
