import * as React from 'react';
import { ValidateMessages } from 'rc-field-form/lib/interface';
import devWarning from '../_util/devWarning';

import LocaleContext from './context';

export const ANT_MARK = 'internalMark';

export interface Locale {
  locale: string;
  TimePicker?: Record<string, any>;
  Calendar?: Record<string, any>;
  Select?: Record<string, any>;
  global?: Record<string, any>;
  PageHeader?: { back: string };
  Icon?: Record<string, any>;
  Text?: Record<string, any>;
  Form?: {
    optional?: string;
    defaultValidateMessages: ValidateMessages;
  };
  Image?: {
    preview: string;
  };
}

export interface LocaleProviderProps {
  locale: Locale;
  children?: React.ReactNode;
  _ANT_MARK__?: string;
}

export default class LocaleProvider extends React.Component<LocaleProviderProps, any> {
  static defaultProps = {
    locale: {},
  };

  constructor(props: LocaleProviderProps) {
    super(props);

    devWarning(
      props._ANT_MARK__ === ANT_MARK,
      'LocaleProvider',
      '`LocaleProvider` is deprecated. Please use `locale` with `ConfigProvider` instead: http://u.ant.design/locale',
    );
  }

  render() {
    const { locale, children } = this.props;

    return (
      <LocaleContext.Provider value={{ ...locale, exist: true }}>{children}</LocaleContext.Provider>
    );
  }
}
