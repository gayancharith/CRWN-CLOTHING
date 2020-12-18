import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCollectionForPreview } from "../../redux/shop/shop.selectors";
import CollectionPreview from "../preview-collection/preview-collection.component";

import "./collection-overview.styles.scss";

const CollectionOverView = ({ collections }) => {
  console.log({ collections });
  return (
    <div className="collection-overview">
      <div className="shop-page">
        {collections.map(({ id, ...otherCollectionProps }) => (
          <CollectionPreview key={id} {...otherCollectionProps} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionForPreview,
});

export default connect(mapStateToProps)(CollectionOverView);
