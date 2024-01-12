import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="100" cy="100" r="100" />
    <rect x="-1" y="214" rx="10" ry="10" width="204" height="27" />
    <rect x="0" y="260" rx="10" ry="10" width="207" height="48" />
    <rect x="112" y="287" rx="0" ry="0" width="14" height="1" />
    <rect x="0" y="330" rx="10" ry="10" width="76" height="25" />
    <rect x="125" y="323" rx="20" ry="20" width="84" height="42" />
  </ContentLoader>
);

export default MyLoader;
