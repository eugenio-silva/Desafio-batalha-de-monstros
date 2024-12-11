import { useState } from "react";
import { BattleProps } from "../../types/BattleProps";
import { PulseLoader } from "react-spinners";
import style from "./Battle.module.css";

const Battle = ({ monsters }: BattleProps) => {
  const [fakeLoading, setFakeLoading] = useState(true);
  const [result, setResult] = useState<string>("");

  const simulateBattle = () => {
    let hpMonster1 = monsters[0].hp;
    let hpMonster2 = monsters[1].hp;

    const damageMonster1 = Math.max(monsters[0].attack - monsters[1].defense, 1);
    const damageMonster2 = Math.max(monsters[1].attack - monsters[0].defense, 1);

    const firstAttacker = monsters[0].speed > monsters[1].speed ||
      (monsters[0].speed === monsters[1].speed && monsters[0].attack > monsters[1].attack)
      ? 0
      : 1;

    while (hpMonster1 > 0 && hpMonster2 > 0) {
      if (firstAttacker === 0) {
        hpMonster2 = hpMonster2 - damageMonster1;
        if (hpMonster2 <= 0) break;
        hpMonster1 = hpMonster1 - damageMonster2;
      } else {
        hpMonster1 = hpMonster1 - damageMonster2;
        if (hpMonster1 <= 0) break;
        hpMonster2 = hpMonster2 - damageMonster1;
      }
    }

    const winner = hpMonster1 > 0 ? monsters[0].name : monsters[1].name;
    const rounds = Math.ceil((monsters[0].hp + monsters[1].hp) / Math.max(damageMonster1, damageMonster2));

    return `${winner} Ganhou! A Batalha acabou em ${rounds} rounds.`;
  };

  if (fakeLoading) {
    setTimeout(() => {
      setResult(simulateBattle());
      setFakeLoading(false);
    }, 2000);
  }

  return (
    <div>
      {fakeLoading ? 
        <PulseLoader
          color="#5353ec"
        /> : 
        <div>
          <h2 className={style.result}>Resultado:</h2>
          <h2>{result}</h2>
        </div>
      }
    </div>
  );
};

export default Battle;

