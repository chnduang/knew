import * as React from 'react';
import { Button } from 'antd';
import { Link } from 'bisheng/router';
import { FormattedMessage, useIntl } from 'react-intl';
import { PlayCircleFilled } from '@ant-design/icons';
import { getLocalizedPathname } from '../../utils';

import './index.less';

const Banner = (props: { location: any }) => {
  const { location } = props;
  const { locale } = useIntl();
  const isZhCN = locale === 'zh-CN';

  return (
    <div className="home-banner">
      {/* <Background /> */}

      <div className="home-banner-holder">
        <div className="home-banner-content">
          <div>OPEN-ANTD-UI</div>
          <p>
            <FormattedMessage id="app.home.introduce" />
          </p>

          <a className="banner-video">
            <PlayCircleFilled /> <FormattedMessage id="app.home.play-video" />
          </a>

          <div className="home-banner-content-operations">
            <Link to={getLocalizedPathname('/docs/react/introduce', isZhCN, location.query)}>
              <Button type="primary" shape="round">
                <FormattedMessage id="app.home.getting-started" />
              </Button>
            </Link>
            <a
              href="https://github.com/ant-design/ant-design"
              target="_black"
              rel="noopener noreferrer"
            >
              <Button shape="round" ghost>
                Github
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
