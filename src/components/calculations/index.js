import React, { useState, useEffect } from 'react';
import { calculate } from '../../network/apis/calculations';
import { OPERATORS, OPERATORERRORMESSAGE } from '../../utils/constants';
import { isValidOperand, isValidOperator } from '../../utils/helpers/validations';
import PopupError from '../../sharedComponents/popupError';

const Calculator = () => {

  const [operand1, setOperand1] = useState('');
  const [operand2, setOperand2] = useState('');
  const [operator, setOperator] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () =>{
        try {
            if (isValidOperator(operator)) {
                setLoading(true);
                const calculation = {operand1: parseFloat(operand1), operand2: parseFloat(operand2), operator: operator}
                const response = await calculate(calculation);
                setResponse(response);
            }
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };
    fetchData();
  }, [operand1, operand2, operator]);

  const handleOperand1Change = (operand1) => {
    setOperator('');
    setResponse(null);
    setOperand1(operand1);
  };

  const handleOperand2Change = (operand2) => {
    setOperator('');
    setResponse(null);
    setOperand2(operand2);
  };

  const handleOperatorClick = async (operator) => {
    if (!isValidOperator(operator)) {
        setError(OPERATORERRORMESSAGE);
    }else{
        setError(null);
        setOperator(operator);
    }
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        <h2>Calculator</h2>
        <div className="input-fields">
          <label>
            Operand 1: 
            <input type="text" value={operand1} onChange={(e) => handleOperand1Change(e.target.value)} disabled={loading}/>
          </label>
          <br />
          <label>
            Operand 2: 
            <input type="text" value={operand2} onChange={(e) => handleOperand2Change(e.target.value)} disabled={loading}/>
          </label>
          <br />
        </div>
        <br />
        <div className="buttons">
          <label>
            Operator: 
            {OPERATORS.map((operator, index) => (
                <button key={index} style={{ marginRight: '10px' }} onClick={() => handleOperatorClick(operator)} disabled={(!isValidOperand(operand1) || !isValidOperand(operand2) || loading)}>
                {operator}
                </button>
            ))}
          </label>
        </div>
        <br />
        <div className="result">
          {response !== null && !error &&(
            <div>
              <h3>Result:</h3>
              <p>{response.operation}= {response.result}</p>
              <h3>Count:</h3>
              <p>{response.count}</p>
            </div>
          )}
          {error && <PopupError message={error} onClose={() => setError(null)} />}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
