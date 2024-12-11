import { useForm, SubmitHandler } from "react-hook-form";
import { MonsterFormProps } from "../../types/MonsterFormProps";
import { Monster } from "../../types/MonsterType";
import styles from "./MonsterForm.module.css";
import InputField from "../InputField/InputField";

const MonsterForm = ({ onAddMonster }: MonsterFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<Monster>();

  const imageUrl = watch("image_url");

  const onSubmit: SubmitHandler<Monster> = (data) => {
    onAddMonster({
      ...data,
      attack: Number(data.attack),
      defense: Number(data.defense),
      speed: Number(data.speed),
      hp: Number(data.hp),
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <h3>Adicione os monstros abaixo para a batalha:</h3>

      <InputField
        placeholder="Nome"
        name="name"
        validation={{ required: "Nome é obrigatório." }}
        register={register}
        errors={errors}
      />

      <InputField
        type="number"
        placeholder="Ataque"
        name="attack"
        validation={
          { 
            required: "Ataque é obrigatório.",
            min: { value: 1, message: "Ataque deve ser pelo menos 1" }
          }
        }
        register={register}
        errors={errors}
      />

      <InputField
        type="number"
        placeholder="Defesa"
        name="defense"
        validation={
          { 
            required: "Defesa é obrigatório.",
            min: { value: 1, message: "Defesa deve ser pelo menos 1" } 
          }
        }
        register={register}
        errors={errors}
      />

      <InputField
        type="number"
        placeholder="Velocidade"
        name="speed"
        validation={
          { 
            required: "Velocidade é obrigatório.",
            min: { value: 0, message: "A velocidade deve ser pelo menos 0" }
          }
        }
        register={register}
        errors={errors}
      />

      <InputField
        type="number"
        placeholder="Vida"
        name="hp"
        validation={
          { 
            required: "Vida é obrigatória.",
            min: { value: 1, message: "Vida deve ser pelo menos 1" },
          }
        }
        register={register}
        errors={errors}
      />

      <InputField
        type="text"
        placeholder="URL do seu Avatar"
        name="image_url"
        validation={
          { 
            required: "URL do Avatar é obrigatória.",
            pattern: {
              value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i,
              message: "Digite uma URL válida!",
            },
          }
        }
        register={register}
        errors={errors}
      />

      {imageUrl && (
        <div style={{ marginTop: "10px" }}>
          <p>Preview do seu Avatar:</p>
          <img
            src={imageUrl}
            alt="Avatar Preview"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
            onError={(e) =>
              (e.currentTarget.src = "https://via.placeholder.com/100")
            }
          />
        </div>
      )}
      <button type="submit" className={styles.submitButton}>Adicionar Monstro</button>
    </form>
  );
};

export default MonsterForm;

