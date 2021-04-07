import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addQuoteStart, resetAddQuote } from 'redux/quote/actions';
import { selectIsSuccessful, selectQuotes } from 'redux/quote/selectors';

import { Form } from './components/Form';
import { Button } from './components/Button';
import { Card } from '../Card';

import styled from 'styled-components/macro';

export function AddForm() {
  const dispatch = useDispatch();
  const isSuccessful = useSelector(selectIsSuccessful);
  const [quote, setQuote] = useState('');
  const quotes = useSelector(selectQuotes);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addQuoteStart(quote));
  };

  const handleChange = e => {
    const { value, name } = e.target;
    setQuote({ ...quote, [name]: value });
  };

  const handleReset = e => {
    e.preventDefault();
    dispatch(resetAddQuote());
    setQuote({
      message: '',
      person: '',
    });
  };

  return (
    <Card className={!quotes && 'full'}>
      <AddFormWrap onSubmit={handleSubmit}>
        {isSuccessful ? (
          <ThankYou>
            <h2>Thank you!</h2>
            <Button onClick={handleReset}>Add another?</Button>
          </ThankYou>
        ) : (
          <Form onHandleChange={handleChange} {...quote} />
        )}
      </AddFormWrap>
    </Card>
  );
}

const AddFormWrap = styled.form`
  padding: 1rem;

  h2 {
    margin-top: 0;
    font-size: 1rem;
  }
`;

const ThankYou = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
