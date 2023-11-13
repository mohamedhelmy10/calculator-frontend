import React, { useState, useEffect } from 'react';
import { calculate } from '../../network/apis/calculations';
import { OPERATORS, OPERATORERRORMESSAGE } from '../../utils/constants';
import { isValidOperand, isValidOperator } from '../../utils/helpers/validations';
import PopupError from '../../sharedComponents/popupError';

const Calculator = () => {

  const [operand1, setOperand1] = useState('');
  const [operand2, setOperand2] = useState('');
  const [operator, setOperator] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () =>{
        try {
            if (isValidOperator(operator)) {
                setLoading(true);
                const calculation = {operand1: parseFloat(operand1), operand2: parseFloat(operand2), operator: operator}
                const response = await calculate(calculation);
                setResult(response.result);
            }
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };
    fetchData();
  }, [operand1, operand2, operator]);

  const handleOperand1Change = (e) => {
    setOperand1(e.target.value);
  };

  const handleOperand2Change = (e) => {
    setOperand2(e.target.value);
  };

  const handleOperatorClick = async (operator) => {
    setOperator(operator);
    setError(null);
    if (!isValidOperator(operator)) {
        setError(OPERATORERRORMESSAGE);
        setResult(null);
    }
  };


  return (
    <div>
      <h2>Calculator</h2>
        <label>
          Operand 1: 
          <input type="text" value={operand1} onChange={handleOperand1Change} disabled={loading}/>
        </label>
        <br />
        <label>
          Operand 2: 
          <input type="text" value={operand2} onChange={handleOperand2Change} disabled={loading}/>
        </label>
        <br />
        <br />
        <label>
          Operator: 
        {OPERATORS.map((operator, index) => (
            <button key={index} style={{ marginRight: '10px' }} onClick={() => handleOperatorClick(operator)} disabled={(!isValidOperand(operand1) || !isValidOperand(operand2) || loading)}>
            {operator}
            </button>
        ))}
        </label>
        <br />

      {result !== null && !error &&(
        <div>
          <h3>Result:</h3>
          <p>{operand1} {operator} {operand2} = {result}</p>
        </div>
      )}
      {error && <PopupError message={error} onClose={() => setError(null)} />}
    </div>
  );
};

export default Calculator;
