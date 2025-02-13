'use client';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import style from './page.module.scss';
import { Dish } from '@/types/restaurant';

interface Props {
  cartItems: Dish[];
}

export default function CartFloating({ cartItems }: Props) {
  const [show, setShow] = useState(false);

  return (
    <div className={style['float-container']}>
      <div className='position-relative'>
        {show && (
          <div
            className={`${style['cart-container']} rounded bg-secondary`}></div>
        )}
        <Button onClick={() => setShow((prev) => !prev)}>
          <i className='fe fe-shopping-cart'></i>
        </Button>
      </div>
    </div>
  );
}
