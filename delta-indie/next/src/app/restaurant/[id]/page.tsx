'use client';
import CardLayout from '@/components/CardLayout';
import CartFloating from '@/components/CartFloating';
import WithLoading from '@/components/WithLoading';
import useFormReducer from '@/hooks/useFormReducer';
import { getDishes } from '@/services/restaurant';
import { Dish } from '@/types/restaurant';
import React, { use, useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

interface State {
  loading: boolean;
  dishes: Dish[];
}

const InitState: State = {
  loading: true,
  dishes: [],
};

export default function RestaurantDetail({ params }: Props) {
  const [{ dishes, loading }, updateState] = useFormReducer(InitState);
  const { id } = use<{ id: string }>(params);

  async function load() {
    updateState({ loading: true });
    try {
      const { data } = await getDishes(id);
      updateState({ dishes: data });
    } finally {
      updateState({ loading: false });
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <main>
      <WithLoading
        loading={loading}
        message='Mengambil data makanan'>
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
                  redirect={`/restaurant/${index + 1}`}>
                  <Row className='justify-content-center'>
                    <Col xs='auto'>
                      <Button variant='outline-primary'>-</Button>
                    </Col>
                    <Col xs='auto'>
                      <Button variant='primary'>Beli 1</Button>
                    </Col>
                    <Col xs='auto'>
                      <Button variant='outline-primary'>+</Button>
                    </Col>
                  </Row>
                </CardLayout>
              </Col>
            ))}
          </Row>
        </Container>
      </WithLoading>
      <CartFloating />
    </main>
  );
}
