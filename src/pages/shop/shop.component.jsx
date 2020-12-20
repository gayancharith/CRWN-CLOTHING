import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

import { updateCollections } from "../../redux/shop/shop.actions";
import CollectionOverView from "../../components/collection-overview/collection-overview.component";
import CollectionPage from "../collection/collection.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

import "../../components/preview-collection/preview-collection.styles.scss";
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverView);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  state = {
    loading: true,
  };
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection("collections");

    //obervable method
    // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
    //   async (snapshot) => {
    //     updateCollections(convertCollectionsSnapshotToMap(snapshot));
    //     this.setState({ loading: false });
    //   }
    // );

    //async method
    collectionRef.get().then((snapshot) => {
      updateCollections(convertCollectionsSnapshotToMap(snapshot));
      this.setState({ loading: false });
    });

    // fetch('https://firestore.googleapis.com/v1/projects/crwn-db-fe8a2/databases/(default)/documents')
    // .then(response => response.json())
    // .then(collections => console.log(collections))
  }

  componentWillUnmount() {
    this.unsubscribeFromSnapshot();
  }

  render() {
    const { loading } = this.state;
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionsPageWithSpinner isLoading={loading} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
