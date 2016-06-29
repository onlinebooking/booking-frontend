import React, { Component } from 'react';
import classNames from 'classnames';

class ShopHeader extends Component {

  render() {
    const { title, caption, full, imageUrl } = this.props;
    const headerClass = classNames('shop-header', { 'shop-header-full': full });

    return (
      <div className={headerClass} style={{ backgroundImage: `url(${imageUrl})` }}>
        <div className="text-center shop-header-background">
          <h1>{title}</h1>
          <div>{caption}</div>
        </div>
      </div>
    );
  }
}

ShopHeader.defaultProps = { full: true };

export default ShopHeader;
