'use client';
import api from '@/services/api';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    async function getData() {
      await api.post('/api/rest/auth/login', {
        username: 'alvin',
        password: '23',
      });
    }

    getData();
  }, []);

  return <main>Home</main>;
}
