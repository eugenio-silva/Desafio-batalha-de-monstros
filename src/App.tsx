import { useState } from "react";
import { Monster } from "./types/MonsterType";
import './App.css';
import MonsterForm from "./components/MonsterForm/MonsterForm";
import Battle from "./components/BattleEngine/Battle";

const App = () => {
  const [monsters, setMonsters] = useState<Monster[]>([]);

  const addMonster = (monster: Monster) => {
    setMonsters([...monsters, monster]);
  };

  return (
    <div>
      <h1>Desafio Batalha de Monstros</h1>

    {monsters.length === 2 ? 
      <button 
        type="submit"  
        onClick={() => setMonsters([])}
      >
        Jogar Novamente
      </button> : 
        <MonsterForm onAddMonster={addMonster} />
    }

    <table>
      <thead>
        <tr>
          <th>Monstro</th>
          <th>Ataque</th>
          <th>Defesa</th>
          <th>Velocidade</th>
          <th>Vida</th>
        </tr>
      </thead>
      <tbody>
        {monsters.map((monster) => (
          <tr key={monster.name}>
            <td>{monster.name}</td>
            <td>{monster.attack}</td>
            <td>{monster.defense}</td>
            <td>{monster.speed}</td>
            <td>{monster.hp}</td>
          </tr>
        ))}
      </tbody>
    </table>

    {monsters.length >= 2 && (
      <div>
        <Battle monsters={monsters.slice(0, 2)} />
      </div>
    )}
    </div>
  );
};

export default App;

