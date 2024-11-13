import './App.css';
import React, { useState } from 'react';
import InputMask from "react-input-mask";
import Select from 'react-select'; // Importando o react-select
import Switch from "react-switch";
const customStyles = {
  control: (provided) => ({
    ...provided,
    fontFamily: 'Poppins, sans-serif', // Aplica a fonte na área de controle (caixa de seleção)
  }),
  menu: (provided) => ({
    ...provided,
    fontFamily: 'Poppins, sans-serif', // Aplica a fonte nas opções do menu
  }),
  singleValue: (provided) => ({
    ...provided,
    fontFamily: 'Poppins, sans-serif', // Aplica a fonte no valor selecionado
  }),
  option: (provided, state) => ({
    ...provided,
    fontFamily: 'Poppins, sans-serif', // Aplica a fonte em cada opção
    backgroundColor: state.isSelected ? "#e783a6" : "#fff", // Exemplo de cor para a opção selecionada
    color: state.isSelected ? "#fff" : "#333", // Exemplo de cor do texto para opção selecionada
  }),
};
function App() {
  const [form, setForm] = useState({ peso: '', altura: '', idade: '', atividadeFisica: '1.2', pescoco: '', cintura: '', quadril: '' });
  const [isEnable, setIsEnable] = useState(true);
  const [text, setText] = useState(' ');

  const toggleSwitch = () => {
    if (isEnable) {
      setText(' ');
    } else {
      setText(' ');
    }
    setIsEnable(previousState => !previousState);
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSelectChange = (selectedOption) => {
    setForm({ ...form, atividadeFisica: selectedOption.value });
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.peso || !form.altura || !form.idade || !form.quadril || !form.cintura || !form.pescoco) {
      alert("Os valores não podem ser vazios ou inválidos");
    } else {
      const alturaEmMetros = parseFloat(form.altura.replace(',', '.'));
      const peso = parseFloat(form.peso);
      const idade = parseInt(form.idade);
      const quadril= parseFloat(form.quadril);
      const cintura= parseFloat(form.cintura);
      const pescoco= parseFloat(form.pescoco);
      if (isNaN(alturaEmMetros) || isNaN(peso) || isNaN(idade)) {
        alert("Os valores não podem ser vazios ou inválidos");
        return;
      }

      const imc = peso / (alturaEmMetros * alturaEmMetros);
      const tmb = isEnable
        ? 88.36 + (13.4 * peso) + (4.8 * (alturaEmMetros * 100)) - (5.7 * idade)
        : 447.6 + (9.2 * peso) + (3.1 * (alturaEmMetros * 100)) - (4.3 * idade);

      const gastoEnergetico = tmb * parseFloat(form.atividadeFisica);
      
      const logCinturaPescocoM = Math.log(cintura - pescoco);
      const logCinturaPescocoF = Math.log(cintura + quadril - pescoco);
      const logAltura = Math.log(alturaEmMetros);
      const igc = isEnable
        ? 86.010 * logCinturaPescocoM - (70.041 * logAltura) + 36.76
        : 163.205 * logCinturaPescocoF - (97.684 * logAltura) - 78.387;
      alert(
        `O seu IMC é: ${imc.toFixed(2)}\nO seu TMB é: ${tmb.toFixed(2)}\nO seu GET é: ${gastoEnergetico.toFixed(2)}\nO seu IGC é: ${igc.toFixed(2)}`
      );
    }
  }

  const atividadeOptions = [
    { value: '1.2', label: 'Sedentário' },
    { value: '1.375', label: 'Levemente ativo' },
    { value: '1.55', label: 'Moderadamente ativo' },
    { value: '1.725', label: 'Muito ativo' },
    { value: '1.9', label: 'Extremamente ativo' },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
        <div className="form">
          <div className="container-input-Label">
            <div className="children-container-input-Label"> 
              <label>Quanto é sua Altura? </label>
              <InputMask
                placeholder="Digite Sua Altura"
                mask="9.99"
                onChange={handleChange}
                name="altura"
                value={form.altura}
              />
            </div>
            <div className="children-container-input-Label"> 
              <label>Quanto é seu Peso? </label>
              <InputMask
                placeholder="Digite Seu Peso"
                mask="99.9"
                onChange={handleChange}
                name="peso"
                value={form.peso}
              />
            </div>
            <div className="children-container-input-Label">
              <label>Qual a sua Idade? </label>
              <InputMask 
                placeholder="Digite Sua Idade"
                mask="99"
                onChange={handleChange}
                name="idade"
                value={form.idade}
              />
            </div>
            <div className="children-container-input-Label">
              <label>Quanto Mede Seu Cintura?</label>
              <InputMask 
                placeholder="Sua Cintura"
                mask="99"
                onChange={handleChange}
                name="cintura"
                value={form.cintura}
              />
            </div>
            <div className="children-container-input-Label">
              <label>Quanto Mede Seu Quadril? </label>
              <InputMask 
                placeholder="Seu Quadril"
                mask="999"
                onChange={handleChange}
                name="quadril"
                value={form.quadril}
              />
            </div>
            <div className="children-container-input-Label">
              <label>Quanto Mede Seu Pescoço? </label>
              <InputMask 
                placeholder="Seu Pescoço"
                mask="999"
                onChange={handleChange}
                name="pescoco"
                value={form.pecoco}
              />
            </div>
            <div className="children-container-input-Label"> 
              <label>Seu Gênero? </label>
              <Switch
                onChange={toggleSwitch}
                checked={isEnable}
                onColor="#9a93d7"
                offColor="#e783a6"
                checkedIcon={<div style={{ paddingLeft: 8, color: "white", fontFamily: 'Poppins, sans-serif', /*marginBottom: '2px'*/ }}>M</div>}
                uncheckedIcon={<div style={{ paddingLeft: 8, color: "white", fontFamily: 'Poppins, sans-serif', /*marginBottom: '2px'*/ }}>F</div>}
              />
              <span>{text}</span>
            </div>
            <div className="children-container-input-Label">
              <label>Seu Nível de Atividade Física</label>
              <Select
                options={atividadeOptions}
                onChange={handleSelectChange}
                value={atividadeOptions.find(option => option.value === form.atividadeFisica)}
                styles={customStyles}
              />
            </div>
          </div>
          <div className="container-button">
            <button type="submit">Calcular</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default App;