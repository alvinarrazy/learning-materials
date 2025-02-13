'use client';
import React, { useState } from 'react';
import { Button, Col, ListGroup, Row } from 'react-bootstrap';
import style from './page.module.scss';
import { CartItem } from '@/types/restaurant';

interface Props {
  cartItems: CartItem[];
}

export default function CartFloating({ cartItems }: Props) {
  const [show, setShow] = useState(false);

  return (
    <div className={style['float-container']}>
      <div className='position-relative'>
        {show && (
          <div
            className={`${style['cart-container']} rounded border border-primary-subtle bg-white shadow p-3`}>
            {cartItems.length ? (
              <ListGroup className='list-group-flush my-n3'>
                {cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className='align-items-center'>
                      <Col xs='auto'>
                        <img
                          src='https://i.etsystatic.com/22609133/c/2250/2250/0/326/il/b8b7d4/2340471765/il_300x300.2340471765_rahs.jpg'
                          className='avatar avatar-rounded'
                          width={64}
                          height={48}
                          alt='item'
                        />
                      </Col>
                      <Col className='ms-n2'>
                        <h4 className='mb-2'>
                          {item.dish.name} x {item.quantity}
                        </h4>
                        <small className='card-text text-muted'>
                          Harga: {item.quantity * (item.dish.price || 0)}
                        </small>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <div className='d-flex w-100 h-100 justify-content-center align-items-center'>
                <h2 className='text-muted'>Keranjang Kosong</h2>
              </div>
            )}
          </div>
        )}
        <Button
          className='shadow'
          onClick={() => setShow((prev) => !prev)}>
          <i className='fe fe-shopping-cart'></i>
        </Button>
      </div>
    </div>
  );
}
