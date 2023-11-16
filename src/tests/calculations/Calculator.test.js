import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { axiosInstance } from '../../network/apis';
import MockAdapter from 'axios-mock-adapter';
import '@testing-library/jest-dom';
import Calculator from '../../components/calculations/Calculator';

const mockAxios = new MockAdapter(axiosInstance);

describe('Calculator Component valid requests', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  test('calculates and displays result for addition', async () => {
    render(<Calculator />);

    const responseData = { result: 15, operation: '10+5', count: 1 };
    mockAxios.onPost("/calculations/calculate").reply(201, responseData);

    const operand1Input = screen.getByLabelText('Operand 1:');
    const operand2Input = screen.getByLabelText('Operand 2:');
    const operatorSelect = screen.getByText('+');

    fireEvent.change(operand1Input, { target: { value: '10' } });
    fireEvent.change(operand2Input, { target: { value: '5' } });
    fireEvent.click(operatorSelect);

    await waitFor(() => expect(screen.getByTestId('result')).toHaveTextContent('Result:10+5= 15Count:1'));
    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].data).toBe("{\"calculation\":{\"operand1\":10,\"operand2\":5,\"operator\":\"+\"}}");
  });

  test('calculates and displays result for subtraction', async () => {
    render(<Calculator />);

    const responseData = { result: -5, operation: '5-10', count: 1 };
    mockAxios.onPost("/calculations/calculate").reply(201, responseData);

    const operand1Input = screen.getByLabelText('Operand 1:');
    const operand2Input = screen.getByLabelText('Operand 2:');
    const operatorSelect = screen.getByText('-');

    fireEvent.change(operand1Input, { target: { value: '5' } });
    fireEvent.change(operand2Input, { target: { value: '10' } });
    fireEvent.click(operatorSelect);

    await waitFor(() => expect(screen.getByTestId('result')).toHaveTextContent('Result:5-10= -5Count:1'));
    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].data).toBe("{\"calculation\":{\"operand1\":5,\"operand2\":10,\"operator\":\"-\"}}");
  });

  test('calculates and displays result for multiplication', async () => {
    render(<Calculator />);

    const responseData = { result: 50, operation: '10*5', count: 1 };
    mockAxios.onPost("/calculations/calculate").reply(201, responseData);

    const operand1Input = screen.getByLabelText('Operand 1:');
    const operand2Input = screen.getByLabelText('Operand 2:');
    const operatorSelect = screen.getByText('*');

    fireEvent.change(operand1Input, { target: { value: '10' } });
    fireEvent.change(operand2Input, { target: { value: '5' } });
    fireEvent.click(operatorSelect);

    await waitFor(() => expect(screen.getByTestId('result')).toHaveTextContent('Result:10*5= 50Count:1'));
    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].data).toBe("{\"calculation\":{\"operand1\":10,\"operand2\":5,\"operator\":\"*\"}}");
  });

  test('calculates and displays result for division', async () => {
    render(<Calculator />);

    const responseData = { result: 2, operation: '10/5', count: 1 };
    mockAxios.onPost("/calculations/calculate").reply(201, responseData);

    const operand1Input = screen.getByLabelText('Operand 1:');
    const operand2Input = screen.getByLabelText('Operand 2:');
    const operatorSelect = screen.getByText('/');

    fireEvent.change(operand1Input, { target: { value: '10' } });
    fireEvent.change(operand2Input, { target: { value: '5' } });
    fireEvent.click(operatorSelect);

    await waitFor(() => expect(screen.getByTestId('result')).toHaveTextContent('Result:10/5= 2Count:1'));
    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].data).toBe("{\"calculation\":{\"operand1\":10,\"operand2\":5,\"operator\":\"/\"}}");
  });

});

describe('Calculator Component invalid requests', () => {
    beforeEach(() => {
      mockAxios.reset();
    });
  
    test('Negative number', async () => {
      render(<Calculator />);
  
      const responseData = { error: {message: "Invalid calculation"} };
      mockAxios.onPost("/calculations/calculate").reply(400, responseData);
  
      const operand1Input = screen.getByLabelText('Operand 1:');
      const operand2Input = screen.getByLabelText('Operand 2:');
      const operatorSelect = screen.getByText('+');
  
      fireEvent.change(operand1Input, { target: { value: '-10' } });
      fireEvent.change(operand2Input, { target: { value: '5' } });
      fireEvent.click(operatorSelect);
  
      // No result should be appeared as no requests sent
      await waitFor(() => expect(screen.getByTestId('result')).toHaveTextContent(''));
      // No reuests should be sent as the buttons are disables
      expect(mockAxios.history.post.length).toBe(0);
    });

    test('Number greater than or equal 100', async () => {
        render(<Calculator />);
    
        const responseData = { error: {message: "Invalid calculation"} };
        mockAxios.onPost("/calculations/calculate").reply(400, responseData);
    
        const operand1Input = screen.getByLabelText('Operand 1:');
        const operand2Input = screen.getByLabelText('Operand 2:');
        const operatorSelect = screen.getByText('+');
    
        fireEvent.change(operand1Input, { target: { value: '100' } });
        fireEvent.change(operand2Input, { target: { value: '5' } });
        fireEvent.click(operatorSelect);
    
        // No result should be appeared as no requests sent
        await waitFor(() => expect(screen.getByTestId('result')).toHaveTextContent(''));
        // No reuests should be sent as the buttons are disables
        expect(mockAxios.history.post.length).toBe(0);
      });

    test('Invalid operator', async () => {
        render(<Calculator />);
    
        const responseData = { error: {message: "Invalid calculation"} };
        mockAxios.onPost("/calculations/calculate").reply(400, responseData);
    
        const operand1Input = screen.getByLabelText('Operand 1:');
        const operand2Input = screen.getByLabelText('Operand 2:');
        const operatorSelect = screen.queryByText('&');

        expect(operand1Input).toBeInTheDocument();
        expect(operand2Input).toBeInTheDocument();
        //This element should not be exist
        expect(operatorSelect).not.toBeInTheDocument();
      });
  
  });