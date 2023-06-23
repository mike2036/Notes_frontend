import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Note from './index'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  // render(<Note note={note} />)
  // const element = screen.getByText('Component testing is done with react-testing-library')
  // expect(element).toBeDefined()

  // 使用CSS-selectors来寻找渲染的元素
  const { container } = render(<Note note={note} />)
  const div = container.querySelector('.note')
  expect(div).toHaveTextContent('Component testing is done with react-testing-library')
})