// TODO: split the components
'use client';

import useFormReducer from '@/hooks/useFormReducer';
import { register } from '@/services/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

interface State {
  username: string;
  password: string;
  confirmPassword: string;
  loading: boolean;
}

const InitState: State = {
  username: '',
  password: '',
  confirmPassword: '',
  loading: false,
};

export default function Register() {
  const [{ username, password, loading, confirmPassword }, updateState] =
    useFormReducer(InitState);
  const router = useRouter();

  async function handleRegister() {
    if (password !== confirmPassword) {
      return alert('Password harus sama!');
    }
    updateState({ loading: true });
    try {
      await register({ username, password });
      router.push('/login');
    } catch {
    } finally {
      updateState({ loading: false });
    }
  }

  return (
    <div>
      <main>
        <div
          style={{
            backgroundImage: `url(/landingBg.jpg)`,
            height: '100vh',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Container>
            <div className='justify-content-center row'>
              <div className='my-5 col-xl-4 col-md-5 col-12'>
                <Card>
                  <Card.Body>
                    <h1 className='display-4 text-center mb-3'>
                      Selamat Datang
                    </h1>
                    <p className='text-muted text-center mb-5'>
                      Daftar untuk memulai
                    </p>
                    <Row className='mb-3'>
                      <Col>
                        <Form.Control
                          disabled={loading}
                          onChange={(e) =>
                            updateState({ username: e.currentTarget.value })
                          }
                          placeholder='Username'
                        />
                      </Col>
                    </Row>

                    <Row className='mb-3'>
                      <Col>
                        <Form.Control
                          disabled={loading}
                          onChange={(e) =>
                            updateState({ password: e.currentTarget.value })
                          }
                          placeholder='Password'
                          type='password'
                        />
                      </Col>
                    </Row>

                    <Row className='mb-3'>
                      <Col>
                        <Form.Control
                          disabled={loading}
                          onChange={(e) =>
                            updateState({
                              confirmPassword: e.currentTarget.value,
                            })
                          }
                          placeholder='Confirm Password'
                          type='password'
                        />
                      </Col>
                    </Row>

                    <Row className='mb-3'>
                      <Col>
                        <Button
                          disabled={loading}
                          variant='primary'
                          onClick={handleRegister}
                          className='w-100'>
                          {loading ? 'Loading...' : 'Register'}
                        </Button>
                      </Col>
                    </Row>

                    <Row className='mb-3'>
                      <Col className='d-flex justify-content-center'>
                        <Link
                          className='text-center'
                          href='/login'>
                          Masuk
                        </Link>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </Container>
        </div>
      </main>
    </div>
  );
}
