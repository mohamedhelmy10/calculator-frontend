import { OPERATORS, MINOPERANDVAL, MAXOPERANDVAL } from "../constants";

export const isValidOperand = (opernd)=>{
    const operandVal = parseFloat(opernd);
    return (!isNaN(operandVal) && operandVal >= MINOPERANDVAL && operandVal <= MAXOPERANDVAL);
}

export const isValidOperator = (operator)=>{
    return OPERATORS.includes(operator);
}