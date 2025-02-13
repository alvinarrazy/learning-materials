import Link from 'next/link';
import React, { ReactNode } from 'react';
import { Card, Col, Row } from 'react-bootstrap';

interface Props {
  redirect: string;
  title: string;
  description: string;
  children?: ReactNode;
}

export default function CardLayout({
  redirect,
  title,
  description,
  children,
}: Props) {
  return (
    <Card>
      <img
        className='card-img-top'
        src='https://cdn.antaranews.com/cache/1200x800/2024/09/15/Photo-2-Seribu-Rasa.jpg'
        loading='lazy'
      />
      <Card.Body>
        <Row className='align-items-center'>
          <Col>
            <h4 className='mb-2 name'>
              <Link href={redirect}>{title}</Link>
            </h4>
            <p className='small text-muted card-text'>{description}</p>
          </Col>
        </Row>
      </Card.Body>
      {children && (
        <Card.Footer className='card-footer-box'>{children}</Card.Footer>
      )}
    </Card>
  );
}
