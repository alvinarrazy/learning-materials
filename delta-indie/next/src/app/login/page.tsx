// TODO: split the components
'use client';

import { login } from '@/services/auth';
import { timeout } from '@/utils/time';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('username', username);
    console.log('password', password);
  }, [username, password]);

  async function handleLogin() {
    setLoading(true);
    try {
      await login({ username, password });
      await timeout(3000);
      router.push('/');
    } catch {
    } finally {
      setLoading(false);
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
                      Di Go Food ecek2
                    </p>
                    <Row className='mb-3'>
                      <Col>
                        <Form.Control
                          disabled={loading}
                          onChange={(e) => setUsername(e.currentTarget.value)}
                          placeholder='Username'
                        />
                      </Col>
                    </Row>

                    <Row className='mb-3'>
                      <Col>
                        <Form.Control
                          disabled={loading}
                          onChange={(e) => setPassword(e.currentTarget.value)}
                          placeholder='Password'
                          type='password'
                        />
                      </Col>
                    </Row>

                    <Row className='mb-3'>
                      <Col>
                        <Button
                          disabled={loading}
                          variant='primary'
                          onClick={handleLogin}
                          className='w-100'>
                          {loading ? 'Loading...' : 'Login'}
                        </Button>
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
