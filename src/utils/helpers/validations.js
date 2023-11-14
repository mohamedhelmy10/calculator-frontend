import { OPERATORS, MINOPERANDVAL, MAXOPERANDVAL } from "../constants";

export const isValidOperand = (operand)=>{
    const operandVal = parseFloat(operand);
    return (!isNaN(operand) && operandVal >= MINOPERANDVAL && operandVal <= MAXOPERANDVAL);
}

export const isValidOperator = (operator)=>{
    return OPERATORS.includes(operator);
}