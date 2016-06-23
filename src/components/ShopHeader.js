import React, { Component } from 'react';
import classNames from 'classnames';

class ShopHeader extends Component {

  render() {
    const { title, caption, full } = this.props;
    const headerImageUrl = `https://source.unsplash.com/category/nature?a=${Math.random()*10000}`;
    const headerClass = classNames('shop-header', { 'shop-header-full': full });

    return (
      <div className={headerClass} style={{ backgroundImage: `url(${headerImageUrl})` }}>
        <div className="text-center shop-header-background">
          <h1>{title}</h1>
          <p>{caption}</p>
        </div>
      </div>
    );
  }
}

ShopHeader.defaultProps = { full: true };

export default ShopHeader;
