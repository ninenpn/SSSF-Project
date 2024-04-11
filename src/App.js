import React from 'react';
import { Button, Flex } from 'antd';
import './stylesheets/alignments.css';
import './stylesheets/custom-components.css';
import './stylesheets/form-elements.css';
import './stylesheets/text-elements.css';
import './stylesheets/theme.css';

function App() {
  return (
    <div className='bg-primary h-screen flex items-center justify-center'>
      <h1>
        SSSF Wallet
      </h1>
      <Button type="primary">Primary Button</Button>
    </div>
  );
}

export default App;
