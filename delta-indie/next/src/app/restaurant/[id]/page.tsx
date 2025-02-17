'use client';
import CardLayout from '@/components/CardLayout';
import CartFloating from '@/components/CartFloating';
import WithLoading from '@/components/WithLoading';
import useFormReducer from '@/hooks/useFormReducer';
import useScrollToBottom from '@/hooks/useScrollToBottom';
import { getCartItems, getDishes, setCartItem } from '@/services/restaurant';
import { CartItem, Dish } from '@/types/restaurant';
import React, { use, useEffect, useMemo, useRef } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

interface State {
  loading: boolean;
  loadingCartChanging: boolean;
  dishes: Dish[];
  cartItems: CartItem[];
  page: number;
}

const InitState: State = {
  loading: true,
  loadingCartChanging: false,
  dishes: [],
  cartItems: [],
  page: 1,
};

export default function RestaurantDetail({ params }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [
    { dishes, loading, cartItems, page, loadingCartChanging },
    updateState,
  ] = useFormReducer(InitState);
  const { id: restaurantId } = use<{ id: string }>(params);

  const cartHashMap = useMemo(() => {
    const hash: Record<string, number> = {};
    cartItems.forEach((cart) => {
      if (cart.dish._id) hash[cart.dish._id] = cart.quantity;
    });

    return hash;
  }, [cartItems]);

  async function loadMenu() {
    updateState({ loading: true });
    try {
      const { data } = await getDishes(restaurantId, page);
      updateState({ dishes: data.items });

      await loadCart();
    } finally {
      updateState({ loading: false });
    }
  }

  async function loadCart() {
    updateState({ loading: true });
    try {
      const { data } = await getCartItems(restaurantId);
      updateState({ cartItems: data.carts });
    } finally {
      updateState({ loading: false });
    }
  }

  async function handleChangeCart(dishId: string, quantity: number) {
    try {
      updateState({ loadingCartChanging: true });
      const { data } = await setCartItem(restaurantId, dishId, quantity);
      updateState({ cartItems: data.carts });
    } finally {
      updateState({ loadingCartChanging: false });
    }
  }

  useEffect(() => {
    loadMenu();
  }, []);

  useEffect(() => {
    console.log(containerRef);
  }, [containerRef]);

  // TODO: Check
  function infiniteScroll() {
    console.log('HERE');
  }
  useScrollToBottom(containerRef, infiniteScroll, 100);

  return (
    <main ref={containerRef}>
      <WithLoading
        loading={loading}
        message='Mengambil data makanan'>
        <div>
          <Container>
            <Row>
              {dishes.map((dish, index) => (
                <Col
                  xs={12}
                  md={6}
                  xl={4}
                  key={index}>
                  <CardLayout
                    title={dish.name}
                    description={dish.description}
                    redirect=''
                    image={dish.image}>
                    <Row className='justify-content-center'>
                      <Col xs='auto'>
                        <Button
                          disabled={
                            loadingCartChanging || !cartHashMap[dish._id]
                          }
                          onClick={() =>
                            handleChangeCart(
                              dish._id,
                              cartHashMap[dish._id] - 1,
                            )
                          }
                          variant='outline-primary'>
                          -
                        </Button>
                      </Col>
                      <Col xs='auto'>
                        <Form.Control
                          disabled
                          value={cartHashMap[dish._id] || 0}
                          className='text-center px-0'
                        />
                      </Col>
                      <Col xs='auto'>
                        <Button
                          disabled={loadingCartChanging}
                          onClick={() =>
                            handleChangeCart(
                              dish._id,
                              (cartHashMap[dish._id] || 0) + 1,
                            )
                          }
                          variant='outline-primary'>
                          +
                        </Button>
                      </Col>
                    </Row>
                  </CardLayout>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </WithLoading>
      <CartFloating
        cartItems={cartItems}
        restaurantId={restaurantId}
      />
    </main>
  );
}
