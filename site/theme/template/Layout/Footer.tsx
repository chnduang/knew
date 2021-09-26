import React from 'react';
import { message } from 'antd';
import RcFooter from 'rc-footer';
import { Link } from 'bisheng/router';
import { presetPalettes } from '@ant-design/colors';
import { FormattedMessage, injectIntl, WrappedComponentProps } from 'react-intl';
import { ZhihuOutlined, UsergroupAddOutlined, GithubOutlined } from '@ant-design/icons';
import ColorPicker from '../Color/ColorPicker';
import { loadScript, getLocalizedPathname } from '../utils';

class Footer extends React.Component<WrappedComponentProps & { location: any }> {
  lessLoaded = false;

  state = {
    color: presetPalettes.blue.primary,
  };

  getColumns() {
    const { intl, location } = this.props;

    const isZhCN = intl.locale === 'zh-CN';

    const getLinkHash = (path: string, hash: { zhCN: string; enUS: string }) => {
      const pathName = getLocalizedPathname(path, isZhCN, location.query, hash);
      const { pathname, query } = pathName;
      const pathnames = pathname.split('#');
      if ('direction' in query) {
        return `${pathnames[0]}?direction=rtl#${pathnames[1]}`;
      }
      return pathname;
    };

    const col1 = {
      title: <FormattedMessage id="app.footer.resources" />,
      items: [
        {
          title: 'Ant Design Charts',
          url: 'https://charts.ant.design',
          openExternal: true,
        },
      ],
    };

    const col2 = {
      title: <FormattedMessage id="app.footer.community" />,
      items: [
        {
          icon: <ZhihuOutlined style={{ color: '#0084ff' }} />,
          title: <FormattedMessage id="app.footer.zhihu" />,
          url: 'http://zhuanlan.zhihu.com/antdesign',
          openExternal: true,
        },
      ],
    };

    if (isZhCN) {
      col2.items.push({
        icon: <UsergroupAddOutlined />,
        title: <FormattedMessage id="app.footer.work_with_us" />,
        url: getLinkHash('/docs/resources', {
          zhCN: '加入我们',
          enUS: 'JoinUs',
        }),
        LinkComponent: Link,
      } as any);
    }

    const col3 = {
      title: <FormattedMessage id="app.footer.help" />,
      items: [
        {
          icon: <GithubOutlined />,
          title: 'GitHub',
          url: 'https://github.com/ant-design/ant-design',
          openExternal: true,
        },
      ],
    };

    const col4 = {
      icon: (
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg"
          alt="Ant XTech"
        />
      ),
      title: <FormattedMessage id="app.footer.more-product" />,
      items: [
        {
          icon: (
            <img
              src="https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg"
              alt="yuque"
            />
          ),
          title: <FormattedMessage id="app.footer.yuque" />,
          url: 'https://yuque.com',
          description: <FormattedMessage id="app.footer.yuque.slogan" />,
          openExternal: true,
        },
      ],
    };

    return [col1, col2, col3, col4];
  }

  handleColorChange = (color: string) => {
    const {
      intl: { messages },
    } = this.props;
    message.loading({
      content: messages['app.footer.primary-color-changing'],
      key: 'change-primary-color',
    });
    const changeColor = () => {
      (window as any).less
        .modifyVars({
          '@primary-color': color,
        })
        .then(() => {
          message.success({
            content: messages['app.footer.primary-color-changed'],
            key: 'change-primary-color',
          });
          this.setState({ color });
        });
    };

    const lessUrl = 'https://gw.alipayobjects.com/os/lib/less/3.10.3/dist/less.min.js';

    if (this.lessLoaded) {
      changeColor();
    } else {
      (window as any).less = {
        async: true,
        javascriptEnabled: true,
      };
      loadScript(lessUrl).then(() => {
        this.lessLoaded = true;
        changeColor();
      });
    }
  };

  renderThemeChanger() {
    const { color } = this.state;
    const colors = Object.keys(presetPalettes).filter(item => item !== 'grey');
    return (
      <ColorPicker
        small
        color={color}
        position="top"
        presetColors={[
          ...colors.map(c => presetPalettes[c][5]),
          ...colors.map(c => presetPalettes[c][4]),
          ...colors.map(c => presetPalettes[c][6]),
        ]}
        onChangeComplete={this.handleColorChange}
      />
    );
  }

  render() {
    return (
      <RcFooter
        columns={this.getColumns()}
        bottom={
          <>
            Made with <span style={{ color: '#fff' }}>❤</span> by
            <a target="_blank" rel="noopener noreferrer" href="https://xtech.antfin.com">
              <FormattedMessage id="app.footer.company" />
            </a>
          </>
        }
      />
    );
  }
}

export default injectIntl(Footer);
