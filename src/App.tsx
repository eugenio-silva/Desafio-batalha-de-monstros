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

      <ul>
        {monsters.map((monster, index) => (
          <div>
          <h4>Monstro: {monster.name}</h4>
          <li key={index}>
            Ataque: {monster.attack},
            Defesa: {monster.defense},
            Velocidade: {monster.speed},
            Vida: {monster.hp}
          </li>
          </div>
        ))}
      </ul>

      {monsters.length >= 2 && (
        <div>
          <Battle monsters={monsters.slice(0, 2)} />
        </div>
      )}
    </div>
  );
};

export default App;

