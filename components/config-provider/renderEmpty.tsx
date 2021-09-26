import * as React from 'react';
import { ConfigConsumer } from '.';

const renderEmpty = (componentName?: string): React.ReactNode => (
  <ConfigConsumer>
    {() => {
      switch (componentName) {
        case 'Table':
        case 'Select':
        case 'TreeSelect':
        case 'Cascader':
        case 'Transfer':
        default:
          return null;
      }
    }}
  </ConfigConsumer>
);

export type RenderEmptyHandler = typeof renderEmpty;

export default renderEmpty;
