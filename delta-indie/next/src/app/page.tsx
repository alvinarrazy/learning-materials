'use client';
import CardLayout from '@/components/CardLayout';
import WithLoading from '@/components/WithLoading';
import useFormReducer from '@/hooks/useFormReducer';
import { getRestaurants } from '@/services/restaurant';
import { Restaurant } from '@/types/restaurant';
import { useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

interface State {
  restaurants: Restaurant[];
  loading: boolean;
}

const InitState: State = {
  restaurants: [],
  loading: true,
};

export default function Home() {
  const [{ restaurants, loading }, updateState] = useFormReducer(InitState);

  async function load() {
    updateState({ loading: true });
    try {
      const { data } = await getRestaurants();
      updateState({ restaurants: data });
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
        message='Mengambil data restaurant'>
        <Container>
          <Row>
            {restaurants.map((res, index) => (
              <Col
                xs={12}
                md={6}
                xl={4}
                key={index}>
                <CardLayout
                  title={res.name}
                  description={res.description}
                  redirect={`/restaurant/${index + 1}`}>
                  <Row>
                    <Col className='d-flex justify-content-end'>
                      <Button>Kunjungi</Button>
                    </Col>
                  </Row>
                </CardLayout>
              </Col>
            ))}
          </Row>
        </Container>
      </WithLoading>
    </main>
  );
}
