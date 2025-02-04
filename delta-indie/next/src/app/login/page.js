import { Button, Container } from 'react-bootstrap';

export default function Login() {
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
                <h1 className='display-4 text-center mb-3'>Selamat Datang</h1>
                <p className='text-muted text-center mb-5'>Di Go Food ecek2</p>
                <div className='d-flex justify-content-center'>
                  <Button variant='primary'>Login</Button>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </main>
    </div>
  );
}
